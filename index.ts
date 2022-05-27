//========core
import ConfigList from "./src/config.json"
import app from "./src/app";
//========import plugins
import echo from "./src/plugins/echo";
import ping from "./src/plugins/ping";
import ICP from "./src/plugins/ICP";
import LuckDraw from "./src/plugins/LuckDraw";
// import webShotCut from "./src/plugins/webShotCut";  此插件需配置token，详细请进入插件文件src/plugins/webShotCut.ts
import welcome from "./src/plugins/welcome";
import song from "./src/plugins/song";
import searchForQuestions from "./src/plugins/searchForQuestions";
//========start
const App = new app(ConfigList.Qid);
App.boot();
//========use plugins
// App.use(webShotCut); 此插件需配置token，详细请进入插件文件src/plugins/webShotCut.ts
App.use(echo);
App.use(ping);
App.use(ICP);
App.use(LuckDraw);
App.use(welcome);
App.use(song);
App.use(searchForQuestions);