"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const shared_1 = require("@stackpath/shared");
const db_js_1 = require("../db.js");
const auth_js_1 = require("../middleware/auth.js");
const router = (0, express_1.Router)();
const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_jwt_key_stackpath_academy_dev_2026';
// Register a new student
router.post('/register', async (req, res, next) => {
    try {
        const parsed = shared_1.registerSchema.parse(req.body);
        const existingUser = await db_js_1.prisma.user.findUnique({
            where: { email: parsed.email.toLowerCase().trim() }
        });
        if (existingUser) {
            res.status(400).json({ message: 'An account with this email address already exists' });
            return;
        }
        const salt = await bcryptjs_1.default.genSalt(10);
        const passwordHash = await bcryptjs_1.default.hash(parsed.password, salt);
        const user = await db_js_1.prisma.user.create({
            data: {
                email: parsed.email.toLowerCase().trim(),
                name: parsed.name.trim(),
                passwordHash,
                role: 'STUDENT'
            },
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
                createdAt: true
            }
        });
        // Record initial registration activity
        await db_js_1.prisma.activityRecord.create({
            data: {
                userId: user.id,
                type: 'ENROLLED',
                detail: 'Enrolled in StackPath Academy'
            }
        });
        const token = jsonwebtoken_1.default.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });
        res.status(201).json({
            user: {
                ...user,
                createdAt: user.createdAt.toISOString()
            },
            token
        });
    }
    catch (error) {
        next(error);
    }
});
// Login existing student
router.post('/login', async (req, res, next) => {
    try {
        const parsed = shared_1.loginSchema.parse(req.body);
        const user = await db_js_1.prisma.user.findUnique({
            where: { email: parsed.email.toLowerCase().trim() }
        });
        if (!user) {
            res.status(401).json({ message: 'Invalid email address or password' });
            return;
        }
        const isMatch = await bcryptjs_1.default.compare(parsed.password, user.passwordHash);
        if (!isMatch) {
            res.status(401).json({ message: 'Invalid email address or password' });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });
        res.json({
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
                createdAt: user.createdAt.toISOString()
            },
            token
        });
    }
    catch (error) {
        next(error);
    }
});
// Get currently logged-in user profile
router.get('/me', auth_js_1.requireAuth, async (req, res) => {
    if (!req.user) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }
    res.json({ user: req.user });
});
exports.default = router;
