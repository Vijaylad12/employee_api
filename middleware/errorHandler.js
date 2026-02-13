/**
 * Global Error Handling Middleware
 * Handles all errors and sends appropriate HTTP status codes with formatted responses
 */
const errorHandler = (err, req, res, next) => {
    console.error('Error:', err);

    // Prisma validation errors
    if (err.code === 'P2002') {
        // Unique constraint violation
        return res.status(409).json({
            success: false,
            error: 'Duplicate Entry',
            message: `${err.meta?.target?.join(', ') || 'Field'} already exists`
        });
    }

    if (err.code === 'P2003') {
        // Foreign key constraint violation
        return res.status(400).json({
            success: false,
            error: 'Foreign Key Constraint Violation',
            message: 'Referenced record does not exist'
        });
    }

    if (err.code === 'P2025') {
        // Record not found
        return res.status(404).json({
            success: false,
            error: 'Resource Not Found',
            message: 'The requested record does not exist'
        });
    }

    // Prisma general errors
    if (err.code && err.code.startsWith('P')) {
        return res.status(400).json({
            success: false,
            error: 'Database Error',
            message: err.message
        });
    }

    // Custom application errors
    if (err.statusCode) {
        return res.status(err.statusCode).json({
            success: false,
            error: err.message
        });
    }

    // Default server error
    res.status(500).json({
        success: false,
        error: 'Internal Server Error',
        message: process.env.NODE_ENV === 'development' ? err.message : 'An unexpected error occurred'
    });
};

module.exports = errorHandler;
