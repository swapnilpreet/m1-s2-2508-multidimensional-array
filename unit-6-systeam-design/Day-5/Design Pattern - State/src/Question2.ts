export interface TrafficLightState {
  change(light: TrafficLight): void;
  getName(): string;
}

export class RedState implements TrafficLightState {
  getName(): string {
    return "Red - Vehicles must STOP";
  }
  change(light: TrafficLight): void {
    console.log("Changing from RED GREEN");
    light.setState(new GreenState());
  }
}

export class GreenState implements TrafficLightState {
  getName(): string {
    return "Green - Vehicles can MOVE";
  }
  change(light: TrafficLight): void {
    console.log("Changing from GREEN YELLOW");
    light.setState(new YellowState());
  }
}

export class YellowState implements TrafficLightState {
  getName(): string {
    return "Yellow - Vehicles should SLOW DOWN";
  }
  change(light: TrafficLight): void {
    console.log("Changing from YELLOW RED");
    light.setState(new RedState());
  }
}

export class TrafficLight {
  private state: TrafficLightState;

  constructor(initial?: TrafficLightState) {
    this.state = initial ?? new RedState();
  }
  setState(state: TrafficLightState): void {
    this.state = state;
  }
  getState(): string {
    return this.state.getName();
  }
  change(): void {
    this.state.change(this);
  }
}

const light = new TrafficLight();

console.log(light.getState());
light.change();

console.log(light.getState()); 
light.change();

console.log(light.getState());
light.change();

console.log(light.getState());