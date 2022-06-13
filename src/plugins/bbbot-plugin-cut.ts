import axios from "axios";
import { Client, segment } from "oicq";
//仅管理员可用//网页截屏，用法：cut <网址>
//需要申请token，申请地址：https://www.screenshotmaster.com
//=================配置区=================
const token = 'your token';
const width = 800; //截屏宽度 px
const height = 800; //截屏高度 px
//=======================================
const baseUrl = 'https://www.screenshotmaster.com/api/v1/screenshot';
const output = 'json';
const zone = 'hk';

function GetUrlInString(s: string): RegExpMatchArray | null {
    let reg = /(https?|http|ftp|file):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/g;
    let Url = s.match(reg);
    return Url;
}
module.exports = {
    fun: (bot: Client) => {
        bot.on('message.group', event => {
            if (event.raw_message.indexOf('cut') == 0 && event.raw_message != 'cut' && event.sender.role != 'member') {
                let Url = GetUrlInString(event.raw_message);
                if (Url != null) {
                    for (let i = 0; i < Url.length; i++) {
                        let url = Url[i];
                        axios.get(`${baseUrl}`, {
                            params: {
                                token: token,
                                width: width,
                                height: height,
                                output: output,
                                zone: zone,
                                url: url,
                            }
                        }).then(re => {
                            if (re.data.code == 200) {
                                let shotcut = re.data.data.url;
                                let reply = segment.image(shotcut);
                                event.reply(reply, true);
                            }
                        }).catch(err => {
                            event.reply('failed,something goes wrong', true)
                        })
                    }
                }
            }
        })
    },
    info: {
        name: 'bbbot-plugin-cut',
        description: '网页截屏(管理员/群主可用)',
        howtouse: 'cut <网址>',
    }
}
