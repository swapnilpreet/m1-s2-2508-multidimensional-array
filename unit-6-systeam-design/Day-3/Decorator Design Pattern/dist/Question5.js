"use strict";
class AudioFile {
    play() {
        console.log("Playing audio file...");
    }
}
class VideoFile {
    play() {
        console.log("Playing video file...");
    }
}
class PDFFile {
    play() {
        console.log("Displaying PDF document...");
    }
}
class MediaPlayer {
    constructor(media) {
        this.media = media;
    }
    playMedia() {
        this.media.play();
    }
}
const player1 = new MediaPlayer(new AudioFile());
const player2 = new MediaPlayer(new VideoFile());
const player3 = new MediaPlayer(new PDFFile());
player1.playMedia();
player2.playMedia();
player3.playMedia();
