import AbstractScene from "../../../engine/scenes/abstract-scene";
import {SceneOptions} from "../../../engine/scenes/Ilevels";
import TestBlock from "../../entities/test-block";
import App from "../../../engine/app";

export default class TestMenu extends AbstractScene {

    constructor(name: string, options?: SceneOptions) {
        super(name, options);
        this._entities.push(new TestBlock(this, {x: 75, y: 100}));

        App.GLOBAL_EVENTS.subscribe((Notification) => {
            if (Notification.name == 'keyup') {
                if (Notification.body == 'Escape') {
                    App.switchScene(App.currentScene.name == this.name ? 'level' : this.name);
                }
            }
        });
    }

}