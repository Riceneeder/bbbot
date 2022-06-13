import { createClient, Config, Client } from "oicq";

export default class app {
    constructor(Qid: number) {
        this.Qid = Qid;
        this.config = {
            platform: 5,
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

    use(plugins: { [key: string]: any; }, keys: string[], pluginsInfo: Map<string, any>) {
        keys.forEach(key => {
            let plugin_name = pluginsInfo.get(key).name;
            this.bot.logger.mark('启用插件：' + plugin_name);
            plugins[key].fun(this.bot, pluginsInfo);
        })
    }

}