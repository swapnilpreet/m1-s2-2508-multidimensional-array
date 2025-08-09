"use strict";
class MediaPlayer {
    constructor() {
        this.playState = new PlayState(this);
        this.pauseState = new PauseState(this);
        this.stopState = new StopState(this);
        this.currentState = this.stopState;
    }
    setState(state) {
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
class PlayState {
    constructor(player) {
        this.player = player;
    }
    play() {
        console.log("Already playing...");
    }
    pause() {
        console.log("Pausing media...");
        this.player.setState(this.player.pauseState);
    }
    stop() {
        console.log("Stopping media...");
        this.player.setState(this.player.stopState);
    }
}
class PauseState {
    constructor(player) {
        this.player = player;
    }
    play() {
        console.log("Resuming media...");
        this.player.setState(this.player.playState);
    }
    pause() {
        console.log("Already paused...");
    }
    stop() {
        console.log("Stopping media from paused state...");
        this.player.setState(this.player.stopState);
    }
}
class StopState {
    constructor(player) {
        this.player = player;
    }
    play() {
        console.log("Playing from the beginning...");
        this.player.setState(this.player.playState);
    }
    pause() {
        console.log("Can't pause. Media is stopped.");
    }
    stop() {
        console.log("Already stopped...");
    }
}
const player = new MediaPlayer();
player.play();
player.pause();
player.play();
player.stop();
player.pause();
