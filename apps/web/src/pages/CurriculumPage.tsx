import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  Search,
  CheckCircle2,
  Clock,
  ArrowRight,
  Award,
  ChevronDown,
  ChevronUp,
  FolderGit2,
  Circle
} from 'lucide-react';
import { modules, lessons, phases } from '@stackpath/content';
import { Difficulty } from '@stackpath/shared';
import { useAuth } from '../context/AuthContext';

export const CurriculumPage: React.FC = () => {
  const { completedLessonIds, isLessonCompleted } = useAuth();
  const [search, setSearch] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | 'ALL'>('ALL');
  const [selectedPhase, setSelectedPhase] = useState<number | 'ALL'>('ALL');
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({
    'module-1': true,
    'module-2': true
  });

  const toggleModule = (modId: string) => {
    setExpandedModules(prev => ({
      ...prev,
      [modId]: !prev[modId]
    }));
  };

  const expandAll = () => {
    const all: Record<string, boolean> = {};
    modules.forEach(m => { all[m.id] = true; });
    setExpandedModules(all);
  };

  const collapseAll = () => {
    setExpandedModules({});
  };

  const filteredModules = modules.filter(m => {
    const matchesSearch =
      m.title.toLowerCase().includes(search.toLowerCase()) ||
      m.description.toLowerCase().includes(search.toLowerCase());
    const matchesDifficulty =
      selectedDifficulty === 'ALL' || m.difficulty === selectedDifficulty;
    const matchesPhase =
      selectedPhase === 'ALL' || m.phaseId === selectedPhase;
    return matchesSearch && matchesDifficulty && matchesPhase;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-10">
      {/* Title & Introduction */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EDF6F1] dark:bg-[#263C31] border border-[#DCEFE8] dark:border-[#39483F] text-[#174D3A] dark:text-[#8BC9A5] text-xs font-semibold">
          <BookOpen className="w-3.5 h-3.5 text-[#167D78] dark:text-[#78D4C7]" />
          <span>Step-by-Step Curriculum</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-[#25312B] dark:text-[#F1F5F1] tracking-tight">
          Curriculum Syllabus
        </h1>
        <p className="text-sm sm:text-base text-[#525E56] dark:text-[#C1CDC4] max-w-2xl leading-relaxed">
          Explore all 25 modules in topological sequence. Each module breaks complex full-stack concepts into digestible, beginner-friendly lessons with hands-on practice.
        </p>
      </div>

      {/* Filter and Search Controls */}
      <div className="p-4 rounded-2xl bg-[#FFFFFF] dark:bg-[#1C2620] border border-[#D9DED6] dark:border-[#39483F] flex flex-col md:flex-row gap-4 items-center justify-between shadow-xs">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-[#626D65] dark:text-[#8E9F94] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search topics, modules, or keywords..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#F7F5EF] dark:bg-[#141B17] border border-[#D9DED6] dark:border-[#39483F] text-xs text-[#25312B] dark:text-[#F1F5F1] placeholder-[#626D65] dark:placeholder-[#8E9F94] focus:outline-none focus:border-[#174D3A] dark:focus:border-[#8BC9A5]"
          />
        </div>

        {/* Filters and Expand/Collapse */}
        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
          <select
            value={selectedPhase}
            onChange={(e) => setSelectedPhase(e.target.value === 'ALL' ? 'ALL' : Number(e.target.value))}
            className="px-3 py-2 rounded-xl bg-[#F7F5EF] dark:bg-[#141B17] border border-[#D9DED6] dark:border-[#39483F] text-xs text-[#25312B] dark:text-[#F1F5F1] focus:outline-none"
          >
            <option value="ALL">All 7 Phases</option>
            {phases.map(p => (
              <option key={p.number} value={p.number}>Phase {p.number}: {p.title}</option>
            ))}
          </select>

          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value as any)}
            className="px-3 py-2 rounded-xl bg-[#F7F5EF] dark:bg-[#141B17] border border-[#D9DED6] dark:border-[#39483F] text-xs text-[#25312B] dark:text-[#F1F5F1] focus:outline-none"
          >
            <option value="ALL">All Levels</option>
            <option value="BEGINNER">Beginner</option>
            <option value="INTERMEDIATE">Intermediate</option>
            <option value="ADVANCED">Advanced</option>
          </select>

          <div className="flex items-center gap-1 pl-2 border-l border-[#D9DED6] dark:border-[#39483F] text-xs">
            <button
              onClick={expandAll}
              className="text-xs text-[#126B63] dark:text-[#78D4C7] hover:underline px-1.5 py-1 font-medium"
            >
              Expand all
            </button>
            <span className="text-[#D9DED6] dark:text-[#39483F]">•</span>
            <button
              onClick={collapseAll}
              className="text-xs text-[#626D65] dark:text-[#8E9F94] hover:underline px-1.5 py-1 font-medium"
            >
              Collapse
            </button>
          </div>
        </div>
      </div>

      {/* Modules List */}
      <div className="space-y-4">
        {filteredModules.map((mod) => {
          const modLessons = lessons.filter(l => l.moduleId === mod.id);
          const completedCount = modLessons.filter(l => isLessonCompleted(l.id)).length;
          const isExpanded = !!expandedModules[mod.id];

          return (
            <div
              key={mod.id}
              id={mod.slug}
              className="rounded-2xl bg-[#FFFFFF] dark:bg-[#1C2620] border border-[#D9DED6] dark:border-[#39483F] overflow-hidden shadow-xs transition-all"
            >
              {/* Module Header Bar / Accordion trigger */}
              <div
                onClick={() => toggleModule(mod.id)}
                className="p-5 sm:p-6 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-[#F7F5EF]/50 dark:hover:bg-[#141B17]/40 transition-colors"
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-mono font-bold text-[#174D3A] dark:text-[#8BC9A5] px-2 py-0.5 rounded bg-[#EDF6F1] dark:bg-[#263C31] border border-[#DCEFE8] dark:border-[#39483F]">
                      Module {mod.moduleNumber}
                    </span>
                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded ${
                      mod.difficulty === 'BEGINNER'
                        ? 'bg-[#EAF4EE] dark:bg-[#1B2E24] text-[#237448] dark:text-[#8BC9A5]'
                        : mod.difficulty === 'INTERMEDIATE'
                        ? 'bg-[#FCF4DF] dark:bg-[#2D2615] text-[#8A5A00] dark:text-[#F3C969]'
                        : 'bg-[#FDF0EE] dark:bg-[#321918] text-[#B42318] dark:text-[#F27F77]'
                    }`}>
                      {mod.difficulty}
                    </span>
                    <span className="text-xs text-[#626D65] dark:text-[#8E9F94] flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> ~{mod.estimatedHours} hrs
                    </span>

                    {modLessons.length > 0 && (
                      <span className="text-xs text-[#626D65] dark:text-[#8E9F94]">
                        • {completedCount} / {modLessons.length} lessons done
                      </span>
                    )}
                  </div>

                  <h2 className="text-lg sm:text-xl font-bold text-[#25312B] dark:text-[#F1F5F1] tracking-tight">
                    {mod.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-[#525E56] dark:text-[#C1CDC4] leading-relaxed max-w-3xl">
                    {mod.description}
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  {mod.hasQuiz && (
                    <Link
                      to={`/quiz/${mod.id}`}
                      onClick={(e) => e.stopPropagation()}
                      className="px-3.5 py-1.5 rounded-xl bg-[#EDF6F1] dark:bg-[#263C31] hover:bg-[#DCEFE8] dark:hover:bg-[#1E2E25] text-[#174D3A] dark:text-[#8BC9A5] border border-[#DCEFE8] dark:border-[#39483F] text-xs font-semibold flex items-center gap-1.5 transition-colors"
                    >
                      <Award className="w-3.5 h-3.5 text-[#167D78] dark:text-[#78D4C7]" />
                      Take Quiz
                    </Link>
                  )}
                  <button
                    type="button"
                    className="p-2 text-[#626D65] hover:text-[#25312B] dark:text-[#8E9F94] dark:hover:text-[#F1F5F1] rounded-lg"
                    aria-label={isExpanded ? 'Collapse module' : 'Expand module'}
                  >
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Collapsible Content */}
              {isExpanded && (
                <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-[#D9DED6] dark:border-[#39483F] space-y-5">
                  {/* Learning Objectives */}
                  <div className="p-4 rounded-xl bg-[#F0F1EA] dark:bg-[#25312B] border border-[#D9DED6] dark:border-[#39483F]">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#174D3A] dark:text-[#8BC9A5] mb-2.5">
                      Key Objectives
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {mod.learningObjectives.map((obj, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-[#25312B] dark:text-[#F1F5F1]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#237448] dark:text-[#8BC9A5] shrink-0 mt-0.5" />
                          <span>{obj}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Lessons Grid */}
                  {modLessons.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[#174D3A] dark:text-[#8BC9A5]">
                        Lessons in this Module ({modLessons.length})
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {modLessons.map((les) => {
                          const isDone = isLessonCompleted(les.id);
                          return (
                            <Link
                              key={les.id}
                              to={`/lessons/${les.slug}`}
                              className="p-3.5 rounded-xl border border-[#D9DED6] dark:border-[#39483F] hover:border-[#174D3A] dark:hover:border-[#8BC9A5] bg-[#FFFFFF] dark:bg-[#1C2620] hover:bg-[#EDF6F1]/40 dark:hover:bg-[#263C31]/40 transition-all flex items-center justify-between group"
                            >
                              <div className="flex items-start gap-2.5">
                                <div className="mt-0.5">
                                  {isDone ? (
                                    <CheckCircle2 className="w-4 h-4 text-[#237448] dark:text-[#8BC9A5]" />
                                  ) : (
                                    <Circle className="w-4 h-4 text-[#D9DED6] dark:text-[#39483F]" />
                                  )}
                                </div>
                                <div>
                                  <span className="text-[10px] font-mono text-[#626D65] dark:text-[#8E9F94] block mb-0.5">
                                    Lesson {les.order} • {les.estimatedMinutes} mins
                                  </span>
                                  <span className="text-xs font-bold text-[#25312B] dark:text-[#F1F5F1] group-hover:text-[#174D3A] dark:group-hover:text-[#8BC9A5]">
                                    {les.title}
                                  </span>
                                </div>
                              </div>
                              <ArrowRight className="w-4 h-4 text-[#626D65] group-hover:text-[#174D3A] dark:text-[#8E9F94] dark:group-hover:text-[#8BC9A5] group-hover:translate-x-1 transition-all shrink-0 ml-2" />
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Project connection */}
                  {mod.projectConnection && (
                    <div className="text-xs text-[#525E56] dark:text-[#C1CDC4] flex items-center gap-1.5 pt-1">
                      <FolderGit2 className="w-3.5 h-3.5 text-[#237448] dark:text-[#8BC9A5] shrink-0" />
                      <span><strong>Hands-on Project Context:</strong> {mod.projectConnection}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
