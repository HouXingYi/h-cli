const publicIp = require('public-ip')
const Request = require('./request')

const service = {
    async event(command = '', stage = '') {
        let pip = null
        try {
            pip = await publicIp.v4({ timeout: 10 })
        } catch (e) {
            pip = '获取错误'
        }
        let t = 2
        if (process.env.T) {
            t = 1
        }
        const request = new Request()
        const d = new Date().toString() // 防止时区不对问题
        try {
            await request.post('/api/cli/trigger', {
                t,
                address: pip,
                triggerAt: d,
                command,
                stage,
            })
        } catch (e) {
            // console.log('请求错误', e)
        }
    },
}

module.exports = service
