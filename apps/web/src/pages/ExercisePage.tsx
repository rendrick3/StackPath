import React, { useState } from 'react';
import { Terminal, Play, RotateCcw, Lightbulb, Eye, CheckCircle2, XCircle, Code2 } from 'lucide-react';
import { exercises } from '@stackpath/content';

export const ExercisePage: React.FC = () => {
  const [activeExerciseIndex, setActiveExerciseIndex] = useState(0);
  const exercise = exercises[activeExerciseIndex];

  const [code, setCode] = useState(exercise?.starterCode || '');
  const [consoleOutput, setConsoleOutput] = useState<string[]>([]);
  const [testResults, setTestResults] = useState<{ passed: boolean; message: string }[]>([]);
  const [showSolution, setShowSolution] = useState(false);
  const [hintLevel, setHintLevel] = useState(0);

  const handleSelectExercise = (idx: number) => {
    setActiveExerciseIndex(idx);
    setCode(exercises[idx].starterCode);
    setConsoleOutput([]);
    setTestResults([]);
    setShowSolution(false);
    setHintLevel(0);
  };

  const handleRunCode = () => {
    const logs: string[] = [];
    const originalLog = console.log;

    console.log = (...args: any[]) => {
      logs.push(args.map(a => (typeof a === 'object' ? JSON.stringify(a) : String(a))).join(' '));
      originalLog(...args);
    };

    try {
      const evalFn = new Function(`
        ${code}
        return {
          calculateMemory: typeof calculateMemory !== 'undefined' ? calculateMemory : undefined,
          getActiveStudents: typeof getActiveStudents !== 'undefined' ? getActiveStudents : undefined
        };
      `);

      const scope = evalFn();
      setConsoleOutput(logs.length > 0 ? logs : ['Execution completed without runtime errors.']);

      const results = exercise.testCases.map((tc) => {
        try {
          const testRunner = new Function('scope', `
            const { calculateMemory, getActiveStudents } = scope;
            return Boolean(${tc.testCode});
          `);
          const passed = Boolean(testRunner(scope));
          return {
            passed,
            message: `${tc.inputDescription}: ${passed ? 'PASSED' : 'Expected ' + tc.expectedOutput}`
          };
        } catch (err: any) {
          return {
            passed: false,
            message: `${tc.inputDescription}: Error running test check - ${err.message}`
          };
        }
      });

      setTestResults(results);
    } catch (err: any) {
      setConsoleOutput([`Runtime Error: ${err.message}`]);
      setTestResults([{ passed: false, message: `Syntax or Evaluation Error: ${err.message}` }]);
    } finally {
      console.log = originalLog;
    }
  };

  const handleReset = () => {
    setCode(exercise.starterCode);
    setConsoleOutput([]);
    setTestResults([]);
    setShowSolution(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EDF6F1] dark:bg-[#263C31] border border-[#DCEFE8] dark:border-[#39483F] text-[#174D3A] dark:text-[#8BC9A5] text-xs font-semibold mb-2">
            <Code2 className="w-3.5 h-3.5 text-[#167D78] dark:text-[#78D4C7]" />
            <span>Interactive Code Sandbox</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#25312B] dark:text-[#F1F5F1] tracking-tight">
            Practice Exercises
          </h1>
          <p className="text-xs sm:text-sm text-[#525E56] dark:text-[#C1CDC4] mt-1">
            Apply what you've learned immediately. Write code in the editor and verify test assertions in real time.
          </p>
        </div>

        {/* Task Selection Pills */}
        <div className="flex items-center gap-1.5 bg-[#FFFFFF] dark:bg-[#1C2620] p-1.5 rounded-xl border border-[#D9DED6] dark:border-[#39483F] shadow-xs">
          {exercises.map((ex, idx) => (
            <button
              key={ex.id}
              onClick={() => handleSelectExercise(idx)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeExerciseIndex === idx
                  ? 'bg-[#174D3A] text-white dark:bg-[#8BC9A5] dark:text-[#103A2C] shadow-xs'
                  : 'text-[#525E56] dark:text-[#C1CDC4] hover:text-[#25312B] dark:hover:text-[#F1F5F1]'
              }`}
            >
              Task {idx + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Grid: Instructions vs Editor */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Task & Requirements (5 Cols) */}
        <div className="lg:col-span-5 space-y-5">
          <div className="p-6 rounded-2xl bg-[#FFFFFF] dark:bg-[#1C2620] border border-[#D9DED6] dark:border-[#39483F] space-y-5 shadow-xs">
            <div>
              <span className="text-xs font-mono font-bold text-[#174D3A] dark:text-[#8BC9A5]">
                Exercise #{activeExerciseIndex + 1}
              </span>
              <h2 className="text-lg sm:text-xl font-bold text-[#25312B] dark:text-[#F1F5F1] mt-0.5">
                {exercise.title}
              </h2>
              <p className="text-xs sm:text-sm text-[#525E56] dark:text-[#C1CDC4] mt-2 leading-relaxed">
                {exercise.description}
              </p>
            </div>

            {/* Clear Requirements */}
            <div className="space-y-2 pt-2 border-t border-[#F0F1EA] dark:border-[#25312B]">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#174D3A] dark:text-[#8BC9A5]">
                Task Requirements
              </h3>
              <ul className="space-y-2">
                {exercise.instructions.map((inst, i) => (
                  <li key={i} className="text-xs sm:text-sm text-[#25312B] dark:text-[#F1F5F1] flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-[#EDF6F1] dark:bg-[#263C31] border border-[#DCEFE8] dark:border-[#39483F] text-[#174D3A] dark:text-[#8BC9A5] text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <span className="leading-relaxed">{inst}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Progressive Hints */}
            <div className="pt-2 border-t border-[#F0F1EA] dark:border-[#25312B] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#626D65] dark:text-[#8E9F94]">
                  Assistance
                </span>
                {hintLevel < exercise.hints.length && (
                  <button
                    onClick={() => setHintLevel(prev => prev + 1)}
                    className="text-xs text-[#8A5A00] dark:text-[#F3C969] font-semibold flex items-center gap-1 hover:underline"
                  >
                    <Lightbulb className="w-3.5 h-3.5" />
                    Reveal Hint ({hintLevel + 1} of {exercise.hints.length})
                  </button>
                )}
              </div>

              {hintLevel > 0 && (
                <div className="space-y-2">
                  {exercise.hints.slice(0, hintLevel).map((h, i) => (
                    <div key={i} className="p-3 rounded-xl bg-[#FCF4DF] dark:bg-[#2D2615] border border-[#E8D39E] dark:border-[#5C4A1C] text-xs text-[#66480A] dark:text-[#FBE6AB] leading-relaxed">
                      <strong>Hint {i + 1}:</strong> {h}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Verified Solution */}
            <div className="pt-2 border-t border-[#F0F1EA] dark:border-[#25312B]">
              <button
                onClick={() => setShowSolution(!showSolution)}
                className="text-xs font-semibold text-[#525E56] hover:text-[#174D3A] dark:text-[#C1CDC4] dark:hover:text-[#8BC9A5] flex items-center gap-1.5"
              >
                <Eye className="w-3.5 h-3.5" />
                {showSolution ? 'Hide Verified Solution' : 'View Verified Solution'}
              </button>
              {showSolution && exercise.solutionCode && (
                <div className="mt-3 p-4 rounded-xl bg-[#141B17] text-[#E3EDE6] border border-[#28362E] space-y-2">
                  <span className="text-[11px] font-mono font-bold text-[#8BC9A5]">Verified Solution:</span>
                  <pre className="text-xs font-mono text-[#A8E0BE] overflow-x-auto leading-relaxed">
                    <code>{exercise.solutionCode}</code>
                  </pre>
                  {exercise.solutionExplanation && (
                    <p className="text-xs text-[#C1CDC4] pt-2 border-t border-[#28362E]">
                      {exercise.solutionExplanation}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Code Editor & Execution Results (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="rounded-2xl border border-[#D9DED6] dark:border-[#39483F] bg-[#FFFFFF] dark:bg-[#1C2620] overflow-hidden shadow-xs flex flex-col">
            {/* Editor Action Bar */}
            <div className="px-4 py-3 bg-[#F0F1EA] dark:bg-[#1B2620] border-b border-[#D9DED6] dark:border-[#28362E] flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-mono text-[#525E56] dark:text-[#C1CDC4]">
                <Code2 className="w-4 h-4 text-[#167D78] dark:text-[#78D4C7]" />
                <span>exercise.{exercise.language === 'javascript' ? 'js' : 'ts'}</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleReset}
                  className="px-3 py-1.5 rounded-lg border border-[#D9DED6] dark:border-[#39483F] text-xs font-semibold text-[#525E56] dark:text-[#C1CDC4] hover:bg-[#FFFFFF] dark:hover:bg-[#25312B] transition-colors flex items-center gap-1"
                  title="Reset to starter code"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset</span>
                </button>
                <button
                  onClick={handleRunCode}
                  className="px-4 py-1.5 rounded-lg bg-[#174D3A] hover:bg-[#103A2C] text-white dark:bg-[#8BC9A5] dark:text-[#103A2C] dark:hover:bg-[#78D4C7] text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-all"
                >
                  <Play className="w-3 h-3 fill-current" />
                  <span>Run & Test Code</span>
                </button>
              </div>
            </div>

            {/* Code Textarea in Dark Forest Editor Surface */}
            <div className="bg-[#141B17] p-2">
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                rows={15}
                className="w-full p-3 bg-transparent font-mono text-xs sm:text-sm text-[#E3EDE6] resize-none focus:outline-none leading-relaxed selection:bg-[#167D78]/40"
                spellCheck={false}
              />
            </div>

            {/* Console Output & Test Results */}
            <div className="border-t border-[#D9DED6] dark:border-[#28362E] bg-[#F7F5EF] dark:bg-[#1C2620] p-5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#525E56] dark:text-[#C1CDC4] flex items-center gap-1.5">
                  <Terminal className="w-4 h-4 text-[#167D78] dark:text-[#78D4C7]" />
                  Execution & Test Feedback
                </span>
              </div>

              {/* Console Logs */}
              {consoleOutput.length > 0 && (
                <div className="p-3 rounded-xl bg-[#141B17] font-mono text-xs text-[#E3EDE6] space-y-1 overflow-x-auto border border-[#28362E]">
                  {consoleOutput.map((log, i) => (
                    <div key={i} className="text-[#A8E0BE]">❯ {log}</div>
                  ))}
                </div>
              )}

              {/* Test Assertions */}
              {testResults.length > 0 && (
                <div className="space-y-2">
                  {testResults.map((tr, i) => (
                    <div
                      key={i}
                      className={`flex items-start gap-2.5 p-3 rounded-xl text-xs sm:text-sm ${
                        tr.passed
                          ? 'bg-[#EAF4EE] dark:bg-[#1B2E24] text-[#237448] dark:text-[#8BC9A5] border border-[#B7D9C3] dark:border-[#2B4E3C]'
                          : 'bg-[#FDF0EE] dark:bg-[#321918] text-[#B42318] dark:text-[#F27F77] border border-[#F5C4BF] dark:border-[#622B29]'
                      }`}
                    >
                      {tr.passed ? (
                        <CheckCircle2 className="w-4 h-4 text-[#237448] dark:text-[#8BC9A5] shrink-0 mt-0.5" />
                      ) : (
                        <XCircle className="w-4 h-4 text-[#B42318] dark:text-[#F27F77] shrink-0 mt-0.5" />
                      )}
                      <span className="leading-relaxed font-mono">
                        <strong>{tr.passed ? 'PASSED: ' : 'REVIEW: '}</strong>
                        {tr.message}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
