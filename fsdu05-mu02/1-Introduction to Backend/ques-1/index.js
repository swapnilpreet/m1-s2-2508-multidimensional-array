const isPrime = require('./isPrime');

const numbersToCheck = [2, 10, 17, 21, 29, -5, 'hello'];

numbersToCheck.forEach(num => {
  console.log(isPrime(num));
});
