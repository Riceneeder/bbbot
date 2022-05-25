import { createClient, Config, Client } from "oicq";

export default class app {
    constructor(Qid: number) {
        this.Qid = Qid;
        this.config = {
            platform: 4,
            cache_group_member: false
        }
        this.bot = createClient(Qid, this.config);
    }
    config: Config;
    Qid: number;
    bot: Client;

    boot() {
        this.bot.login();
        this.bot.on("system.login.qrcode", function (e) {
            let getQrcodeResult = setInterval(async () => {
                let result = await this.queryQrcodeResult();
                if (result.retcode == 0) {
                    this.login();
                    clearInterval(getQrcodeResult);
                }
            }, 1500);
        })
    }

    use(plugin:Function){
        plugin(this.bot);
    }
}