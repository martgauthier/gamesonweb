const D: boolean=true;//D for debugger, CHANGE IF YOU WANT TO DEBUG


import {HemisphericLight} from '@babylonjs/core/Lights/hemisphericLight';

import "babylonjs-loaders";

import {v3} from "./utils/shortcuts";

import {startEngine, startScene} from "./utils/sceneutilities";
import {
    Animation,
    AssetContainer,
    Mesh,
    MeshBuilder,
    SceneLoader,
    UniversalCamera,
    Vector3
} from "@babylonjs/core";

import RunningGuy from "./RunningGuy";


Animation.AllowMatricesInterpolation = true;//permet de fluidifier les animations. Si false, le personnage ne suivrait QUE les clés de mouvement, sans fluidité entre les clés

const [canvas, engine] = startEngine();
let scene = startScene(engine);

let univCamera = new UniversalCamera("univCam", v3(8, 4, 6));
univCamera.target=Vector3.Zero();

if(D) univCamera.attachControl(true);//can move cam only if debugging mode

let hemiLight = new HemisphericLight("hemiLight", v3(0, 1, 0));

let ground = MeshBuilder.CreateGround("ground", {
    width: 60,
    height: 8
});

SceneLoader.LoadAssetContainerAsync("", RunningGuy.MODEL_SRC).then((container) => onDudeMeshLoaded(container));


function onDudeMeshLoaded(dudeModelDataContainer: AssetContainer): void {
    //container.instantiateModelsToScene() instancie dans la scène le contenu du container, et renvoye les "entries" (voir "RunningGuy.entries") créés par l'instanciation.
    //Puisque le dudeModelDataContainer contient les entries du modèle 3D du bonhomme,
    //On peut considérer que "container.instantiateModelsToScene" renvoye UN CLONE du personnage

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
    });
    }
}