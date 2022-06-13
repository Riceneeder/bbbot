var lockReconnect = false;
var ws;
var tt;
createWS();
function createWS() {
  try {
    ws = new WebSocket("ws://localhost:9527");
    wsInit();
  } catch (e) {
    console.log(e);
    wsReconnect();
  }
}
function wsInit() {
  ws.onclose = (evt) => {
    console.log("断线...");
    log(`\x1B[31m[ERROR]\x1B[0m WebSocket已断线…………`);
    // if (evt.code != 1006) {
    wsReconnect();
    // }
  };
  ws.onerror = (evt) => {
    console.log("错误...");
    log(`\x1B[31m[ERROR]\x1B[0m WebSocket错误…………`);
  };
  ws.onopen = function () {
    console.log("连接已建立...");
    log(`\x1B[1m[INIT] 远端已连接`)
  };
  ws.onmessage = (evt) => {
    onMessage(evt);
  };
}
function wsReconnect() {
  console.log("尝试重连...");
  log(`\x1B[33m[WARING]\x1B[0m 尝试重连…………`);
  if (lockReconnect) {
    return;
  }
  lockReconnect = true;
  tt && clearTimeout(tt);
  tt = setTimeout(() => {
    createWS();
    lockReconnect = false;
  }, 2000);
}
function onMessage(evt) {
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
}
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
