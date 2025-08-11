class GameCharacter {
  name: string;
  lavel: number;
  weapen: string;
  constructor(name: string, lavel: number, weapen: string) {
    this.name = name;
    this.lavel = lavel;
    this.weapen = weapen;
  }
  clone(): GameCharacter {
    return new GameCharacter(this.name, this.lavel, this.weapen);
  }
}

function main1(): void {
  let warrior = new GameCharacter("Warrior", 10, "sword");
  console.log("warrior", warrior);
  let warrioeClone = warrior.clone();
  console.log("clone warrior", warrioeClone);
  // warrioeClone.name="warrior Clone"
  console.log("clone warrior", warrioeClone);
  console.log("Is both are are some", warrior === warrioeClone);
  console.log("Is both are are some", typeof warrior === typeof warrioeClone); // Both objects have the same data type, but they are stored in different memory locations.
  // That’s why `typeof warrior === typeof warrioeClone` returns true (both are objects),
  // but if we compare them directly (warrior === warrioeClone), it will return false
  // because they are different instances in memory.
}

main1();
