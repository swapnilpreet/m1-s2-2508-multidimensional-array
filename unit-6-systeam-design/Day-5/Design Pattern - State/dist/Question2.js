"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrafficLight = exports.YellowState = exports.GreenState = exports.RedState = void 0;
class RedState {
    getName() {
        return "Red - Vehicles must STOP";
    }
    change(light) {
        console.log("Changing from RED GREEN");
        light.setState(new GreenState());
    }
}
exports.RedState = RedState;
class GreenState {
    getName() {
        return "Green - Vehicles can MOVE";
    }
    change(light) {
        console.log("Changing from GREEN YELLOW");
        light.setState(new YellowState());
    }
}
exports.GreenState = GreenState;
class YellowState {
    getName() {
        return "Yellow - Vehicles should SLOW DOWN";
    }
    change(light) {
        console.log("Changing from YELLOW RED");
        light.setState(new RedState());
    }
}
exports.YellowState = YellowState;
class TrafficLight {
    constructor(initial) {
        this.state = initial !== null && initial !== void 0 ? initial : new RedState();
    }
    setState(state) {
        this.state = state;
    }
    getState() {
        return this.state.getName();
    }
    change() {
        this.state.change(this);
    }
}
exports.TrafficLight = TrafficLight;
const light = new TrafficLight();
console.log(light.getState());
light.change();
console.log(light.getState());
light.change();
console.log(light.getState());
light.change();
console.log(light.getState());
