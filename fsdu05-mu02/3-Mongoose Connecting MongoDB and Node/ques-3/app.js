const express = require('express');
const app = express();
const connectDB = require('./config/db');
const libraryRoutes = require('./routes/routes');
require('dotenv').config();

app.use(express.json());
app.use('/library', libraryRoutes);

const PORT = process.env.PORT || 8080;
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
