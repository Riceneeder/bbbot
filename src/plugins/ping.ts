import { exec } from "child_process";
import { Client } from "oicq";
//ping，用法：ping <网址>
export default function ping(bot:Client){
    bot.on('message.group',(event)=>{
        if(event.raw_message.indexOf('ping') == 0 && event.raw_message != 'ping' && event.sender.role!='member'){
            let target = event.raw_message.replace('ping','').replace(/s*/g,'');
            exec(`ping  -c 5 -i 0.6 ${target}`,(err,stdout)=>{
                event.reply(err ? 'failed,something goes wrong' : stdout.trim(),true);
            });
        }
    });
}
