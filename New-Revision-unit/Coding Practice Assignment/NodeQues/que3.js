// que3.js
const fs = require("fs");

function appendLine(filePath, newText) {
  try {
    fs.appendFileSync(filePath, `\n${newText}`);
    console.log("New line appended successfully!");
  } catch (err) {
    console.error("Error appending to file:", err.message);
  }
}

appendLine("swapnil.txt", "This is a newly added line.");
