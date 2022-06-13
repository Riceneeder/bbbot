const term = new Terminal({
    rendererType: 'dom',
    fontFamily: 'monospace',
    convertEol: true,
    rows: 15,
    disableStdin: true,
    allowTransparency: true,
    theme: {
        background: 'rgba(0, 0, 0, 0.2)',
    },
    cursorBlink: false,
    cursorStyle: 'bar',
    cursorWidth: '0',
}),
fitAddon = new FitAddon.FitAddon();
term.loadAddon(fitAddon);
term.open(document.getElementById('terminal'));
fitAddon.fit();
// term.write(`log:[]-----------------------------------------------------\n`);
setInterval(() => {
    fitAddon.fit();
}, 100);