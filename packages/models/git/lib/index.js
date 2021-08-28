/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable no-await-in-loop */
const debug = require('debug')
const SimpleGit = require('simple-git')
const inquirer = require('inquirer')
const log = require('@h-cli/log')
const semver = require('semver')
// const Listr = require('listr')
// const { Observable } = require('rxjs')
const { spinnerStart } = require('@h-cli/utils')

class Git {
    constructor({ dir }, { prod = false, commitMsg = false, incType = false }) {
        debug('git 类 被new 了')()
        this.dir = dir // 源码目录
        this.git = SimpleGit(dir) // SimpleGit实例
        this.branch = null // 本地开发分支
        this.prod = prod // 是否正式发布
        this.commitMsg = commitMsg //
        this.incType = incType //
    }

    async commit() {
        debug('git commit')()
        // 1.生成开发分支，获取当前分支this.branch
        await this.getCorrectBranch()
        log.info(`开始提交代码，当前分支为[${this.branch}]`)
        // 2.检查stash区
        await this.checkStash()
        // 3.检查代码冲突
        await this.checkConflicted()
        // 4.检查未提交代码
        await this.checkNotCommitted()
        // 5.切换开发分支 在上面的commit下checkout
        await this.checkoutBranch(this.branch)
        // 6.合并远程master分支和dev分支代码
        await this.pullRemoteMasterAndDev()
        // 7.将开发分支推送到远程仓库
        await this.pushRemoteRepo(this.branch)
    }

    async publish() {
        if (this.prod) {
            log.info('开始发布代码，当前发布环境为[正式环境]')
            await this.devPublish() // 先做一轮devpublish
            await this.checkoutBranch('master')
            await this.pullRemoteRepo('dev') // dev合并到master
            await this.checkConflicted()
            // 打tag + 删除本地分支
            this.runCreateTagTask()
        } else {
            log.info('开始发布代码，当前发布环境为[测试环境]')
            await this.devPublish()
            await this.checkoutBranch(this.branch) // 最后切回开发分支
        }
    }

    async checkTag() {
        // tag名字不能和分支一样
        await this.git.addTag(`release/${this.branch}`)
        log.success('本地 tag 创建成功', `release/${this.branch}`)
        await this.git.pushTags('origin')
        log.success('远程 tag 推送成功', `release/${this.branch}`)
    }

    async runCreateTagTask() {
        await this.pushRemoteRepo('master')
        await this.checkTag()
        await this.deleteLocalBranch()
        await this.deleteRemoteBranch()
    }

    async deleteLocalBranch() {
        log.info('开始删除本地开发分支', this.branch)
        await this.git.deleteLocalBranch(this.branch)
        log.success('删除本地分支成功', this.branch)
    }

    async deleteRemoteBranch() {
        log.info('开始删除远程分支', this.branch)
        await this.git.push(['origin', '--delete', this.branch])
        log.success('删除远程分支成功', this.branch)
    }

    async devPublish() {
        await this.checkoutBranch('dev')
        await this.pullRemoteRepo(this.branch)
        await this.checkConflicted()
        await this.pushRemoteRepo('dev')
    }

    async pushRemoteRepo(branchName) {
        log.info(`推送代码至${branchName}分支`)
        await this.git.push('origin', branchName)
        log.success('推送代码成功')
    }

    async pullToCurrent(pullTraget) {
        log.info(`合并 [${pullTraget}] -> [${this.branch}]`)
        await this.pullRemoteRepo(`${pullTraget}`)
        log.success(`合并远程 [${pullTraget}] 分支代码成功`)
        await this.checkConflicted()
    }

    async pullRemoteMasterAndDev() {
        if (this.prod) {
            await this.pullToCurrent('dev')
            await this.pullToCurrent('master')
            log.info('开始拉取代码，当前发布环境为[正式环境]')
        } else {
            await this.pullToCurrent('dev')
            log.info('开始拉取代码，当前发布环境为[测试环境]')
        }
    }

    // 检查是否需要bump版本
    async checkIfPromptBranch() {
        let resBranch = null
        log.info('检查开发分支合法性')
        const branchLocal = await this.git.branchLocal()
        const currentBranch = branchLocal.current
        resBranch = currentBranch
        log.info('当前分支', resBranch)
        const remoteBranchList = await this.getRemoteTagList()
        let releaseVersion = null
        if (remoteBranchList && remoteBranchList.length > 0) {
            // eslint-disable-next-line prefer-destructuring
            releaseVersion = remoteBranchList[0]
        }
        log.info('线上最新版本号', releaseVersion)
        // 生成本地开发分支
        // 没有远端release tag，直接1.0.0
        if (!releaseVersion) {
            resBranch = '1.0.0'
            return {
                resBranch,
                releaseVersion,
            }
        }
        const isValidVersion = semver.valid(resBranch)
        if (!isValidVersion) {
            resBranch = releaseVersion // 这种情况需要升级
        }
        if (semver.gt(resBranch, releaseVersion)) {
            // 是否前面大于后面
            log.info('当前版本大于等于线上最新版本', `${resBranch} >= ${releaseVersion}`)
            // 当前版本大于线上最新版本，选用当前版本
            return {
                resBranch,
                releaseVersion,
            }
        }
        return { resBranch: false, releaseVersion }
    }

    async getCorrectBranch() {
        const { resBranch, releaseVersion } = await this.checkIfPromptBranch()
        // console.log('resBranch releaseVersion', `${resBranch} ${releaseVersion}`)
        if (resBranch) {
            this.branch = resBranch
        } else {
            let incType
            console.log('this.incType', this.incType)
            if (this.incType) {
                incType = this.incType
            } else {
                // 当前版本小于线上最新版本，需要bump版本
                incType = await inquirer.prompt({
                    type: 'list',
                    name: 'incType',
                    message: '自动升级版本，请选择升级版本类型',
                    default: 'patch',
                    choices: [
                        {
                            name: `小版本（${releaseVersion} -> ${semver.inc(
                                releaseVersion,
                                'patch'
                            )}）`,
                            value: 'patch',
                        },
                        {
                            name: `中版本（${releaseVersion} -> ${semver.inc(
                                releaseVersion,
                                'minor'
                            )}）`,
                            value: 'minor',
                        },
                        {
                            name: `大版本（${releaseVersion} -> ${semver.inc(
                                releaseVersion,
                                'major'
                            )}）`,
                            value: 'major',
                        },
                    ],
                })
                const { incType: inc } = incType
                incType = inc
            }
            console.log('incType', incType)
            const incVersion = semver.inc(releaseVersion, incType)
            this.branch = `${incVersion}`
        }
        log.info('生成本地开发分支', this.branch)
    }

    async getRemoteTagList() {
        const remoteList = await this.git.listRemote(['--refs'])
        const reg = /.+?refs\/tags\/release\/(\d+\.\d+\.\d+)/g
        return remoteList
            .split('\n')
            .map(remote => {
                // 筛选出符合格式的tag
                const match = reg.exec(remote)
                reg.lastIndex = 0
                if (match && semver.valid(match[1])) {
                    return match[1]
                }
            })
            .filter(_ => _)
            .sort((a, b) => {
                // 最新的tag放在最上面
                if (semver.lte(b, a)) {
                    if (a === b) return 0
                    return -1
                }
                return 1
            })
    }

    async checkoutBranch(branch) {
        const localBranchList = await this.git.branchLocal()
        if (localBranchList.all.indexOf(branch) >= 0) {
            await this.git.checkout(branch)
        } else {
            await this.git.checkoutLocalBranch(branch)
        }
        log.success(`分支切换到${branch}`)
    }

    async checkStash() {
        log.info('检查stash记录')
        const stashList = await this.git.stashList()
        log.info('stashList', stashList)
        if (stashList.all.length > 0) {
            await this.git.stash(['pop'])
            log.info('stash pop成功')
        }
    }

    async checkConflicted() {
        debug('代码冲突检查')()
        const status = await this.git.status()
        debug('status.conflicted')(status.conflicted)
        if (status.conflicted.length > 0) {
            throw new Error('当前代码存在冲突，请手动处理合并后再试！')
        }
        log.info('代码冲突检查通过')
    }

    async pullRemoteRepo(branchName, options) {
        log.info(`同步远程${branchName}分支代码`)
        await this.git.pull('origin', branchName, options).catch(err => {
            log.error(err.message)
        })
    }

    async checkRemoteMaster() {
        return (await this.git.listRemote(['--refs'])).indexOf('refs/heads/master') >= 0
    }

    // 检查是否需要commit
    async checkIfCommitGit() {
        const status = await this.git.status()
        if (
            status.not_added.length > 0 ||
            status.created.length > 0 ||
            status.deleted.length > 0 ||
            status.modified.length > 0 ||
            status.renamed.length > 0
        ) {
            return true
        }
        return false
    }

    async checkNotCommitted() {
        const isNeedCommit = this.checkIfCommitGit()
        if (isNeedCommit) {
            const status = await this.git.status()
            if (
                status.not_added.length > 0 ||
                status.created.length > 0 ||
                status.deleted.length > 0 ||
                status.modified.length > 0 ||
                status.renamed.length > 0
            ) {
                debug('status')(status)
                await this.git.add(status.not_added)
                await this.git.add(status.created)
                await this.git.add(status.deleted)
                await this.git.add(status.modified)
                await this.git.add(status.renamed)
                let message
                if (this.commitMsg) {
                    message = this.commitMsg
                } else {
                    while (!message) {
                        message = (
                            await inquirer.prompt({
                                type: 'text',
                                name: 'message',
                                message: '请输入commit信息：',
                            })
                        ).message
                    }
                }
                const spinner = this.spinnerStart('正在git commit, 请稍等...')
                try {
                    await this.git.commit(message)
                    spinner.stop(true)
                } catch (e) {
                    spinner.stop(true)
                    throw new Error(e) // 把错误抛给上层
                }
                log.info(`git commit 成功!`)
                debug('本次commit提交成功')()
            }
        }
    }

    spinnerStart(msg) {
        if (!this.incType) {
            return spinnerStart(msg)
        }
        log.info(msg)
        return {
            stop(flag) {
                debug('spinner停止')(flag)
            },
        }
    }
}

module.exports = Git
