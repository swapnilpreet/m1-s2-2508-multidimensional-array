"use strict";
class OffState {
    turnOn(light) {
        console.log("Light turned ON manually.");
        light.setState(new OnState());
    }
    turnOff(light) {
        console.log("Light is already OFF.");
    }
    detectMotion(light) {
        console.log("Motion detected! Turning light ON automatically.");
        light.setState(new MotionDetectionState());
    }
    adjustBrightness(light, isDaytime) {
        console.log("Light is OFF. Cannot adjust brightness.");
    }
}
class OnState {
    turnOn(light) {
        console.log("Light is already ON.");
    }
    turnOff(light) {
        console.log("Turning light OFF.");
        light.setState(new OffState());
    }
    detectMotion(light) {
        console.log("Motion ignored. Light is already ON.");
    }
    adjustBrightness(light, isDaytime) {
        console.log("Adjusting brightness...");
        light.setState(new BrightnessAdjustmentState());
        light.adjustBrightness(isDaytime);
    }
}
class MotionDetectionState {
    turnOn(light) {
        console.log("Light already ON due to motion.");
    }
    turnOff(light) {
        console.log("Turning OFF light after motion detection.");
        light.setState(new OffState());
    }
    detectMotion(light) {
        console.log("Motion detected again. Light remains ON.");
    }
    adjustBrightness(light, isDaytime) {
        console.log("Adjusting brightness after motion...");
        light.setState(new BrightnessAdjustmentState());
        light.adjustBrightness(isDaytime);
    }
}
class BrightnessAdjustmentState {
    turnOn(light) {
        console.log("Light already ON with brightness adjustment.");
    }
    turnOff(light) {
        console.log("Turning OFF light from brightness adjustment mode.");
        light.setState(new OffState());
    }
    detectMotion(light) {
        console.log("Motion detected. Already adjusting brightness.");
    }
    adjustBrightness(light, isDaytime) {
        if (isDaytime) {
            console.log("Daytime detected Reducing brightness.");
        }
        else {
            console.log("Nighttime detected Increasing brightness.");
        }
    }
}
class SmartLight {
    constructor() {
        this.state = new OffState();
    }
    setState(state) {
        this.state = state;
    }
    turnOn() {
        this.state.turnOn(this);
    }
    turnOff() {
        this.state.turnOff(this);
    }
    detectMotion() {
        this.state.detectMotion(this);
    }
    adjustBrightness(isDaytime) {
        this.state.adjustBrightness(this, isDaytime);
    }
}
const light = new SmartLight();
light.turnOn();
light.adjustBrightness(true);
light.detectMotion();
light.turnOff();
light.detectMotion();
light.adjustBrightness(false);
