const fs = require("fs");
function getFileStats(filePath) {
  try {
    const stats = fs.statSync(filePath);
    const info = {
      size: stats.size + " bytes",
      createdAt: stats.birthtime,
      modifiedAt: stats.mtime,
    };
    console.log(info);
    return info;
  } catch (err) {
    console.error("Error getting file stats:", err.message);
  }
}
getFileStats("swapnil.txt");