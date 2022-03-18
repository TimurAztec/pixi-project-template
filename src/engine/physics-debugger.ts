import Matter, {IRenderDefinition} from "matter-js";
import App from "./app";
import AbstractScene from "./scenes/abstract-scene";
import {size} from "./interfaces/Ioptions";

export default class PhysicsDebugger {
    // TODO this is temporary implementation. This should be made much better way

    protected static _instance: PhysicsDebugger;

    public static htmlContainer: HTMLElement;

    constructor(options: size) {
        if (PhysicsDebugger._instance) {
            throw new Error(`You can create only one instance of the ${App.name}!`);
        }
        PhysicsDebugger._instance = this;

        PhysicsDebugger.htmlContainer = document.createElement('div');
        PhysicsDebugger.htmlContainer.style.position = 'absolute';
        PhysicsDebugger.htmlContainer.setAttribute('width', options.width.toString());
        PhysicsDebugger.htmlContainer.setAttribute('height', options.height.toString());

        App.GLOBAL_EVENTS.subscribe((Notification) => {
            if (Notification.name == 'keyup') {
                if (Notification.body == 'F10') {
                    PhysicsDebugger.htmlContainer.style.visibility =
                        PhysicsDebugger.htmlContainer.style.visibility == "visible" ? "hidden" : "visible";
                }
            }
        });
    }

    public static getRender(physics: Matter.Engine): Matter.Render {
        if (this._instance) {
            return Matter.Render.create({
                element: PhysicsDebugger.htmlContainer,
                engine: physics,
                options: {
                    pixelRatio: 1,
                    background: 'transparent',
                    wireframeBackground: 'transparent',
                    hasBounds: true,
                    enabled: true,
                    wireframes: true,
                    showSleeping: true,
                    showDebug: true,
                    showBroadphase: true,
                    showBounds: true,
                    showVelocity: true,
                    showCollisions: true,
                    showSeparations: true,
                    showAxes: true,
                    showPositions: true,
                    showAngleIndicator: true,
                    showIds: true,
                    showShadows: false,
                    showVertexNumbers: true,
                    showConvexHulls: true,
                    showInternalEdges: true,
                    showMousePosition: false
                }
            } as IRenderDefinition);
        }
    }

    public static update(dt: number): void {
        if (this._instance) {
            Matter.Render.world(App.currentScene.debugRender);
            if (App.currentScene.debugRender.options.showStats || App.currentScene.debugRender.options.showDebug) {
                // @ts-ignore
                Matter.Render.stats(App.currentScene.debugRender, App.currentScene.debugRender.context, dt);
            }
        }
    }

    public static switchScene(sceneRender: Matter.Render): void {
        if (this._instance) {
            App.scenes.forEach((scene: AbstractScene) => {
                scene.debugRender.canvas.setAttribute('style', 'opacity: 0; position: absolute;');
            });
            App.currentScene.debugRender.canvas.setAttribute('style', 'opacity: 100; position: absolute;');
        }
    }

    public static resize(width: number, height: number): void {
        if (this._instance) {
            App.scenes.forEach((scene: AbstractScene) => {
                scene.debugRender.canvas.width = width;
                scene.debugRender.canvas.height = height;
            });
        }
    }
}