"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_js_1 = require("../middleware/auth.js");
const db_js_1 = require("../db.js");
const content_1 = require("@stackpath/content");
const router = (0, express_1.Router)();
// Get quiz questions for a module
router.get('/:moduleId', (req, res) => {
    const { moduleId } = req.params;
    const questions = (0, content_1.getQuizByModuleId)(moduleId);
    const module = content_1.modules.find(m => m.id === moduleId);
    if (!questions || questions.length === 0) {
        res.status(404).json({ message: 'No quiz found for this module' });
        return;
    }
    // Omit correctOptionIndex so the student cannot inspect network response to cheat!
    const sanitizedQuestions = questions.map(q => ({
        id: q.id,
        type: q.type,
        question: q.question,
        options: q.options
    }));
    res.json({
        moduleId,
        moduleTitle: module?.title || moduleId,
        totalQuestions: questions.length,
        questions: sanitizedQuestions
    });
});
// Submit quiz answers and calculate results
router.post('/:moduleId/attempt', auth_js_1.requireAuth, async (req, res) => {
    const userId = req.user.id;
    const { moduleId } = req.params;
    const { answers } = req.body; // Array of { questionId, selectedIndex }
    const questions = (0, content_1.getQuizByModuleId)(moduleId);
    if (!questions || questions.length === 0) {
        res.status(404).json({ message: 'No quiz found for this module' });
        return;
    }
    if (!answers || !Array.isArray(answers)) {
        res.status(400).json({ message: 'Answers array is required' });
        return;
    }
    let score = 0;
    const answersEvaluation = questions.map(q => {
        const studentAnswer = answers.find(a => a.questionId === q.id);
        const selectedIndex = studentAnswer ? studentAnswer.selectedIndex : -1;
        const isCorrect = selectedIndex === q.correctOptionIndex;
        if (isCorrect)
            score++;
        return {
            questionId: q.id,
            question: q.question,
            selectedIndex,
            correctIndex: q.correctOptionIndex,
            isCorrect,
            explanation: q.explanation
        };
    });
    const totalQuestions = questions.length;
    const percentage = Math.round((score / totalQuestions) * 100);
    const passed = percentage >= 70;
    // Persist attempt to database
    const attempt = await db_js_1.prisma.quizAttempt.create({
        data: {
            userId,
            quizId: moduleId,
            score,
            totalQuestions,
            percentage,
            passed,
            answersJson: JSON.stringify(answersEvaluation)
        }
    });
    // Record activity
    await db_js_1.prisma.activityRecord.create({
        data: {
            userId,
            type: 'QUIZ_ATTEMPT',
            detail: `Scored ${percentage}% on ${moduleId} quiz (${passed ? 'Passed' : 'Needs Practice'})`
        }
    });
    res.json({
        attemptId: attempt.id,
        quizId: moduleId,
        score,
        totalQuestions,
        percentage,
        passed,
        answers: answersEvaluation
    });
});
// Get quiz history for student
router.get('/:moduleId/history', auth_js_1.requireAuth, async (req, res) => {
    const userId = req.user.id;
    const { moduleId } = req.params;
    const attempts = await db_js_1.prisma.quizAttempt.findMany({
        where: { userId, quizId: moduleId },
        orderBy: { createdAt: 'desc' }
    });
    res.json({ attempts });
});
exports.default = router;
