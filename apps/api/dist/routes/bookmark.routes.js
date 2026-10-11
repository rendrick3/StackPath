"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_js_1 = require("../middleware/auth.js");
const db_js_1 = require("../db.js");
const content_1 = require("@stackpath/content");
const router = (0, express_1.Router)();
// List bookmarks for logged-in user
router.get('/', auth_js_1.requireAuth, async (req, res) => {
    const userId = req.user.id;
    const bookmarks = await db_js_1.prisma.bookmark.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' }
    });
    const enrichedBookmarks = bookmarks.map(b => {
        const lesson = content_1.lessons.find(l => l.id === b.lessonId);
        const module = lesson ? content_1.modules.find(m => m.id === lesson.moduleId) : undefined;
        return {
            id: b.id,
            lessonId: b.lessonId,
            lessonTitle: lesson ? lesson.title : b.lessonId,
            lessonSlug: lesson ? lesson.slug : '',
            moduleTitle: module ? module.title : '',
            createdAt: b.createdAt.toISOString()
        };
    });
    res.json({ bookmarks: enrichedBookmarks });
});
// Toggle bookmark for a lesson
router.post('/toggle', auth_js_1.requireAuth, async (req, res) => {
    const userId = req.user.id;
    const { lessonId } = req.body;
    if (!lessonId) {
        res.status(400).json({ message: 'lessonId is required' });
        return;
    }
    const existing = await db_js_1.prisma.bookmark.findUnique({
        where: {
            userId_lessonId: { userId, lessonId }
        }
    });
    if (existing) {
        await db_js_1.prisma.bookmark.delete({ where: { id: existing.id } });
        res.json({ lessonId, isBookmarked: false });
    }
    else {
        await db_js_1.prisma.bookmark.create({
            data: { userId, lessonId }
        });
        res.json({ lessonId, isBookmarked: true });
    }
});
exports.default = router;
