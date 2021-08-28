#! /usr/bin/env node

const debug = require('debug')
const log = require('@h-cli/log')
const importLocal = require('import-local')

log.info('欢迎使用h-cli')

// 如果你全局和本地都有该命令时优先执行你本地的命令
if (importLocal(__filename)) {
    log.info('cli', '正在使用 h-cli 本地版本')
} else {
    debug('process.argv')(process.argv)
    // eslint-disable-next-line global-require
    require('../lib')(process.argv.slice(2))
}
