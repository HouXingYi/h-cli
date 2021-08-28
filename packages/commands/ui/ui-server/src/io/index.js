const io = require('socket.io')
const { handleCwdWs } = require('../controller/ui/cwd')
const { handleInitWs } = require('../controller/ui/init')
const { handlePublishWs } = require('../controller/ui/publish')

class WS {
    constructor() {
        this.ws = null
    }

    initWs(server) {
        this.ws = io(server, { cors: true })
        this.ws.on('connection', socket => {
            console.log('初始化成功！下面可以用socket绑定事件和触发事件了')
            this.subscribe(socket)
        })
    }

    subscribe(socket) {
        socket.on('cwd', data => {
            handleCwdWs(socket, data)
        })
        socket.on('init', data => {
            handleInitWs(socket, data)
        })
        socket.on('publish', data => {
            handlePublishWs(socket, data)
        })
    }
}

module.exports = new WS()
