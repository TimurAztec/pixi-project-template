import App from "../engine/app";
import TestLevel from "./scenes/levels/test-level";
import TestMenu from "./scenes/levels/test-menu";

export default class ExampleGame extends App {

    protected onGameInit() {
        App._scenes.push(new TestLevel('level', {width: 800, height: 600}));
        App._scenes.push(new TestMenu('menu', {width: 800, height: 600}));
        App.switchScene('level');
        // Game.RENDER.view.style.width = '1270px';
        // Game.RENDER.view.style.height = '720px';
        // Game._currentScene.scale.set(0.5, 0.75);
    }

}