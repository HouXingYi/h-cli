const fs = require('fs')
const path = require('path')
const Command = require('@h-cli/command')
const startServer = require('@h-cli/ui-server/bin/www')

class UiCommand extends Command {
    init() {
        console.log('uiCommand init')
    }

    async exec() {
        console.log('uiCommand exec')
        startServer()
    }
}

function init(argv) {
    return new UiCommand(argv)
}

module.exports = init
module.exports.UiCommand = UiCommand
