const execa = require('execa')
const fs = require('fs-extra')
const path = require('path')
const cwdVal = require('./cwdVal')

const event = 'init'

function onData(action, socket, buffer) {
    const text = buffer.toString().trim()
    if (text) {
        const resdata = {
            action,
            payload: {
                progress: text,
            },
        }
        socket.emit(event, resdata)
    }
}

function sendEndMsg(socket) {
    const resdata = {
        action: 'startEnd',
        payload: {
            text: '命令执行完成',
        },
    }
    socket.emit(event, resdata)
}

async function startInit(action, socket, data) {
    console.log('startInit222')
    const { projectinfo } = data
    // 新建文件夹并进入
    const { projectPath } = projectinfo
    const file = path.join(cwdVal.get(), projectPath)
    fs.mkdirpSync(file)
    cwdVal.set(file)
    // 新建文件夹并进入 完成
    const projectinfoStr = JSON.stringify(projectinfo)
    const child = execa(
        'h-cli',
        [
            'init',
            // '-tp',
            // 'H:\\code\\gitlab\\h-cli\\packages\\commands\\init',
            '--skipGetStarted',
            '--inlinePreset',
            projectinfoStr,
        ],
        {
            cwd: cwdVal.get(),
            stdio: ['inherit', 'pipe', 'inherit'],
        }
    )
    child.stdout.on('data', buffer => {
        onData(action, socket, buffer)
    })
    await child
    console.log('child 执行结束')
    sendEndMsg(socket)
}

async function handleInitWs(socket, data) {
    const { action, payload } = data
    if (action === 'start') {
        startInit(action, socket, payload)
    }
}
module.exports = {
    handleInitWs,
}
