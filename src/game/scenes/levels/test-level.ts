import AbstractScene from "../../../engine/scenes/abstract-scene";
import {SceneOptions} from "../../../engine/scenes/Ilevels";
import TestBlock from "../../entities/test-block";

export default class TestLevel extends AbstractScene {

    constructor(name: string, options?: SceneOptions) {
        super(name, options);
        this._entities.push(new TestBlock(this, {x: 75, y: 100}));
        this._entities.push(new TestBlock(this, {x: 275, y: 100}));
        this._entities.push(new TestBlock(this, {x: 400, y: 100}, true));
    }

}