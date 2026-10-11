import { Router, Request, Response } from 'express';
import { projects, getProjectById } from '@stackpath/content';

const router = Router();

// Get all project guides
router.get('/', (req: Request, res: Response) => {
  res.json({ projects });
});

// Get specific project guide by id
router.get('/:id', (req: Request, res: Response) => {
  const project = getProjectById(req.params.id);
  if (!project) {
    res.status(404).json({ message: 'Project not found' });
    return;
  }
  res.json({ project });
});

export default router;
