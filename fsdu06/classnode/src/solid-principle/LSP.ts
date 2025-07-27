
// bad example
class Bird{
    fly():void{
        console.log("flying....")
    }
}

class Ostrich extends Bird{
    fly():void{
        throw new Error("Ostrich can't fly")
    }
}

const newBird=new Bird();
newBird.fly();
const onebird=new Ostrich();
// onebird.fly();



// good exmple LSP follow

class NewBird{};

class FlyingBird extends Bird{
    fly():void{
        console.log("flying....")
    }
}

class Sparrow extends FlyingBird{};


class LSPOstrich extends NewBird{};


function MakeBirdFly(bird:FlyingBird){
    bird.fly();
}

MakeBirdFly(new Sparrow());



interface AudioPlayable{
    playAudio():void;
}

interface VideoPlayable extends AudioPlayable{
    playVideo():void;
}

class AudioPlayer implements AudioPlayable{
    playAudio(): void {
        console.log('plying audio only');
    }
}

class FullMediaPlayer implements VideoPlayable{
    playAudio(): void {
        console.log('playing audio');
        
    }
    playVideo(): void {
        console.log('playing video');
        
    }
}