"use strict";
class Warrior {
    constructor(name) {
        this.name = name;
    }
    getStats() {
        return `Warrior ${this.name} - Strength: 90, Defense: 80`;
    }
}
class Archer {
    constructor(name) {
        this.name = name;
    }
    getStats() {
        return `Archer ${this.name} - Agility: 80, Strength: 40`;
    }
}
class Mage {
    constructor(name) {
        this.name = name;
    }
    getStats() {
        return `Mage ${this.name} - Intelligence: 90, Mana: 100`;
    }
}
class CharacterFactory {
    static createCharacter(type, name) {
        switch (type) {
            case "Warrior":
                return new Warrior(name);
            case "Archer":
                return new Archer(name);
            case "Mage":
                return new Mage(name);
            default:
                throw new Error("Unknown character type");
        }
    }
}
const archer = CharacterFactory.createCharacter("Archer", "Eldrin");
const mage = CharacterFactory.createCharacter("Mage", "Gandalf");
console.log(archer.getStats());
console.log(mage.getStats());
