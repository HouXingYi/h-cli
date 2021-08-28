const debug = require('debug')
const path = require('path')
const commander = require('commander')
const colors = require('colors/safe')
const pathExists = require('path-exists').sync
// let utils = require('@h-cli/utils');
const exec = require('@h-cli/exec')
const userHome = require('user-home')
// const log = require('@h-cli/log')
const dotenv = require('dotenv')
const constant = require('./const')
const pkg = require('../package.json')

const program = new commander.Command()

// 注册命令
function registerCommand() {
    debug('注册命令')()
    program
        .name(Object.keys(pkg.bin)[0]) // h-cli
        .usage('<command> [options]')
        .version(pkg.version)
        .option('--t')
        .option('--dev')
        .option('-tp, --targetPath <targetPath>', '是否指定本地调试文件路径', '')

    program
        .command('init [projectName]')
        .option('-f, --force', '是否强制初始化项目')
        .option('--inlinePreset [JSON]', 'JSON 字符串的 preset')
        .option('--skipGetStarted')
        .action(exec)

    program
        .command('publish')
        .option('--prod', '是否正式发布')
        .option('--inlinePreset [JSON]', 'JSON 字符串的 preset')
        .action(exec)

    program.command('ui').action(exec)

    // 指定targetPath
    program.on('option:targetPath', () => {
        process.env.CLI_TARGET_PATH = program.opts().targetPath
    })

    program.on('option:t', () => {
        process.env.T = 1
    })

    process.env.NODE_ENV = 'prd'
    program.on('option:dev', () => {
        process.env.NODE_ENV = 'dev'
    })

    // 对未知命令监听
    program.on('command:*', obj => {
        const availableCommands = program.commands.map(cmd => cmd.name())
        console.log(colors.red(`未知的命令：${obj[0]}`))
        if (availableCommands.length > 0) {
            console.log(colors.red(`可用命令：${availableCommands.join(',')}`))
        }
    })

    // 解析参数，执行命令
    program.parse(process.argv)

    // 帮助提示
    if (program.args && program.args.length < 1) {
        program.outputHelp()
    }
}

function createDefaultConfig() {
    const cliConfig = {
        home: userHome,
    }
    // 如果.env中没有设置CLI_HOME，则设置一个默认的CLI_HOME
    if (process.env.CLI_HOME) {
        cliConfig.cliHome = path.join(userHome, process.env.CLI_HOME)
    } else {
        cliConfig.cliHome = path.join(userHome, constant.DEFAULT_CLI_HOME)
    }
    process.env.CLI_HOME_PATH = cliConfig.cliHome
}

function checkEnv() {
    const dotenvPath = path.resolve(userHome, '.env')
    debug('dotenvPath')(dotenvPath) // 用户主目录下.env文件 例：C:\Users\Administrator\.env
    // 如果用户主目录下存在.env，将其中的配置设到环境变量中 process.env
    if (pathExists(dotenvPath)) {
        dotenv.config({
            path: dotenvPath,
        })
    }
    createDefaultConfig()
}

// 准备工作
function prepare() {
    debug('prepare core 准备')()
    // log.info('脚手架 准备工作');
    checkEnv()
}

function core() {
    prepare()
    registerCommand()
}

module.exports = core
