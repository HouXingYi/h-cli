/* eslint-disable no-param-reassign */
const path = require('path')
const fs = require('fs-extra')
const cwdVal = require('./cwdVal')

const isPlatformWindows = process.platform.indexOf('win') === 0

const event = 'cwd'

function getcwd(action, socket, data) {
    const cwdStr = cwdVal.get()
    const resdata = {
        action,
        payload: {
            cwd: cwdStr,
        },
    }
    socket.emit(event, resdata)
}

function openParent(action, socket, data) {
    const cwdStr = cwdVal.get()
    const newFile = path.dirname(cwdStr)
    cwdVal.set(newFile)
    const resdata = {
        action,
        payload: {
            cwd: cwdVal.get(),
        },
    }
    socket.emit(event, resdata)
}

function isDirectory(file) {
    file = file.replace(/\\/g, path.sep)
    try {
        return fs.stat(file).then(x => x.isDirectory())
    } catch (e) {
        if (process.env.VUE_APP_CLI_UI_DEBUG) console.warn(e.message)
    }
    return false
}

async function getDirList(base) {
    let dir = base
    if (isPlatformWindows) {
        if (base.match(/^([A-Z]{1}:)$/)) {
            dir = path.join(base, '\\')
        }
    }
    const files = await fs.readdir(dir, 'utf8')
    const f = await Promise.all(
        files.map(async file => {
            const folderPath = path.join(base, file)

            const [directory] = await Promise.all([isDirectory(folderPath)])
            if (!directory) {
                return null
            }
            return {
                path: folderPath,
                name: file,
            }
        })
    )
    return f.filter(x => !!x)
}

async function getcurrentList(action, socket, data) {
    const cwdStr = cwdVal.get()
    const list = await getDirList(cwdStr)
    const resdata = {
        action,
        payload: {
            list,
        },
    }
    socket.emit(event, resdata)
}

function openFolder(action, socket, data) {
    const { path: cwdPath } = data
    cwdVal.set(cwdPath)
    const resdata = {
        action,
        payload: {
            cwd: cwdVal.get(),
        },
    }
    console.log('客户端发送的内容 返回：', resdata)
    socket.emit(event, resdata)
}

async function handleCwdWs(socket, data) {
    const { action, payload } = data
    if (action === 'getcwd') {
        getcwd(action, socket, payload)
    } else if (action === 'openParent') {
        openParent(action, socket, payload)
    } else if (action === 'getcurrentList') {
        getcurrentList(action, socket, payload)
    } else if (action === 'openFolder') {
        openFolder(action, socket, payload)
    }
}
module.exports = {
    handleCwdWs,
}
