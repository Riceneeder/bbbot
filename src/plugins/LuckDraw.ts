import { Client } from "oicq";
import "oicq2-cq-enable";
//仅管理员可用//抽奖，用法：抽奖 <数字：抽几个>
export default function LuckDraw(bot: Client) {
    bot.on('message.group', async event => {
        if (event.raw_message.indexOf('抽奖') == 0 && event.sender.role != 'member' && event.raw_message != '抽奖') {
            let numOfLucker = parseInt(event.raw_message.replace('抽奖', '').trim())
            if (numOfLucker === NaN) {
                event.reply('something worry', true);
                return;
            }
            let memberMap = await bot.getGroupMemberList(event.group_id);
            let memberArry: Array<number> = [];
            memberMap.forEach((value, key) => {
                memberArry.push(key);
            })
            if (numOfLucker >= memberArry.length / 3) {
                event.reply('中奖人数过大', true);
                return;
            }
            for (let i = 0; i < numOfLucker; i++) {
                let index = Math.floor(Math.random() * memberArry.length);
                let lucker = memberArry[index];
                let result = `[CQ:at,qq=${lucker}]`;
                bot.sendGroupMsg(event.group_id,result);
                memberArry.splice(index, 1);
            }
        }
    })
}
