"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const content_1 = require("@stackpath/content");
const router = (0, express_1.Router)();
// Get all technical glossary terms
router.get('/', (req, res) => {
    res.json({ glossary: content_1.glossary });
});
exports.default = router;
