"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const content_1 = require("@stackpath/content");
const router = (0, express_1.Router)();
// Get all curriculum phases
router.get('/phases', (req, res) => {
    res.json({ phases: content_1.phases });
});
// Get all modules
router.get('/modules', (req, res) => {
    res.json({ modules: content_1.modules });
});
// Get single module by slug
router.get('/modules/:slug', (req, res) => {
    const module = (0, content_1.getModuleBySlug)(req.params.slug);
    if (!module) {
        res.status(404).json({ message: 'Module not found' });
        return;
    }
    const moduleLessons = (0, content_1.getLessonsByModuleId)(module.id);
    const quiz = (0, content_1.getQuizByModuleId)(module.id);
    res.json({
        module,
        lessons: moduleLessons.map(l => ({
            id: l.id,
            order: l.order,
            title: l.title,
            subtitle: l.subtitle,
            slug: l.slug,
            estimatedMinutes: l.estimatedMinutes,
            difficulty: l.difficulty
        })),
        hasQuiz: quiz.length > 0,
        quizQuestionsCount: quiz.length
    });
});
// Get single lesson by slug (full 11 sections)
router.get('/lessons/:slug', (req, res) => {
    const lesson = (0, content_1.getLessonBySlug)(req.params.slug);
    if (!lesson) {
        res.status(404).json({ message: 'Lesson not found' });
        return;
    }
    // Find module details
    const module = content_1.modules.find(m => m.id === lesson.moduleId);
    res.json({
        lesson,
        module
    });
});
// Search across curriculum
router.get('/search', (req, res) => {
    const query = req.query.q || '';
    const results = (0, content_1.searchCurriculum)(query);
    res.json(results);
});
exports.default = router;
