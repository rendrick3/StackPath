import React from 'react';
import { Link } from 'react-router-dom';
import { Layers, Terminal, ShieldCheck, Database, GitBranch, Cpu, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-800/80 bg-slate-950 py-12 px-4 sm:px-6 lg:px-8 mt-24">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-4 md:col-span-1">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
              <Layers className="w-4 h-4" />
            </div>
            <span className="font-bold text-base text-white tracking-tight">StackPath Academy</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Start from absolute zero. Understand the code. Build real, production-grade full-stack applications with confidence.
          </p>
          <div className="flex items-center gap-2 text-[11px] text-slate-500">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Zero-fluff pedagogical engineering</span>
          </div>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3">Curriculum Phases</h4>
          <ul className="space-y-2 text-xs text-slate-400">
            <li><Link to="/roadmap" className="hover:text-indigo-400 transition-colors">Phase 1: Foundations</Link></li>
            <li><Link to="/roadmap" className="hover:text-indigo-400 transition-colors">Phase 2: Frontend Engineering</Link></li>
            <li><Link to="/roadmap" className="hover:text-indigo-400 transition-colors">Phase 3: Backend & REST APIs</Link></li>
            <li><Link to="/roadmap" className="hover:text-indigo-400 transition-colors">Phase 4: SQL & Prisma Databases</Link></li>
            <li><Link to="/roadmap" className="hover:text-indigo-400 transition-colors">Phase 5: Auth & Security</Link></li>
            <li><Link to="/roadmap" className="hover:text-indigo-400 transition-colors">Phase 6: Testing & Quality</Link></li>
            <li><Link to="/roadmap" className="hover:text-indigo-400 transition-colors">Phase 7: Advanced DevOps</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3">Learning Tools</h4>
          <ul className="space-y-2 text-xs text-slate-400">
            <li><Link to="/curriculum" className="hover:text-indigo-400 transition-colors">Curriculum Explorer</Link></li>
            <li><Link to="/projects" className="hover:text-indigo-400 transition-colors">11 Guided Capstones</Link></li>
            <li><Link to="/sandbox" className="hover:text-indigo-400 transition-colors">Interactive Sandbox</Link></li>
            <li><Link to="/glossary" className="hover:text-indigo-400 transition-colors">Web Dev Glossary</Link></li>
            <li><Link to="/dashboard" className="hover:text-indigo-400 transition-colors">Progress Dashboard</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3">Core Technology Stack</h4>
          <div className="flex flex-wrap gap-1.5">
            <span className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-[11px] text-slate-300">HTML5 / CSS3</span>
            <span className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-[11px] text-slate-300">JavaScript ES6+</span>
            <span className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-[11px] text-slate-300">TypeScript</span>
            <span className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-[11px] text-slate-300">React & Vite</span>
            <span className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-[11px] text-slate-300">Node.js & Express</span>
            <span className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-[11px] text-slate-300">PostgreSQL</span>
            <span className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-[11px] text-slate-300">Prisma ORM</span>
            <span className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-[11px] text-slate-300">Vitest</span>
            <span className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-[11px] text-slate-300">Docker</span>
          </div>
          <p className="mt-4 text-[11px] text-slate-500">
            StackPath Academy &copy; 2026. Built for independent software engineers.
          </p>
        </div>
      </div>
    </footer>
  );
};
