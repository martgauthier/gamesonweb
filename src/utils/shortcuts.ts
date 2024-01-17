import {Vector2, Vector3, Vector4} from "@babylonjs/core";

function v2(x: number, y: number): Vector2 {
    return new Vector2(x, y);
}

function v3(x: number, y: number, z: number): Vector3 {
    return new Vector3(x, y, z);
}

function v4(x: number, y: number, z: number, alpha: number): Vector4 {
    return new Vector4(x, y, z, alpha);
}

export {v2, v3, v4};