"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuth = requireAuth;
exports.optionalAuth = optionalAuth;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_js_1 = require("../db.js");
const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_jwt_key_stackpath_academy_dev_2026';
async function requireAuth(req, res, next) {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            res.status(401).json({ message: 'Authentication token required' });
            return;
        }
        const token = authHeader.split(' ')[1];
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        const user = await db_js_1.prisma.user.findUnique({
            where: { id: decoded.userId },
            select: { id: true, email: true, name: true, role: true }
        });
        if (!user) {
            res.status(401).json({ message: 'User account not found' });
            return;
        }
        req.user = user;
        next();
    }
    catch (error) {
        res.status(401).json({ message: 'Invalid or expired authentication token' });
    }
}
async function optionalAuth(req, res, next) {
    try {
        const authHeader = req.headers.authorization;
        if (authHeader && authHeader.startsWith('Bearer ')) {
            const token = authHeader.split(' ')[1];
            const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
            const user = await db_js_1.prisma.user.findUnique({
                where: { id: decoded.userId },
                select: { id: true, email: true, name: true, role: true }
            });
            if (user) {
                req.user = user;
            }
        }
    }
    catch (err) {
        // Ignore invalid tokens for optional auth
    }
    next();
}
