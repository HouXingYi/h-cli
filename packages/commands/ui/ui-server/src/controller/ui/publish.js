const execa = require('execa')
const fs = require('fs-extra')
const path = require('path')
const cwdVal = require('./cwdVal')

const event = 'publish'

function onData(action, socket, buffer) {
    const text = buffer.toString().trim()
    console.log('text', text)
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

async function startPublish(action, socket, data) {
    console.log('startInit222')
    const { publishinfo } = data
    const publishinfoStr = JSON.stringify(publishinfo)
    console.log('publishinfoStr', publishinfoStr)
    const child = execa(
        'h-cli',
        [
            'publish',
            // '-tp',
            // 'H:\\code\\gitlab\\h-cli\\packages\\commands\\publish',
            '--inlinePreset',
            publishinfoStr,
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

async function handlePublishWs(socket, data) {
    const { action, payload } = data
    if (action === 'start') {
        startPublish(action, socket, payload)
    }
}
module.exports = {
    handlePublishWs,
}
