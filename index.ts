//========core
import ConfigList from "./src/config.json"
import app from "./src/app";
//========import plugins 引入插件
import echo from "./src/plugins/echo";
import ping from "./src/plugins/ping";
import ICP from "./src/plugins/ICP";
import LuckDraw from "./src/plugins/LuckDraw";
import webShotCut from "./src/plugins/webShotCut";  //此插件需配置token，详细请进入插件文件src/plugins/webShotCut.ts
import welcome from "./src/plugins/welcome";
import song from "./src/plugins/song";
import searchForQuestions from "./src/plugins/searchForQuestions";
import site from "./src/plugins/site";
//========start
const App = new app(ConfigList.Qid);
App.boot();
//========此处可以添加插件
const plugins = [
    echo, 
    ping, 
    ICP, 
    LuckDraw, 
    welcome, 
    song, 
    searchForQuestions, 
    site,
    // webShotCut, //此插件需配置token，详细请进入插件文件src/plugins/webShotCut.ts
];
//========use plugins 启用插件
App.use(plugins);
