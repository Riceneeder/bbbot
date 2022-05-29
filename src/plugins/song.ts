import axios from "axios";
import { Client } from "oicq";
//网易云点歌，用法： 点歌 <歌名>
const baseUrl = 'https://netease-cloud-music-api-mocha-five.vercel.app/cloudsearch?limit=1&keywords=';
module.exports = {
    fun: (bot: Client) => {
        bot.on('message.group', (event) => {
            if (event.raw_message.indexOf('点歌') == 0 && event.raw_message != '点歌') {
                let song_name = event.raw_message.replace('点歌', '').trim();
                axios.get(`${baseUrl}${song_name}`).then(
                    re => {
                        let song_id = re.data.result.songs[0].id;
                        event.group.shareMusic('163', song_id);
                    }
                ).catch(
                    err => {
                        let result = 'failed,something goes wrong';
                        event.reply(result, true);
                    }
                )
            }
        })
    }
};