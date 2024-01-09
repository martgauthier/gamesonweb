const D: boolean=true;//D for debugger, CHANGE IF YOU WANT TO DEBUG


import { HemisphericLight } from '@babylonjs/core/Lights/hemisphericLight';

import {v2, v3, v4} from "./utils/shortcuts";

import {startEngine, startScene} from "./utils/sceneutilities";
import {Mesh, MeshBuilder, SceneLoader, UniversalCamera, Vector3} from "@babylonjs/core";

import RunningGuy from "./RunningGuy";

const [canvas, engine] = startEngine();
let scene = startScene(engine);

let univCamera = new UniversalCamera("univCam", v3(8, 4, 6));
univCamera.target=Vector3.Zero();

if(D) univCamera.attachControl(true);//can move cam only if debugging mode

let hemiLight = new HemisphericLight("hemiLight", v3(0, 1, 0));

let ground = MeshBuilder.CreateGround("ground", {
    width: 50,
    height: 6
});

SceneLoader.ImportMeshAsync("", "", RunningGuy.MODEL_SRC, scene).then((result) => {})

