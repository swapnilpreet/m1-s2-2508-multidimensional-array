const { readFileData, appendFileData } = require("./fileOperations");
readFileData();
setTimeout(() => {
  appendFileData();
  setTimeout(() => {
    readFileData();
  }, 500);
}, 500);
