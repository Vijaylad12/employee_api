const prisma = require('../config/database');

/**
 * Controller for Department-related operations
 */

/**
 * POST /api/departments
 * Create a new department
 */
const createDepartment = async (req, res, next) => {
    try {
        const { name } = req.body;

        // Validation
        if (!name || name.trim() === '') {
            return res.status(400).json({
                success: false,
                error: 'Department name is required'
            });
        }

        const department = await prisma.department.create({
            data: { name: name.trim() }
        });

        res.status(201).json({
            success: true,
            message: 'Department created successfully',
            data: department
        });
    } catch (error) {
        next(error);
    }
};

/**
 * GET /api/departments
 * Retrieve all departments
 */
const getAllDepartments = async (req, res, next) => {
    try {
        const departments = await prisma.department.findMany({
            orderBy: { id: 'asc' }
        });

        res.status(200).json({
            success: true,
            count: departments.length,
            data: departments
        });
    } catch (error) {
        next(error);
    }
};

/**
 * DELETE /api/departments/:id
 * Delete a department (blocked if employees exist)
 */
const deleteDepartment = async (req, res, next) => {
    try {
        const { id } = req.params;
        const departmentId = parseInt(id);

        const department = await prisma.department.findUnique({
            where: { id: departmentId }
        });

        if (!department) {
            return res.status(404).json({
                success: false,
                error: 'Department not found'
            });
        }

        // Check if department has employees
        const employeeCount = await prisma.employee.count({
            where: { department_id: departmentId }
        });

        if (employeeCount > 0) {
            return res.status(400).json({
                success: false,
                error: 'Cannot delete department',
                message: `Department has ${employeeCount} employee(s). Please reassign or remove employees first.`
            });
        }

        await prisma.department.delete({
            where: { id: departmentId }
        });

        res.status(200).json({
            success: true,
            message: 'Department deleted successfully'
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createDepartment,
    getAllDepartments,
    deleteDepartment
};
