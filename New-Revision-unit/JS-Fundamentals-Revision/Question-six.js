function Calculator() {
  this.total = 0;
  this.add = (x) => {
    this.total += x;
    return (y) => {
      this.total += y;
      return (z) => {
        this.total += z;
        return this.total;
      };
    };
  };
}
const calc = new Calculator();
console.log(calc.add(5)(10)(15));

