function openOrCloseGui() {
    var gui = document.getElementById('gui');
    gui.style.display = gui.style.display === 'none' ? 'flex' : 'none';
}

document.addEventListener('keydown', function(event) {
    if (event.key === '>' || event.key === '<') {
        openOrCloseGui();
    }
});