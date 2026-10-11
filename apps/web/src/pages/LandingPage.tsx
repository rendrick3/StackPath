import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Sparkles,
  Database,
  Server,
  Globe,
  Zap,
  Code2
} from 'lucide-react';
import { phases } from '@stackpath/content';

export const LandingPage: React.FC = () => {
  return (
    <div className="space-y-24 py-10 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Hero Section */}
      <section className="text-center space-y-6 pt-6 sm:pt-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EDF6F1] dark:bg-[#263C31] border border-[#DCEFE8] dark:border-[#39483F] text-[#174D3A] dark:text-[#8BC9A5] text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-[#167D78] dark:text-[#78D4C7]" />
          <span>Zero Experience to Full-Stack Web Developer</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold text-[#25312B] dark:text-[#F1F5F1] tracking-tight leading-[1.15] max-w-4xl mx-auto">
          Start from zero.{' '}
          <span className="text-[#174D3A] dark:text-[#8BC9A5]">
            Understand the code.
          </span>{' '}
          Build real web applications.
        </h1>

        <p className="text-base sm:text-lg text-[#525E56] dark:text-[#C1CDC4] max-w-2xl mx-auto leading-relaxed">
          Your personal academy for full-stack engineering. Clear technical explanations in simple English, comfortable reading typography, and hands-on practice every step of the way.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
          <Link
            to="/lessons/how-computers-work-and-execute-code"
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#174D3A] hover:bg-[#103A2C] text-white dark:bg-[#8BC9A5] dark:text-[#103A2C] dark:hover:bg-[#78D4C7] font-semibold text-sm shadow-xs transition-all flex items-center justify-center gap-2"
          >
            <span>Begin Lesson 1: How Computers Work</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/curriculum"
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#FFFFFF] dark:bg-[#1C2620] hover:bg-[#F0F1EA] dark:hover:bg-[#25312B] text-[#25312B] dark:text-[#F1F5F1] border border-[#D9DED6] dark:border-[#39483F] font-semibold text-sm transition-all flex items-center justify-center gap-2"
          >
            <span>Explore Syllabus</span>
          </Link>
        </div>

        {/* Core numbers */}
        <div className="pt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto border-t border-[#D9DED6] dark:border-[#39483F]">
          <div className="p-2">
            <div className="text-2xl font-bold text-[#25312B] dark:text-[#F1F5F1]">7 Phases</div>
            <div className="text-xs text-[#626D65] dark:text-[#8E9F94] mt-0.5">Foundations to Production</div>
          </div>
          <div className="p-2">
            <div className="text-2xl font-bold text-[#174D3A] dark:text-[#8BC9A5]">25 Modules</div>
            <div className="text-xs text-[#626D65] dark:text-[#8E9F94] mt-0.5">Logical, incremental sequence</div>
          </div>
          <div className="p-2">
            <div className="text-2xl font-bold text-[#167D78] dark:text-[#78D4C7]">11 Projects</div>
            <div className="text-xs text-[#626D65] dark:text-[#8E9F94] mt-0.5">Real code, zero toy fillers</div>
          </div>
          <div className="p-2">
            <div className="text-2xl font-bold text-[#237448] dark:text-[#8BC9A5]">100% Persisted</div>
            <div className="text-xs text-[#626D65] dark:text-[#8E9F94] mt-0.5">Real notes & progress database</div>
          </div>
        </div>
      </section>

      {/* Practical Mental Model: The Web Request Flow */}
      <section className="p-6 sm:p-8 rounded-2xl bg-[#FFFFFF] dark:bg-[#1C2620] border border-[#D9DED6] dark:border-[#39483F] shadow-xs space-y-6">
        <div className="text-center max-w-xl mx-auto">
          <span className="text-xs font-mono uppercase tracking-widest text-[#174D3A] dark:text-[#8BC9A5] font-semibold block mb-1">
            Intuitive Mental Model
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-[#25312B] dark:text-[#F1F5F1] tracking-tight">
            How Full-Stack Systems Actually Work
          </h2>
          <p className="text-xs sm:text-sm text-[#525E56] dark:text-[#C1CDC4] mt-1">
            Understanding the architecture first helps you understand why each technology exists.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
          <div className="p-4 rounded-xl bg-[#F0F1EA] dark:bg-[#25312B] border border-[#D9DED6] dark:border-[#39483F] text-center flex flex-col items-center">
            <div className="w-9 h-9 rounded-xl bg-[#EDF6F1] dark:bg-[#263C31] text-[#167D78] dark:text-[#78D4C7] flex items-center justify-center mb-2.5">
              <Globe className="w-4 h-4" />
            </div>
            <h3 className="text-xs font-bold text-[#25312B] dark:text-[#F1F5F1] uppercase mb-1">1. Browser</h3>
            <p className="text-[11px] text-[#525E56] dark:text-[#C1CDC4]">
              User interacts with HTML, CSS, and React interface.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#F0F1EA] dark:bg-[#25312B] border border-[#D9DED6] dark:border-[#39483F] text-center flex flex-col items-center">
            <div className="w-9 h-9 rounded-xl bg-[#EDF6F1] dark:bg-[#263C31] text-[#174D3A] dark:text-[#8BC9A5] flex items-center justify-center mb-2.5">
              <Zap className="w-4 h-4" />
            </div>
            <h3 className="text-xs font-bold text-[#25312B] dark:text-[#F1F5F1] uppercase mb-1">2. HTTP</h3>
            <p className="text-[11px] text-[#525E56] dark:text-[#C1CDC4]">
              Request travels across the internet with headers and JSON.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#F0F1EA] dark:bg-[#25312B] border border-[#D9DED6] dark:border-[#39483F] text-center flex flex-col items-center">
            <div className="w-9 h-9 rounded-xl bg-[#EDF6F1] dark:bg-[#263C31] text-[#167D78] dark:text-[#78D4C7] flex items-center justify-center mb-2.5">
              <Server className="w-4 h-4" />
            </div>
            <h3 className="text-xs font-bold text-[#25312B] dark:text-[#F1F5F1] uppercase mb-1">3. Server API</h3>
            <p className="text-[11px] text-[#525E56] dark:text-[#C1CDC4]">
              Node.js & Express validates requests and checks security tokens.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#F0F1EA] dark:bg-[#25312B] border border-[#D9DED6] dark:border-[#39483F] text-center flex flex-col items-center">
            <div className="w-9 h-9 rounded-xl bg-[#EDF6F1] dark:bg-[#263C31] text-[#237448] dark:text-[#8BC9A5] flex items-center justify-center mb-2.5">
              <Database className="w-4 h-4" />
            </div>
            <h3 className="text-xs font-bold text-[#25312B] dark:text-[#F1F5F1] uppercase mb-1">4. Database</h3>
            <p className="text-[11px] text-[#525E56] dark:text-[#C1CDC4]">
              PostgreSQL stores structured records reliably on disk.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#F0F1EA] dark:bg-[#25312B] border border-[#D9DED6] dark:border-[#39483F] text-center flex flex-col items-center">
            <div className="w-9 h-9 rounded-xl bg-[#EDF6F1] dark:bg-[#263C31] text-[#8A5A00] dark:text-[#F3C969] flex items-center justify-center mb-2.5">
              <Code2 className="w-4 h-4" />
            </div>
            <h3 className="text-xs font-bold text-[#25312B] dark:text-[#F1F5F1] uppercase mb-1">5. UI Render</h3>
            <p className="text-[11px] text-[#525E56] dark:text-[#C1CDC4]">
              State updates reactively without reloading the entire page.
            </p>
          </div>
        </div>
      </section>

      {/* Curriculum Phases Overview */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#174D3A] dark:text-[#8BC9A5] font-semibold block mb-1">
              Structured Roadmap
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#25312B] dark:text-[#F1F5F1] tracking-tight">
              7 Structured Learning Phases
            </h2>
          </div>
          <Link
            to="/roadmap"
            className="text-xs font-semibold text-[#126B63] dark:text-[#78D4C7] hover:underline flex items-center gap-1"
          >
            View Interactive Roadmap <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {phases.map((phase) => (
            <div
              key={phase.id}
              className="p-5 rounded-2xl bg-[#FFFFFF] dark:bg-[#1C2620] border border-[#D9DED6] dark:border-[#39483F] flex flex-col justify-between shadow-xs"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono font-bold text-[#174D3A] dark:text-[#8BC9A5] px-2 py-0.5 rounded bg-[#EDF6F1] dark:bg-[#263C31] border border-[#DCEFE8] dark:border-[#39483F]">
                    Phase {phase.number}
                  </span>
                  <span className="text-xs text-[#626D65] dark:text-[#8E9F94]">
                    {phase.modulesCount} Modules
                  </span>
                </div>
                <h3 className="text-base font-bold text-[#25312B] dark:text-[#F1F5F1] mb-1.5">
                  {phase.title}
                </h3>
                <p className="text-xs text-[#525E56] dark:text-[#C1CDC4] leading-relaxed mb-4">
                  {phase.description}
                </p>
              </div>
              <div className="pt-3 border-t border-[#F0F1EA] dark:border-[#25312B] text-xs text-[#126B63] dark:text-[#78D4C7] font-semibold">
                {phase.tagline}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Beginner Welcome Banner */}
      <section className="p-8 sm:p-10 rounded-2xl bg-[#EDF6F1] dark:bg-[#1E2E25] border border-[#DCEFE8] dark:border-[#39483F] text-center space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-[#25312B] dark:text-[#F1F5F1] tracking-tight">
          Designed Specifically for Beginners
        </h2>
        <p className="text-xs sm:text-sm text-[#525E56] dark:text-[#C1CDC4] max-w-xl mx-auto leading-relaxed">
          No jargon without definitions. No confusing dashboards without clear direction. Every lesson gives you clear mental models and immediate feedback.
        </p>
        <div className="pt-2">
          <Link
            to="/lessons/how-computers-work-and-execute-code"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#174D3A] hover:bg-[#103A2C] text-white dark:bg-[#8BC9A5] dark:text-[#103A2C] dark:hover:bg-[#78D4C7] font-semibold text-xs sm:text-sm shadow-xs transition-all"
          >
            <span>Start Lesson 1 Right Now</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
};
