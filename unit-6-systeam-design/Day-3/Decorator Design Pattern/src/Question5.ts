interface MediaFile {
  play(): void;
}
class AudioFile implements MediaFile {
  play(): void {
    console.log("Playing audio file...");
  }
}
class VideoFile implements MediaFile {
  play(): void {
    console.log("Playing video file...");
  }
}
class PDFFile implements MediaFile {
  play(): void {
    console.log("Displaying PDF document...");
  }
}
class MediaPlayer {
  private media: MediaFile;
  constructor(media: MediaFile) {
    this.media = media;
  }
  playMedia(): void {
    this.media.play();
  }
}
const player1 = new MediaPlayer(new AudioFile());
const player2 = new MediaPlayer(new VideoFile());
const player3 = new MediaPlayer(new PDFFile());
player1.playMedia();
player2.playMedia();
player3.playMedia();
