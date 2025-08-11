"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = void 0;
class Player {
    constructor(name, character) {
        this.name = name;
        this.character = character;
    }
}
exports.Player = Player;
// Builder
// creating class inside a class
// hold the reference of that class in a variable
Player.Builder = class PlayerBuilder {
    setName(name) {
        this.name = name;
        return this;
    }
    setCharacter(character) {
        this.character = character;
        return this;
    }
    build() {
        return new Player(this.name, this.character);
    }
};
