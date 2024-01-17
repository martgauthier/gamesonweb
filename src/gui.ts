window.onload=() => {
    const guiObjectEl = document.getElementById('guiIframe') as HTMLIFrameElement;
    const textInputEl=getElementById("commentaryTextInput");
    const commentaryFormEl=getElementById("commentaryForm");

    commentaryFormEl.addEventListener("submit", (e) => {
        e.preventDefault();//disables reloading of iframe when submitting answer
    })

    function getElementById(id: string): HTMLElement {
        return guiObjectEl.contentWindow.document.getElementById(id);
    }

    function toggleGui() {
        guiObjectEl.style.display = (guiObjectEl.style.display === 'none') ? 'flex' : 'none';
        console.log(guiObjectEl.style.display)
        if(guiObjectEl.style.display === "flex") {
            textInputEl.focus();
        }
    }

    document.addEventListener('keydown', function(event) {
        if (event.key === '>' || event.key === '<') {
            toggleGui();
        }
    });
};

