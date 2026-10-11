import { Router, Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { registerSchema, loginSchema } from '@stackpath/shared';
import { prisma } from '../db.js';
import { requireAuth, AuthRequest } from '../middleware/auth.js';

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_jwt_key_stackpath_academy_dev_2026';

// Register a new student
router.post('/register', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const parsed = registerSchema.parse(req.body);

    const existingUser = await prisma.user.findUnique({
      where: { email: parsed.email.toLowerCase().trim() }
    });

    if (existingUser) {
      res.status(400).json({ message: 'An account with this email address already exists' });
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(parsed.password, salt);

    const user = await prisma.user.create({
      data: {
        email: parsed.email.toLowerCase().trim(),
        name: parsed.name.trim(),
        passwordHash,
        role: 'STUDENT'
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true
      }
    });

    // Record initial registration activity
    await prisma.activityRecord.create({
      data: {
        userId: user.id,
        type: 'ENROLLED',
        detail: 'Enrolled in StackPath Academy'
      }
    });

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({
      user: {
        ...user,
        createdAt: user.createdAt.toISOString()
      },
      token
    });
  } catch (error) {
    next(error);
  }
});

// Login existing student
router.post('/login', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const parsed = loginSchema.parse(req.body);

    const user = await prisma.user.findUnique({
      where: { email: parsed.email.toLowerCase().trim() }
    });

    if (!user) {
      res.status(401).json({ message: 'Invalid email address or password' });
      return;
    }

    const isMatch = await bcrypt.compare(parsed.password, user.passwordHash);
    if (!isMatch) {
      res.status(401).json({ message: 'Invalid email address or password' });
      return;
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });

    res.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        createdAt: user.createdAt.toISOString()
      },
      token
    });
  } catch (error) {
    next(error);
  }
});

// Get currently logged-in user profile
router.get('/me', requireAuth, async (req: AuthRequest, res: Response): Promise<void> => {
  if (!req.user) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }
  res.json({ user: req.user });
});

export default router;
