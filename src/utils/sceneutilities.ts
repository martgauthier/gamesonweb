import {Engine} from "@babylonjs/core/Engines/engine";
import {Scene} from "@babylonjs/core/scene";
import "@babylonjs/loaders";

function startEngine(): [HTMLCanvasElement, Engine] {
    const canvas = document.getElementById("renderCanvas") as HTMLCanvasElement;
    const engine = new Engine(canvas);

    return [canvas, engine];
}

function startScene(engine: Engine): Scene {
    let scene = new Scene(engine);

    engine.runRenderLoop(() => {
        scene.render();
    });

    return scene;
}

export {startEngine, startScene};