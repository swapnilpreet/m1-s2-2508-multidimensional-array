const Employee = require('../models/Employee');
 
exports.getAllEmployees = (req, res) => {
  const employees = Employee.findAll();
  res.status(200).json(employees);
};

 
exports.getEmployeeById = (req, res) => {
  const { id } = req.params;
  const employee = Employee.findById(id);

  if (employee) {
    res.status(200).json(employee);
  } else {
    res.status(404).json({ message: 'Employee not found.' });
  }
};


 
exports.addEmployee = (req, res) => {
  const { name, position, department, salary, status } = req.body;
 
  if (!name || !position || !department || !salary) {
    return res.status(400).json({ message: 'Missing required employee fields: name, position, department, salary.' });
  }
 
  if (isNaN(salary)) {
    return res.status(400).json({ message: 'Salary must be a number.' });
  }

  const newEmployee = Employee.add({ name, position, department, salary: parseFloat(salary), status });
  res.status(201).json({ message: 'Employee added successfully', employee: newEmployee });
};

 
exports.updateEmployee = (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
 
  if (updateData.salary && isNaN(updateData.salary)) {
    return res.status(400).json({ message: 'Salary must be a number if provided for update.' });
  }

  const updatedEmployee = Employee.update(id, updateData);

  if (updatedEmployee) {
    res.status(200).json({ message: 'Employee updated successfully', employee: updatedEmployee });
  } else {
    res.status(404).json({ message: 'Employee not found.' });
  }
};

 
exports.deleteEmployee = (req, res) => {
  const { id } = req.params;
  const deleted = Employee.remove(id);

  if (deleted) {
    res.status(200).json({ message: 'Employee deleted successfully.' });
  } else {
    res.status(404).json({ message: 'Employee not found.' });
  }
};
