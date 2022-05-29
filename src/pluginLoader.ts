import requireAll from "require-all";
const plugins = requireAll({
    dirname: __dirname + "/plugins",
});
const keys = Object.keys(plugins);
const AllPlugins = {plugins, keys};
export default AllPlugins;