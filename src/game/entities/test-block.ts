import AbstractPhysicsEntity from "../../engine/entities/abstract-phys-entity";
import AbstractScene from "../../engine/scenes/abstract-scene";
import Matter from "matter-js";
import * as PIXI from "pixi.js";
import App from "../../engine/app";

export default class TestBlock extends AbstractPhysicsEntity {

    protected _sprite: PIXI.Sprite;
    protected _cordBitMap: PIXI.Text;
    protected _moveVector: Matter.Vector = {x: 0, y: 0};

    constructor(scene: AbstractScene, position: Matter.Vector, controllable: boolean = false) {
        super(scene);
        this._body = Matter.Bodies.rectangle(position.x, position.y, 100, 100, {
        });
        Matter.World.add(scene.world, this._body);
        this._sprite = new PIXI.Sprite(App.RESOURCES['debug'].texture);
        this._cordBitMap = new PIXI.Text("", {
            fontSize: 11,
            align: "center"
        });
        this._renderContainer.addChild(this._sprite);
        this._renderContainer.addChild(this._cordBitMap);
        this.centerPivotPosition();

        if (controllable) {
            App.GLOBAL_EVENTS.subscribe((Notification) => {
                if (Notification.name == 'keydown' && this._renderContainer.visible) {
                    if (Notification.body == 'ArrowUp') {
                        this._moveVector.y = -0.5;
                    }
                    if (Notification.body == 'ArrowDown') {
                        this._moveVector.y = 0;
                    }
                    if (Notification.body == 'ArrowLeft') {
                        this._moveVector.x = -0.1;
                    }
                    if (Notification.body == 'ArrowRight') {
                        this._moveVector.x = 0.1;
                    }
                }
                if (Notification.name == 'keyup' && this._renderContainer.visible) {
                    if (Notification.body == 'ArrowUp') {
                        this._moveVector.y = 0;
                    }
                    if (Notification.body == 'ArrowDown') {
                        this._moveVector.y = 0;
                    }
                    if (Notification.body == 'ArrowLeft') {
                        this._moveVector.x = 0;
                    }
                    if (Notification.body == 'ArrowRight') {
                        this._moveVector.x = 0;
                    }
                }
            })
        }
    }

    process() {
        if (this._moveVector != {x: 0, y: 0}) {
            Matter.Body.applyForce(this._body, this._body.position, this._moveVector);
            this._moveVector = {x: 0, y: 0};
        }
        this._cordBitMap.text = `x:${Math.floor(this._body.position.x)} | y:${Math.floor(this._body.position.y)} | a:${Math.floor(this._body.angle)}`
        super.process();
    }

}