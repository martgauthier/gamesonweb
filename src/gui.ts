import {setControlsAttachment, controlsAreAttached} from "./index";

const wordsToType: string[]=["Interview", "Question", "Paketa"];

function getRandomWordToType(): string {
    return wordsToType[Math.floor(Math.random() * wordsToType.length)];//https://stackoverflow.com/questions/4550505/getting-a-random-value-from-a-javascript-array
}

window.onload=() => {
    const guiObjectEl = document.getElementById('guiIframe') as HTMLIFrameElement;
    const textInputEl=getElementById("commentaryTextInput") as HTMLInputElement;
    const commentaryFormEl=getElementById("commentaryForm");
    const commentaryToTypeEl=getElementById("commentaryToType");

    const renderCanvas=document.getElementById("renderCanvas");

    let resetDisplayAfterWrongAnswerTimeout: NodeJS.Timeout;

    commentaryFormEl.addEventListener("submit", (e) => {
        e.preventDefault();//disables reloading of iframe when submitting answer
        if(textInputEl.value===commentaryToTypeEl.textContent) {//good answer
            setTimeout(() => {
                toggleGui();
                textInputEl.style.background="";
                textInputEl.value="";
                textInputEl.disabled=false;
            }, 800);
            textInputEl.style.background="green";
            textInputEl.disabled=true;
            clearTimeout(resetDisplayAfterWrongAnswerTimeout);
        }
        else {//wrong answer
            textInputEl.style.background="red";
            textInputEl.disabled=true;
            resetDisplayAfterWrongAnswerTimeout=setTimeout(() => {
                textInputEl.style.background="";
                textInputEl.disabled=false;
                textInputEl.focus();
            }, 800);
        }
    });

    function getElementById(id: string): HTMLElement {
        return guiObjectEl.contentWindow.document.getElementById(id);
    }

    function toggleGui() {
        guiObjectEl.style.display = (guiObjectEl.style.display === 'none') ? 'flex' : 'none';
        console.log(guiObjectEl.style.display)
        if(guiObjectEl.style.display === "flex") {
            textInputEl.focus();
            commentaryToTypeEl.textContent=getRandomWordToType();
            setControlsAttachment(false);
        }
        else {
            renderCanvas.focus();
            setControlsAttachment(true);
        }
    }

    document.addEventListener('keydown', function(event) {
        if ((event.key === '>' || event.key === '<') && controlsAreAttached) {
            toggleGui();
        }
    });
};

