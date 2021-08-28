const CracoLessPlugin = require("craco-less");

module.exports = {
    devServer: {
        port: 8888,
    },
    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        modifyVars: {
                            "@primary-color": "rgb(0, 82, 204)",
                            "@font-size-base": "16px",
                        },
                        javascriptEnabled: true,
                    },
                },
            },
        },
    ],
};
