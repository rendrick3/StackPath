import 'dotenv/config';
import bcrypt from 'bcryptjs';
import { prisma } from './db.js';

async function seed() {
  console.log('[StackPath Academy] Seeding database...');

  // Create demo student account
  const demoEmail = 'student@stackpath.dev';
  const existingUser = await prisma.user.findUnique({ where: { email: demoEmail } });

  let user = existingUser;
  if (!user) {
    const passwordHash = await bcrypt.hash('Student123!', 10);
    user = await prisma.user.create({
      data: {
        email: demoEmail,
        name: 'Alex Mercer',
        passwordHash,
        role: 'STUDENT'
      }
    });
    console.log(`[StackPath Academy] Created demo student: ${demoEmail} (Password: Student123!)`);
  } else {
    console.log(`[StackPath Academy] Demo student already exists: ${demoEmail}`);
  }

  // Seed sample initial completed progress for Lesson 1
  await prisma.lessonProgress.upsert({
    where: {
      userId_lessonId: {
        userId: user.id,
        lessonId: 'les-1-1'
      }
    },
    update: { completed: true },
    create: {
      userId: user.id,
      lessonId: 'les-1-1',
      completed: true
    }
  });

  // Seed sample note
  await prisma.personalNote.upsert({
    where: {
      userId_lessonId: {
        userId: user.id,
        lessonId: 'les-1-1'
      }
    },
    update: {
      content: 'Key takeaway: The CPU operates in Fetch -> Decode -> Execute cycles, while RAM holds volatile state!'
    },
    create: {
      userId: user.id,
      lessonId: 'les-1-1',
      content: 'Key takeaway: The CPU operates in Fetch -> Decode -> Execute cycles, while RAM holds volatile state!'
    }
  });

  // Seed bookmark
  await prisma.bookmark.upsert({
    where: {
      userId_lessonId: {
        userId: user.id,
        lessonId: 'les-2-1'
      }
    },
    update: {},
    create: {
      userId: user.id,
      lessonId: 'les-2-1'
    }
  });

  // Seed initial activities
  await prisma.activityRecord.createMany({
    data: [
      {
        userId: user.id,
        type: 'ENROLLED',
        detail: 'Started Full-Stack Academy Journey'
      },
      {
        userId: user.id,
        type: 'LESSON_COMPLETED',
        detail: 'Completed: How Computers Think & Execute Code'
      }
    ]
  });

  console.log('[StackPath Academy] Database seeded successfully!');
}

seed()
  .catch((e) => {
    console.error('[StackPath Academy] Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
