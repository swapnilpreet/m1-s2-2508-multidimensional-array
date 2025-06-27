const express = require('express');
const connectDB = require('./config/db');
const taskRoutes = require('./routes/routes');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use('/', taskRoutes);

const PORT = process.env.PORT || 8000;
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
