const prisma = require('../config/database');


/**
 * POST /api/employees
 * Create a new employee
 */
const createEmployee = async (req, res, next) => {
    try {
        const { first_name, last_name, email, department_id, manager_id } = req.body;

        // Validation
        if (!first_name || !last_name || !email || !department_id) {
            return res.status(400).json({
                success: false,
                error: 'Missing required fields',
                message: 'first_name, last_name, email, and department_id are required'
            });
        }

        // Verify department exists
        const department = await prisma.department.findUnique({
            where: { id: parseInt(department_id) }
        });

        if (!department) {
            return res.status(400).json({
                success: false,
                error: 'Invalid department_id',
                message: 'Department does not exist'
            });
        }

        // Verify manager exists if provided
        if (manager_id) {
            const manager = await prisma.employee.findUnique({
                where: { id: parseInt(manager_id) }
            });

            if (!manager) {
                return res.status(400).json({
                    success: false,
                    error: 'Invalid manager_id',
                    message: 'Manager does not exist'
                });
            }
        }

        const employee = await prisma.employee.create({
            data: {
                first_name,
                last_name,
                email,
                department_id: parseInt(department_id),
                manager_id: manager_id ? parseInt(manager_id) : null
            },
            include: {
                department: true,
                manager: {
                    select: {
                        id: true,
                        first_name: true,
                        last_name: true,
                        email: true
                    }
                }
            }
        });

        res.status(201).json({
            success: true,
            message: 'Employee created successfully',
            data: employee
        });
    } catch (error) {
        next(error);
    }
};

/**
 * GET /api/employees
 * Retrieve all employees with department and manager details (using joins)
 */
const getAllEmployees = async (req, res, next) => {
    try {
        const employees = await prisma.employee.findMany({
            include: {
                department: {
                    select: {
                        id: true,
                        name: true
                    }
                },
                manager: {
                    select: {
                        id: true,
                        first_name: true,
                        last_name: true,
                        email: true
                    }
                }
            },
            orderBy: { id: 'asc' }
        });

        res.status(200).json({
            success: true,
            count: employees.length,
            data: employees
        });
    } catch (error) {
        next(error);
    }
};

/**
 * GET /api/employees/:id
 * Retrieve a single employee by ID with department and manager details (using joins)
 */
const getEmployeeById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const employee = await prisma.employee.findUnique({
            where: { id: parseInt(id) },
            include: {
                department: {
                    select: {
                        id: true,
                        name: true
                    }
                },
                manager: {
                    select: {
                        id: true,
                        first_name: true,
                        last_name: true,
                        email: true
                    }
                }
            }
        });

        if (!employee) {
            return res.status(404).json({
                success: false,
                error: 'Employee not found'
            });
        }

        res.status(200).json({
            success: true,
            data: employee
        });
    } catch (error) {
        next(error);
    }
};

/**
 * PUT /api/employees/:id
 * Update an employee
 */
const updateEmployee = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { first_name, last_name, email, department_id, manager_id } = req.body;

        const employee = await prisma.employee.findUnique({
            where: { id: parseInt(id) }
        });

        if (!employee) {
            return res.status(404).json({
                success: false,
                error: 'Employee not found'
            });
        }

        // Verify department exists if being updated
        if (department_id && parseInt(department_id) !== employee.department_id) {
            const department = await prisma.department.findUnique({
                where: { id: parseInt(department_id) }
            });

            if (!department) {
                return res.status(400).json({
                    success: false,
                    error: 'Invalid department_id',
                    message: 'Department does not exist'
                });
            }
        }

        // Verify manager exists if being updated
        if (manager_id !== undefined && manager_id !== null) {
            // Prevent self-reference
            if (parseInt(manager_id) === parseInt(id)) {
                return res.status(400).json({
                    success: false,
                    error: 'Invalid manager_id',
                    message: 'Employee cannot be their own manager'
                });
            }

            const manager = await prisma.employee.findUnique({
                where: { id: parseInt(manager_id) }
            });

            if (!manager) {
                return res.status(400).json({
                    success: false,
                    error: 'Invalid manager_id',
                    message: 'Manager does not exist'
                });
            }
        }

        // Build update data
        const updateData = {};
        if (first_name) updateData.first_name = first_name;
        if (last_name) updateData.last_name = last_name;
        if (email) updateData.email = email;
        if (department_id) updateData.department_id = parseInt(department_id);
        if (manager_id !== undefined) {
            updateData.manager_id = manager_id ? parseInt(manager_id) : null;
        }

        // Update employee
        const updatedEmployee = await prisma.employee.update({
            where: { id: parseInt(id) },
            data: updateData,
            include: {
                department: true,
                manager: {
                    select: {
                        id: true,
                        first_name: true,
                        last_name: true,
                        email: true
                    }
                }
            }
        });

        res.status(200).json({
            success: true,
            message: 'Employee updated successfully',
            data: updatedEmployee
        });
    } catch (error) {
        next(error);
    }
};

/**
 * DELETE /api/employees/:id
 * Delete an employee
 * If the employee is a manager, sets manager_id = NULL for subordinates (handled by Prisma cascade)
 */
const deleteEmployee = async (req, res, next) => {
    try {
        const { id } = req.params;

        const employee = await prisma.employee.findUnique({
            where: { id: parseInt(id) }
        });

        if (!employee) {
            return res.status(404).json({
                success: false,
                error: 'Employee not found'
            });
        }

        // Delete the employee (Prisma will automatically set manager_id to NULL for subordinates)
        await prisma.employee.delete({
            where: { id: parseInt(id) }
        });

        res.status(200).json({
            success: true,
            message: 'Employee deleted successfully'
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createEmployee,
    getAllEmployees,
    getEmployeeById,
    updateEmployee,
    deleteEmployee
};
