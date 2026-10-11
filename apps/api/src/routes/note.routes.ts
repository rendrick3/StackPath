import { Router, Response } from 'express';
import { requireAuth, AuthRequest } from '../middleware/auth.js';
import { prisma } from '../db.js';
import { lessons } from '@stackpath/content';

const router = Router();

// List all personal notes for logged-in student
router.get('/', requireAuth, async (req: AuthRequest, res: Response): Promise<void> => {
  const userId = req.user!.id;
  const notes = await prisma.personalNote.findMany({
    where: { userId },
    orderBy: { updatedAt: 'desc' }
  });

  const notesWithMetadata = notes.map(n => {
    const lesson = lessons.find(l => l.id === n.lessonId);
    return {
      ...n,
      lessonTitle: lesson ? lesson.title : n.lessonId,
      lessonSlug: lesson ? lesson.slug : ''
    };
  });

  res.json({ notes: notesWithMetadata });
});

// Get note for a specific lesson
router.get('/:lessonId', requireAuth, async (req: AuthRequest, res: Response): Promise<void> => {
  const userId = req.user!.id;
  const { lessonId } = req.params;

  const note = await prisma.personalNote.findUnique({
    where: {
      userId_lessonId: { userId, lessonId }
    }
  });

  res.json({ note: note || null });
});

// Upsert personal note for a lesson
router.post('/:lessonId', requireAuth, async (req: AuthRequest, res: Response): Promise<void> => {
  const userId = req.user!.id;
  const { lessonId } = req.params;
  const { content } = req.body;

  if (typeof content !== 'string') {
    res.status(400).json({ message: 'Content string is required' });
    return;
  }

  const lesson = lessons.find(l => l.id === lessonId);
  const lessonTitle = lesson ? lesson.title : lessonId;

  const note = await prisma.personalNote.upsert({
    where: {
      userId_lessonId: { userId, lessonId }
    },
    update: {
      content
    },
    create: {
      userId,
      lessonId,
      content
    }
  });

  await prisma.activityRecord.create({
    data: {
      userId,
      type: 'NOTE_SAVED',
      detail: `Saved study note for ${lessonTitle}`
    }
  });

  res.json({ note });
});

// Delete note for a lesson
router.delete('/:lessonId', requireAuth, async (req: AuthRequest, res: Response): Promise<void> => {
  const userId = req.user!.id;
  const { lessonId } = req.params;

  await prisma.personalNote.deleteMany({
    where: {
      userId,
      lessonId
    }
  });

  res.json({ message: 'Note deleted successfully' });
});

export default router;
