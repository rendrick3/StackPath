import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Award, CheckCircle2, XCircle, ArrowLeft, RotateCcw, HelpCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { QuizQuestion, QuizAttemptResult } from '@stackpath/shared';

export const QuizPage: React.FC = () => {
  const { moduleId } = useParams<{ moduleId: string }>();
  const { token } = useAuth();

  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [moduleTitle, setModuleTitle] = useState('');
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [attemptResult, setAttemptResult] = useState<QuizAttemptResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    async function loadQuiz() {
      if (!moduleId) return;
      try {
        const res = await fetch(`/api/quizzes/${moduleId}`);
        if (res.ok) {
          const data = await res.json();
          setQuestions(data.questions || []);
          setModuleTitle(data.moduleTitle || '');
        }
      } catch (err) {
        console.error('Failed to load quiz:', err);
      } finally {
        setLoading(false);
      }
    }
    loadQuiz();
  }, [moduleId]);

  const answeredCount = Object.keys(selectedAnswers).length;

  const handleSubmitAttempt = async () => {
    if (!token) {
      alert('Please sign in to record your quiz results to your learner profile.');
      return;
    }

    setSubmitting(true);
    try {
      const answersPayload = questions.map(q => ({
        questionId: q.id,
        selectedIndex: selectedAnswers[q.id] !== undefined ? selectedAnswers[q.id] : -1
      }));

      const res = await fetch(`/api/quizzes/${moduleId}/attempt`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ answers: answersPayload })
      });

      if (res.ok) {
        const data = await res.json();
        setAttemptResult(data);
      }
    } catch (err) {
      console.error('Failed to submit quiz attempt:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleRetake = () => {
    setSelectedAnswers({});
    setAttemptResult(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto py-20 text-center text-sm text-[#626D65] dark:text-[#8E9F94]">
        Preparing assessment questions...
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="max-w-md mx-auto my-20 p-8 rounded-2xl bg-[#FFFFFF] dark:bg-[#1C2620] border border-[#D9DED6] dark:border-[#39483F] text-center shadow-xs">
        <h2 className="text-base font-bold text-[#25312B] dark:text-[#F1F5F1] mb-2">Quiz in Development</h2>
        <p className="text-xs text-[#525E56] dark:text-[#C1CDC4] mb-5">Questions for this module are currently being drafted.</p>
        <Link to="/curriculum" className="text-xs text-[#126B63] dark:text-[#78D4C7] font-semibold hover:underline">
          Return to Curriculum Syllabus
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      {/* Header */}
      <div>
        <Link
          to="/curriculum"
          className="inline-flex items-center gap-1.5 text-xs text-[#626D65] hover:text-[#174D3A] dark:text-[#8E9F94] dark:hover:text-[#8BC9A5] transition-colors mb-3"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Curriculum</span>
        </Link>
        <div className="flex items-center gap-2 mb-1.5">
          <span className="text-xs font-mono font-bold text-[#174D3A] dark:text-[#8BC9A5] px-2 py-0.5 rounded bg-[#EDF6F1] dark:bg-[#263C31] border border-[#DCEFE8] dark:border-[#39483F]">
            Conceptual Knowledge Check
          </span>
          <span className="text-xs text-[#626D65] dark:text-[#8E9F94]">
            {answeredCount} of {questions.length} Answered
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#25312B] dark:text-[#F1F5F1] tracking-tight">
          Module Quiz: {moduleTitle}
        </h1>
        <p className="text-xs sm:text-sm text-[#525E56] dark:text-[#C1CDC4] mt-1">
          Review core concepts without pressure. Immediate explanations help clarify misunderstandings.
        </p>
      </div>

      {/* Result Card when submitted */}
      {attemptResult && (
        <div className={`p-6 rounded-2xl border ${
          attemptResult.passed
            ? 'bg-[#EAF4EE] dark:bg-[#1B2E24] border-[#B7D9C3] dark:border-[#2B4E3C]'
            : 'bg-[#FCF4DF] dark:bg-[#2D2615] border-[#E8D39E] dark:border-[#5C4A1C]'
        } space-y-4`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start sm:items-center gap-3">
              <div className={`p-2.5 rounded-xl ${
                attemptResult.passed
                  ? 'bg-[#DCEFE8] dark:bg-[#263C31] text-[#237448] dark:text-[#8BC9A5]'
                  : 'bg-[#FBE6AB] dark:bg-[#3D321A] text-[#8A5A00] dark:text-[#F3C969]'
              }`}>
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-[#25312B] dark:text-[#F1F5F1]">
                  {attemptResult.passed ? 'Understanding Verified!' : 'Revision Recommended'}
                </h3>
                <p className={`text-xs sm:text-sm ${attemptResult.passed ? 'text-[#25312B] dark:text-[#F1F5F1]' : 'text-[#66480A] dark:text-[#FBE6AB]'}`}>
                  You scored {attemptResult.score} of {attemptResult.totalQuestions} ({attemptResult.percentage}%).
                  {attemptResult.passed
                    ? ' Great job grasping these principles.'
                    : ' Check the detailed explanations below to strengthen the points you missed.'}
                </p>
              </div>
            </div>
            <button
              onClick={handleRetake}
              className="px-4 py-2 rounded-xl bg-[#FFFFFF] dark:bg-[#1C2620] hover:bg-[#F0F1EA] dark:hover:bg-[#25312B] text-[#25312B] dark:text-[#F1F5F1] border border-[#D9DED6] dark:border-[#39483F] text-xs font-semibold flex items-center gap-1.5 transition-colors shrink-0 shadow-xs"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Retake Quiz
            </button>
          </div>
        </div>
      )}

      {/* Questions */}
      <div className="space-y-6">
        {questions.map((q, idx) => {
          const selected = selectedAnswers[q.id];
          const evaluated = attemptResult?.answers.find(a => a.questionId === q.id);

          return (
            <div
              key={q.id}
              className="p-6 rounded-2xl bg-[#FFFFFF] dark:bg-[#1C2620] border border-[#D9DED6] dark:border-[#39483F] space-y-4 shadow-xs"
            >
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-sm font-semibold text-[#25312B] dark:text-[#F1F5F1] leading-relaxed">
                  <span className="text-[#174D3A] dark:text-[#8BC9A5] font-mono mr-1.5">{idx + 1}.</span>
                  {q.question}
                </h3>
                {evaluated && (
                  evaluated.isCorrect ? (
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#237448] dark:text-[#8BC9A5] shrink-0">
                      <CheckCircle2 className="w-4 h-4" /> Correct answer
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#B42318] dark:text-[#F27F77] shrink-0">
                      <XCircle className="w-4 h-4" /> Review this concept
                    </span>
                  )
                )}
              </div>

              {q.codeSnippet && (
                <pre className="p-3.5 rounded-xl bg-[#141B17] text-xs font-mono text-[#E3EDE6] overflow-x-auto border border-[#28362E]">
                  <code>{q.codeSnippet}</code>
                </pre>
              )}

              <div className="space-y-2.5">
                {q.options.map((opt, optIdx) => {
                  const isSelected = selected === optIdx;
                  let buttonStyle = 'border-[#D9DED6] dark:border-[#39483F] bg-[#F7F5EF] dark:bg-[#141B17] text-[#25312B] dark:text-[#F1F5F1] hover:border-[#174D3A] dark:hover:border-[#8BC9A5]';

                  if (evaluated) {
                    if (optIdx === evaluated.correctIndex) {
                      buttonStyle = 'border-[#237448] bg-[#EAF4EE] dark:bg-[#1B2E24] text-[#237448] dark:text-[#8BC9A5] font-semibold';
                    } else if (isSelected) {
                      buttonStyle = 'border-[#B42318] bg-[#FDF0EE] dark:bg-[#321918] text-[#B42318] dark:text-[#F27F77]';
                    }
                  } else if (isSelected) {
                    buttonStyle = 'border-[#174D3A] bg-[#DCEFE8] dark:bg-[#263C31] text-[#174D3A] dark:text-[#8BC9A5] font-semibold';
                  }

                  return (
                    <button
                      key={optIdx}
                      disabled={Boolean(attemptResult)}
                      onClick={() => setSelectedAnswers(prev => ({ ...prev, [q.id]: optIdx }))}
                      className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm transition-all flex items-start gap-3 ${buttonStyle}`}
                    >
                      <span className={`w-5 h-5 rounded-full border text-[11px] font-mono flex items-center justify-center shrink-0 mt-0.5 ${
                        isSelected
                          ? 'border-[#174D3A] bg-[#174D3A] text-white dark:border-[#8BC9A5] dark:bg-[#8BC9A5] dark:text-[#103A2C]'
                          : 'border-[#D9DED6] dark:border-[#39483F] text-[#626D65] dark:text-[#8E9F94]'
                      }`}>
                        {String.fromCharCode(65 + optIdx)}
                      </span>
                      <span className="flex-1 leading-relaxed">{opt}</span>
                    </button>
                  );
                })}
              </div>

              {evaluated && (
                <div className="p-4 rounded-xl bg-[#F0F1EA] dark:bg-[#25312B] border border-[#D9DED6] dark:border-[#39483F] text-xs sm:text-sm text-[#25312B] dark:text-[#F1F5F1] space-y-1">
                  <div className="font-semibold text-[#174D3A] dark:text-[#8BC9A5] flex items-center gap-1.5">
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>Explanation</span>
                  </div>
                  <p className="leading-relaxed text-[#525E56] dark:text-[#C1CDC4]">
                    {evaluated.explanation}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Submission CTA */}
      {!attemptResult && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#D9DED6] dark:border-[#39483F]">
          <p className="text-xs text-[#626D65] dark:text-[#8E9F94]">
            {answeredCount === questions.length
              ? 'All questions answered. Ready to check your score.'
              : `Please answer all questions (${answeredCount}/${questions.length} complete).`}
          </p>
          <button
            onClick={handleSubmitAttempt}
            disabled={submitting || answeredCount === 0}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#174D3A] hover:bg-[#103A2C] text-white dark:bg-[#8BC9A5] dark:text-[#103A2C] dark:hover:bg-[#78D4C7] text-xs sm:text-sm font-semibold shadow-xs transition-all disabled:opacity-50"
          >
            {submitting ? 'Checking Answers...' : 'Submit & Check Answers'}
          </button>
        </div>
      )}
    </div>
  );
};
