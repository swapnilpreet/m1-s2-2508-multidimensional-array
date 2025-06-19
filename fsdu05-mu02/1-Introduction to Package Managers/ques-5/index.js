const express = require("express");
const logger = require("./eventLogger");
const delayMessage = require("./delay");
const app = express();
const PORT = 3000;

app.get("/test", (req, res) => {
  res.send("Test route is working!");
});

app.get("/emit", (req, res) => {
  const message = req.query.message;
  if (!message) {
    return res.status(400).json({ error: "Missing 'message' query parameter." });
  }

  logger.emit("log", message);
  res.json({
    status: "Event logged",
    timestamp: new Date().toISOString(),
  });
});

app.get("/delay", async (req, res) => {
  const { message, time } = req.query;
  if (!message || !time || isNaN(time)) {
    return res.status(400).json({ error: "Invalid or missing 'message' or 'time' query parameters." });
  }

  try {
    const result = await delayMessage(message, time);
    res.json({ message: result, delay: `${time}ms` });
  } catch (err) {
    res.status(500).json({ error: "Failed to process delay." });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
