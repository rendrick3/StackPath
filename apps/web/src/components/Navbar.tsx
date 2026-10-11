import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Layers,
  Map,
  BookOpen,
  Terminal,
  FolderGit2,
  BookMarked,
  FileText,
  Search,
  Sun,
  Moon,
  User,
  LogOut,
  Menu,
  X,
  Compass,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface NavbarProps {
  onOpenSearch: () => void;
  onOpenOnboarding: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenSearch, onOpenOnboarding }) => {
  const { user, logout, theme, toggleTheme } = useAuth();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-slate-950/80 border-b border-slate-800/60 transition-colors dark:bg-slate-950/80 dark:border-slate-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
            <Layers className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-white via-slate-200 to-indigo-200 bg-clip-text text-transparent">
              StackPath
            </span>
            <span className="text-xs uppercase font-bold tracking-widest text-indigo-400 block -mt-1">
              Academy
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-900/60 p-1.5 rounded-full border border-slate-800/80 shadow-inner">
          <Link
            to="/roadmap"
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
              isActive('/roadmap')
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Map className="w-3.5 h-3.5" />
            Roadmap
          </Link>
          <Link
            to="/curriculum"
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
              isActive('/curriculum')
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            Curriculum
          </Link>
          <Link
            to="/projects"
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
              isActive('/projects')
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <FolderGit2 className="w-3.5 h-3.5" />
            Projects
          </Link>
          <Link
            to="/sandbox"
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
              isActive('/sandbox')
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            Sandbox
          </Link>
          <Link
            to="/glossary"
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
              isActive('/glossary')
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            Glossary
          </Link>
        </nav>

        {/* Right Tools & User Actions */}
        <div className="flex items-center gap-2.5">
          {/* Quick Beginner Guide Trigger */}
          <button
            onClick={onOpenOnboarding}
            className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-amber-300 bg-amber-500/10 border border-amber-500/20 hover:bg-amber-500/20 transition-colors"
            title="What is Full Stack? Quick Guide for Absolute Beginners"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Start Guide
          </button>

          {/* Search Button */}
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs text-slate-400 bg-slate-900 border border-slate-800 hover:border-slate-700 hover:text-slate-200 transition-colors"
            aria-label="Search curriculum"
          >
            <Search className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Search</span>
            <kbd className="hidden sm:inline px-1.5 py-0.5 rounded bg-slate-800 text-[10px] text-slate-400 border border-slate-700">
              Ctrl+K
            </kbd>
          </button>

          {/* Theme Switcher */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-900 transition-colors"
            aria-label="Toggle dark/light mode"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* User Status / Login */}
          {user ? (
            <div className="flex items-center gap-2">
              <Link
                to="/dashboard"
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-indigo-600/10 border border-indigo-500/30 text-indigo-300 hover:bg-indigo-600/20 text-xs font-semibold transition-all"
              >
                <div className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px]">
                  {user.name.charAt(0)}
                </div>
                <span className="hidden sm:inline">{user.name.split(' ')[0]}</span>
              </Link>
              <button
                onClick={logout}
                className="p-2 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-900 transition-colors"
                title="Log out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <Link
              to="/auth"
              className="px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/20 transition-all flex items-center gap-1.5"
            >
              <User className="w-3.5 h-3.5" />
              Sign In
            </Link>
          )}

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-400 hover:text-white"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 pt-2 pb-4 border-b border-slate-800 bg-slate-950/95 space-y-2">
          <Link
            to="/roadmap"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-slate-300 hover:bg-slate-900"
          >
            <Map className="w-4 h-4 text-indigo-400" />
            Roadmap
          </Link>
          <Link
            to="/curriculum"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-slate-300 hover:bg-slate-900"
          >
            <BookOpen className="w-4 h-4 text-indigo-400" />
            Curriculum Explorer
          </Link>
          <Link
            to="/projects"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-slate-300 hover:bg-slate-900"
          >
            <FolderGit2 className="w-4 h-4 text-indigo-400" />
            Real Projects
          </Link>
          <Link
            to="/sandbox"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-slate-300 hover:bg-slate-900"
          >
            <Terminal className="w-4 h-4 text-indigo-400" />
            Code Sandbox
          </Link>
          <Link
            to="/glossary"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-slate-300 hover:bg-slate-900"
          >
            <Compass className="w-4 h-4 text-indigo-400" />
            Technical Glossary
          </Link>
          {user && (
            <>
              <Link
                to="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-slate-300 hover:bg-slate-900"
              >
                <Layers className="w-4 h-4 text-indigo-400" />
                Learning Dashboard
              </Link>
              <Link
                to="/notes"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-slate-300 hover:bg-slate-900"
              >
                <FileText className="w-4 h-4 text-indigo-400" />
                Personal Notes
              </Link>
              <Link
                to="/bookmarks"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-slate-300 hover:bg-slate-900"
              >
                <BookMarked className="w-4 h-4 text-indigo-400" />
                Bookmarks
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
};
