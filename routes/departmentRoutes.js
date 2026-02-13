const express = require('express');
const router = express.Router();
const {
    createDepartment,
    getAllDepartments,
    deleteDepartment
} = require('../controllers/departmentController');

/**
 * Department Routes
 */

// POST /api/departments - Create a new department
router.post('/', createDepartment);

// GET /api/departments - Get all departments
router.get('/', getAllDepartments);

// DELETE /api/departments/:id - Delete a department
router.delete('/:id', deleteDepartment);

module.exports = router;
