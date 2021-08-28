

# h-cli

## 开发

### 根目录依赖安装

```
yarn || npm i
```

安装 lerna ，eslint 和 husky

### 批量安装子目录依赖

```
// 批量安装依赖
lerna bootstrap

// link
lerna link
```

### 调试 - link cli 到全局

进入cli子目录 cd packages\core\cli\

执行 npm link --force

即可全局访问 h-cli

### 调试 - 具体命令

h-cli `<init>` -tp `<init命令的地址>`

例子：
h-cli ui -tp H:\code\gitlab\h-cli\packages\commands\ui\ui-command






































