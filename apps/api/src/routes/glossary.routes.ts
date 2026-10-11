import { Router, Request, Response } from 'express';
import { glossary } from '@stackpath/content';

const router = Router();

// Get all technical glossary terms
router.get('/', (req: Request, res: Response) => {
  res.json({ glossary });
});

export default router;
