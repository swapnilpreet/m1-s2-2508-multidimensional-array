const express = require('express');
const connectDB = require('./config/db');
const taskRoutes = require('./routes/routes');
require('dotenv').config();

const app = express();
app.use(express.json());

app.use('/', taskRoutes);

// app.use('*', (req, res) => {
//   res.status(404).json({ error: '404 Not Found' });
// });

const PORT = process.env.PORT || 8080;

connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
