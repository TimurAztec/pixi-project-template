import * as PIXI from 'pixi.js'
import AbstractScene from "../scenes/abstract-scene";

export default abstract class AbstractEntity {

    protected _renderContainer: PIXI.Container = new PIXI.Container();

    constructor(scene: AbstractScene) {
        scene.addChild(this._renderContainer);
    }

    // Use it each time you change displayable children
    protected centerPivotPosition(): void {
        this._renderContainer.pivot.set((this._renderContainer.x + this._renderContainer.width/2),
            (this._renderContainer.y + this._renderContainer.height/2));
    }

    public process(): void {}
    public remove(): void {}
}