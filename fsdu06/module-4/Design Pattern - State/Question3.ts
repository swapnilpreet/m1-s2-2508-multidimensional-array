
interface State {
    play(): void;
    pause(): void;
    stop(): void;
}
 
class MediaPlayer {
    playState: State;
    pauseState: State;
    stopState: State;
    currentState: State;

    constructor() {
        this.playState = new PlayState(this);
        this.pauseState = new PauseState(this);
        this.stopState = new StopState(this);

        this.currentState = this.stopState;
    }

    setState(state: State) {
        this.currentState = state;
    }

    play() {
        this.currentState.play();
    }

    pause() {
        this.currentState.pause();
    }

    stop() {
        this.currentState.stop();
    }
}
 
class PlayState implements State {
    constructor(private player: MediaPlayer) {}
    play(): void {
        console.log("Already playing...");
    }
    pause(): void {
        console.log("Pausing media...");
        this.player.setState(this.player.pauseState);
    }
    stop(): void {
        console.log("Stopping media...");
        this.player.setState(this.player.stopState);
    }
}
 
class PauseState implements State {
    constructor(private player: MediaPlayer) {}
    play(): void {
        console.log("Resuming media...");
        this.player.setState(this.player.playState);
    }
    pause(): void {
        console.log("Already paused...");
    }
    stop(): void {
        console.log("Stopping media from paused state...");
        this.player.setState(this.player.stopState);
    }
}
 
class StopState implements State {
    constructor(private player: MediaPlayer) {}
        play(): void {
        console.log("Playing from the beginning...");
        this.player.setState(this.player.playState);
    }
    pause(): void {
        console.log("Can't pause. Media is stopped.");
    }
    stop(): void {
        console.log("Already stopped...");
    }
}
 
const player = new MediaPlayer();

player.play(); 
player.pause(); 
player.play(); 
player.stop();   
player.pause();   
