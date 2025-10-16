require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const logger = require("./middleware/logger");
const authRoutes = require("./routes/auth");
const app = express();
const PORT = process.env.PORT || 5000;

connectDB(process.env.MONGODB_URI);
app.use(express.json());
app.use(logger);
app.use("/api/auth", authRoutes);
app.get("/", (req, res) => {
  res.send("Auth Reset API is running");
});
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ message: "Something went wrong" });
});
app.listen(PORT, () => {
  console.log("Server running on",3000);
});