interface Character {
  getStats(): string;
}
class Warrior implements Character {
  constructor(private name: string) {}
  getStats(): string {
    return `Warrior ${this.name} - Strength: 90, Defense: 80`;
  }
}
class Archer implements Character {
  constructor(private name: string) {}
  getStats(): string {
    return `Archer ${this.name} - Agility: 80, Strength: 40`;
  }
}
class Mage implements Character {
  constructor(private name: string) {}
  getStats(): string {
    return `Mage ${this.name} - Intelligence: 90, Mana: 100`;
  }
}
class CharacterFactory {
  static createCharacter(type: "Warrior" | "Archer" | "Mage", name: string): Character {
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