import axios from 'axios';
import { Client } from 'oicq';
module.exports = {
    fun: (bot: Client) => {
        bot.on('message', event => {
            if (event.raw_message.indexOf('收录') == 0 && event.raw_message != '收录') {
                let site_name = event.raw_message.replace('收录', '').trim();
                let api = 'https://tenapi.cn/site/';
                axios.get(api, { params: { url: site_name } }).then(
                    re => {
                        let _result = re.data.data;
                        let result = `收录结果：\nbaidu:${_result.baidu != null ? _result.baidu : '无'}\nhaoso:${_result.haoso != null ? _result.haoso : '无'}\nsougou:${_result.sogou != null ? _result.sogou : '无'}`;
                        event.reply(result, true);
                    }
                ).catch(
                    err => {
                        let result = 'failed,something goes wrong';
                        event.reply(result, true);
                    }
                )
            }
        })
    },
    info: {
        name: 'bbbot-plugin-site',
        description: '网站收录查询',
        howtouse: '收录 <网站名>',
    }
}