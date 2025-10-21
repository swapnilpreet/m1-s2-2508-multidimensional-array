const fs = require("fs");

function countLines(filePath) {
  try {
    if (!fs.existsSync(filePath)) {
      const dummyText = `Hello World
        This is a sample text file.
        It contains multiple lines
        for testing the countLines function.`;
      fs.writeFileSync(filePath, dummyText, "utf8");
      console.log(`File '${filePath}' created with dummy content.`);
    }
    const data = fs.readFileSync(filePath, "utf8");
    const lines = data.split("\n").length;
    console.log(`File: ${filePath}`);
    console.log(`Total number of lines: ${lines}`);
  } catch (err) {
    console.error("Error reading file:", err.message);
  }
}

countLines("swapnil.txt");
