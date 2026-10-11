import React, { useState } from 'react';
import {
  FolderGit2,
  CheckCircle2,
  AlertTriangle,
  Check,
  Layers,
  Target
} from 'lucide-react';
import { projects } from '@stackpath/content';

export const ProjectsPage: React.FC = () => {
  const [selectedProjectId, setSelectedProjectId] = useState(projects[0].id);
  const activeProject = projects.find(p => p.id === selectedProjectId) || projects[0];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-10">
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EDF6F1] dark:bg-[#263C31] border border-[#DCEFE8] dark:border-[#39483F] text-[#174D3A] dark:text-[#8BC9A5] text-xs font-semibold">
          <FolderGit2 className="w-3.5 h-3.5 text-[#167D78] dark:text-[#78D4C7]" />
          <span>Milestone-Driven Engineering</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-[#25312B] dark:text-[#F1F5F1] tracking-tight">
          Portfolio Projects
        </h1>
        <p className="text-sm sm:text-base text-[#525E56] dark:text-[#C1CDC4] max-w-2xl leading-relaxed">
          11 progressive projects built with real industry tooling. Learn architecture, testing, database schemas, and clean code step-by-step.
        </p>
      </div>

      {/* Projects Selection Bar */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
        {projects.map((proj) => (
          <button
            key={proj.id}
            onClick={() => setSelectedProjectId(proj.id)}
            className={`p-3 rounded-xl text-left border shrink-0 min-w-[160px] transition-all ${
              selectedProjectId === proj.id
                ? 'bg-[#DCEFE8] dark:bg-[#263C31] border-[#174D3A] dark:border-[#8BC9A5] text-[#174D3A] dark:text-[#8BC9A5] shadow-xs font-semibold'
                : 'bg-[#FFFFFF] dark:bg-[#1C2620] border-[#D9DED6] dark:border-[#39483F] text-[#525E56] dark:text-[#C1CDC4] hover:border-[#174D3A] dark:hover:border-[#8BC9A5]'
            }`}
          >
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#167D78] dark:text-[#78D4C7] block mb-0.5">
              Project #{proj.projectNumber}
            </span>
            <span className="text-xs font-bold line-clamp-1 block text-[#25312B] dark:text-[#F1F5F1]">
              {proj.title}
            </span>
          </button>
        ))}
      </div>

      {/* Selected Project Details */}
      <div className="p-6 sm:p-8 rounded-2xl bg-[#FFFFFF] dark:bg-[#1C2620] border border-[#D9DED6] dark:border-[#39483F] space-y-8 shadow-xs">
        {/* Title Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#F0F1EA] dark:border-[#25312B]">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono font-bold text-[#174D3A] dark:text-[#8BC9A5] px-2 py-0.5 rounded bg-[#EDF6F1] dark:bg-[#263C31] border border-[#DCEFE8] dark:border-[#39483F]">
                Project {activeProject.projectNumber}
              </span>
              <span className="text-xs font-semibold text-[#626D65] dark:text-[#8E9F94]">
                Level: {activeProject.difficulty}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#25312B] dark:text-[#F1F5F1] tracking-tight">
              {activeProject.title}
            </h2>
            <p className="text-xs sm:text-sm text-[#525E56] dark:text-[#C1CDC4] mt-1">
              {activeProject.tagline}
            </p>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {activeProject.technologies.map((t) => (
              <span
                key={t}
                className="px-2.5 py-1 rounded-lg bg-[#F0F1EA] dark:bg-[#25312B] border border-[#D9DED6] dark:border-[#39483F] text-xs font-mono text-[#174D3A] dark:text-[#8BC9A5]"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Problem Statement & Objectives */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="p-5 rounded-xl bg-[#F0F1EA] dark:bg-[#25312B] border border-[#D9DED6] dark:border-[#39483F] space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#626D65] dark:text-[#8E9F94]">
              Problem Statement
            </h3>
            <p className="text-xs sm:text-sm text-[#25312B] dark:text-[#F1F5F1] leading-relaxed">
              {activeProject.problemStatement}
            </p>
          </div>

          <div className="p-5 rounded-xl bg-[#F0F1EA] dark:bg-[#25312B] border border-[#D9DED6] dark:border-[#39483F] space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#174D3A] dark:text-[#8BC9A5]">
              Core Learning Goals
            </h3>
            <ul className="space-y-1.5">
              {activeProject.learningObjectives.map((obj, i) => (
                <li key={i} className="text-xs sm:text-sm text-[#25312B] dark:text-[#F1F5F1] flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-[#237448] dark:text-[#8BC9A5] shrink-0 mt-0.5" />
                  <span>{obj}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Architecture Overview */}
        <div className="p-5 rounded-xl bg-[#141B17] border border-[#28362E] space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#78D4C7] flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5" />
            <span>Architecture & Blueprint Overview</span>
          </h3>
          <p className="text-xs sm:text-sm text-[#E3EDE6] leading-relaxed font-mono">
            {activeProject.architectureOverview}
          </p>
        </div>

        {/* Milestones */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#626D65] dark:text-[#8E9F94]">
            Progressive Milestones
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeProject.milestones.map((ms) => (
              <div
                key={ms.step}
                className="p-5 rounded-xl border border-[#D9DED6] dark:border-[#39483F] bg-[#FFFFFF] dark:bg-[#1C2620] space-y-3"
              >
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#EDF6F1] dark:bg-[#263C31] border border-[#DCEFE8] dark:border-[#39483F] text-[#174D3A] dark:text-[#8BC9A5] text-xs font-bold flex items-center justify-center shrink-0">
                    {ms.step}
                  </span>
                  <h4 className="text-xs sm:text-sm font-bold text-[#25312B] dark:text-[#F1F5F1]">{ms.title}</h4>
                </div>
                <p className="text-xs text-[#525E56] dark:text-[#C1CDC4] leading-relaxed">{ms.description}</p>
                <div className="space-y-1.5 pt-1">
                  {ms.tasks.map((task, ti) => (
                    <div key={ti} className="text-xs text-[#25312B] dark:text-[#F1F5F1] flex items-start gap-2">
                      <span className="text-[#167D78] dark:text-[#78D4C7] font-bold">•</span>
                      <span>{task}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Common Pitfalls */}
        {activeProject.commonMistakes.length > 0 && (
          <div className="p-5 rounded-xl bg-[#FCF4DF] dark:bg-[#2D2615] border border-[#E8D39E] dark:border-[#5C4A1C] space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#8A5A00] dark:text-[#F3C969] flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4" />
              <span>Common Pitfalls to Avoid</span>
            </h3>
            {activeProject.commonMistakes.map((m, i) => (
              <div key={i} className="text-xs sm:text-sm text-[#66480A] dark:text-[#FBE6AB] space-y-0.5">
                <strong className="text-[#25312B] dark:text-[#F1F5F1]">{m.title}:</strong> {m.explanation}
              </div>
            ))}
          </div>
        )}

        {/* Acceptance Checklist */}
        <div className="p-5 rounded-xl bg-[#F0F1EA] dark:bg-[#25312B] border border-[#D9DED6] dark:border-[#39483F] space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#174D3A] dark:text-[#8BC9A5] flex items-center gap-1.5">
            <Target className="w-3.5 h-3.5" />
            <span>Acceptance Criteria & Review Checklist</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {activeProject.finalReviewChecklist.map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-[#25312B] dark:text-[#F1F5F1]">
                <CheckCircle2 className="w-4 h-4 text-[#237448] dark:text-[#8BC9A5] shrink-0 mt-0.5" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
