const factorial = require('./factorial');
const values = [5, 7, 10, 0, -3, 'abc'];
values.forEach(value => {
  console.log(factorial(value));
});
