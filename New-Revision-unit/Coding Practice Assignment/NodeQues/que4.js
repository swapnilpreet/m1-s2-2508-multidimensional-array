const fs = require("fs");
const path = require("path");

function combineFiles(folderPath) {
  try {
    const files = fs.readdirSync(folderPath);
    let combined = "";

    files.forEach((file) => {
      const filePath = path.join(folderPath, file);
      const data = fs.readFileSync(filePath, "utf8");
      combined += data + "\n";
    });

    console.log("Combined Content:\n", combined);
    return combined;
  } catch (err) {
    console.error("Error reading files:", err.message);
  }
}

combineFiles("./texts");