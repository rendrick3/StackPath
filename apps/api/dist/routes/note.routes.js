"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_js_1 = require("../middleware/auth.js");
const db_js_1 = require("../db.js");
const content_1 = require("@stackpath/content");
const router = (0, express_1.Router)();
// List all personal notes for logged-in student
router.get('/', auth_js_1.requireAuth, async (req, res) => {
    const userId = req.user.id;
    const notes = await db_js_1.prisma.personalNote.findMany({
        where: { userId },
        orderBy: { updatedAt: 'desc' }
    });
    const notesWithMetadata = notes.map(n => {
        const lesson = content_1.lessons.find(l => l.id === n.lessonId);
        return {
            ...n,
            lessonTitle: lesson ? lesson.title : n.lessonId,
            lessonSlug: lesson ? lesson.slug : ''
        };
    });
    res.json({ notes: notesWithMetadata });
});
// Get note for a specific lesson
router.get('/:lessonId', auth_js_1.requireAuth, async (req, res) => {
    const userId = req.user.id;
    const { lessonId } = req.params;
    const note = await db_js_1.prisma.personalNote.findUnique({
        where: {
            userId_lessonId: { userId, lessonId }
        }
    });
    res.json({ note: note || null });
});
// Upsert personal note for a lesson
router.post('/:lessonId', auth_js_1.requireAuth, async (req, res) => {
    const userId = req.user.id;
    const { lessonId } = req.params;
    const { content } = req.body;
    if (typeof content !== 'string') {
        res.status(400).json({ message: 'Content string is required' });
        return;
    }
    const lesson = content_1.lessons.find(l => l.id === lessonId);
    const lessonTitle = lesson ? lesson.title : lessonId;
    const note = await db_js_1.prisma.personalNote.upsert({
        where: {
            userId_lessonId: { userId, lessonId }
        },
        update: {
            content
        },
        create: {
            userId,
            lessonId,
            content
        }
    });
    await db_js_1.prisma.activityRecord.create({
        data: {
            userId,
            type: 'NOTE_SAVED',
            detail: `Saved study note for ${lessonTitle}`
        }
    });
    res.json({ note });
});
// Delete note for a lesson
router.delete('/:lessonId', auth_js_1.requireAuth, async (req, res) => {
    const userId = req.user.id;
    const { lessonId } = req.params;
    await db_js_1.prisma.personalNote.deleteMany({
        where: {
            userId,
            lessonId
        }
    });
    res.json({ message: 'Note deleted successfully' });
});
exports.default = router;
