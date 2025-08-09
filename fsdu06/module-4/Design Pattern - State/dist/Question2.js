"use strict";
class TrafficLight {
    constructor() {
        this.redState = new RedState(this);
        this.greenState = new GreenState(this);
        this.yellowState = new YellowState(this);
        this.currentState = this.redState;
    }
    setState(state) {
        this.currentState = state;
    }
    change() {
        this.currentState.changeLight();
    }
    show() {
        this.currentState.showMessage();
    }
}
class RedState {
    constructor(light) {
        this.trafficLight = light;
    }
    changeLight() {
        console.log("Changing from RED to GREEN");
        this.trafficLight.setState(this.trafficLight.greenState);
    }
    showMessage() {
        console.log("RED: Vehicles must STOP");
    }
}
class GreenState {
    constructor(light) {
        this.trafficLight = light;
    }
    changeLight() {
        console.log("Changing from GREEN to YELLOW");
        this.trafficLight.setState(this.trafficLight.yellowState);
    }
    showMessage() {
        console.log("GREEN: Vehicles can GO");
    }
}
class YellowState {
    constructor(light) {
        this.trafficLight = light;
    }
    changeLight() {
        console.log("Changing from YELLOW to RED");
        this.trafficLight.setState(this.trafficLight.redState);
    }
    showMessage() {
        console.log("YELLOW: Vehicles should SLOW DOWN");
    }
}
let light = new TrafficLight();
light.show();
light.change();
light.show();
light.change();
light.show();
light.change();
light.show();
