const fs = require('fs')
const path = require('path')
const inquirer = require('inquirer')
const fse = require('fs-extra')
const glob = require('glob')
const ejs = require('ejs')
const semver = require('semver')
const userHome = require('user-home')
const Command = require('@h-cli/command')
const Package = require('@h-cli/package')
const debug = require('debug')
const log = require('@h-cli/log')
const { spinnerStart: spinnerCommit, execAsync } = require('@h-cli/utils')
const getProjectTemplate = require('@h-cli/template-list')

const TEMPLATE_TYPE_NORMAL = 'normal'
const TEMPLATE_TYPE_CUSTOM = 'custom'
const WHITE_COMMAND = ['npm', 'cnpm', 'yarn']

class InitCommand extends Command {
    init() {
        this.projectName = this._argv[0] || ''
        this.force = !!this._cmd.force
        this.inlinePreset = this._cmd.inlinePreset || null
        this.skipGetStarted = this._cmd.inlinePreset || false
        this.beginEvent('init')
    }

    async exec() {
        try {
            // 1. 准备阶段 // 获取项目信息（用户输入）
            const projectInfo = await this.prepare()
            // log.info('准备阶段，获取用户信息结束', projectInfo)
            if (projectInfo) {
                // 2. 下载模板
                this.projectInfo = projectInfo
                log.info('开始下载模板')
                await this.downloadTemplate()
                log.info('开始安装模板')
                // 3. 安装模板
                await this.installTemplate()
            }
        } catch (e) {
            debug('err')(e.message)
            log.info(e.message)
        }
    }

    async installTemplate() {
        debug('templateInfo')(this.templateInfo)
        if (this.templateInfo) {
            if (!this.templateInfo.type) {
                this.templateInfo.type = TEMPLATE_TYPE_NORMAL
            }
            this.endEvent('init')
            if (this.templateInfo.type === TEMPLATE_TYPE_NORMAL) {
                // 标准安装
                await this.installNormalTemplate()
            } else if (this.templateInfo.type === TEMPLATE_TYPE_CUSTOM) {
                // 自定义安装，安装文件之后的逻辑调用模板中的入口文件执行，实现模板逻辑的自定义
                await this.installCustomTemplate()
            } else {
                throw new Error('无法识别项目模板类型！')
            }
        } else {
            throw new Error('项目模板信息不存在！')
        }
    }

    checkCommand(cmd) {
        if (WHITE_COMMAND.includes(cmd)) {
            return cmd
        }
        return null
    }

    async execCommand(command, errMsg) {
        let ret
        if (command) {
            const cmdArray = command.split(' ')
            const cmd = this.checkCommand(cmdArray[0])
            if (!cmd) {
                throw new Error(`命令不存在！命令：${command}`)
            }
            const args = cmdArray.slice(1)
            ret = await execAsync(cmd, args, {
                stdio: 'inherit',
                cwd: process.cwd(),
            })
        }
        if (ret !== 0) {
            throw new Error(errMsg)
        }
        return ret
    }

    async ejsRender(options) {
        const dir = process.cwd()
        const { projectInfo } = this
        return new Promise((resolve, reject) => {
            glob(
                '**',
                {
                    cwd: dir,
                    ignore: options.ignore || '',
                    nodir: true,
                },
                (err, files) => {
                    if (err) {
                        reject(err)
                    }
                    Promise.all(
                        files.map(file => {
                            const filePath = path.join(dir, file)
                            return new Promise((resolve1, reject1) => {
                                ejs.renderFile(filePath, projectInfo, {}, (err2, result) => {
                                    if (err2) {
                                        reject1(err2)
                                    } else {
                                        fse.writeFileSync(filePath, result)
                                        resolve1(result)
                                    }
                                })
                            })
                        })
                    )
                        .then(() => {
                            resolve()
                        })
                        .catch(err3 => {
                            reject(err3)
                        })
                }
            )
        })
    }

    async installNormalTemplate() {
        debug('templateNpm')(this.templateNpm)
        // 拷贝模板代码至当前目录
        const spinner = this.spinnerStart('正在安装模板...')
        try {
            const templatePath = path.resolve(this.templateNpm.cacheFilePath, 'template')
            const targetPath = process.cwd()
            fse.ensureDirSync(templatePath)
            fse.ensureDirSync(targetPath)
            // 将缓存中的模板文件复制到当前目录
            fse.copySync(templatePath, targetPath)
        } catch (e) {
            throw e
        } finally {
            spinner.stop(true)
            log.info('模板安装成功')
        }
        // 安装依赖与运行模板
        const { installCommand, startCommand } = this.templateInfo
        // 依赖安装
        log.info(`开始执行安装命令${installCommand}，请稍等`)
        await this.execCommand(installCommand, '依赖安装失败！')
        if (this.skipGetStarted) {
            log.info(`请自行手动在终端中输入命令 ${startCommand} 来启动项目`)
        } else {
            log.info(`开始执行启动命令${startCommand}，请稍等`)
            // 启动命令执行
            await this.execCommand(startCommand, '启动执行命令失败！')
        }
    }

    async installCustomTemplate() {
        // 查询自定义模板的入口文件
        if (await this.templateNpm.exists()) {
            const rootFile = this.templateNpm.getRootFilePath()
            if (fs.existsSync(rootFile)) {
                debug('开始执行自定义模板')()
                const templatePath = path.resolve(this.templateNpm.cacheFilePath, 'template')
                const options = {
                    templateInfo: this.templateInfo,
                    projectInfo: this.projectInfo,
                    sourcePath: templatePath,
                    targetPath: process.cwd(),
                }
                // 其他的逻辑给模板的入口文件来做
                const code = `require('${rootFile}')(${JSON.stringify(options)})`
                debug('code')(code)
                await execAsync('node', ['-e', code], { stdio: 'inherit', cwd: process.cwd() })
                log.info('自定义模板安装成功')
            } else {
                throw new Error('自定义模板入口文件不存在！')
            }
        }
    }

    async downloadTemplate() {
        // 选出需要的模板信息
        const { projectTemplate } = this.projectInfo
        debug('projectTemplate')(projectTemplate)
        const templateInfo = this.template.find(item => item.npmName === projectTemplate)
        debug('templateInfo')(templateInfo)

        // 解析出模板缓存路径
        const targetPath = path.resolve(userHome, '.h-cli', 'template')
        const storeDir = path.resolve(userHome, '.h-cli', 'template', 'node_modules')
        const { npmName, version } = templateInfo
        this.templateInfo = templateInfo

        // 模板封装为一个package
        const templateNpm = new Package({
            targetPath,
            storeDir,
            packageName: npmName,
            packageVersion: version,
        })

        // 下载或者更新模板
        if (!(await templateNpm.exists())) {
            const spinner = this.spinnerStart('正在下载模板...')
            try {
                await templateNpm.install()
            } catch (e) {
                throw e
            } finally {
                spinner.stop(true)
                if (await templateNpm.exists()) {
                    log.success('下载模板成功')
                    this.templateNpm = templateNpm
                }
            }
        } else {
            const spinner = this.spinnerStart('正在更新模板...')
            try {
                await templateNpm.update()
            } catch (e) {
                throw e
            } finally {
                spinner.stop(true)
                if (await templateNpm.exists()) {
                    log.success('更新模板成功')
                    this.templateNpm = templateNpm
                }
            }
        }
    }

    async prepare() {
        // 0. 判断项目模板是否存在
        const template = await getProjectTemplate()
        if (!template || template.length === 0) {
            throw new Error('项目模板不存在')
        }
        this.template = template
        // 1. 判断当前目录是否为空
        const localPath = process.cwd()
        if (!this.isDirEmpty(localPath)) {
            let ifContinue = false
            if (!this.force) {
                // 询问是否继续创建
                ifContinue = (
                    await inquirer.prompt({
                        type: 'confirm',
                        name: 'ifContinue',
                        default: false,
                        message: '当前文件夹不为空，是否继续创建项目？',
                    })
                ).ifContinue
                if (!ifContinue) {
                    return
                }
            }
            // 2. 是否启动强制更新
            if (ifContinue || this.force) {
                // 给用户做二次确认
                const { confirmDelete } = await inquirer.prompt({
                    type: 'confirm',
                    name: 'confirmDelete',
                    default: false,
                    message: '是否确认清空当前目录下的文件？',
                })
                if (confirmDelete) {
                    const spinner = this.spinnerStart('正在清空当前目录...')
                    // 清空当前目录
                    fse.emptyDirSync(localPath)
                    spinner.stop(true)
                }
            }
        }
        const projectInfo = await this.getProjectInfo()
        // eslint-disable-next-line consistent-return
        return projectInfo
    }

    async getProjectInfo() {
        if (this.inlinePreset) {
            const info = JSON.parse(this.inlinePreset)
            return info
        }
        log.info('请输入项目信息')
        function isValidName(v) {
            return /^[a-zA-Z]+([-][a-zA-Z][a-zA-Z0-9]*|[_][a-zA-Z][a-zA-Z0-9]*|[a-zA-Z0-9])*$/.test(
                v
            )
        }

        let projectInfo = {}
        let isProjectNameValid = false
        if (isValidName(this.projectName)) {
            isProjectNameValid = true
            projectInfo.projectName = this.projectName
        }

        const projectNamePrompt = {
            type: 'input',
            name: 'projectName',
            message: `请输入项目名称`,
            default: '',
            validate(v) {
                const done = this.async()
                setTimeout(() => {
                    // 1.首字符必须为英文字符
                    // 2.尾字符必须为英文或数字，不能为字符
                    // 3.字符仅允许"-_"
                    if (!isValidName(v)) {
                        done(`请输入合法的项目名称`)
                        return
                    }
                    done(null, true)
                }, 0)
            },
            filter(v) {
                return v
            },
        }

        const projectPrompt = []
        if (!isProjectNameValid) {
            projectPrompt.push(projectNamePrompt)
        }
        projectPrompt.push(
            {
                type: 'input',
                name: 'projectVersion',
                message: `请输入项目版本号`,
                default: '1.0.0',
                validate(v) {
                    const done = this.async()
                    setTimeout(() => {
                        if (!semver.valid(v)) {
                            done('请输入合法的版本号')
                            return
                        }
                        done(null, true)
                    }, 0)
                },
                filter(v) {
                    if (semver.valid(v)) {
                        return semver.valid(v)
                    }
                    return v
                },
            },
            {
                type: 'list',
                name: 'projectTemplate',
                message: `请选择项目模板`,
                choices: this.createTemplateChoice(),
            }
        )

        // 2. 获取项目的基本信息
        const project = await inquirer.prompt(projectPrompt)
        projectInfo = {
            ...projectInfo,
            ...project,
        }
        return projectInfo
    }

    isDirEmpty(localPath) {
        let fileList = fs.readdirSync(localPath)
        // 文件过滤的逻辑
        fileList = fileList.filter(
            file => !file.startsWith('.') && ['node_modules'].indexOf(file) < 0
        )
        return !fileList || fileList.length <= 0
    }

    createTemplateChoice() {
        return this.template.map(item => ({
            value: item.npmName,
            name: item.name,
        }))
    }

    spinnerStart(msg) {
        if (!this.inlinePreset) {
            return spinnerCommit(msg)
        }
        log.info(msg)
        return {
            stop(flag) {
                debug('spinner停止')(flag)
            },
        }
    }
}

function init(argv) {
    debug('调用了command init')(argv)
    return new InitCommand(argv)
}

module.exports = init
// module.exports.InitCommand = InitCommand;
