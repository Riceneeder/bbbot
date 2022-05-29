//========core
import ConfigList from "./src/config.json"
import app from "./src/app";
//========import plugins 引入插件
import AllPlugins from "./src/pluginLoader";
//========start
const App = new app(ConfigList.Qid);
App.boot();
App.use(AllPlugins.plugins, AllPlugins.keys);




