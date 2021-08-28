const router = require('koa-router')()
const { checkIfCommit, checkIfBump } = require('../controller/ui/gitCheck')

router.prefix('/api/ui')

router.get('/checkIfCommit', async ctx => {
    const res = await checkIfCommit()
    ctx.body = res
})

router.get('/checkIfBump', async ctx => {
    const res = await checkIfBump()
    ctx.body = res
})

module.exports = router
