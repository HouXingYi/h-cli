const Git = require('@h-cli/git')
const { SuccessRes } = require('../../res-model/index')

async function checkIfCommit() {
    const git = new Git(
        {
            dir: process.cwd(),
        },
        {}
    )
    const ifCommit = await git.checkIfCommitGit()
    console.log('检查是否需要commit', ifCommit) // 检查是否需要commit
    return new SuccessRes({ ifCommit })
}

async function checkIfBump() {
    const git = new Git(
        {
            dir: process.cwd(),
        },
        {}
    )
    const ifPrompt = await git.checkIfPromptBranch()
    console.log('检查是否需要bump版本', ifPrompt) // 检查是否需要bump版本
    return new SuccessRes({ ifPrompt })
}

module.exports = {
    checkIfCommit,
    checkIfBump,
}
