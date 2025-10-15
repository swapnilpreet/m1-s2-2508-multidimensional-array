const fs = require("fs");
const path = require("path");
const message = process.argv[2];
if (!message) {
  console.log("Please enter a log message. Example: node logger.js User logged in");
  process.exit();
}
const now = new Date();
const year = now.getFullYear();
const month = String(now.getMonth() + 1).padStart(2, "0");
const day = String(now.getDate()).padStart(2, "0");
const hours = String(now.getHours()).padStart(2, "0");
const minutes = String(now.getMinutes()).padStart(2, "0");
const seconds = String(now.getSeconds()).padStart(2, "0");

 
const dateTime = `[${year}-${month}-${day} ${hours}:${minutes}:${seconds}]`;
const log = `${dateTime} ${message}\n`;
 
const filePath = path.join(__dirname, "logs.txt");
fs.appendFile(filePath, log, function (err) {
  if (err) {
    console.log("Something went wrong while saving the log");
  } else {
    console.log("Log saved successfully!");
  }
});
