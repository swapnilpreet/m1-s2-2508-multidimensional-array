interface Character {
  name: string;
  getStats(): string;
}

class Warrior implements Character {
  name: string;
  private strength: number;
  private defense: number;
  constructor(name: string) {
    this.name = name;
    this.strength = 90;
    this.defense = 70;
  }
  getStats(): string {
    return `Warrior ${this.name} Strength: ${this.strength}, Defense: ${this.defense}`;
  }
}

class Archer implements Character {
  name: string;
  private agility: number;
  private strength: number;
  constructor(name: string) {
    this.name = name;
    this.agility = 80;
    this.strength = 40;
  }
  getStats(): string {
    return `Archer ${this.name} Agility: ${this.agility}, Strength: ${this.strength}`;
  }
}

class Mage implements Character {
  name: string;
  private intelligence: number;
  private mana: number;
  constructor(name: string) {
    this.name = name;
    this.intelligence = 90;
    this.mana = 100;
  }
  getStats(): string {
    return `Mage ${this.name} Intelligence: ${this.intelligence}, Mana: ${this.mana}`;
  }
}


class CharacterFactory {
  static createCharacter(type: string, name: string): Character {
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
