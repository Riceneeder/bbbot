import axios from "axios";
import { Client } from "oicq";
module.exports = {
    fun: (bot: Client) => {
        bot.on('message', (event) => {
            if (event.raw_message.indexOf('备案') == 0) {
                let domain = event.raw_message.replace('备案', '').trim();
                axios.get('https://api.dzzui.com/api/icp', {
                    params: {
                        domain: domain
                    }
                }).then((re) => {
                    if (re.data.code == 1) {
                        let result = `${re.data.name}(${re.data.nature})\n${re.data.icp}·${re.data.sitename}\n${re.data.time}`;
                        event.reply(result, true);
                    } else {
                        let result = `${re.data.msg}`
                        event.reply(result, true);
                    }
                }).catch((err) => {
                    let result = 'failed,something goes wrong';
                    event.reply(result, true);
                })
            }
        })
    },
    info: {
        name: 'bbbot-plugin-icp',
        description: '查询备案信息',
        howtouse: '备案 <域名>',
    }
};
