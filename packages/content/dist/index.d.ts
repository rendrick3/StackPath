export * from './phases.js';
export * from './modules.js';
export * from './lessons.js';
export * from './projects.js';
export * from './glossary.js';
export * from './quizzes.js';
export * from './exercises.js';
export declare function getModuleBySlug(slug: string): import("@stackpath/shared").ModuleOverview | undefined;
export declare function getModuleById(id: string): import("@stackpath/shared").ModuleOverview | undefined;
export declare function getLessonBySlug(slug: string): import("@stackpath/shared").LessonContent | undefined;
export declare function getLessonsByModuleId(moduleId: string): import("@stackpath/shared").LessonContent[];
export declare function getProjectById(id: string): import("@stackpath/shared").ProjectGuide | undefined;
export declare function getQuizByModuleId(moduleId: string): import("@stackpath/shared").QuizQuestion[];
export declare function getExerciseByLessonId(lessonId: string): import("@stackpath/shared").Exercise | undefined;
export declare function searchCurriculum(query: string): {
    modules: import("@stackpath/shared").ModuleOverview[];
    lessons: import("@stackpath/shared").LessonContent[];
    glossary: import("@stackpath/shared").GlossaryTerm[];
    projects: import("@stackpath/shared").ProjectGuide[];
};
//# sourceMappingURL=index.d.ts.map