"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_js_1 = require("../middleware/auth.js");
const db_js_1 = require("../db.js");
const content_1 = require("@stackpath/content");
const router = (0, express_1.Router)();
// Get exercise by lesson ID
router.get('/lesson/:lessonId', (req, res) => {
    const { lessonId } = req.params;
    const exercise = (0, content_1.getExerciseByLessonId)(lessonId);
    if (!exercise) {
        res.status(404).json({ message: 'No exercise found for this lesson' });
        return;
    }
    res.json({ exercise });
});
// Record completed exercise attempt
router.post('/:exerciseId/attempt', auth_js_1.requireAuth, async (req, res) => {
    const userId = req.user.id;
    const { exerciseId } = req.params;
    const { code, passed } = req.body;
    const attempt = await db_js_1.prisma.exerciseAttempt.create({
        data: {
            userId,
            exerciseId,
            code: code || '',
            passed: Boolean(passed)
        }
    });
    if (passed) {
        await db_js_1.prisma.activityRecord.create({
            data: {
                userId,
                type: 'EXERCISE_COMPLETED',
                detail: `Completed practical exercise: ${exerciseId}`
            }
        });
    }
    res.json({ success: true, attemptId: attempt.id });
});
exports.default = router;
