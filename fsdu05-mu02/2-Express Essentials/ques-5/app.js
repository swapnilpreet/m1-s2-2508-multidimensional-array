const express = require('express');
const loggerMiddleware = require('./middlewares/loggerMiddleware');
const authMiddleware = require('./middlewares/authMiddleware');
const employeeController = require('./controllers/employeeController');

const app = express();
const PORT = 3000;
app.use(express.json());
app.use(loggerMiddleware);
app.get('/employees', authMiddleware(['admin', 'hr']), employeeController.getAllEmployees);
app.post('/employees', authMiddleware(['admin']), employeeController.addEmployee);
app.put('/employees/:id', authMiddleware(['admin', 'hr']), employeeController.updateEmployee);
app.delete('/employees/:id', authMiddleware(['admin']), employeeController.deleteEmployee);
app.get('/', (req, res) => {
  res.status(200).send('Employee Management Backend API is running!');
});
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found.' });
});
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
