/**
 * Global Request-Response Logging Middleware
 * Logs HTTP method, endpoint, status code, and response time for all requests
 */
const requestLogger = (req, res, next) => {
    const startTime = Date.now();

    // Capture the original res.json to intercept response
    const originalJson = res.json.bind(res);

    res.json = function (body) {
        const endTime = Date.now();
        const responseTime = endTime - startTime;

        // Log request and response details
        console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl} - Status: ${res.statusCode} - ${responseTime}ms`);

        return originalJson(body);
    };

    next();
};

module.exports = requestLogger;
