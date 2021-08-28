

# h-cli

## 开发

### 根目录依赖安装

```
yarn || npm i
```

安装 lerna ，eslint 和 husky

ui-fe子目录采用自己的eslint规则（react + ts），需要把ui-fe项目作为根目录在vscode中打开

### 批量安装子目录依赖

```
// 删除lock
lerna exec -- rm -rf yarn.lock
lerna exec -- rm -rf package-lock.json

// 批量安装依赖
lerna exec -- npm i
```

### 调试 - link cli 到全局

进入cli子目录 cd packages\core\cli\

执行 npm link --force

即可全局访问 h-cli

### 调试 - 具体命令

h-cli `<init>` -tp `<init命令的地址>`

例子：
h-cli ui -tp H:\code\gitlab\h-cli\packages\commands\ui\ui-command






































