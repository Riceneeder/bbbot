import { Client } from "oicq";

module.exports = {
    fun: (bot: Client, pluginsInfo: Map<string, any>) => {
        bot.on("message", (event) => {
            switch (event.raw_message.slice(0, 4)) {
                case "插件列表":
                    let plugin_list = "";
                    for (let [key, value] of pluginsInfo) {
                        plugin_list += `${value.name}\n`;
                    }
                    event.reply(plugin_list);
                    break;
                case "插件说明":
                    let plugin_name = event.raw_message.replace("插件说明", "").trim();
                    let plugin_info = pluginsInfo.get(plugin_name);
                    if (plugin_info) {
                        event.reply(`插件名：${plugin_info.name}\n描述：${plugin_info.description}\n用法：${plugin_info.howtouse}`);
                    } else {
                        event.reply("插件不存在");
                    }
                    break;
            }
        });
    },
    info: {
        name: 'bbbot-plugin-controller',
        description: '插件信息管理',
        howtouse: '插件列表 或者 插件说明 <插件名>',
    }
};