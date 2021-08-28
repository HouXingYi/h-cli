const templateList = [
    {
        name: 'React + TS + Redux 模板',
        npmName: '@h-cli-template/react-ts-redux',
        installCommand: 'yarn',
        startCommand: 'npm run start',
        type: 'normal',
        version: '1.0.9',
    },
    {
        name: 'Vue2 标准模板',
        npmName: '@h-cli-template/vue2-template',
        installCommand: 'yarn',
        startCommand: 'npm run serve',
        type: 'normal',
        version: '1.0.9',
    },
    {
        name: 'Vue3 标准模板',
        npmName: '@h-cli-template/vue3-template',
        installCommand: 'yarn',
        startCommand: 'npm run serve',
        type: 'normal',
        version: '1.0.9',
    },
]

function getTemplate() {
    return templateList
}

module.exports = getTemplate
