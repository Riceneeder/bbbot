const ws = new WebSocket("ws://localhost:3000");
ws.onopen = function () {
  console.log("连接已建立...");
};
ws.onclose = function () {
  console.log("连接已关闭...");
};
ws.onmessage = function (evt) {
  var received_msg = evt.data;
  var msg = JSON.parse(received_msg);
  var type = msg.type;
  switch (type) {
    case "log":
      log(msg.log);
      break;
    case "init":
      infoInit(msg.systemInfo, msg.pluginsInfo, msg.botName);
      break;
  }
};
function log(log) {
  term.write(`${log}\n`);
}
function infoInit(systemInfo, pluginsInfo, botName) {
  term.write(
    `\x1B[1m[INIT]BBBot正在运行，版本:\x1B[0m${systemInfo.AppVersion}\n`
  );
  document.getElementById("OS").innerText = "操作系统：" + systemInfo.OS;
  document.getElementById("runtime").innerText =
    "运行环境：Node v" + systemInfo.Node;
  document.getElementById("version").innerText =
    "软件版本：" + systemInfo.AppVersion;
  document.getElementById("botName").innerText = botName;
  console.log(pluginsInfo);
  var plugins = `<div class="mdui-typo-headline-opacity">启用的插件</div>
  <div class="mdui-divider"></div>`;
  for (var i = 0; i < pluginsInfo.length; i++) {
    plugins += `
        <div class="mdui-chip">
            <span class="mdui-chip-icon">
                <i class="mdui-icon material-icons">extension</i>
            </span>
            <span class="mdui-chip-title" onclick="mdui.alert('${pluginsInfo[i].description}，用法：${pluginsInfo[i].howtouse}')">${pluginsInfo[i].name}</span>
        </div>
        `;
  }
  document.getElementById("plugins").innerHTML = plugins;
}
function refresh() {
  window.location.reload();
}