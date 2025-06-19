const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'data.txt');
function readFileData() {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      if (err.code === 'ENOENT') {
        console.log('Initial File Content:\nFile does not exist yet.\n');
      } else {
        console.error('Error reading file:', err);
      }
    } else {
      console.log('File Content:\n' + (data || 'File is empty.') + '\n');
    }
  });
}
function appendFileData() {
  const contentToAppend = 'This is Appended data\n';
  fs.appendFile(filePath, contentToAppend, (err) => {
    if (err) {
      console.error('Error appending to file:', err);
    } else {
      console.log('Appending data...\n');
    }
  });
}

module.exports = {
  readFileData,
  appendFileData
};
