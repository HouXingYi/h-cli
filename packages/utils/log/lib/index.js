const chalk = require('chalk')

// log.heading = 'h-cli' // 修改前缀

// log.addLevel('success', 2000, { fg: 'green', bold: true }) // 添加自定义命令

const log = {
    info: (...args) => {
        console.log(`h-cli info`, ...args.map(el => chalk.blue(el)))
    },
    success: (...args) => {
        console.log(`h-cli success`, ...args.map(el => chalk.green(el)))
    },
}

// module.exports = log
module.exports = log
