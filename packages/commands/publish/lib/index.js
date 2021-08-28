const path = require('path')
const fs = require('fs')
const fse = require('fs-extra')
const Command = require('@h-cli/command')
const Git = require('@h-cli/git')
const debug = require('debug')
const log = require('@h-cli/log')

class PublishCommand extends Command {
    init() {
        // log.info('初始化，检查项目是否为npm项目')
        this.prepare()
        this.handleInline()
        // 处理参数
        this.options = {
            prod: this.prod, // 是否正式发布
            commitMsg: this.commitMsg, // commit信息
            incType: this.incType, // bump版本方式
        }
        // console.log('this.options', this.options)
        this.beginEvent('publish')
    }

    async exec() {
        debug('publish exec触发22')()
        try {
            debug('开始new git')()
            this.git = new Git(this.projectInfo, this.options)
            debug('开始git commit')()
            await this.git.commit() // 代码自动化提交
            await this.git.publish() // 代码发布
            this.endEvent('publish')
        } catch (e) {
            log.info('exec错误', e)
        }
    }

    prepare() {
        // 1.确认项目是否为npm项目
        const projectPath = process.cwd()
        const pkgPath = path.resolve(projectPath, 'package.json')
        debug('package.json')(pkgPath)
        if (!fs.existsSync(pkgPath)) {
            throw new Error('package.json不存在！')
        }
        // 2.确认是否包含name、version、build命令
        const pkg = fse.readJsonSync(pkgPath)
        const { name, version, scripts } = pkg
        if (!name || !version || !scripts) {
            throw new Error(
                'package.json信息不全，请检查是否存在name、version和scripts（需提供build命令）！'
            )
        }
        this.projectInfo = { dir: projectPath }
    }

    // 处理preset参数
    handleInline() {
        // this._cmd.inlinePreset = JSON.stringify({
        //     prod: false, // 是否正式发布
        //     commit: 'ci: 测试inlinepreset',
        //     incType: 'patch',
        // })
        try {
            this.inlinePreset = JSON.parse(this._cmd.inlinePreset)
        } catch (e) {
            this.inlinePreset = null
        }
        // console.log('this.inlinePreset', this.inlinePreset)
        if (this.inlinePreset) {
            const { prod, commit, incType } = this.inlinePreset
            this.commitMsg = commit || false
            this.prod = prod || false
            this.incType = incType || false
        } else {
            this.prod = this._cmd.prod || false
        }
    }
}

function init(argv) {
    return new PublishCommand(argv)
}

module.exports = init
module.exports.PublishCommand = PublishCommand
