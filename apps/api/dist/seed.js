"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const db_js_1 = require("./db.js");
async function seed() {
    console.log('[StackPath Academy] Seeding database...');
    // Create demo student account
    const demoEmail = 'student@stackpath.dev';
    const existingUser = await db_js_1.prisma.user.findUnique({ where: { email: demoEmail } });
    let user = existingUser;
    if (!user) {
        const passwordHash = await bcryptjs_1.default.hash('Student123!', 10);
        user = await db_js_1.prisma.user.create({
            data: {
                email: demoEmail,
                name: 'Alex Mercer',
                passwordHash,
                role: 'STUDENT'
            }
        });
        console.log(`[StackPath Academy] Created demo student: ${demoEmail} (Password: Student123!)`);
    }
    else {
        console.log(`[StackPath Academy] Demo student already exists: ${demoEmail}`);
    }
    // Seed sample initial completed progress for Lesson 1
    await db_js_1.prisma.lessonProgress.upsert({
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
    await db_js_1.prisma.personalNote.upsert({
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
    await db_js_1.prisma.bookmark.upsert({
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
    await db_js_1.prisma.activityRecord.createMany({
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
    await db_js_1.prisma.$disconnect();
});
