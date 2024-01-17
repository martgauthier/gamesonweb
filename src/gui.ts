function openOrCloseGui() {
    let guiObjectEl = document.getElementById('guiIframe') as HTMLIFrameElement;
    let gui = guiObjectEl.contentWindow.document.getElementById("gui");
    console.log(gui);
    gui.style.display = gui.style.display === 'none' ? 'flex' : 'none';
}

document.addEventListener('keydown', function(event) {
    if (event.key === '>' || event.key === '<') {
        openOrCloseGui();
    }
});