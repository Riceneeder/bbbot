import { Client } from "oicq";
//输出文字，用法：echo <一段话>
export default function echo(bot:Client){
    bot.on('message',(event)=>{
        if(event.raw_message.indexOf('echo') == 0){
            let reply = event.raw_message.replace('echo','');
            event.reply(reply);
        }
    })
}
