import AbstractEntity from "./abstract-entity";
import Matter from "matter-js";

export default abstract class AbstractPhysicsEntity extends AbstractEntity {
    public _body: Matter.Body;

    public process(): void {
        super.process();
        this._renderContainer.position.x = this._body.position.x;
        this._renderContainer.position.y = this._body.position.y;
        this._renderContainer.rotation = this._body.angle;
    }
}