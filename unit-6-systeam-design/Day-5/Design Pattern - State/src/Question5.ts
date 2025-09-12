interface LightState {
  turnOn(light: SmartLight): void;
  turnOff(light: SmartLight): void;
  detectMotion(light: SmartLight): void;
  adjustBrightness(light: SmartLight, isDaytime: boolean): void;
}

class OffState implements LightState {
  turnOn(light: SmartLight): void {
    console.log("Light turned ON manually.");
    light.setState(new OnState());
  }
  turnOff(light: SmartLight): void {
    console.log("Light is already OFF.");
  }
  detectMotion(light: SmartLight): void {
    console.log("Motion detected! Turning light ON automatically.");
    light.setState(new MotionDetectionState());
  }
  adjustBrightness(light: SmartLight, isDaytime: boolean): void {
    console.log("Light is OFF. Cannot adjust brightness.");
  }
}

class OnState implements LightState {
  turnOn(light: SmartLight): void {
    console.log("Light is already ON.");
  }
  turnOff(light: SmartLight): void {
    console.log("Turning light OFF.");
    light.setState(new OffState());
  }
  detectMotion(light: SmartLight): void {
    console.log("Motion ignored. Light is already ON.");
  }
  adjustBrightness(light: SmartLight, isDaytime: boolean): void {
    console.log("Adjusting brightness...");
    light.setState(new BrightnessAdjustmentState());
    light.adjustBrightness(isDaytime);
  }
}

class MotionDetectionState implements LightState {
  turnOn(light: SmartLight): void {
    console.log("Light already ON due to motion.");
  }
  turnOff(light: SmartLight): void {
    console.log("Turning OFF light after motion detection.");
    light.setState(new OffState());
  }
  detectMotion(light: SmartLight): void {
    console.log("Motion detected again. Light remains ON.");
  }
  adjustBrightness(light: SmartLight, isDaytime: boolean): void {
    console.log("Adjusting brightness after motion...");
    light.setState(new BrightnessAdjustmentState());
    light.adjustBrightness(isDaytime);
  }
}

class BrightnessAdjustmentState implements LightState {
  turnOn(light: SmartLight): void {
    console.log("Light already ON with brightness adjustment.");
  }
  turnOff(light: SmartLight): void {
    console.log("Turning OFF light from brightness adjustment mode.");
    light.setState(new OffState());
  }
  detectMotion(light: SmartLight): void {
    console.log("Motion detected. Already adjusting brightness.");
  }
  adjustBrightness(light: SmartLight, isDaytime: boolean): void {
    if (isDaytime) {
      console.log("Daytime detected Reducing brightness.");
    } else {
      console.log("Nighttime detected Increasing brightness.");
    }
  }
}

class SmartLight {
  private state: LightState;
  constructor() {
    this.state = new OffState();
  }
  setState(state: LightState): void {
    this.state = state;
  }
  turnOn(): void {
    this.state.turnOn(this);
  }
  turnOff(): void {
    this.state.turnOff(this);
  }
  detectMotion(): void {
    this.state.detectMotion(this);
  }
  adjustBrightness(isDaytime: boolean): void {
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