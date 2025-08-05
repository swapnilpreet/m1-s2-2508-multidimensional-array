"use strict";
class Warrior {
    constructor(name) {
        this.name = name;
        this.strength = 90;
        this.defense = 70;
    }
    getStats() {
        return `Warrior ${this.name} Strength: ${this.strength}, Defense: ${this.defense}`;
    }
}
class Archer {
    constructor(name) {
        this.name = name;
        this.agility = 80;
        this.strength = 40;
    }
    getStats() {
        return `Archer ${this.name} Agility: ${this.agility}, Strength: ${this.strength}`;
    }
}
class Mage {
    constructor(name) {
        this.name = name;
        this.intelligence = 90;
        this.mana = 100;
    }
    getStats() {
        return `Mage ${this.name} Intelligence: ${this.intelligence}, Mana: ${this.mana}`;
    }
}
class CharacterFactory {
    static createCharacter(type, name) {
        switch (type.toLowerCase()) {
            case "warrior":
                return new Warrior(name);
            case "archer":
                return new Archer(name);
            case "mage":
                return new Mage(name);
            default:
                throw new Error("Invalid character type");
        }
    }
}
const archer = CharacterFactory.createCharacter("Archer", "Eldrin");
console.log(archer.getStats());
const mage = CharacterFactory.createCharacter("Mage", "Gandalf");
console.log(mage.getStats());
