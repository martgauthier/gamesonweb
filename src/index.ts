import { HemisphericLight } from '@babylonjs/core/Lights/hemisphericLight';

import {v2, v3, v4} from "./shortcuts";

import {startEngine, startScene} from "./sceneutilities";
import {MeshBuilder, UniversalCamera, Vector3} from "@babylonjs/core";

const [canvas, engine] = startEngine();
let scene = startScene(engine);

let univCamera = new UniversalCamera("univCam", v3(8, 4, 6));
univCamera.target=Vector3.Zero();

let hemiLight = new HemisphericLight("hemiLight", v3(0, 1, 0));

let ground = MeshBuilder.CreateGround("ground", {
    width: 50,
    height: 6
});

