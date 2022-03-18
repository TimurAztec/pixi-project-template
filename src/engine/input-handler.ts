import App from "./app";

export default class InputHandler {

    constructor() {
        window.addEventListener('keydown', (key) => {
            App.GLOBAL_EVENTS.next({name: 'keydown', body: key.key})
        });
        window.addEventListener('keyup', (key) => {
            App.GLOBAL_EVENTS.next({name: 'keyup', body: key.key})
        });
    }

}