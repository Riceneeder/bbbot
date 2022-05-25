# 易于编写的QQ机器人，使用[oicq](https://github.com/takayama-lily/oicq)协议库，功能抽离为单独插件
项目地址（GitHub）：[https://github.com/Riceneeder/bbbot](https://github.com/Riceneeder/bbbot)
### 运行环境:
+ NodeJs (v16.13.1+)
---
## 快速开始
### clone或下载仓库源码
### 在命令行中运行以下命令安装必要依赖
```
npm i ts-node typescript yarn pm2 -g
```

### 依赖安装完成后进入目录安装QQ机器人依赖
```
cd bbbot/
yarn
```
### 全部依赖安装完成后修改src/config.json中的QQ账号

#### **运行测试**（第一次运行或每次修改QQ账号后请使用此命令，ctrl+c停止运行）
```
yarn dev    
```
#### **生产环境运行**
```
yarn start
```
#### **生产环境重启**
```
yarn restart
```
#### **生产环境停止**
```
yarn stop
```
---
## 插件的启用

> 所有插件均存放在src/plugins
#### 插件启用

**第一步** 在index.ts中引入插件
```
import plugin1 from "./src/plugins/plugin1";
```
**第二步** 在index.ts中启用插件
```
App.use(plugin1);
```
---
## 插件的编写
>**所有插件的文件名应与插件暴露的方法名保持一致**
+ 使用JavaScript和typescript均可，推荐使用typescript以获得更好的提示
+ 写法参考 src/plugins/echo.ts
+ QQ协议库API参看[OICQ](https://github.com/takayama-lily/oicq#api-reference)
