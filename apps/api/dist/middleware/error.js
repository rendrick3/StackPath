"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = errorHandler;
const zod_1 = require("zod");
function errorHandler(err, req, res, next) {
    console.error('Unhandled Application Error:', err);
    if (err instanceof zod_1.ZodError || err?.name === 'ZodError' || Array.isArray(err?.issues)) {
        const issues = err.issues || err.errors || [];
        res.status(400).json({
            message: 'Validation failed',
            errors: issues.map((e) => ({
                field: Array.isArray(e.path) ? e.path.join('.') : String(e.path || ''),
                message: e.message
            }))
        });
        return;
    }
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal server error';
    res.status(statusCode).json({
        message,
        ...(process.env.NODE_ENV !== 'production' && { stack: err.stack })
    });
}
