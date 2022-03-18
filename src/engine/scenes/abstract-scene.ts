import * as PIXI from 'pixi.js'
import AbstractEntity from "../entities/abstract-entity";
import {SceneOptions} from "./Ilevels";
import Matter, {Engine} from "matter-js";
import PhysicsDebugger from "../physics-debugger";

export default abstract class AbstractScene extends PIXI.Container {

    protected _physics: Matter.Engine;
    protected _physics_bounds: Matter.Composite;
    protected _debug_render: Matter.Render;
    protected _entities: AbstractEntity[] = [];

    get physics(): Matter.Engine {
        return this._physics;
    }

    get world(): Matter.World {
        return this._physics.world;
    }

    get debugRender(): Matter.Render {
        return this._debug_render;
    }

    constructor(id: string, options?: SceneOptions) {
        super();
        this.name = id;
        let width: number = options?.width || Infinity;
        let height: number = options?.height || Infinity;
        this._physics = Matter.Engine.create();
        this._debug_render = PhysicsDebugger.getRender(this.physics);
        if (options?.width && options?.height) {
            this._physics_bounds = Matter.Composite.create({
                bodies: [
                    Matter.Bodies.rectangle(width / 2, 0, width, 10, {isStatic: true}),
                    Matter.Bodies.rectangle(width / 2, height, width, 10, {isStatic: true}),
                    Matter.Bodies.rectangle(0, height / 2, 10, height, {isStatic: true}),
                    Matter.Bodies.rectangle(width, height / 2, 10, height, {isStatic: true}),
                ]
            });
            Matter.World.add(this._physics.world, this._physics_bounds);
        }

        Matter.Events.on(this._physics, "collisionActive", (e => {
            this.onCollision(e);
        }));
    }

    protected onCollision(e: any): void {}

    public process(dt: number): void {
        Engine.update(this._physics);
        this._entities.forEach((entity) => {
            entity.process();
        });
    }

}