import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Home,
  Map,
  BookOpen,
  Terminal,
  FolderGit2,
  BookMarked,
  FileText,
  Compass,
  Settings,
  ChevronLeft,
  ChevronRight,
  User,
  LogOut,
  Layers
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface SidebarProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  collapsed,
  onToggleCollapse,
  mobileOpen,
  onCloseMobile
}) => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/' || location.pathname === '/dashboard';
    return location.pathname.startsWith(path);
  };

  const navItems = [
    { label: 'Learning Space', isHeader: true },
    {
      to: user ? '/dashboard' : '/',
      label: user ? 'Dashboard' : 'Overview',
      icon: Home
    },
    {
      to: '/roadmap',
      label: 'Learning Roadmap',
      icon: Map
    },
    {
      to: '/curriculum',
      label: 'Curriculum',
      icon: BookOpen
    },
    {
      to: '/sandbox',
      label: 'Practice Sandbox',
      icon: Terminal
    },
    {
      to: '/projects',
      label: 'Projects',
      icon: FolderGit2
    },
    { label: 'Personal Library', isHeader: true },
    {
      to: '/notes',
      label: 'My Notes',
      icon: FileText
    },
    {
      to: '/bookmarks',
      label: 'Bookmarks',
      icon: BookMarked
    },
    {
      to: '/glossary',
      label: 'Glossary',
      icon: Compass
    },
    { label: 'System', isHeader: true },
    {
      to: '/settings',
      label: 'Settings',
      icon: Settings
    }
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 flex flex-col border-r transition-all duration-200 ease-in-out
          bg-[#FFFFFF] dark:bg-[#1C2620] border-[#D9DED6] dark:border-[#39483F]
          ${collapsed ? 'w-16' : 'w-64'}
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Brand Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-[#D9DED6] dark:border-[#39483F] shrink-0">
          <Link
            to="/"
            onClick={onCloseMobile}
            className="flex items-center gap-2.5 overflow-hidden group focus-visible:ring-2 focus-visible:ring-[#174D3A] dark:focus-visible:ring-[#8BC9A5] rounded-lg p-1"
          >
            <div className="w-8 h-8 rounded-lg bg-[#174D3A] dark:bg-[#8BC9A5] flex items-center justify-center text-white dark:text-[#103A2C] shrink-0 shadow-xs">
              <Layers className="w-4 h-4" />
            </div>
            {!collapsed && (
              <div className="flex flex-col">
                <span className="font-bold text-sm tracking-tight text-[#25312B] dark:text-[#F1F5F1] leading-tight">
                  StackPath
                </span>
                <span className="text-[10px] uppercase font-semibold tracking-wider text-[#167D78] dark:text-[#78D4C7]">
                  Academy
                </span>
              </div>
            )}
          </Link>

          {/* Desktop Collapse Toggle */}
          <button
            onClick={onToggleCollapse}
            className="hidden lg:flex p-1.5 rounded-md text-[#525E56] dark:text-[#C1CDC4] hover:text-[#25312B] dark:hover:text-[#F1F5F1] hover:bg-[#F0F1EA] dark:hover:bg-[#25312B] transition-colors"
            title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Navigation List */}
        <div className="flex-1 overflow-y-auto px-2.5 py-4 space-y-1">
          {navItems.map((item, idx) => {
            if (item.isHeader) {
              if (collapsed) return null;
              return (
                <div
                  key={idx}
                  className="px-2 pt-4 pb-1 text-[11px] font-semibold uppercase tracking-wider text-[#626D65] dark:text-[#8E9F94]"
                >
                  {item.label}
                </div>
              );
            }

            const Icon = item.icon!;
            const active = isActive(item.to!);

            return (
              <Link
                key={item.to}
                to={item.to!}
                onClick={onCloseMobile}
                title={collapsed ? item.label : undefined}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-xs transition-all ${
                  active
                    ? 'bg-[#DCEFE8] dark:bg-[#263C31] text-[#174D3A] dark:text-[#8BC9A5] font-semibold'
                    : 'text-[#525E56] dark:text-[#C1CDC4] hover:text-[#25312B] dark:hover:text-[#F1F5F1] hover:bg-[#F0F1EA] dark:hover:bg-[#25312B] font-medium'
                }`}
              >
                <Icon
                  className={`w-4 h-4 shrink-0 transition-colors ${
                    active
                      ? 'text-[#174D3A] dark:text-[#8BC9A5]'
                      : 'text-[#626D65] dark:text-[#8E9F94]'
                  }`}
                />
                {!collapsed && <span className="truncate">{item.label}</span>}
              </Link>
            );
          })}
        </div>

        {/* User Account / Auth Section at Bottom */}
        <div className="p-3 border-t border-[#D9DED6] dark:border-[#39483F] shrink-0">
          {user ? (
            <div className="flex items-center justify-between gap-2">
              <Link
                to="/settings"
                onClick={onCloseMobile}
                className="flex items-center gap-2.5 min-w-0 p-1.5 rounded-lg hover:bg-[#F0F1EA] dark:hover:bg-[#25312B] transition-colors flex-1"
              >
                <div className="w-7 h-7 rounded-full bg-[#DCEFE8] dark:bg-[#263C31] text-[#174D3A] dark:text-[#8BC9A5] font-bold text-xs flex items-center justify-center shrink-0">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                {!collapsed && (
                  <div className="min-w-0 flex-1 text-left">
                    <span className="text-xs font-medium text-[#25312B] dark:text-[#F1F5F1] truncate block">
                      {user.name}
                    </span>
                    <span className="text-[10px] text-[#626D65] dark:text-[#8E9F94] truncate block">
                      Learner Account
                    </span>
                  </div>
                )}
              </Link>
              {!collapsed && (
                <button
                  onClick={logout}
                  className="p-1.5 rounded-md text-[#626D65] dark:text-[#8E9F94] hover:text-[#B42318] hover:bg-[#FDF0EE] dark:hover:bg-[#321918] transition-colors"
                  title="Sign out"
                  aria-label="Sign out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              )}
            </div>
          ) : (
            <Link
              to="/auth"
              onClick={onCloseMobile}
              className={`flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-semibold bg-[#174D3A] hover:bg-[#103A2C] text-white transition-colors shadow-xs ${
                collapsed ? 'p-2' : ''
              }`}
            >
              <User className="w-4 h-4 shrink-0" />
              {!collapsed && <span>Sign In</span>}
            </Link>
          )}
        </div>
      </aside>
    </>
  );
};
