import {
    setControlsAttachment,
    controlsAreAttached,
    killRunnerInFrontOfCommentator
} from "./index";

const wordsToType: string[]=["Interview", "Question", "Paketa", "La gadji c'est un Paketa ?", "Nelson MONFORT", "Alors ? ca va"];

function getRandomWordToType(): string {
    return wordsToType[Math.floor(Math.random() * wordsToType.length)];//https://stackoverflow.com/questions/4550505/getting-a-random-value-from-a-javascript-array
}

window.onload=() => {
    const guiObjectEl = document.getElementById('guiIframe') as HTMLIFrameElement;
    const textInputEl=getElementById("commentaryTextInput") as HTMLInputElement;
    const commentaryFormEl=getElementById("commentaryForm");
    const commentaryToTypeEl=getElementById("commentaryToType");

    const renderCanvas=document.getElementById("renderCanvas");

    commentaryFormEl.addEventListener("submit", (e) => {
        e.preventDefault();//disables reloading of iframe when submitting answer
        if(textInputEl.value===commentaryToTypeEl.textContent) {//good answer
            textInputEl.style.background="green";
            textInputEl.disabled=true;

            setTimeout(() => {
                toggleGui();
                textInputEl.style.background="";
                textInputEl.value="";
                textInputEl.disabled=false;
                killRunnerInFrontOfCommentator();
            }, 800);
        }
        else {//wrong answer
            textInputEl.style.background="red";
            textInputEl.disabled=true;

            setTimeout(() => {
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

