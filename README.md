# BBBOT

# 易于编写的 QQ 机器人，使用[oicq](https://github.com/takayama-lily/oicq)协议库，功能抽离为单独插件

项目地址（GitHub）：[https://github.com/Riceneeder/bbbot](https://github.com/Riceneeder/bbbot)

### 运行环境:

- NodeJs (v16.13.1+)

---

## 快速开始

### clone 或下载仓库源码

### 在命令行中运行以下命令安装必要依赖

```
npm i typescript yarn pm2 -g
```

### 依赖安装完成后进入目录安装 QQ 机器人依赖

```
cd bbbot/
yarn
```

### 全部依赖安装完成后修改 src/config.json 中的 QQ 账号

#### **运行测试**（第一次运行或每次修改 QQ 账号后请使用此命令，ctrl+c 停止运行）

```
yarn dev
```

#### **运行**

```
yarn start
```

#### **重启**

```
yarn restart
```

#### **停止**

```
yarn stop
```

---

## 插件的启用

**将插件放入 src/plugins 即可自动启用，每次改变需手动重启机器人**

---

## 插件的编写

**插件的编写需遵循以下规范**

```TS
import { Client } from "oicq"; // 引入类型检查
module.exports = {
    fun:(bot:Client, pluginsInfo: Map<string, {// 插件的主函数,第一个函数参数为机器人实例，第二个参数为插件信息
        name: string,
        description: string,
        howtouse: string,
    }>)=>{ 
        // 插件的主函数内容
    },
    info:{ // 插件的信息
        name:'bbbot-plugin-<your plugin name>', // 插件的名称，插件名称应当与插件文件名称一致，请勿使用中文，确保插件名称唯一
        description:'describe your plugin', // 插件的描述
        howtouse:'how to use your plugin', // 插件的使用方法
    }
}
```

**pluginsInfo 的结构**

```TS
{
    'bbbot-plugin-<your plugin name>' => {
        name:'bbbot-plugin-<your plugin name>',
        description:'describe your plugin',
        howtouse:'how to use your plugin'
    }
}
```

- 使用 JavaScript 和 typescript 均可，推荐使用 typescript 以获得更好的提示
- 机器人实例的 API 参看[OICQ](https://github.com/takayama-lily/oicq#api-reference)
