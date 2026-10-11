import { z } from 'zod';
export declare const registerSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
    name: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
    name: string;
}, {
    email: string;
    password: string;
    name: string;
}>;
export declare const loginSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export interface SafeUser {
    id: string;
    email: string;
    name: string;
    role: 'STUDENT' | 'ADMIN';
    createdAt: string;
}
export interface AuthResponse {
    user: SafeUser;
    token: string;
}
export type Difficulty = 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
export interface Phase {
    id: number;
    number: number;
    title: string;
    tagline: string;
    description: string;
    modulesCount: number;
}
export interface ModuleOverview {
    id: string;
    phaseId: number;
    moduleNumber: number;
    title: string;
    slug: string;
    description: string;
    difficulty: Difficulty;
    estimatedHours: number;
    prerequisites: string[];
    learningObjectives: string[];
    lessonsCount: number;
    exercisesCount: number;
    hasQuiz: boolean;
    projectConnection?: string;
}
export interface CodeBlock {
    language: string;
    filename?: string;
    code: string;
    explanation?: string;
    highlightLines?: number[];
}
export interface CommonMistake {
    title: string;
    badCode?: string;
    goodCode?: string;
    explanation: string;
    howToFix: string;
}
export interface GuidedPractice {
    task: string;
    hints: string[];
    expectedBehavior: string;
    successCriteria: string[];
    starterCode?: string;
    solution?: string;
    solutionExplanation?: string;
}
export interface LessonContent {
    id: string;
    moduleId: string;
    slug: string;
    order: number;
    title: string;
    subtitle: string;
    estimatedMinutes: number;
    difficulty: Difficulty;
    section1_whatYouWillLearn: string[];
    section2_simpleEnglishConcept: string;
    section3_whyNeeded: string;
    section4_howItWorks: {
        steps: {
            stepNumber: number;
            title: string;
            description: string;
        }[];
        mentalModelOrDiagram?: string;
    };
    section5_syntaxAndExamples: {
        overview: string;
        codeBlocks: CodeBlock[];
    };
    section6_realWorldApplication: string;
    section7_commonMistakes: CommonMistake[];
    section8_guidedPractice: GuidedPractice;
    section9_knowledgeCheckQuestions: {
        question: string;
        options: string[];
        correctIndex: number;
        explanation: string;
    }[];
    section10_rememberThesePoints: string[];
    section11_independentMasteryCriteria: string[];
    advancedDeepDive?: {
        title: string;
        content: string;
        securityNotes?: string;
        performanceNotes?: string;
    };
}
export type QuestionType = 'MULTIPLE_CHOICE' | 'CODE_PREDICTION' | 'FIND_BUG' | 'TRUE_FALSE';
export interface QuizQuestion {
    id: string;
    quizId: string;
    type: QuestionType;
    question: string;
    codeSnippet?: string;
    options: string[];
    correctOptionIndex: number;
    explanation: string;
}
export interface QuizAttemptResult {
    attemptId: string;
    quizId: string;
    score: number;
    totalQuestions: number;
    passed: boolean;
    percentage: number;
    answers: {
        questionId: string;
        selectedIndex: number;
        correctIndex?: number;
        isCorrect: boolean;
        explanation: string;
    }[];
}
export interface ExerciseTestCase {
    id: string;
    inputDescription?: string;
    expectedOutput: string;
    testCode: string;
}
export interface Exercise {
    id: string;
    lessonId: string;
    title: string;
    description: string;
    instructions: string[];
    starterCode: string;
    language: 'javascript' | 'html' | 'css' | 'typescript' | 'sql';
    solutionCode?: string;
    solutionExplanation?: string;
    hints: string[];
    testCases: ExerciseTestCase[];
}
export interface CodeExecutionRequest {
    language: string;
    code: string;
    testCases?: ExerciseTestCase[];
}
export interface CodeExecutionResponse {
    success: boolean;
    output: string;
    error?: string;
    testResults?: {
        id: string;
        passed: boolean;
        actualOutput: string;
        expectedOutput: string;
        message?: string;
    }[];
}
export interface ProjectMilestone {
    step: number;
    title: string;
    description: string;
    tasks: string[];
    hints: string[];
}
export interface ProjectGuide {
    id: string;
    projectNumber: number;
    title: string;
    tagline: string;
    technologies: string[];
    difficulty: Difficulty;
    problemStatement: string;
    learningObjectives: string[];
    prerequisites: string[];
    requirements: string[];
    acceptanceCriteria: string[];
    architectureOverview: string;
    milestones: ProjectMilestone[];
    guidedHints: string[];
    commonMistakes: CommonMistake[];
    testingInstructions: string[];
    finalReviewChecklist: string[];
}
export interface UserStats {
    totalLessons: number;
    completedLessonsCount: number;
    overallPercentage: number;
    currentPhaseNumber: number;
    currentModuleName: string;
    currentLessonSlug: string;
    currentLessonTitle: string;
    quizzesTaken: number;
    averageQuizScore: number;
    exercisesCompletedCount: number;
    dailyStreak: number;
    weeklyActivity: {
        date: string;
        count: number;
    }[];
    bookmarksCount: number;
    notesCount: number;
    topicsNeedingRevision: string[];
}
export interface PersonalNote {
    id: string;
    userId: string;
    lessonId: string;
    lessonTitle: string;
    lessonSlug: string;
    content: string;
    createdAt: string;
    updatedAt: string;
}
export interface Bookmark {
    id: string;
    userId: string;
    lessonId: string;
    lessonTitle: string;
    lessonSlug: string;
    moduleTitle: string;
    createdAt: string;
}
export interface GlossaryTerm {
    term: string;
    abbreviation?: string;
    fullForm?: string;
    category: 'Fundamentals' | 'Frontend' | 'Backend' | 'Database' | 'DevOps' | 'Security';
    simpleExplanation: string;
    whyItMatters: string;
    example?: string;
    relatedTerms?: string[];
}
//# sourceMappingURL=index.d.ts.map