import * as PIXI from 'pixi.js'
import Assets from '../game/assets/assets.json'
import {Subject} from "rxjs";
import AbstractScene from "./scenes/abstract-scene";
import PhysicsDebugger from "./physics-debugger";
import {AppInit} from "./interfaces/Ioptions";

export default class App {

    protected static _instance: App;
    protected static _loader: PIXI.Loader;
    protected static _scenes: AbstractScene[] = [];
    protected static _currentScene: AbstractScene;

    public static get currentScene(): AbstractScene {
        return this._currentScene;
    }

    public static get scenes(): AbstractScene[] {
        return this._scenes;
    }

    /*--------------------------
    Setup
    --------------------------*/

    public static RENDER: PIXI.AbstractRenderer;
    public static htmlContainer: HTMLElement;
    public static get RESOURCES() {
        return this._loader.resources;
    }
    public static GLOBAL_EVENTS: Subject<Notification> = new Subject<Notification>();

    constructor(options: AppInit) {
        if (App._instance) {
            throw new Error(`You can create only one instance of the ${App.name}!`);
        }
        App._instance = this;
        //@ts-ignore fix for new PIXI version browser related bug, may be deleted
        window.PIXI = PIXI;
        // ----------------------------------------------------------------------
        App.htmlContainer = document.createElement('div');
        App.htmlContainer.style.position = 'absolute';
        App.htmlContainer.setAttribute('width', options.width.toString());
        App.htmlContainer.setAttribute('height', options.height.toString());
        /*--------------------------
        Pixi
        --------------------------*/
        App.RENDER = PIXI.autoDetectRenderer({
            antialias: true,
            autoDensity: true,
            resolution: 1,
            width: App.htmlContainer.offsetWidth,
            height: App.htmlContainer.offsetHeight
        });
        App.htmlContainer.appendChild(App.RENDER.view);

        App._loader = new PIXI.Loader;
        Assets.forEach((asset) => {
            App._loader.add(asset);
        });
        App._loader.load();

        App._loader.onComplete.add(() => {
            this.onGameInit();
            /*--------------------------
            Pixi Frame Updates
            --------------------------*/
            PIXI.Ticker.shared.add((dt: number) => {
                this.onTick(dt);
            });
        });
    }

    protected onGameInit(): void {}

    protected onTick(dt: number): void {
        App._currentScene.process(dt);
        App.RENDER.render(App._currentScene);
        PhysicsDebugger.update(dt);
    }

    public static switchScene(sceneId: string): void {
        this._currentScene = this._scenes.find((scene) => scene.name == sceneId);
        PhysicsDebugger.switchScene(this._currentScene.debugRender);
    }
}