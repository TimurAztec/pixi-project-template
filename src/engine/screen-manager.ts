import App from "./app";
import PhysicsDebugger from "./physics-debugger";

export default class ScreenManager {

    public static changeResolution(width: number, height: number) {
        App.RENDER.resize(width, height);
        PhysicsDebugger.resize(width, height);
    }

}