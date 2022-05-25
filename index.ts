//core
import ConfigList from "./src/config.json"
import app from "./src/app";
//import plugins
import echo from "./src/plugins/echo";
import ping from "./src/plugins/ping";
import ICP from "./src/plugins/ICP";
import LuckDraw from "./src/plugins/LuckDraw";
import webShotCut from "./src/plugins/webShotCut";
//start
const App = new app(ConfigList.Qid);
App.boot();
//use plugins
App.use(echo);
App.use(ping);
App.use(ICP);
App.use(LuckDraw);
App.use(webShotCut);
