const express = require('express');
const router = express.Router();
const {
    createEmployee,
    getAllEmployees,
    getEmployeeById,
    updateEmployee,
    deleteEmployee
} = require('../controllers/employeeController');

/**
 * Employee Routes
 */

// POST /api/employees - Create a new employee
router.post('/', createEmployee);

// GET /api/employees - Get all employees with joins
router.get('/', getAllEmployees);

// GET /api/employees/:id - Get a single employee by ID with joins
router.get('/:id', getEmployeeById);

// PUT /api/employees/:id - Update an employee
router.put('/:id', updateEmployee);

// DELETE /api/employees/:id - Delete an employee
router.delete('/:id', deleteEmployee);

module.exports = router;
