import { Router, Request, Response } from 'express';
import {
  phases,
  modules,
  lessons,
  getModuleBySlug,
  getLessonBySlug,
  getLessonsByModuleId,
  searchCurriculum,
  getQuizByModuleId
} from '@stackpath/content';

const router = Router();

// Get all curriculum phases
router.get('/phases', (req: Request, res: Response) => {
  res.json({ phases });
});

// Get all modules
router.get('/modules', (req: Request, res: Response) => {
  res.json({ modules });
});

// Get single module by slug
router.get('/modules/:slug', (req: Request, res: Response) => {
  const module = getModuleBySlug(req.params.slug);
  if (!module) {
    res.status(404).json({ message: 'Module not found' });
    return;
  }

  const moduleLessons = getLessonsByModuleId(module.id);
  const quiz = getQuizByModuleId(module.id);

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
router.get('/lessons/:slug', (req: Request, res: Response) => {
  const lesson = getLessonBySlug(req.params.slug);
  if (!lesson) {
    res.status(404).json({ message: 'Lesson not found' });
    return;
  }

  // Find module details
  const module = modules.find(m => m.id === lesson.moduleId);

  res.json({
    lesson,
    module
  });
});

// Search across curriculum
router.get('/search', (req: Request, res: Response) => {
  const query = (req.query.q as string) || '';
  const results = searchCurriculum(query);
  res.json(results);
});

export default router;
