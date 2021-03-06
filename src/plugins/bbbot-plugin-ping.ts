import { exec } from "child_process";
import { Client } from "oicq";
//仅管理员可用//ping，用法：ping <网址>
module.exports = {
    fun: (bot: Client) => {
        bot.on('message.group', (event) => {
            if (event.raw_message.indexOf('ping') == 0 && event.raw_message != 'ping' && event.sender.role != 'member') {
                let target = event.raw_message.replace('ping', '').replace(/s*/g, '');
                exec(`ping  -c 5 -i 0.6 ${target}`, (err, stdout) => {
                    event.reply(err ? 'failed,something goes wrong' : stdout.trim(), true);
                });
            }
        });
    },
    info: {
        name: 'bbbot-plugin-ping',
        description: 'ping(管理员/群主可用)',
        howtouse: 'ping <网址>',
    }
}

