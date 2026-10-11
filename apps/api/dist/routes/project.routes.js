"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const content_1 = require("@stackpath/content");
const router = (0, express_1.Router)();
// Get all project guides
router.get('/', (req, res) => {
    res.json({ projects: content_1.projects });
});
// Get specific project guide by id
router.get('/:id', (req, res) => {
    const project = (0, content_1.getProjectById)(req.params.id);
    if (!project) {
        res.status(404).json({ message: 'Project not found' });
        return;
    }
    res.json({ project });
});
exports.default = router;
