export class Player{
    name:string;
    character:string;

    constructor(name:string, character:string){
        this.name = name;
        this.character = character;
    }


    // Builder
    // creating class inside a class
    // hold the reference of that class in a variable

    static Builder = class PlayerBuilder{
        // build object of Player
        // set name
        // set character    
        // build -> Player

        private name!:string;
        private character!:string;

        setName(name:string):PlayerBuilder{
            this.name = name;
            return this;
        }

        setCharacter(character:string):PlayerBuilder{
            this.character = character;
            return this;
        }

        build():Player{
            return new Player(this.name, this.character)
        }
    }

}