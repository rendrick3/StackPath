import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import authRoutes from './routes/auth.routes.js';
import curriculumRoutes from './routes/curriculum.routes.js';
import progressRoutes from './routes/progress.routes.js';
import quizRoutes from './routes/quiz.routes.js';
import exerciseRoutes from './routes/exercise.routes.js';
import noteRoutes from './routes/note.routes.js';
import bookmarkRoutes from './routes/bookmark.routes.js';
import projectRoutes from './routes/project.routes.js';
import glossaryRoutes from './routes/glossary.routes.js';
import { errorHandler } from './middleware/error.js';

export function createApp() {
  const app = express();

  // Security headers & Cross-Origin Resource Sharing
  app.use(helmet());
  app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true
  }));

  // JSON request body parser
  app.use(express.json());

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
  app.use('/api/auth', authRoutes);
  app.use('/api/curriculum', curriculumRoutes);
  app.use('/api/progress', progressRoutes);
  app.use('/api/quizzes', quizRoutes);
  app.use('/api/exercises', exerciseRoutes);
  app.use('/api/notes', noteRoutes);
  app.use('/api/bookmarks', bookmarkRoutes);
  app.use('/api/projects', projectRoutes);
  app.use('/api/glossary', glossaryRoutes);

  // Centralized Error Handler
  app.use(errorHandler);

  return app;
}
