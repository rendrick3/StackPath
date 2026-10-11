"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApp = createApp;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const auth_routes_js_1 = __importDefault(require("./routes/auth.routes.js"));
const curriculum_routes_js_1 = __importDefault(require("./routes/curriculum.routes.js"));
const progress_routes_js_1 = __importDefault(require("./routes/progress.routes.js"));
const quiz_routes_js_1 = __importDefault(require("./routes/quiz.routes.js"));
const exercise_routes_js_1 = __importDefault(require("./routes/exercise.routes.js"));
const note_routes_js_1 = __importDefault(require("./routes/note.routes.js"));
const bookmark_routes_js_1 = __importDefault(require("./routes/bookmark.routes.js"));
const project_routes_js_1 = __importDefault(require("./routes/project.routes.js"));
const glossary_routes_js_1 = __importDefault(require("./routes/glossary.routes.js"));
const error_js_1 = require("./middleware/error.js");
function createApp() {
    const app = (0, express_1.default)();
    // Security headers & Cross-Origin Resource Sharing
    app.use((0, helmet_1.default)());
    app.use((0, cors_1.default)({
        origin: process.env.CLIENT_URL || 'http://localhost:5173',
        credentials: true
    }));
    // JSON request body parser
    app.use(express_1.default.json());
    // Health check endpoint
    app.get('/healthz', (req, res) => {
        res.json({
            status: 'healthy',
            academy: 'StackPath Academy',
            version: '1.0.0',
            timestamp: new Date().toISOString()
        });
    });
    // API Routes
    app.use('/api/auth', auth_routes_js_1.default);
    app.use('/api/curriculum', curriculum_routes_js_1.default);
    app.use('/api/progress', progress_routes_js_1.default);
    app.use('/api/quizzes', quiz_routes_js_1.default);
    app.use('/api/exercises', exercise_routes_js_1.default);
    app.use('/api/notes', note_routes_js_1.default);
    app.use('/api/bookmarks', bookmark_routes_js_1.default);
    app.use('/api/projects', project_routes_js_1.default);
    app.use('/api/glossary', glossary_routes_js_1.default);
    // Centralized Error Handler
    app.use(error_js_1.errorHandler);
    return app;
}
