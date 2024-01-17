const D: boolean=true;//D for debugger, CHANGE IF YOU WANT TO DEBUG
const setCamPositionBehindCommentator:boolean = true;//change if you want to change default camera position


import {HemisphericLight} from '@babylonjs/core/Lights/hemisphericLight';

import "babylonjs-loaders";

import "@babylonjs/loaders/glTF"

import {v3} from "./utils/shortcuts";

import {startEngine, startScene} from "./utils/sceneutilities";
import {
    Animation,
    AssetContainer, KeyboardEventTypes,
    Mesh,
    MeshBuilder,
    SceneLoader,
    UniversalCamera,
} from "@babylonjs/core";

import RunningGuy from "./RunningGuy";
import Commentator from './Commentator';


Animation.AllowMatricesInterpolation = true;//permet de fluidifier les animations. Si false, le personnage ne suivrait QUE les clés de mouvement, sans fluidité entre les clés

const [canvas, engine] = startEngine();
let scene = startScene(engine);

/**
 *  let univCamera = new UniversalCamera("univCam", v3(8, 4, 6));
 * univCamera.target=Vector3.Zero();
 */

let followCamera = new UniversalCamera("followCam", v3(10, 4, -10), scene);


if(D) followCamera.attachControl(true);//can move cam only if debugging mode

let hemiLight = new HemisphericLight("hemiLight", v3(0, 1, 0));

let ground = MeshBuilder.CreateGround("ground", {
    width: 60,
    height: 8
});

let keysPressed: {[key: string]: boolean} = {
    left: false,
    right: false
};

let controlsAreAttached: boolean=true;

SceneLoader.LoadAssetContainerAsync("", RunningGuy.MODEL_SRC).then((container) => onDudeMeshLoaded(container));


function onDudeMeshLoaded(dudeModelDataContainer: AssetContainer): void {
    let mainEntries = dudeModelDataContainer.instantiateModelsToScene();
    let mainMesh = mainEntries.rootNodes[0] as Mesh;

    let dudes: RunningGuy[]=[new RunningGuy(mainEntries, scene)];

    mainMesh.position.z=-2*RunningGuy.DEFAULT_SPACE_BETWEEN_RUNNERS;

    for(let i=1; i < 5; i++) {
        dudes[i]=new RunningGuy(dudeModelDataContainer.instantiateModelsToScene(), scene);

        dudes[i].getMesh().position.z=mainMesh.position.z+i*RunningGuy.DEFAULT_SPACE_BETWEEN_RUNNERS;
    }



    setTimeout(() => {
        dudes[0].changeAnimSpeed(2, "divide");
    }, 2000);


    scene.onBeforeRenderObservable.add(() => {//avant chaque rendu de frame (donc avant chaque frame)
        dudes.forEach((dude: RunningGuy) => {
            dude.getMesh().movePOV(0, 0, dude.speed);//la fonction movePOV déplace le personnage PAR RAPPORT à son point de vue (voir doc de la fonction)
        });
    });


    const resetButton = document.getElementById("resetButton"); resetButton.addEventListener("click", resetModelPositions);

    function resetModelPositions(): void {

    dudes.forEach((dude: RunningGuy) => {
        dude.getMesh().position = v3(0, dude.getMesh().position.y,dude.getMesh().position.z);
        dudes[0].changeAnimSpeed(0, "reset");
    });
    }
}

SceneLoader.LoadAssetContainerAsync("", Commentator.MODEL_SRC).then((container) => onCommentatorMeshLoaded  (container));

function onCommentatorMeshLoaded(commentatorModelDataContainer: AssetContainer): void {
    let mainEntries = commentatorModelDataContainer.instantiateModelsToScene();
    let commentator:Commentator = new Commentator(mainEntries, scene);

    commentator.getMesh().position.x = 3.5; 

    scene.onBeforeRenderObservable.add(() => {
        if(setCamPositionBehindCommentator) {
            followCamera.position = commentator.getMesh().position.add(v3(10, 4, 4));
        }
        else {
            followCamera.position = commentator.getMesh().position.add(v3(-10, 10, 0));
        }
        followCamera.setTarget(commentator.getMesh().position);
        commentator.getMesh().movePOV(0, 0, -commentator.speed);

        if(keysPressed.left) {
            if (setCamPositionBehindCommentator) {
                commentator.moveToLeftPOV();
            } else {
                commentator.moveToRightPOV();
            }
        }
        if(keysPressed.right) {
            if (setCamPositionBehindCommentator) {
                commentator.moveToRightPOV();
            } else {
                commentator.moveToLeftPOV();
            }
        }
    });
    const resetButton = document.getElementById("resetButton"); resetButton.addEventListener("click", resetModelPositions);

    function resetModelPositions(): void {
        commentator.getMesh().position = v3(Commentator.DEFAULT_DISTANCE_TO_RUNNERS, commentator.getMesh().position.y,0);
        commentator.positionZ = 0;
    }

    scene.onKeyboardObservable.add((e) => {
        if(controlsAreAttached) {
            if(e.type === KeyboardEventTypes.KEYDOWN) {
                if(e.event.key === "ArrowLeft") {
                    keysPressed.left=true;
                    keysPressed.right=false;
                }
                else if (e.event.key === "ArrowRight") {
                    keysPressed.right=true;
                    keysPressed.left=false;
                }
            }
            else if(e.type === KeyboardEventTypes.KEYUP) {
                if(e.event.key === "ArrowLeft") {
                    keysPressed.left=false;
                }
                else if(e.event.key === "ArrowRight") {
                    keysPressed.right=false;
                }
            }
        }
    });
}

function setControlsAttachment(shouldAttachControls: boolean): void {
    controlsAreAttached=shouldAttachControls;
    if(!shouldAttachControls) {
        followCamera.detachControl();
        for(const property in keysPressed) {
            keysPressed[property]=false;
        }
    }
    else {
        followCamera.attachControl(true);
    }
}