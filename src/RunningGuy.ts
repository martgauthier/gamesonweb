import dudeModel from "./assets/models/dude.glb";
export default class RunningGuy {
    static DEFAULT_SPEED: number=5;
    static MODEL_SRC=dudeModel;
    shouldAnimate: boolean=false;

    getShouldAnimate(): boolean {
        return this.shouldAnimate;
    }

    setShouldAnimate(shouldAnimate: boolean): void {
        this.shouldAnimate=shouldAnimate;
        //TODO: enable or disable guy animation
    }
}