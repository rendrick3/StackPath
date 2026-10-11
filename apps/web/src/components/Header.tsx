import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import {
  Menu,
  Search,
  Sun,
  Moon,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface HeaderProps {
  onOpenMobileSidebar: () => void;
  onOpenSearch: () => void;
  onOpenOnboarding: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenMobileSidebar,
  onOpenSearch,
  onOpenOnboarding
}) => {
  const { theme, toggleTheme } = useAuth();
  const location = useLocation();

  const getBreadcrumb = () => {
    const path = location.pathname;
    if (path === '/') return 'Overview';
    if (path === '/dashboard') return 'Learning Dashboard';
    if (path === '/roadmap') return 'Curriculum Roadmap';
    if (path === '/curriculum') return 'Curriculum Explorer';
    if (path.startsWith('/lessons/')) return 'Lesson Reader';
    if (path.startsWith('/quiz/')) return 'Module Assessment';
    if (path === '/sandbox') return 'Practice Sandbox';
    if (path === '/projects') return 'Real Projects';
    if (path === '/notes') return 'My Study Notes';
    if (path === '/bookmarks') return 'Bookmarks';
    if (path === '/glossary') return 'Web Dev Glossary';
    if (path === '/settings') return 'Preferences & Settings';
    if (path === '/auth') return 'Sign In / Register';
    return 'StackPath Academy';
  };

  return (
    <header className="sticky top-0 z-30 h-16 bg-[#FFFFFF]/95 dark:bg-[#1C2620]/95 backdrop-blur-md border-b border-[#D9DED6] dark:border-[#39483F] px-4 sm:px-6 flex items-center justify-between transition-colors">
      {/* Left: Mobile hamburger & breadcrumb */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={onOpenMobileSidebar}
          className="lg:hidden p-2 rounded-lg text-[#525E56] hover:text-[#25312B] dark:text-[#C1CDC4] dark:hover:text-[#F1F5F1] hover:bg-[#F0F1EA] dark:hover:bg-[#25312B] transition-colors"
          aria-label="Open navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Current Location Breadcrumb */}
        <div className="flex items-center gap-1.5 text-xs font-medium text-[#626D65] dark:text-[#8E9F94] min-w-0">
          <Link to="/" className="hover:text-[#174D3A] dark:hover:text-[#8BC9A5] transition-colors truncate hidden sm:inline">
            Academy
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-[#D9DED6] dark:text-[#39483F] shrink-0 hidden sm:inline" />
          <span className="text-[#25312B] dark:text-[#F1F5F1] font-semibold truncate">
            {getBreadcrumb()}
          </span>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2">
        {/* Beginner Onboarding Guide trigger */}
        <button
          onClick={onOpenOnboarding}
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-[#174D3A] dark:text-[#8BC9A5] bg-[#EDF6F1] dark:bg-[#263C31] border border-[#DCEFE8] dark:border-[#39483F] hover:bg-[#DCEFE8] dark:hover:bg-[#1E2E25] transition-colors"
          title="What is Full Stack? Quick Guide for Absolute Beginners"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#167D78] dark:text-[#78D4C7]" />
          <span>New to Coding?</span>
        </button>

        {/* Search Input Trigger */}
        <button
          onClick={onOpenSearch}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs text-[#525E56] dark:text-[#C1CDC4] bg-[#F0F1EA] dark:bg-[#25312B] border border-[#D9DED6] dark:border-[#39483F] hover:border-[#174D3A] dark:hover:border-[#8BC9A5] hover:text-[#25312B] dark:hover:text-[#F1F5F1] transition-colors"
          aria-label="Search lessons and concepts"
        >
          <Search className="w-3.5 h-3.5 text-[#167D78] dark:text-[#78D4C7]" />
          <span className="hidden md:inline">Search curriculum</span>
          <kbd className="hidden md:inline text-[10px] px-1.5 py-0.5 rounded bg-[#FFFFFF] dark:bg-[#1C2620] text-[#626D65] dark:text-[#8E9F94] font-mono border border-[#D9DED6] dark:border-[#39483F]">
            ⌘K
          </kbd>
        </button>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg text-[#525E56] dark:text-[#C1CDC4] hover:text-[#25312B] dark:hover:text-[#F1F5F1] hover:bg-[#F0F1EA] dark:hover:bg-[#25312B] transition-colors"
          title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          {theme === 'dark' ? <Sun className="w-4 h-4 text-[#F3C969]" /> : <Moon className="w-4 h-4 text-[#174D3A]" />}
        </button>
      </div>
    </header>
  );
};
