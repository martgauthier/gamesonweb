import dudeModel from "./assets/models/dummy3.babylon";
import {AbstractMesh} from "@babylonjs/core";

export default class RunningGuy {
    static DEFAULT_SPEED: number=0.02;
    static DEFAULT_SCALE_FACTOR: number=1;
    static MODEL_SRC=dudeModel;
    static DEFAULT_SPACE_BETWEEN_RUNNERS=1.5;
    shouldAnimate: boolean=false;

    mesh: AbstractMesh;

    constructor(mesh: AbstractMesh) {
        this.mesh=mesh;
    }

    getShouldAnimate(): boolean {
        return this.shouldAnimate;
    }

    setShouldAnimate(shouldAnimate: boolean): void {
        this.shouldAnimate=shouldAnimate;
        //TODO: enable or disable guy animation
    }
}