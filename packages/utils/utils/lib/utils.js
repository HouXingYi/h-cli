/* eslint-disable global-require */
// const debug = require('debug')
const path = require('path')

function isObject(o) {
    return Object.prototype.toString.call(o) === '[object Object]'
}

function exec(command, args, options) {
    const win32 = process.platform === 'win32'

    const cmd = win32 ? 'cmd' : command // windows系统用cmd
    const cmdArgs = win32 ? ['/c'].concat(command, args) : args

    // windows下为cp.spawn('cmd', ['/c', 'node', '-e', code])
    return require('child_process').spawn(cmd, cmdArgs, options || {})
}

function execAsync(command, args, options) {
    return new Promise((resolve, reject) => {
        const p = exec(command, args, options)
        p.on('error', e => {
            reject(e)
        })
        p.on('exit', c => {
            resolve(c)
        })
    })
}

function formatPath(p) {
    if (p && typeof p === 'string') {
        const { sep } = path
        if (sep === '/') {
            return p
        }
        return p.replace(/\\/g, '/')
    }
    return p
}

function spinnerStart(msg, spinnerString = '|/-\\') {
    const { Spinner } = require('cli-spinner')
    const spinner = new Spinner(`${msg} %s`)
    spinner.setSpinnerString(spinnerString)
    spinner.start()
    return spinner
}

function sleep(timeout = 1000) {
    return new Promise(resolve => setTimeout(resolve, timeout))
}

module.exports = {
    exec,
    execAsync,
    isObject,
    formatPath,
    spinnerStart,
    sleep,
}
