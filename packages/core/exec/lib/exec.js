const debug = require('debug')
const Package = require('@h-cli/package')
const path = require('path')
const { exec: spawn } = require('@h-cli/utils')
const log = require('@h-cli/log')

const COMMANDS = {
    init: '@h-cli/init',
    publish: '@h-cli/publish',
    ui: '@h-cli/ui',
}

const CACHE_DIR = 'dependencies'

async function exec() {
    debug('exec 被调用')()
    let targetPath = process.env.CLI_TARGET_PATH // 执行的方法的路径
    const homePath = process.env.CLI_HOME_PATH // 缓存路径
    debug('targetPath')(targetPath)
    debug('homePath')(homePath)

    // commander action 传入的 commander 对象参数
    const cmdObj = arguments[arguments.length - 1]

    debug('最初的cmdObj')(cmdObj)

    const cmdName = cmdObj.name()
    const packageName = COMMANDS[cmdName]
    const packageVersion = 'latest'
    let pkg
    let storeDir = ''

    // 如果没有指定targetPath，则需要安装到缓存路径，再获取执行路径
    if (!targetPath) {
        targetPath = path.resolve(homePath, CACHE_DIR) // 生成缓存路径
        storeDir = path.resolve(targetPath, 'node_modules')
        debug('targetPath')(targetPath)
        debug('storeDir')(storeDir)

        pkg = new Package({
            targetPath,
            storeDir,
            packageName,
            packageVersion,
        })

        // 包是否存在
        if (await pkg.exists()) {
            // 更新package
            await pkg.update()
        } else {
            // 安装package
            await pkg.install()
        }
    } else {
        // 如果本地有指定targetPath，则只需要获取执行路径即可，不需要安装
        pkg = new Package({
            targetPath,
            packageName,
            packageVersion,
        })
    }

    // 获取执行文件路径
    const rootFile = pkg.getRootFilePath()

    debug('rootFile')(rootFile)

    // 执行命令
    if (rootFile) {
        try {
            // 在当前进程中调用
            // require(rootFile).call(null, Array.from(arguments));

            // 在node子进程中调用

            // 处理args参数start
            const args = Array.from(arguments)
            debug('args')(args)
            const cmd = args[args.length - 1] // Command对象
            const o = Object.create(null)
            // 过滤Command对象中的私有属性和parent属性
            Object.keys(cmd).forEach(key => {
                // eslint-disable-next-line no-prototype-builtins
                if (cmd.hasOwnProperty(key) && !key.startsWith('_') && key !== 'parent') {
                    o[key] = cmd[key]
                }
            })
            args[args.length - 1] = o
            // 处理args参数end

            const code = `require('${rootFile}').call(null, ${JSON.stringify(args)})`
            const child = spawn('node', ['-e', code], {
                cwd: process.cwd(),
                stdio: 'inherit', // 直接把子进程的运行数据传给父进程，不用 on('data') 了
            })
            child.on('error', e => {
                log.error(e.message)
                process.exit(1)
            })
            child.on('exit', e => {
                debug('命令执行成功:')(e)
                process.exit(e)
            })
        } catch (e) {
            log.error(e.message)
        }
    }
}

module.exports = exec
