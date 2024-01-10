import dudeModel from "./assets/models/dummy3.babylon";
import {AbstractMesh, InstantiatedEntries} from "@babylonjs/core";

export default class RunningGuy {
    static DEFAULT_SPEED: number=0.02;
    static DEFAULT_SCALE_FACTOR: number=1;
    static MODEL_SRC=dudeModel;
    static DEFAULT_SPACE_BETWEEN_RUNNERS=1.5;
    shouldAnimate: boolean=false;

    entries: InstantiatedEntries;
    speed: number;

    constructor(entries: InstantiatedEntries) {
        this.entries=entries;
        this.speed=RunningGuy.DEFAULT_SPEED;
    }

    getShouldAnimate(): boolean {
        return this.shouldAnimate;
    }

    setShouldAnimate(shouldAnimate: boolean): void {
        this.shouldAnimate=shouldAnimate;
        //TODO: enable or disable guy animation
    }

    /**
     * Slows character.
     * @param reduction should be positive if "substract", <1 if "multiply", >1 if "divide"
     * @param mode operand of calculus
     */
    slowCharacter(reduction: number, mode: "substract" | "multiply" | "divide" = "substract"): void {
        switch(mode) {
            case "divide":
                this.speed/=reduction;
                break;
            case "multiply":
                this.speed*=reduction;
                break;
            default://substract
                if(this.speed >= reduction) {
                    this.speed-=reduction;
                }
                break;
        }
    }
}