export * from './phases.js';
export * from './modules.js';
export * from './lessons.js';
export * from './projects.js';
export * from './glossary.js';
export * from './quizzes.js';
export * from './exercises.js';

import { phases } from './phases.js';
import { modules } from './modules.js';
import { lessons } from './lessons.js';
import { projects } from './projects.js';
import { glossary } from './glossary.js';
import { quizzes } from './quizzes.js';
import { exercises } from './exercises.js';

export function getModuleBySlug(slug: string) {
  return modules.find(m => m.slug === slug);
}

export function getModuleById(id: string) {
  return modules.find(m => m.id === id);
}

export function getLessonBySlug(slug: string) {
  return lessons.find(l => l.slug === slug);
}

export function getLessonsByModuleId(moduleId: string) {
  return lessons.filter(l => l.moduleId === moduleId).sort((a, b) => a.order - b.order);
}

export function getProjectById(id: string) {
  return projects.find(p => p.id === id);
}

export function getQuizByModuleId(moduleId: string) {
  return quizzes[moduleId] || [];
}

export function getExerciseByLessonId(lessonId: string) {
  return exercises.find(e => e.lessonId === lessonId);
}

export function searchCurriculum(query: string) {
  const q = query.toLowerCase().trim();
  if (!q) return { modules: [], lessons: [], glossary: [], projects: [] };

  const matchedModules = modules.filter(m => 
    m.title.toLowerCase().includes(q) || 
    m.description.toLowerCase().includes(q)
  );

  const matchedLessons = lessons.filter(l => 
    l.title.toLowerCase().includes(q) || 
    l.subtitle.toLowerCase().includes(q) ||
    l.section2_simpleEnglishConcept.toLowerCase().includes(q)
  );

  const matchedGlossary = glossary.filter(g => 
    g.term.toLowerCase().includes(q) || 
    (g.fullForm && g.fullForm.toLowerCase().includes(q)) || 
    g.simpleExplanation.toLowerCase().includes(q)
  );

  const matchedProjects = projects.filter(p =>
    p.title.toLowerCase().includes(q) ||
    p.problemStatement.toLowerCase().includes(q) ||
    p.technologies.some(t => t.toLowerCase().includes(q))
  );

  return {
    modules: matchedModules,
    lessons: matchedLessons,
    glossary: matchedGlossary,
    projects: matchedProjects
  };
}
