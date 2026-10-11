import { Router, Response } from 'express';
import { requireAuth, AuthRequest } from '../middleware/auth.js';
import { prisma } from '../db.js';
import { lessons, modules } from '@stackpath/content';

const router = Router();

// List bookmarks for logged-in user
router.get('/', requireAuth, async (req: AuthRequest, res: Response): Promise<void> => {
  const userId = req.user!.id;
  const bookmarks = await prisma.bookmark.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' }
  });

  const enrichedBookmarks = bookmarks.map(b => {
    const lesson = lessons.find(l => l.id === b.lessonId);
    const module = lesson ? modules.find(m => m.id === lesson.moduleId) : undefined;

    return {
      id: b.id,
      lessonId: b.lessonId,
      lessonTitle: lesson ? lesson.title : b.lessonId,
      lessonSlug: lesson ? lesson.slug : '',
      moduleTitle: module ? module.title : '',
      createdAt: b.createdAt.toISOString()
    };
  });

  res.json({ bookmarks: enrichedBookmarks });
});

// Toggle bookmark for a lesson
router.post('/toggle', requireAuth, async (req: AuthRequest, res: Response): Promise<void> => {
  const userId = req.user!.id;
  const { lessonId } = req.body;

  if (!lessonId) {
    res.status(400).json({ message: 'lessonId is required' });
    return;
  }

  const existing = await prisma.bookmark.findUnique({
    where: {
      userId_lessonId: { userId, lessonId }
    }
  });

  if (existing) {
    await prisma.bookmark.delete({ where: { id: existing.id } });
    res.json({ lessonId, isBookmarked: false });
  } else {
    await prisma.bookmark.create({
      data: { userId, lessonId }
    });
    res.json({ lessonId, isBookmarked: true });
  }
});

export default router;
