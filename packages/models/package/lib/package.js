/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
const { getDefaultRegistry, getNpmLatestVersion } = require('@h-cli/get-npm-info')
const { isObject, formatPath } = require('@h-cli/utils')
const pkgDir = require('pkg-dir').sync
const pathExists = require('path-exists').sync
const path = require('path')
const fse = require('fs-extra')
const npminstall = require('npminstall')

class Package {
    constructor(options) {
        if (!options) {
            throw new Error('Package类的options参数不能为空！')
        }
        if (!isObject(options)) {
            throw new Error('Package类的options参数必须为对象！')
        }
        // package的目标路径
        this.targetPath = options.targetPath
        // 缓存package的路径
        this.storeDir = options.storeDir
        // package的name
        this.packageName = options.packageName
        // package的version
        this.packageVersion = options.packageVersion
        // package的缓存目录前缀
        this.cacheFilePathPrefix = this.packageName.replace('/', '_') // @h-cli/init 转化为 @h-cli_init
    }

    async prepare() {
        if (this.storeDir && !pathExists(this.storeDir)) {
            fse.mkdirpSync(this.storeDir)
        }
        if (this.packageVersion === 'latest') {
            this.packageVersion = await getNpmLatestVersion(this.packageName)
        }
    }

    get cacheFilePath() {
        // 路径参考 _@h-cli_init@1.1.2@@h-cli
        return path.resolve(
            this.storeDir,
            `_${this.cacheFilePathPrefix}@${this.packageVersion}@${this.packageName}`
        )
    }

    // 指定version的缓存路径
    getSpecificCacheFilePath(packageVersion) {
        return path.resolve(
            this.storeDir,
            `_${this.cacheFilePathPrefix}@${packageVersion}@${this.packageName}`
        )
    }

    // 安装Package
    async install() {
        await this.prepare()
        return npminstall({
            root: this.targetPath, // 安装路径 .h-cli/dependencies
            storeDir: this.storeDir, // 实际包安装的路径 .h-cli/dependencies/node_modules
            registry: getDefaultRegistry(), // 淘宝源
            pkgs: [
                {
                    name: this.packageName,
                    version: this.packageVersion,
                },
            ],
        })
    }

    // 判断当前Package是否存在
    async exists() {
        if (this.storeDir) {
            await this.prepare()
            return pathExists(this.cacheFilePath)
        }
        // storeDir 不存在，表示指定了targetPath，不用缓存
        return pathExists(this.targetPath)
    }

    // 更新Package
    async update() {
        await this.prepare()
        // 1. 获取最新的npm模块版本号
        const latestPackageVersion = await getNpmLatestVersion(this.packageName)
        // 2. 查询最新版本号对应的路径是否存在
        const latestFilePath = this.getSpecificCacheFilePath(latestPackageVersion)
        // 3. 如果不存在，则直接安装最新版本
        if (!pathExists(latestFilePath)) {
            await npminstall({
                root: this.targetPath,
                storeDir: this.storeDir,
                registry: getDefaultRegistry(),
                pkgs: [
                    {
                        name: this.packageName,
                        version: latestPackageVersion,
                    },
                ],
            })
            this.packageVersion = latestPackageVersion
        } else {
            this.packageVersion = latestPackageVersion
        }
    }

    // 获取入口文件的路径
    getRootFilePath() {
        function _getRootFile(targetPath) {
            // 1. 获取package.json所在目录
            const dir = pkgDir(targetPath)
            if (dir) {
                // 2. 读取package.json
                const pkgFile = require(path.resolve(dir, 'package.json'))
                // 3. 寻找main/lib
                if (pkgFile && pkgFile.main) {
                    // 4. 路径的兼容(macOS/windows)
                    return formatPath(path.resolve(dir, pkgFile.main))
                }
            }
            return null
        }
        if (this.storeDir) {
            return _getRootFile(this.cacheFilePath)
        }
        return _getRootFile(this.targetPath)
    }
}

module.exports = Package
