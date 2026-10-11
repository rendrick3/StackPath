import { Router, Response } from 'express';
import { requireAuth, AuthRequest } from '../middleware/auth.js';
import { prisma } from '../db.js';
import { lessons, modules } from '@stackpath/content';

const router = Router();

// Get real persisted learning statistics for the authenticated student
router.get('/stats', requireAuth, async (req: AuthRequest, res: Response): Promise<void> => {
  const userId = req.user!.id;

  const [completedRecords, quizAttempts, bookmarksCount, notesCount, activities] = await Promise.all([
    prisma.lessonProgress.findMany({
      where: { userId, completed: true }
    }),
    prisma.quizAttempt.findMany({
      where: { userId },
      select: { score: true, totalQuestions: true, percentage: true }
    }),
    prisma.bookmark.count({ where: { userId } }),
    prisma.personalNote.count({ where: { userId } }),
    prisma.activityRecord.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 20
    })
  ]);

  const totalLessons = lessons.length;
  const completedCount = completedRecords.length;
  const overallPercentage = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  // Calculate average quiz score
  let avgQuizScore = 0;
  if (quizAttempts.length > 0) {
    const totalPct = quizAttempts.reduce((acc, q) => acc + q.percentage, 0);
    avgQuizScore = Math.round(totalPct / quizAttempts.length);
  }

  // Find next lesson to resume
  const completedIds = new Set(completedRecords.map(r => r.lessonId));
  const nextLesson = lessons.find(l => !completedIds.has(l.id)) || lessons[0];
  const nextModule = modules.find(m => m.id === nextLesson?.moduleId) || modules[0];

  // Derive weekly activity distribution (last 7 days)
  const days: { date: string; count: number }[] = [];
  const now = new Date();
  for (let i = 6; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    const count = activities.filter(a => a.createdAt.toISOString().startsWith(dateStr)).length;
    days.push({ date: dateStr, count });
  }

  // Calculate daily streak
  let streak = 0;
  for (let i = days.length - 1; i >= 0; i--) {
    if (days[i].count > 0) {
      streak++;
    } else if (i === days.length - 1) {
      // today might be 0 so check yesterday
      continue;
    } else {
      break;
    }
  }

  res.json({
    totalLessons,
    completedLessonsCount: completedCount,
    overallPercentage,
    currentPhaseNumber: nextModule.phaseId,
    currentModuleName: nextModule.title,
    currentLessonSlug: nextLesson.slug,
    currentLessonTitle: nextLesson.title,
    quizzesTaken: quizAttempts.length,
    averageQuizScore: avgQuizScore,
    exercisesCompletedCount: 0,
    dailyStreak: streak,
    weeklyActivity: days,
    bookmarksCount,
    notesCount,
    topicsNeedingRevision: []
  });
});

// Get completed lesson IDs list
router.get('/completed', requireAuth, async (req: AuthRequest, res: Response): Promise<void> => {
  const userId = req.user!.id;
  const records = await prisma.lessonProgress.findMany({
    where: { userId, completed: true },
    select: { lessonId: true }
  });
  res.json({ completedLessonIds: records.map(r => r.lessonId) });
});

// Toggle lesson completed status
router.post('/toggle-lesson', requireAuth, async (req: AuthRequest, res: Response): Promise<void> => {
  const userId = req.user!.id;
  const { lessonId } = req.body;

  if (!lessonId) {
    res.status(400).json({ message: 'lessonId is required' });
    return;
  }

  const existing = await prisma.lessonProgress.findUnique({
    where: {
      userId_lessonId: { userId, lessonId }
    }
  });

  const lesson = lessons.find(l => l.id === lessonId);
  const lessonTitle = lesson ? lesson.title : lessonId;

  if (existing) {
    const newStatus = !existing.completed;
    await prisma.lessonProgress.update({
      where: { id: existing.id },
      data: { completed: newStatus }
    });

    if (newStatus) {
      await prisma.activityRecord.create({
        data: {
          userId,
          type: 'LESSON_COMPLETED',
          detail: `Completed: ${lessonTitle}`
        }
      });
    }

    res.json({ lessonId, completed: newStatus });
  } else {
    await prisma.lessonProgress.create({
      data: {
        userId,
        lessonId,
        completed: true
      }
    });

    await prisma.activityRecord.create({
      data: {
        userId,
        type: 'LESSON_COMPLETED',
        detail: `Completed: ${lessonTitle}`
      }
    });

    res.json({ lessonId, completed: true });
  }
});

// Get learner activity history
router.get('/activity', requireAuth, async (req: AuthRequest, res: Response): Promise<void> => {
  const userId = req.user!.id;
  const activities = await prisma.activityRecord.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
    take: 30
  });

  res.json({ activities });
});

export default router;
