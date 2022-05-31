import { Client, segment } from "oicq";
//=============配置区========================
const welcome_msg = '这是自定义入群欢迎内容，使用\n进行换行';
//==========================================
module.exports = {
    fun: (bot: Client) => {
        bot.on('notice.group.increase', event => {
            let who = event.user_id;
            let who_name = event.nickname;
            let which_group = event.group_id;
            let msg = segment.at(who, `欢迎入群，${who_name}\n${welcome_msg}`);
            bot.sendGroupMsg(which_group, msg);
        });
    },
    info: {
        name: 'bbbot-plugin-welcome',
        description: '入群欢迎',
        howtouse: '无',   
    }
};