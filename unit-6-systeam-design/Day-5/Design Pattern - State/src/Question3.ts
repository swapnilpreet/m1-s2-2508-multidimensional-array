interface MediaState {
  play(player: MediaPlayer): void;
  pause(player: MediaPlayer): void;
  stop(player: MediaPlayer): void;
}

class PlayState implements MediaState {
  play(player: MediaPlayer): void {
    console.log("Already playing media.");
  }
  pause(player: MediaPlayer): void {
    console.log("Pausing media...");
    player.setState(new PauseState());
  }
  stop(player: MediaPlayer): void {
    console.log("Stopping media...");
    player.setState(new StopState());
  }
}

class PauseState implements MediaState {
  play(player: MediaPlayer): void {
    console.log("Resuming media...");
    player.setState(new PlayState());
  }
  pause(player: MediaPlayer): void {
    console.log("Already paused.");
  }
  stop(player: MediaPlayer): void {
    console.log("Stopping media from pause...");
    player.setState(new StopState());
  }
}

class StopState implements MediaState {
  play(player: MediaPlayer): void {
    console.log("Starting media from beginning...");
    player.setState(new PlayState());
  }
  pause(player: MediaPlayer): void {
    console.log("Cannot pause. Media is stopped.");
  }
  stop(player: MediaPlayer): void {
    console.log("Already stopped.");
  }
}

class MediaPlayer {
  private state: MediaState;
  constructor() {
    this.state = new StopState();
  }
  setState(state: MediaState): void {
    this.state = state;
  }
  play(): void {
    this.state.play(this);
  }
  pause(): void {
    this.state.pause(this);
  }
  stop(): void {
    this.state.stop(this);
  }
}
const player = new MediaPlayer();
player.play();
player.pause();
player.play();
player.stop();
player.pause();
