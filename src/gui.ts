function openOrCloseGui() {
    let guiObjectEl = document.getElementById('guiIframe') as HTMLIFrameElement;
    guiObjectEl.style.display = (guiObjectEl.style.display === 'none') ? 'flex' : 'none';
    console.log(guiObjectEl.style.display)
}

document.addEventListener('keydown', function(event) {
    if (event.key === '>' || event.key === '<') {
        openOrCloseGui();
    }
});