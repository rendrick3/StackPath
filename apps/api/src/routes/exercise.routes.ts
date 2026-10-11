import { Router, Request, Response } from 'express';
import { requireAuth, AuthRequest } from '../middleware/auth.js';
import { prisma } from '../db.js';
import { exercises, getExerciseByLessonId } from '@stackpath/content';

const router = Router();

// Get exercise by lesson ID
router.get('/lesson/:lessonId', (req: Request, res: Response) => {
  const { lessonId } = req.params;
  const exercise = getExerciseByLessonId(lessonId);

  if (!exercise) {
    res.status(404).json({ message: 'No exercise found for this lesson' });
    return;
  }

  res.json({ exercise });
});

// Record completed exercise attempt
router.post('/:exerciseId/attempt', requireAuth, async (req: AuthRequest, res: Response): Promise<void> => {
  const userId = req.user!.id;
  const { exerciseId } = req.params;
  const { code, passed } = req.body;

  const attempt = await prisma.exerciseAttempt.create({
    data: {
      userId,
      exerciseId,
      code: code || '',
      passed: Boolean(passed)
    }
  });

  if (passed) {
    await prisma.activityRecord.create({
      data: {
        userId,
        type: 'EXERCISE_COMPLETED',
        detail: `Completed practical exercise: ${exerciseId}`
      }
    });
  }

  res.json({ success: true, attemptId: attempt.id });
});

export default router;
