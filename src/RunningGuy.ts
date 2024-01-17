import dudeModel from "./assets/models/runningGuy.glb";
import {Animatable, AnimationGroup ,InstantiatedEntries, Mesh, Skeleton, Vector3} from "@babylonjs/core";
import {v3} from "./utils/shortcuts";
import {Scene} from "@babylonjs/core/scene";

export default class RunningGuy {
    static DEFAULT_SPEED: number=0.02;
    static DEFAULT_SCALE_FACTOR: number=1;
    static MODEL_SRC=dudeModel;
    static DEFAULT_SPACE_BETWEEN_RUNNERS=1.5;
    shouldAnimate: boolean=false;

    /**
     * Un élement 3D affiché à l'écran, c'est 3 choses:
     * -Une Mesh (ou un Node, c'est à peu près équivalent)
     *
     * -un Skeleton
     *
     * -des AnimationGroup
     *
     * tous ces élements vont de paire, et sont stockés dans une variable de type InstantiatedEntries.
     *
     * !!! MEME SI LE MOT EST AU PLURIEL, "ENTRIES" représente le contenu pour UN SEUL personnage
     */
    entries: InstantiatedEntries;
    speed: number;
    scene: Scene;
    walkAnimation: AnimationGroup;
    runAnimation: AnimationGroup;
    ratioBetweenRunAndWalkAnims: number;

    constructor(entries: InstantiatedEntries, scene: Scene, shouldRun: boolean=true, shouldNotInitGoodProperties: boolean = false) {
        this.entries=entries;
        this.scene=scene;
        this.speed=RunningGuy.DEFAULT_SPEED;
        this.setShouldAnimate(shouldRun);
        if(!shouldNotInitGoodProperties) this.setGoodInitProperties();
    }

    getShouldAnimate(): boolean {
        return this.shouldAnimate;
    }

    setShouldAnimate(shouldAnimate: boolean=true): void {
        this.shouldAnimate=shouldAnimate;
        if(shouldAnimate) {
            let walkAnimation=this.entries.animationGroups[1];
            let runAnimation=this.entries.animationGroups[4];

            this.runAnimation=runAnimation.start(true, 1, runAnimation.from, runAnimation.to);
            this.walkAnimation=walkAnimation.start(true, 1, walkAnimation.from, walkAnimation.to);
            this.walkAnimation.setWeightForAllAnimatables(0);
            this.ratioBetweenRunAndWalkAnims=1;
            this.runAnimation.speedRatio = 1.2;
        }
    }

    getMesh(): Mesh {
        return this.entries.rootNodes[0] as Mesh;
    }

    getSkeleton(): Skeleton {
        return this.entries.skeletons[0];
    }

    /**
     * Changes character movement and animation speed.
     * @param modifier number to apply
     * @param mode operand of calculus: "substract", "multiply", "divide", or "add". Default "substract"
     */
    changeAnimSpeed(modifier: number, mode: "substract" | "multiply" | "divide" | "add" | "reset" = "substract", animationToUpdate?: Animatable): void {
        switch(mode) {
            case "divide":
                this.speed/=modifier;
                break;
            case "multiply":
                this.speed*=modifier;
                break;
            case "reset":
                this.speed = RunningGuy.DEFAULT_SPEED; // Pour reset sa vitese avec dudes[0].changeAnimSpeed(0, "reset");
                break;
            default://substract
                if(this.speed >= modifier) {
                    this.speed-=modifier;
                }
                break;
        }

        if(this.shouldAnimate) {
            if(typeof animationToUpdate !== "undefined") {
                animationToUpdate.speedRatio=this.speed/RunningGuy.DEFAULT_SPEED;
            }
            else {
                this.runAnimation.speedRatio=this.speed/RunningGuy.DEFAULT_SPEED;
            }
        }
    }

    setGoodInitProperties(): void {
        //Nécessaire pour utiliser correctement un vecteur calculable automatiquement, "Vector3.Forward()" (= Vector3.VectorQuiVaVersLavant)
        this.getMesh().rotate(v3(0,1,0), Math.PI);
        this.getMesh().bakeCurrentTransformIntoVertices(true);//Cela permet de 1. définir la BONNE direction "avant" 2. de l'écrire pour tjr dans le personnage

        this.getMesh().rotate(Vector3.Up(), 3*Math.PI/2);//après avoir fixé la direction Avant, on remet le bonhomme dans le sens initial qu'on voulait
    }
}