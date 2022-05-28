import axios from "axios";
import { Client } from "oicq";
//==========配置区===============
const uid = 123123123123;
const token = '123123123123123';
//==============================
const api = 'https://api.wanshiwu.asia/api/search';
export default function searchForQuestions(bot: Client) {
    bot.on('message', event => {
        if (event.raw_message.indexOf('搜题') == 0 && event.raw_message != '搜题' && event.sender.user_id == 845541909) {
            let question = event.raw_message.replace('搜题', '').trim();
            axios.get(api, {
                params: {
                    uid: uid,
                    token: token,
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