const D: boolean=true;//D for debugger, CHANGE IF YOU WANT TO DEBUG


import {HemisphericLight} from '@babylonjs/core/Lights/hemisphericLight';

import "babylonjs-loaders";

import {v3} from "./utils/shortcuts";

import {startEngine, startScene} from "./utils/sceneutilities";
import {
    Animation,
    AnimationRange,
    ISceneLoaderAsyncResult,
    Mesh,
    MeshBuilder,
    Quaternion,
    SceneLoader,
    Space,
    UniversalCamera,
    Vector3
} from "@babylonjs/core";

import RunningGuy from "./RunningGuy";


Animation.AllowMatricesInterpolation = true;

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

SceneLoader.ImportMeshAsync("", "", RunningGuy.MODEL_SRC, scene).then((result) => onDudeMeshLoaded(result));


function onDudeMeshLoaded(result: ISceneLoaderAsyncResult): void {
    let mainMesh: Mesh= result.meshes[1] as Mesh;
    let mainDude=new RunningGuy(mainMesh);

    mainMesh.rotate(v3(0,1,0), Math.PI);
    mainMesh.bakeCurrentTransformIntoVertices(true);


    mainMesh.rotate(Vector3.Up(), 3*Math.PI/2);
    mainMesh.scaling.scaleInPlace(RunningGuy.DEFAULT_SCALE_FACTOR);
    mainMesh.position=v3(0, 0, -2*RunningGuy.DEFAULT_SPACE_BETWEEN_RUNNERS);


    let dudes: RunningGuy[]=[mainDude];

    for(let i=1; i < 5; i++) {
        dudes[i]=new RunningGuy(mainMesh.clone(i.toString()+"_runner", null));
        dudes[i].mesh.position.z=mainMesh.position.z+i*RunningGuy.DEFAULT_SPACE_BETWEEN_RUNNERS;
    }

    let runRange: AnimationRange = result.skeletons[0].getAnimationRange("YBot_Run");

    scene.beginAnimation(result.skeletons[0], runRange.from, runRange.to, true, 1);
    scene.onBeforeRenderObservable.add(() => {
        dudes.forEach((dude: RunningGuy) => {
            dude.mesh.movePOV(0, 0, RunningGuy.DEFAULT_SPEED);
        });
    });
}

