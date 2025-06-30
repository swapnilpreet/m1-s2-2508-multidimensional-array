const express = require("express");
const app = express();
const connectDB = require("./config/db");
const vehicleRoutes = require("./routes/vehicleRoutes");
const errorHandler = require("./middleware/errorHandler");

connectDB();
app.use(express.json());

app.use("/api/vehicles", vehicleRoutes);
app.use(errorHandler);

app.listen(3000, () => console.log("Server running on port 3000 🚗"));
