import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Map,
  ArrowRight,
  Clock
} from 'lucide-react';
import { phases, modules } from '@stackpath/content';
import { useAuth } from '../context/AuthContext';

export const RoadmapPage: React.FC = () => {
  const { isLessonCompleted } = useAuth();
  const [selectedPhase, setSelectedPhase] = useState<number | 'ALL'>('ALL');

  const filteredPhases = selectedPhase === 'ALL'
    ? phases
    : phases.filter(p => p.number === selectedPhase);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EDF6F1] dark:bg-[#263C31] border border-[#DCEFE8] dark:border-[#39483F] text-[#174D3A] dark:text-[#8BC9A5] text-xs font-semibold">
          <Map className="w-3.5 h-3.5 text-[#167D78] dark:text-[#78D4C7]" />
          <span>Full-Stack Learning Trajectory</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-[#25312B] dark:text-[#F1F5F1] tracking-tight">
          Learning Roadmap
        </h1>
        <p className="text-sm sm:text-base text-[#525E56] dark:text-[#C1CDC4] max-w-xl mx-auto leading-relaxed">
          The step-by-step path from zero knowledge to industry readiness. Each phase prepares you for the next with zero unnecessary gaps.
        </p>

        {/* Phase Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 pt-4">
          <button
            onClick={() => setSelectedPhase('ALL')}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
              selectedPhase === 'ALL'
                ? 'bg-[#174D3A] text-white dark:bg-[#8BC9A5] dark:text-[#103A2C] shadow-xs'
                : 'bg-[#FFFFFF] dark:bg-[#1C2620] text-[#525E56] dark:text-[#C1CDC4] hover:text-[#25312B] dark:hover:text-[#F1F5F1] border border-[#D9DED6] dark:border-[#39483F]'
            }`}
          >
            All 7 Phases
          </button>
          {phases.map(p => (
            <button
              key={p.number}
              onClick={() => setSelectedPhase(p.number)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                selectedPhase === p.number
                  ? 'bg-[#174D3A] text-white dark:bg-[#8BC9A5] dark:text-[#103A2C] shadow-xs'
                  : 'bg-[#FFFFFF] dark:bg-[#1C2620] text-[#525E56] dark:text-[#C1CDC4] hover:text-[#25312B] dark:hover:text-[#F1F5F1] border border-[#D9DED6] dark:border-[#39483F]'
              }`}
            >
              Phase {p.number}
            </button>
          ))}
        </div>
      </div>

      {/* Visual Roadmap Tree */}
      <div className="space-y-10 relative before:absolute before:inset-0 before:left-8 before:w-0.5 before:bg-[#D9DED6] dark:before:bg-[#39483F] before:hidden md:before:block">
        {filteredPhases.map((phase) => {
          const phaseModules = modules.filter(m => m.phaseId === phase.id);

          return (
            <div key={phase.id} className="relative space-y-5">
              {/* Phase Header Node */}
              <div className="flex items-start gap-4">
                <div className="hidden md:flex w-16 h-16 rounded-2xl bg-[#174D3A] dark:bg-[#8BC9A5] text-white dark:text-[#103A2C] font-black text-xl items-center justify-center shadow-xs shrink-0 z-10">
                  P{phase.number}
                </div>
                <div className="flex-1 p-6 rounded-2xl bg-[#FFFFFF] dark:bg-[#1C2620] border border-[#D9DED6] dark:border-[#39483F] shadow-xs">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                    <span className="text-xs font-mono font-bold text-[#174D3A] dark:text-[#8BC9A5] uppercase tracking-widest">
                      Phase {phase.number} • {phase.modulesCount} Modules
                    </span>
                    <span className="text-xs text-[#626D65] dark:text-[#8E9F94] italic">
                      {phase.tagline}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold text-[#25312B] dark:text-[#F1F5F1] mb-2">{phase.title}</h2>
                  <p className="text-xs sm:text-sm text-[#525E56] dark:text-[#C1CDC4] leading-relaxed">{phase.description}</p>
                </div>
              </div>

              {/* Modules in this Phase */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:pl-20">
                {phaseModules.map((mod) => (
                  <Link
                    key={mod.id}
                    to={`/curriculum#${mod.slug}`}
                    className="p-5 rounded-xl bg-[#FFFFFF] dark:bg-[#1C2620] border border-[#D9DED6] dark:border-[#39483F] hover:border-[#174D3A] dark:hover:border-[#8BC9A5] transition-all flex flex-col justify-between group shadow-xs hover:shadow"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-mono font-bold text-[#174D3A] dark:text-[#8BC9A5]">
                          Module {mod.moduleNumber}
                        </span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                          mod.difficulty === 'BEGINNER'
                            ? 'bg-[#EAF4EE] dark:bg-[#1B2E24] text-[#237448] dark:text-[#8BC9A5]'
                            : mod.difficulty === 'INTERMEDIATE'
                            ? 'bg-[#FCF4DF] dark:bg-[#2D2615] text-[#8A5A00] dark:text-[#F3C969]'
                            : 'bg-[#FDF0EE] dark:bg-[#321918] text-[#B42318] dark:text-[#F27F77]'
                        }`}>
                          {mod.difficulty}
                        </span>
                      </div>
                      <h3 className="text-sm font-bold text-[#25312B] dark:text-[#F1F5F1] group-hover:text-[#174D3A] dark:group-hover:text-[#8BC9A5] transition-colors mb-2">
                        {mod.title}
                      </h3>
                      <p className="text-xs text-[#525E56] dark:text-[#C1CDC4] line-clamp-2 mb-4 leading-relaxed">
                        {mod.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-[#D9DED6] dark:border-[#39483F] flex items-center justify-between text-xs text-[#626D65] dark:text-[#8E9F94]">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        ~{mod.estimatedHours} hrs
                      </span>
                      <span className="text-[#126B63] dark:text-[#78D4C7] font-semibold group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                        View Module <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
