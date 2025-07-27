"use strict";
// bad example
class Bird {
    fly() {
        console.log("flying....");
    }
}
class Ostrich extends Bird {
    fly() {
        throw new Error("Ostrich can't fly");
    }
}
const newBird = new Bird();
newBird.fly();
const onebird = new Ostrich();
// onebird.fly();
// good exmple LSP follow
class NewBird {
}
;
class FlyingBird extends Bird {
    fly() {
        console.log("flying....");
    }
}
class Sparrow extends FlyingBird {
}
;
class LSPOstrich extends NewBird {
}
;
function MakeBirdFly(bird) {
    bird.fly();
}
MakeBirdFly(new Sparrow());
class AudioPlayer {
    playAudio() {
        console.log('plying audio only');
    }
}
class FullMediaPlayer {
    playAudio() {
        console.log('playing audio');
    }
    playVideo() {
        console.log('playing video');
    }
}
