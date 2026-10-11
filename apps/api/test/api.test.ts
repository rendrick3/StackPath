import { describe, it, expect, beforeAll } from 'vitest';
import request from 'supertest';
import { createApp } from '../src/app.js';
import { prisma } from '../src/db.js';

const app = createApp();

describe('StackPath Academy API Integration Tests', () => {
  beforeAll(async () => {
    // Ensure clean test database state
  });

  it('GET /healthz returns healthy status', async () => {
    const res = await request(app).get('/healthz');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('healthy');
    expect(res.body.academy).toBe('StackPath Academy');
  });

  it('GET /api/curriculum/phases returns all 7 full-stack learning phases', async () => {
    const res = await request(app).get('/api/curriculum/phases');
    expect(res.status).toBe(200);
    expect(res.body.phases).toHaveLength(7);
    expect(res.body.phases[0].title).toBe('Absolute Beginner Foundations');
  });

  it('GET /api/curriculum/modules returns all 25 modules', async () => {
    const res = await request(app).get('/api/curriculum/modules');
    expect(res.status).toBe(200);
    expect(res.body.modules.length).toBe(25);
    expect(res.body.modules[0].slug).toBe('computers-and-programming-fundamentals');
  });

  it('GET /api/curriculum/lessons/:slug returns lesson with all 11 required sections', async () => {
    const res = await request(app).get('/api/curriculum/lessons/how-computers-work-and-execute-code');
    expect(res.status).toBe(200);
    const { lesson } = res.body;
    expect(lesson.title).toBe('How Computers Think & Execute Code');
    expect(lesson.section1_whatYouWillLearn).toBeDefined();
    expect(lesson.section2_simpleEnglishConcept).toBeDefined();
    expect(lesson.section3_whyNeeded).toBeDefined();
    expect(lesson.section4_howItWorks).toBeDefined();
    expect(lesson.section5_syntaxAndExamples).toBeDefined();
    expect(lesson.section6_realWorldApplication).toBeDefined();
    expect(lesson.section7_commonMistakes).toBeDefined();
    expect(lesson.section8_guidedPractice).toBeDefined();
    expect(lesson.section9_knowledgeCheckQuestions).toBeDefined();
    expect(lesson.section10_rememberThesePoints).toBeDefined();
    expect(lesson.section11_independentMasteryCriteria).toBeDefined();
  });

  it('POST /api/auth/register fails gracefully with invalid input (Zod validation)', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ email: 'invalid-email', password: '123' });

    expect(res.status).toBe(400);
    expect(res.body.message).toBe('Validation failed');
  });

  it('GET /api/progress/stats requires authentication token (401)', async () => {
    const res = await request(app).get('/api/progress/stats');
    expect(res.status).toBe(401);
    expect(res.body.message).toBe('Authentication token required');
  });

  it('GET /api/projects returns full catalog of 11 practical projects', async () => {
    const res = await request(app).get('/api/projects');
    expect(res.status).toBe(200);
    expect(res.body.projects).toHaveLength(11);
    expect(res.body.projects[0].title).toBe('Personal Web Page');
    expect(res.body.projects[10].title).toBe('Independent Capstone: Production SaaS Application');
  });

  it('GET /api/glossary returns foundational technical terminology', async () => {
    const res = await request(app).get('/api/glossary');
    expect(res.status).toBe(200);
    expect(res.body.glossary.length).toBeGreaterThan(5);
  });
});
