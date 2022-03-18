import ExampleGame from "./game/game";
import PhysicsDebugger from "./engine/physics-debugger";
import InputHandler from "./engine/input-handler";
import ScreenManager from "./engine/screen-manager";

//Modular structure
//App (or ExampleGame in this case) module is mandatory
//Extend your main class from App.class
new ExampleGame({width: 800, height: 600});
new PhysicsDebugger({width: 800, height: 600});
new InputHandler();
new ScreenManager();

// You should have app canvas and debugger canvas overlay over each other
document.body.appendChild(ExampleGame.htmlContainer);
document.body.appendChild(PhysicsDebugger.htmlContainer);

ScreenManager.changeResolution(window.innerWidth, window.innerHeight);

window.onresize = (ev) => {
    ScreenManager.changeResolution(window.innerWidth, window.innerHeight);
}