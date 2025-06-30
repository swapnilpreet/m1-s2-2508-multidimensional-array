const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/user.route");
const connectDB = require("./config/db");

const app = express();
app.use(express.json());

connectDB();

app.use("/api", userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
