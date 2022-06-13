import axios from "axios";
import { Client, segment, Sendable } from "oicq";

const PixivApi = 'https://api.lolicon.app/setu/v2';
function isR18(r18: boolean, url: string) {
    let sendM: Sendable;
    r18 ? sendM = segment.flash(url) : sendM = segment.image(url);
    return sendM;
}

module.exports = {
    fun: (bot: Client) => {
        bot.on("message", (event) => {
            let raw_message = event.raw_message;
            raw_message === 'pixiv' ? axios.get(PixivApi, {
                params: {
                    r18: 2,
                    size: 'small',
                }
            }).then(res => {
                let imgUrl = res.data.data[0].urls.small;
                imgUrl = imgUrl.replace('i.pixiv.cat', 'i.pixiv.re');
                let msg = isR18(res.data.data[0].r18, imgUrl);
                event.reply(msg);
            }).catch(err => {
                event.reply('pixiv api error');
            })
                : null;
        });
    },
    info: {
        name: 'bbbot-plugin-pixiv',
        description: 'pixiv随机图片',
        howtouse: 'pixiv',
    }
}
