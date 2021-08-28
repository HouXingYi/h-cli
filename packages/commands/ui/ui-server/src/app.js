const Koa = require('koa')

const app = new Koa()
// const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
// const helmet = require('koa-helmet')
const path = require('path')
const koaStatic = require('koa-static')
const { historyApiFallback } = require('koa2-connect-history-api-fallback')
const cors = require('./middlewares/cors')
const ui = require('./routes/ui')
// 安装预防，设置必要的 http 头
// app.use(helmet())

// error handler
onerror(app)

// 支持跨域
app.use(cors)

// middlewares
app.use(
    bodyparser({
        enableTypes: ['json', 'form', 'text'],
    })
)
app.use(json())
app.use(logger())
app.use(historyApiFallback({ whiteList: ['/api/ui'] }))
app.use(koaStatic(path.resolve(__dirname, '../', './node_modules/@h-cli/ui-fe/build')))

// app.use(
//     views(`${__dirname}/views`, {
//         extension: 'pug',
//     })
// )

// logger
app.use(async (ctx, next) => {
    const start = new Date()
    await next()
    const ms = new Date() - start
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(ui.routes(), ui.allowedMethods()) // h-cli ui 后端接口

// error-handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
})

module.exports = app
