import requireAll from "require-all";
const plugins = requireAll({
    dirname: __dirname + "/plugins",
    recursive:false
});
const keys = Object.keys(plugins);
var pluginsInfo = new Map;
keys.forEach(key => {
    let Key: string = `${key}`;
    pluginsInfo.set(Key, plugins[key].info);
});
const AllPlugins = {plugins, keys, pluginsInfo};
export default AllPlugins;