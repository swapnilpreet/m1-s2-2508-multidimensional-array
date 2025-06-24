const { v4: uuidv4 } = require('uuid');

 
let employees = [
  { id: uuidv4(), name: 'Alice Smith', position: 'Software Engineer', department: 'Engineering', salary: 90000, status: 'active' },
  { id: uuidv4(), name: 'Bob Johnson', position: 'HR Manager', department: 'Human Resources', salary: 80000, status: 'active' },
  { id: uuidv4(), name: 'Charlie Brown', position: 'Project Manager', department: 'Product', salary: 110000, status: 'active' },
  { id: uuidv4(), name: 'Diana Prince', position: 'Marketing Specialist', department: 'Marketing', salary: 75000, status: 'active' },
];

 
exports.findAll = () => {
  return employees;
};

 
exports.findById = (id) => {
  return employees.find(emp => emp.id === id);
};
 
exports.add = (employeeData) => {
  const newEmployee = {
    id: uuidv4(),
    ...employeeData,
    status: employeeData.status || 'active'
  };
  employees.push(newEmployee);
  return newEmployee;
};

 
exports.update = (id, updateData) => {
  const index = employees.findIndex(emp => emp.id === id);
  if (index !== -1) {
    employees[index] = { ...employees[index], ...updateData };
    return employees[index];
  }
  return null;
};

exports.remove = (id) => {
  const initialLength = employees.length;
  employees = employees.filter(emp => emp.id !== id);
  return employees.length < initialLength;
};
