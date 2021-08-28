/* eslint-disable no-use-before-define */
/* eslint-disable no-param-reassign */
const path = require('path')
const fs = require('fs-extra')

let cwd = process.cwd()

function normalize(value) {
    if (value.length === 1) return value
    const lastChar = value.charAt(value.length - 1)
    if (lastChar === path.sep) {
        value = value.substr(0, value.length - 1)
    }
    return value
}

const cwdVal = {
    get: () => cwd,
    set: value => {
        value = normalize(value)
        if (!fs.existsSync(value)) return
        cwd = value
        try {
            process.chdir(value)
        } catch (err) {
            console.log('err', err)
        }
    },
}

module.exports = cwdVal
