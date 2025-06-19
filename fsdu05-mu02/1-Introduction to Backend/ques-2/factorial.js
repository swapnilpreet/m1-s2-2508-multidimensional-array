
function factorial(n){
  if (typeof n!=='number'||isNaN(n)) {
    return `Invalid input: ${n} is not a number.`;
  }
  if(n<0) {
    return `Factorial is not defined for negative numbers: ${n}`;
  }
  if (n===0) {
    return `Factorial of 0 is: 1`;
  }
  let result=1;
  for (let i=2;i<=n;i++) {
    result*=i;
  }
  return `Factorial of ${n} is: ${result}`;
}
module.exports = factorial;
