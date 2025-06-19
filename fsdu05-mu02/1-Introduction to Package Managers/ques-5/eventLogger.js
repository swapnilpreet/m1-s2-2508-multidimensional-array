const EventEmitter = require("events");
const fs = require("fs");
const path = require("path");
const logger = new EventEmitter();
const logFilePath = path.join(__dirname, "eventLogs.txt");

logger.on("log", (message) => {
  const timestamp = new Date().toISOString();
  const logEntry = `[${timestamp}] ${message}\n`;
  console.log(logEntry);
  fs.appendFile(logFilePath, logEntry, (err) => {
    if (err) console.error("Failed to write log:", err);
  });
});

module.exports = logger;