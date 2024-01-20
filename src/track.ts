import trackModel from "./assets/models/track.glb";
import {InstantiatedEntries, Mesh, Observer, Skeleton, Vector3, Animation} from "@babylonjs/core";
import {v3} from "./utils/shortcuts";
import {Scene} from "@babylonjs/core/scene";

export default class Track {
    static DEFAULT_SCALE_FACTOR: number=1;
    static MODEL_SRC=trackModel;;
    static DEFAULT_SPACE_BETWEEN_TRACK_PIECES=1.5;

    entries: InstantiatedEntries;
    speed: number;
    scene: Scene;

    constructor(entries: InstantiatedEntries, scene: Scene  , shouldNotInitGoodProperties: boolean = false) {
        this.entries=entries;
        this.scene=scene;
        if(!shouldNotInitGoodProperties) this.setGoodInitProperties();
    }

    getMesh(): Mesh {
        return this.entries.rootNodes[0] as Mesh;
    }

    setGoodInitProperties(): void{
        console.log("zevi");
        this.getMesh().rotate(v3(0,1,0), Math.PI/2,0);
        this.getMesh().position = new Vector3(0,0,0);
    }
}