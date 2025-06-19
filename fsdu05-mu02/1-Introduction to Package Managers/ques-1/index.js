import boxen from "boxen";

const message = 'I am using my first external module!';
const title = 'Hurray!!!';
console.log(
  boxen(message, { title ,borderStyle:"classic",titleAlignment: 'center'})
);
 
console.log(
  boxen(message, { title, borderStyle: 'singleDouble',titleAlignment: 'center'})
);

console.log(
  boxen('unicorns love rainbows', { title, borderStyle: 'round',titleAlignment: 'center'})
);
