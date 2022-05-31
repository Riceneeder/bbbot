import { Client } from "oicq";
//输出文字，用法：echo <一段话>
module.exports = {
    fun:(bot:Client)=>{
        bot.on('message',(event)=>{
            if(event.raw_message.indexOf('echo') == 0){
                let reply = event.raw_message.replace('echo','');
                event.reply(reply);
            }
        })
    },
    info:{
        name:'bbbot-plugin-echo',
        description:'输出文字',
        howtouse:'echo <一段话>',
    }
}
