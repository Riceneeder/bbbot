import { Client } from "oicq";

var nextImgNeedOcr = false;
function OCR(bot: Client) {
    bot.on('message.group', async (event) => {
        if (event.raw_message == 'ocr') {
            event.reply('请发送需要OCR的图片');
            nextImgNeedOcr = true;
        }

        if (event.message[0].type == 'image' && nextImgNeedOcr) {
            nextImgNeedOcr = false;
            try {
                let imgOcrResult = await bot.imageOcr(event.message[0].url == undefined ? '' : event.message[0].url);
                let reply = `语言:${imgOcrResult.language}\n结果:\n`;
                imgOcrResult.wordslist.forEach(word => {
                    reply += `${word.words} (识别可信度：${word.confidence})\n` 
                })
                event.reply(reply, true);
            } catch (error) {
                event.reply(`OCR识别失败，请检查图片是否正确，或者重试`);
            }
        }
    });
}

module.exports = {
    fun: OCR,
    info: {
        name: 'bbbot-plugin-ocr',
        description: 'OCR图片识别',
        howtouse: 'ocr',
    }
}