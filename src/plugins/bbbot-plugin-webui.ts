
import { Client } from "oicq";
import { WebSocketServer } from "ws";
import { version } from "os";
import { versions } from "process";
import { readFileSync } from "fs";
import path from "path";
import express from "express";
// 构建一个express实例
const webServer = express();
webServer.use(express.static(path.join(__dirname, "public")));
// 初始化网页
const packagePath = path.join(__dirname, '../../package.json');
const packageJson = JSON.parse(readFileSync(packagePath, "utf8"));
const systemInfo = {
    OS:version(),
    Node:versions.node,
    AppVersion:packageJson.version,
};
// 创建 websocket 服务器 监听在 3000 端口
const wss = new WebSocketServer({ port: 3000 })
// log格式化
function initLog(msgTime:string,msgType: string, msg: string,from: string) {
    let log = `\x1B[32m${msgTime}[${msgType}]-from-[${from}]:\x1B[0m${msg}`;
    return log;
}

module.exports = {
    fun: (bot: Client, pluginsInfo: Map<string, any>) => {
        let plugin_list:Array<{}> = [];
        for (let [key, value] of pluginsInfo) {
            plugin_list.push({
                "name":value.name,
                "description":value.description,
                "howtouse":value.howtouse});
        }
        // 启动网页
        webServer.listen(3001);
        bot.logger.mark("---------------BBBot-WebUI---------------");
        bot.logger.mark("已启动,端口为3001,本地访问地址为http://localhost:3001");
        bot.logger.mark("-----------------------------------------");
        webServer.get("/", (req, res) => {
            res.send('./public/index.html');
        }
        );  
        // 当有新的客户端连接时
        wss.on('connection', (ws) => {
            bot.logger.mark('WebSocket connected');
            let init =JSON.stringify({
                type: 'init',
                systemInfo,
                pluginsInfo: plugin_list,
                botName:bot.nickname,
            });
            ws.send(init);

            bot.on('message.group', (event) => {
                let msgType = event.message_type;
                let msg = event.raw_message;
                let msgTime = new Date().toLocaleTimeString();
                let from = event.group_name;
                let log = initLog(msgTime,msgType,msg,from);
                let ws_msg = JSON.stringify({
                    type: 'log',
                    log
                });
                ws.send(ws_msg);
            });

            bot.on('message.private', (event) => {
                let msgType = event.message_type;
                let msg = event.raw_message;
                let msgTime = new Date().toLocaleTimeString();
                let from = event.sender.nickname;
                let log = initLog(msgTime,msgType,msg,from);
                let ws_msg = JSON.stringify({
                    type: 'log',
                    log
                });
                ws.send(ws_msg);
            });
        });
    },
    info: {
        name: 'bbbot-plugin-webui',
        description: '在网页查看机器人运行信息',
        howtouse: '访问 http://机器人运行的服务器IP:3001/',
    }
}
