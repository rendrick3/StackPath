import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  CheckCircle2,
  Circle,
  BookMarked,
  FileText,
  ArrowLeft,
  ArrowRight,
  Sparkles,
  AlertTriangle,
  Lightbulb,
  Eye,
  Check,
  ChevronDown,
  ChevronUp,
  Save,
  Clock,
  RotateCcw
} from 'lucide-react';
import { LessonContent, ModuleOverview } from '@stackpath/shared';
import { lessons, modules } from '@stackpath/content';
import { useAuth } from '../context/AuthContext';
import { CodeBlock } from '../components/CodeBlock';
import { apiUrl } from '../config/api';

export const LessonReaderPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { user, token } = useAuth();
  const navigate = useNavigate();

  const [lesson, setLesson] = useState<LessonContent | null>(null);
  const [module, setModule] = useState<ModuleOverview | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [showHints, setShowHints] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [submittedQuiz, setSubmittedQuiz] = useState(false);

  // Note Drawer State
  const [notesOpen, setNotesOpen] = useState(false);
  const [noteContent, setNoteContent] = useState('');
  const [isSavingNote, setIsSavingNote] = useState(false);
  const [noteSavedMessage, setNoteSavedMessage] = useState(false);

  // Deep dive accordion
  const [deepDiveOpen, setDeepDiveOpen] = useState(false);

  useEffect(() => {
    const foundLesson = lessons.find(l => l.slug === slug);
    if (foundLesson) {
      setLesson(foundLesson);
      const foundModule = modules.find(m => m.id === foundLesson.moduleId);
      setModule(foundModule || null);
      setShowSolution(false);
      setShowHints(false);
      setSelectedAnswers({});
      setSubmittedQuiz(false);
      window.scrollTo(0, 0);
    }
  }, [slug]);

  // Load user progress, bookmarks, notes
  useEffect(() => {
    async function loadUserState() {
      if (!token || !lesson) return;

      try {
        const compRes = await fetch(apiUrl('/api/progress/completed'), {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (compRes.ok) {
          const compData = await compRes.json();
          setIsCompleted(compData.completedLessonIds.includes(lesson.id));
        }

        const noteRes = await fetch(apiUrl(`/api/notes/${lesson.id}`), {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (noteRes.ok) {
          const noteData = await noteRes.json();
          setNoteContent(noteData.note ? noteData.note.content : '');
        }

        const bmRes = await fetch(apiUrl('/api/bookmarks'), {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (bmRes.ok) {
          const bmData = await bmRes.json();
          setIsBookmarked(bmData.bookmarks.some((b: any) => b.lessonId === lesson.id));
        }
      } catch (err) {
        console.error('Error loading lesson learner state:', err);
      }
    }

    loadUserState();
  }, [token, lesson]);

  if (!lesson) {
    return (
      <div className="max-w-2xl mx-auto py-20 text-center space-y-4">
        <h2 className="text-xl font-bold text-[#25312B] dark:text-[#F1F5F1]">Lesson Not Found</h2>
        <p className="text-sm text-[#525E56] dark:text-[#C1CDC4]">
          The requested lesson does not exist or may have been renamed.
        </p>
        <Link
          to="/curriculum"
          className="inline-flex px-4 py-2 rounded-lg bg-[#174D3A] hover:bg-[#103A2C] text-white dark:bg-[#8BC9A5] dark:text-[#103A2C] text-xs font-semibold"
        >
          Return to Curriculum
        </Link>
      </div>
    );
  }

  const handleToggleComplete = async () => {
    if (!token) {
      navigate('/auth');
      return;
    }

    try {
      const res = await fetch(apiUrl('/api/progress/toggle-lesson'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ lessonId: lesson.id })
      });
      if (res.ok) {
        const data = await res.json();
        setIsCompleted(data.completed);
      }
    } catch (err) {
      console.error('Failed to toggle completion:', err);
    }
  };

  const handleToggleBookmark = async () => {
    if (!token) {
      navigate('/auth');
      return;
    }

    try {
      const res = await fetch(apiUrl('/api/bookmarks/toggle'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ lessonId: lesson.id })
      });
      if (res.ok) {
        const data = await res.json();
        setIsBookmarked(data.isBookmarked);
      }
    } catch (err) {
      console.error('Failed to toggle bookmark:', err);
    }
  };

  const handleSaveNote = async () => {
    if (!token) {
      navigate('/auth');
      return;
    }

    setIsSavingNote(true);
    try {
      const res = await fetch(apiUrl(`/api/notes/${lesson.id}`), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ content: noteContent })
      });
      if (res.ok) {
        setNoteSavedMessage(true);
        setTimeout(() => setNoteSavedMessage(false), 2500);
      }
    } catch (err) {
      console.error('Failed to save note:', err);
    } finally {
      setIsSavingNote(false);
    }
  };

  const currentIdx = lessons.findIndex(l => l.id === lesson.id);
  const prevLesson = currentIdx > 0 ? lessons[currentIdx - 1] : null;
  const nextLesson = currentIdx < lessons.length - 1 ? lessons[currentIdx + 1] : null;

  const tableOfContents = [
    { id: 'section-objectives', title: 'What you will learn' },
    { id: 'section-concept', title: 'The concept in simple English' },
    { id: 'section-why', title: 'Why it is needed' },
    { id: 'section-how', title: 'How it works' },
    { id: 'section-syntax', title: 'Syntax & examples' },
    { id: 'section-real-world', title: 'Real-world application' },
    { id: 'section-mistakes', title: 'Common mistakes' },
    { id: 'section-practice', title: 'Try it yourself' },
    { id: 'section-quiz', title: 'Knowledge check' },
    { id: 'section-remember', title: 'Remember these points' },
    { id: 'section-mastery', title: 'Mastery checklist' }
  ];

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-12">
        {/* Main Reading Column (Takes 8 Cols on desktop, centered comfortable 740px width) */}
        <article className="xl:col-span-8 max-w-[740px] mx-auto w-full space-y-12 bg-[#FFFFFF] dark:bg-[#1C2620] p-6 sm:p-10 rounded-2xl border border-[#D9DED6] dark:border-[#39483F] shadow-xs">
          {/* Top Bar with Navigation & Actions */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#D9DED6] dark:border-[#39483F]">
            <div>
              <Link
                to="/curriculum"
                className="inline-flex items-center gap-1.5 text-xs font-medium text-[#626D65] hover:text-[#174D3A] dark:text-[#8E9F94] dark:hover:text-[#8BC9A5] transition-colors mb-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Curriculum</span>
              </Link>
              <div className="text-xs font-semibold text-[#174D3A] dark:text-[#8BC9A5]">
                {module?.title} • Module {module?.moduleNumber}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setNotesOpen(!notesOpen)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border flex items-center gap-1.5 transition-colors ${
                  notesOpen
                    ? 'bg-[#174D3A] text-white border-[#174D3A] dark:bg-[#8BC9A5] dark:text-[#103A2C] dark:border-[#8BC9A5]'
                    : 'bg-[#FFFFFF] dark:bg-[#1C2620] text-[#525E56] dark:text-[#C1CDC4] border-[#D9DED6] dark:border-[#39483F] hover:border-[#174D3A] dark:hover:border-[#8BC9A5]'
                }`}
                title="Open personal study notes"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Notes</span>
              </button>

              <button
                onClick={handleToggleBookmark}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border flex items-center gap-1.5 transition-colors ${
                  isBookmarked
                    ? 'bg-[#DCEFE8] dark:bg-[#263C31] text-[#174D3A] dark:text-[#8BC9A5] border-[#DCEFE8] dark:border-[#39483F]'
                    : 'bg-[#FFFFFF] dark:bg-[#1C2620] text-[#525E56] dark:text-[#C1CDC4] border-[#D9DED6] dark:border-[#39483F] hover:border-[#174D3A] dark:hover:border-[#8BC9A5]'
                }`}
                title={isBookmarked ? 'Bookmarked' : 'Bookmark lesson'}
              >
                <BookMarked className="w-3.5 h-3.5" />
                <span>{isBookmarked ? 'Saved' : 'Bookmark'}</span>
              </button>

              <button
                onClick={handleToggleComplete}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                  isCompleted
                    ? 'bg-[#237448] dark:bg-[#8BC9A5] text-white dark:text-[#103A2C] shadow-xs'
                    : 'bg-[#174D3A] hover:bg-[#103A2C] text-white dark:bg-[#263C31] dark:text-[#8BC9A5] dark:hover:bg-[#1E2E25] shadow-xs'
                }`}
              >
                {isCompleted ? <Check className="w-3.5 h-3.5" /> : <Circle className="w-3.5 h-3.5" />}
                <span>{isCompleted ? 'Completed' : 'Mark Done'}</span>
              </button>
            </div>
          </div>

          {/* Collapsible Personal Note Drawer */}
          {notesOpen && (
            <div className="p-5 rounded-xl border border-[#DCEFE8] dark:border-[#39483F] bg-[#EDF6F1] dark:bg-[#1E2E25] space-y-3 animate-in fade-in duration-150">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#174D3A] dark:text-[#8BC9A5] flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-[#167D78] dark:text-[#78D4C7]" />
                  Your Study Note for this Lesson
                </span>
                {noteSavedMessage && (
                  <span className="text-xs text-[#237448] dark:text-[#8BC9A5] font-semibold flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> Saved to Database
                  </span>
                )}
              </div>
              <textarea
                value={noteContent}
                onChange={(e) => setNoteContent(e.target.value)}
                placeholder="Write your mental summary, questions to revisit, or personal reminders here..."
                rows={3}
                className="w-full p-3 rounded-lg bg-[#FFFFFF] dark:bg-[#1C2620] border border-[#D9DED6] dark:border-[#39483F] text-xs text-[#25312B] dark:text-[#F1F5F1] placeholder-[#626D65] dark:placeholder-[#8E9F94] focus:outline-none focus:border-[#174D3A] dark:focus:border-[#8BC9A5]"
              />
              <div className="flex justify-end">
                <button
                  onClick={handleSaveNote}
                  disabled={isSavingNote}
                  className="px-3.5 py-1.5 rounded-lg bg-[#174D3A] hover:bg-[#103A2C] text-white dark:bg-[#8BC9A5] dark:text-[#103A2C] dark:hover:bg-[#78D4C7] text-xs font-semibold transition-colors disabled:opacity-50 flex items-center gap-1.5"
                >
                  <Save className="w-3.5 h-3.5" />
                  {isSavingNote ? 'Saving...' : 'Save Note'}
                </button>
              </div>
            </div>
          )}

          {/* Lesson Title Header */}
          <header className="space-y-3">
            <div className="flex items-center gap-2 text-xs text-[#626D65] dark:text-[#8E9F94] font-medium">
              <span>Lesson {lesson.order}</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {lesson.estimatedMinutes} min read
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#25312B] dark:text-[#F1F5F1] tracking-tight leading-tight">
              {lesson.title}
            </h1>
            <p className="text-lg text-[#525E56] dark:text-[#C1CDC4] leading-relaxed font-normal">
              {lesson.subtitle}
            </p>
          </header>

          {/* Section 1: Objectives */}
          <section id="section-objectives" className="p-5 rounded-xl border border-[#D9DED6] dark:border-[#39483F] bg-[#F0F1EA] dark:bg-[#25312B] space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#174D3A] dark:text-[#8BC9A5]">
              What you will learn
            </h2>
            <ul className="space-y-2">
              {lesson.section1_whatYouWillLearn.map((item, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-[#25312B] dark:text-[#F1F5F1]">
                  <Check className="w-4 h-4 text-[#237448] dark:text-[#8BC9A5] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Section 2: Concept in simple English */}
          <section id="section-concept" className="space-y-4 pt-4">
            <h2 className="text-2xl font-bold tracking-tight text-[#25312B] dark:text-[#F1F5F1]">
              The Concept in Simple English
            </h2>
            <div className="reading-body text-[#25312B] dark:text-[#F1F5F1] whitespace-pre-line space-y-4">
              {lesson.section2_simpleEnglishConcept}
            </div>
          </section>

          {/* Section 3: Why it is needed */}
          <section id="section-why" className="space-y-4 pt-4">
            <h2 className="text-2xl font-bold tracking-tight text-[#25312B] dark:text-[#F1F5F1]">
              Why It Matters
            </h2>
            <div className="reading-body text-[#25312B] dark:text-[#F1F5F1] whitespace-pre-line">
              {lesson.section3_whyNeeded}
            </div>
          </section>

          {/* Section 4: How it works */}
          <section id="section-how" className="space-y-6 pt-4">
            <h2 className="text-2xl font-bold tracking-tight text-[#25312B] dark:text-[#F1F5F1]">
              How It Works
            </h2>
            <div className="space-y-4">
              {lesson.section4_howItWorks.steps.map((st) => (
                <div key={st.stepNumber} className="flex items-start gap-4 p-4 rounded-xl border border-[#D9DED6] dark:border-[#39483F] bg-[#FFFFFF] dark:bg-[#1C2620]">
                  <div className="w-7 h-7 rounded-lg bg-[#EDF6F1] dark:bg-[#263C31] text-[#174D3A] dark:text-[#8BC9A5] font-bold text-xs flex items-center justify-center shrink-0 border border-[#DCEFE8] dark:border-[#39483F]">
                    {st.stepNumber}
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-sm font-semibold text-[#25312B] dark:text-[#F1F5F1]">
                      {st.title}
                    </h3>
                    <p className="text-sm text-[#525E56] dark:text-[#C1CDC4] leading-relaxed">
                      {st.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {lesson.section4_howItWorks.mentalModelOrDiagram && (
              <div className="my-6 p-4 rounded-xl border border-[#28362E] bg-[#141B17] overflow-x-auto">
                <span className="text-[11px] font-mono text-[#8E9F94] uppercase tracking-wider block mb-2 font-medium">
                  Mental Model / Data Journey
                </span>
                <pre className="text-xs font-mono text-[#78D4C7] leading-relaxed">
                  {lesson.section4_howItWorks.mentalModelOrDiagram}
                </pre>
              </div>
            )}
          </section>

          {/* Section 5: Syntax & code examples */}
          <section id="section-syntax" className="space-y-4 pt-4">
            <h2 className="text-2xl font-bold tracking-tight text-[#25312B] dark:text-[#F1F5F1]">
              Syntax & Realistic Examples
            </h2>
            <p className="text-sm text-[#525E56] dark:text-[#C1CDC4]">
              {lesson.section5_syntaxAndExamples.overview}
            </p>
            {lesson.section5_syntaxAndExamples.codeBlocks.map((block, i) => (
              <CodeBlock
                key={i}
                code={block.code}
                language={block.language}
                filename={block.filename}
                explanation={block.explanation}
              />
            ))}
          </section>

          {/* Section 6: Real-world application */}
          <section id="section-real-world" className="space-y-4 pt-4">
            <h2 className="text-2xl font-bold tracking-tight text-[#25312B] dark:text-[#F1F5F1]">
              Where You Will Use This
            </h2>
            <div className="p-4 rounded-xl callout-note text-sm leading-relaxed">
              {lesson.section6_realWorldApplication}
            </div>
          </section>

          {/* Section 7: Common mistakes */}
          <section id="section-mistakes" className="space-y-6 pt-4">
            <h2 className="text-2xl font-bold tracking-tight text-[#25312B] dark:text-[#F1F5F1] flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-[#8A5A00] dark:text-[#F3C969]" />
              Common Beginner Mistakes
            </h2>
            <div className="space-y-6">
              {lesson.section7_commonMistakes.map((mis, i) => (
                <div key={i} className="p-5 rounded-xl border border-[#D9DED6] dark:border-[#39483F] bg-[#F7F5EF]/60 dark:bg-[#141B17]/60 space-y-4">
                  <h3 className="text-base font-semibold text-[#25312B] dark:text-[#F1F5F1]">
                    {mis.title}
                  </h3>
                  <p className="text-sm text-[#525E56] dark:text-[#C1CDC4] leading-relaxed">
                    {mis.explanation}
                  </p>

                  {mis.badCode && mis.goodCode && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-3.5 rounded-lg border border-[#F5C4BF] dark:border-[#622B29] bg-[#FDF0EE] dark:bg-[#321918]">
                        <span className="text-[11px] font-bold text-[#B42318] dark:text-[#F27F77] uppercase tracking-wider block mb-1.5">
                          Common Mistake
                        </span>
                        <pre className="text-xs font-mono text-[#B42318] dark:text-[#F27F77] overflow-x-auto">
                          <code>{mis.badCode}</code>
                        </pre>
                      </div>
                      <div className="p-3.5 rounded-lg border border-[#B7D9C3] dark:border-[#2B4E3C] bg-[#EAF4EE] dark:bg-[#1B2E24]">
                        <span className="text-[11px] font-bold text-[#237448] dark:text-[#8BC9A5] uppercase tracking-wider block mb-1.5">
                          Correct Approach
                        </span>
                        <pre className="text-xs font-mono text-[#237448] dark:text-[#8BC9A5] overflow-x-auto">
                          <code>{mis.goodCode}</code>
                        </pre>
                      </div>
                    </div>
                  )}

                  <div className="text-xs text-[#525E56] dark:text-[#C1CDC4]">
                    <strong className="text-[#25312B] dark:text-[#F1F5F1]">How to avoid it: </strong>
                    {mis.howToFix}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 8: Guided Practice */}
          <section id="section-practice" className="space-y-4 pt-4 p-6 rounded-2xl border border-[#DCEFE8] dark:border-[#39483F] bg-[#EDF6F1]/50 dark:bg-[#1E2E25]/50">
            <div className="flex items-center gap-2 text-[#174D3A] dark:text-[#8BC9A5] text-xs font-bold uppercase tracking-wider">
              <Lightbulb className="w-4 h-4 text-[#8A5A00] dark:text-[#F3C969]" />
              Try It Yourself (Guided Practice)
            </div>
            <h3 className="text-base font-bold text-[#25312B] dark:text-[#F1F5F1]">
              {lesson.section8_guidedPractice.task}
            </h3>

            {/* Hints Accordion */}
            <div className="pt-2">
              <button
                onClick={() => setShowHints(!showHints)}
                className="text-xs font-semibold text-[#525E56] dark:text-[#C1CDC4] hover:text-[#174D3A] dark:hover:text-[#8BC9A5] flex items-center gap-1.5 transition-colors"
              >
                <Lightbulb className="w-3.5 h-3.5 text-[#8A5A00] dark:text-[#F3C969]" />
                {showHints ? 'Hide Hints' : 'Need a hint before solving?'}
              </button>
              {showHints && (
                <div className="mt-2.5 p-3.5 rounded-lg bg-[#FCF4DF] dark:bg-[#2D2615] border border-[#E8D39E] dark:border-[#5C4A1C] text-xs text-[#66480A] dark:text-[#FBE6AB] space-y-1.5">
                  {lesson.section8_guidedPractice.hints.map((h, i) => (
                    <div key={i} className="flex items-start gap-1.5">
                      <span>•</span>
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Starter code */}
            {lesson.section8_guidedPractice.starterCode && (
              <div className="my-3">
                <CodeBlock
                  code={lesson.section8_guidedPractice.starterCode}
                  filename="starter.js"
                />
              </div>
            )}

            {/* Solution reveal */}
            <div className="pt-2">
              {!showSolution ? (
                <button
                  onClick={() => setShowSolution(true)}
                  className="px-4 py-2 rounded-lg bg-[#F0F1EA] dark:bg-[#25312B] hover:bg-[#DCEFE8] dark:hover:bg-[#39483F] text-[#25312B] dark:text-[#F1F5F1] text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <Eye className="w-3.5 h-3.5" />
                  Reveal Solution
                </button>
              ) : (
                <div className="p-4 rounded-xl border border-[#B7D9C3] dark:border-[#2B4E3C] bg-[#EAF4EE] dark:bg-[#1B2E24] space-y-2">
                  <span className="text-xs font-bold text-[#237448] dark:text-[#8BC9A5] block">
                    Verified Solution:
                  </span>
                  <pre className="text-xs font-mono text-[#237448] dark:text-[#8BC9A5] bg-[#FFFFFF] dark:bg-[#141B17] p-3 rounded-lg border border-[#B7D9C3] dark:border-[#2B4E3C] overflow-x-auto">
                    <code>{lesson.section8_guidedPractice.solution}</code>
                  </pre>
                  <p className="text-xs text-[#525E56] dark:text-[#C1CDC4] mt-2">
                    {lesson.section8_guidedPractice.solutionExplanation}
                  </p>
                </div>
              )}
            </div>
          </section>

          {/* Section 9: Quick knowledge check */}
          <section id="section-quiz" className="space-y-6 pt-4">
            <h2 className="text-2xl font-bold tracking-tight text-[#25312B] dark:text-[#F1F5F1]">
              Quick Knowledge Check
            </h2>
            <div className="space-y-6">
              {lesson.section9_knowledgeCheckQuestions.map((q, qIndex) => {
                const selected = selectedAnswers[qIndex];
                const isCorrect = selected === q.correctIndex;

                return (
                  <div key={qIndex} className="p-5 rounded-xl border border-[#D9DED6] dark:border-[#39483F] bg-[#FFFFFF] dark:bg-[#1C2620] space-y-3">
                    <h3 className="text-sm font-semibold text-[#25312B] dark:text-[#F1F5F1]">
                      {qIndex + 1}. {q.question}
                    </h3>
                    <div className="space-y-2">
                      {q.options.map((opt, oIndex) => {
                        const isOptionSelected = selected === oIndex;
                        let optionStyle = 'bg-[#F7F5EF] dark:bg-[#141B17] border-[#D9DED6] dark:border-[#39483F] text-[#25312B] dark:text-[#F1F5F1] hover:border-[#174D3A] dark:hover:border-[#8BC9A5]';

                        if (submittedQuiz) {
                          if (oIndex === q.correctIndex) {
                            optionStyle = 'bg-[#EAF4EE] dark:bg-[#1B2E24] border-[#237448] dark:border-[#8BC9A5] text-[#237448] dark:text-[#8BC9A5] font-semibold';
                          } else if (isOptionSelected) {
                            optionStyle = 'bg-[#FDF0EE] dark:bg-[#321918] border-[#B42318] dark:border-[#F27F77] text-[#B42318] dark:text-[#F27F77]';
                          }
                        } else if (isOptionSelected) {
                          optionStyle = 'bg-[#DCEFE8] dark:bg-[#263C31] border-[#174D3A] dark:border-[#8BC9A5] text-[#174D3A] dark:text-[#8BC9A5] font-semibold';
                        }

                        return (
                          <button
                            key={oIndex}
                            onClick={() => {
                              if (!submittedQuiz) {
                                setSelectedAnswers(prev => ({ ...prev, [qIndex]: oIndex }));
                              }
                            }}
                            className={`w-full text-left p-3 rounded-lg border text-xs transition-all flex items-center justify-between ${optionStyle}`}
                          >
                            <span>{opt}</span>
                            {submittedQuiz && oIndex === q.correctIndex && (
                              <Check className="w-4 h-4 text-[#237448] dark:text-[#8BC9A5] shrink-0 ml-2" />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {submittedQuiz && (
                      <div className={`p-3 rounded-lg text-xs mt-3 ${
                        isCorrect
                          ? 'bg-[#EAF4EE] dark:bg-[#1B2E24] text-[#237448] dark:text-[#8BC9A5] border border-[#B7D9C3] dark:border-[#2B4E3C]'
                          : 'bg-[#FDF0EE] dark:bg-[#321918] text-[#B42318] dark:text-[#F27F77] border border-[#F5C4BF] dark:border-[#622B29]'
                      }`}>
                        <strong>{isCorrect ? 'Correct! ' : 'Review concept: '}</strong>
                        {q.explanation}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="flex items-center gap-3">
              {!submittedQuiz ? (
                <button
                  onClick={() => setSubmittedQuiz(true)}
                  disabled={Object.keys(selectedAnswers).length === 0}
                  className="px-5 py-2.5 rounded-lg bg-[#174D3A] hover:bg-[#103A2C] text-white dark:bg-[#8BC9A5] dark:text-[#103A2C] dark:hover:bg-[#78D4C7] text-xs font-semibold transition-all disabled:opacity-40"
                >
                  Check Answers
                </button>
              ) : (
                <button
                  onClick={() => { setSubmittedQuiz(false); setSelectedAnswers({}); }}
                  className="px-4 py-2 rounded-lg bg-[#F0F1EA] dark:bg-[#25312B] text-[#25312B] dark:text-[#F1F5F1] text-xs font-semibold flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Retake Check
                </button>
              )}
            </div>
          </section>

          {/* Section 10: Remember these points */}
          <section id="section-remember" className="p-6 rounded-xl border border-[#D9DED6] dark:border-[#39483F] bg-[#F0F1EA] dark:bg-[#25312B] space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#174D3A] dark:text-[#8BC9A5]">
              Remember These Points
            </h2>
            <ul className="space-y-2">
              {lesson.section10_rememberThesePoints.map((pt, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-[#25312B] dark:text-[#F1F5F1]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#174D3A] dark:bg-[#8BC9A5] mt-2 shrink-0" />
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Section 11: Independent mastery checklist */}
          <section id="section-mastery" className="p-6 rounded-xl border border-[#D9DED6] dark:border-[#39483F] bg-[#FFFFFF] dark:bg-[#1C2620] space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#174D3A] dark:text-[#8BC9A5]">
              Can You Do This Independently?
            </h2>
            <p className="text-xs text-[#626D65] dark:text-[#8E9F94]">
              You have truly mastered this concept when you can perform these actions without looking at a guide:
            </p>
            <div className="space-y-2">
              {lesson.section11_independentMasteryCriteria.map((crit, i) => (
                <div key={i} className="flex items-center gap-2.5 text-xs text-[#25312B] dark:text-[#F1F5F1]">
                  <CheckCircle2 className="w-4 h-4 text-[#237448] dark:text-[#8BC9A5] shrink-0" />
                  <span>{crit}</span>
                </div>
              ))}
            </div>

            {/* Clear Mark as Complete Action */}
            <div className="pt-4 border-t border-[#D9DED6] dark:border-[#39483F] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <button
                onClick={handleToggleComplete}
                className={`px-5 py-2.5 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                  isCompleted
                    ? 'bg-[#237448] dark:bg-[#8BC9A5] text-white dark:text-[#103A2C]'
                    : 'bg-[#174D3A] hover:bg-[#103A2C] text-white dark:bg-[#263C31] dark:text-[#8BC9A5] dark:hover:bg-[#1E2E25] shadow-xs'
                }`}
              >
                {isCompleted ? <Check className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />}
                <span>{isCompleted ? 'Marked as Completed!' : 'Mark Lesson as Completed'}</span>
              </button>

              {nextLesson && (
                <Link
                  to={`/lessons/${nextLesson.slug}`}
                  className="px-5 py-2.5 rounded-lg bg-[#174D3A] hover:bg-[#103A2C] text-white dark:bg-[#8BC9A5] dark:text-[#103A2C] dark:hover:bg-[#78D4C7] text-xs font-bold flex items-center justify-center gap-2 transition-colors"
                >
                  <span>Continue to Next Lesson</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              )}
            </div>
          </section>

          {/* Optional Advanced Deep Dive */}
          {lesson.advancedDeepDive && (
            <div className="rounded-xl border border-[#D9DED6] dark:border-[#39483F] bg-[#F7F5EF] dark:bg-[#141B17] overflow-hidden">
              <button
                onClick={() => setDeepDiveOpen(!deepDiveOpen)}
                className="w-full p-4 flex items-center justify-between text-left hover:bg-[#F0F1EA] dark:hover:bg-[#25312B] transition-colors"
              >
                <span className="text-xs font-bold uppercase tracking-wider text-[#174D3A] dark:text-[#8BC9A5] flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-[#167D78] dark:text-[#78D4C7]" />
                  Optional Deep Dive: {lesson.advancedDeepDive.title}
                </span>
                {deepDiveOpen ? <ChevronUp className="w-4 h-4 text-[#626D65]" /> : <ChevronDown className="w-4 h-4 text-[#626D65]" />}
              </button>
              {deepDiveOpen && (
                <div className="p-4 border-t border-[#D9DED6] dark:border-[#39483F] text-xs text-[#525E56] dark:text-[#C1CDC4] leading-relaxed">
                  <p>{lesson.advancedDeepDive.content}</p>
                </div>
              )}
            </div>
          )}

          {/* Bottom Lesson Navigation */}
          <div className="flex items-center justify-between pt-8 border-t border-[#D9DED6] dark:border-[#39483F]">
            {prevLesson ? (
              <Link
                to={`/lessons/${prevLesson.slug}`}
                className="flex items-center gap-2 text-xs font-semibold text-[#525E56] dark:text-[#C1CDC4] hover:text-[#174D3A] dark:hover:text-[#8BC9A5] transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>{prevLesson.title}</span>
              </Link>
            ) : <div />}

            {nextLesson ? (
              <Link
                to={`/lessons/${nextLesson.slug}`}
                className="flex items-center gap-2 text-xs font-semibold text-[#126B63] dark:text-[#78D4C7] hover:underline"
              >
                <span>{nextLesson.title}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            ) : <div />}
          </div>
        </article>

        {/* Optional Right Panel: On this page (Table of Contents) on wide screens */}
        <aside className="hidden xl:block xl:col-span-4 space-y-6">
          <div className="sticky top-24 space-y-6">
            {/* Table of contents */}
            <div className="p-5 rounded-xl border border-[#D9DED6] dark:border-[#39483F] bg-[#FFFFFF] dark:bg-[#1C2620] space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#626D65] dark:text-[#8E9F94]">
                On this page
              </h3>
              <nav className="space-y-1.5 text-xs">
                {tableOfContents.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="block py-1 text-[#525E56] dark:text-[#C1CDC4] hover:text-[#174D3A] dark:hover:text-[#8BC9A5] transition-colors truncate"
                  >
                    {item.title}
                  </a>
                ))}
              </nav>
            </div>

            {/* Current Lesson status widget */}
            <div className="p-5 rounded-xl border border-[#D9DED6] dark:border-[#39483F] bg-[#FFFFFF] dark:bg-[#1C2620] space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#626D65] dark:text-[#8E9F94]">
                Lesson Progress
              </h3>
              <div className="flex items-center gap-2">
                <span className={`w-2.5 h-2.5 rounded-full ${isCompleted ? 'bg-[#237448] dark:bg-[#8BC9A5]' : 'bg-[#D9DED6] dark:bg-[#39483F]'}`} />
                <span className="text-xs font-medium text-[#25312B] dark:text-[#F1F5F1]">
                  {isCompleted ? 'Marked complete' : 'In progress'}
                </span>
              </div>
              {module && (
                <div className="pt-2 border-t border-[#F0F1EA] dark:border-[#25312B] text-[11px] text-[#626D65] dark:text-[#8E9F94]">
                  <span>Part of {module.title}</span>
                </div>
              )}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};
