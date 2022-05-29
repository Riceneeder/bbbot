import axios from "axios";
import { Client } from "oicq";
//网站收录查询，用法： 收录 <网站名>
module.exports = {
    fun: (bot: Client) => {
        bot.on('message', (event) => {
            if (event.raw_message.indexOf('搜题') == 0 && event.raw_message != '搜题' && event.sender.user_id == 845541909) {
                let question = event.raw_message.replace('搜题', '').trim();
                axios.get('https://api.wanshiwu.asia/api/search', {
                    params: {
                        uid: 123123123123,
                        token: '123123123123123',
                        question: question
                    }
                }).then(
                    re => {
                        let result = `答案：${re.data.data[0].details.answer}\n可信度：${re.data.data[0].score}`;
                        event.reply(result, true);
                    }
                ).catch(
                    err => {
                        event.reply('failed,something goes wrong', true);
                    }
                )
            }
        })
    }
};