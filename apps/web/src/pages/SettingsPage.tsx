import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Sun, Moon, Type, Shield, LogOut, Check, Sparkles } from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const {
    user,
    theme,
    toggleTheme,
    fontSizePreference,
    setFontSizePreference,
    logout
  } = useAuth();

  const [dailyGoalMinutes, setDailyGoalMinutes] = useState(() => {
    return localStorage.getItem('stackpath_daily_goal') || '20';
  });
  const [goalSaved, setGoalSaved] = useState(false);

  const handleSaveGoal = (val: string) => {
    setDailyGoalMinutes(val);
    localStorage.setItem('stackpath_daily_goal', val);
    setGoalSaved(true);
    setTimeout(() => setGoalSaved(false), 2000);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 space-y-10">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#25312B] dark:text-[#F1F5F1] tracking-tight">
          Preferences & Settings
        </h1>
        <p className="text-sm text-[#525E56] dark:text-[#C1CDC4] mt-1">
          Customize your reading experience, learning pace, and account settings.
        </p>
      </div>

      {/* 1. Reading Experience & Font Size */}
      <section className="p-6 rounded-2xl border border-[#D9DED6] dark:border-[#39483F] bg-[#FFFFFF] dark:bg-[#1C2620] space-y-4 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#174D3A] dark:text-[#8BC9A5]">
          <Type className="w-4 h-4" />
          <span>Reading & Typography Preferences</span>
        </div>

        <p className="text-sm text-[#525E56] dark:text-[#C1CDC4] leading-relaxed">
          Adjust the body text scale across all lessons to ensure maximum reading comfort.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          <button
            onClick={() => setFontSizePreference('standard')}
            className={`p-3.5 rounded-xl border text-left transition-all ${
              fontSizePreference === 'standard'
                ? 'border-[#174D3A] bg-[#DCEFE8] dark:border-[#8BC9A5] dark:bg-[#263C31] text-[#174D3A] dark:text-[#8BC9A5] font-semibold'
                : 'border-[#D9DED6] dark:border-[#39483F] text-[#525E56] dark:text-[#C1CDC4] hover:border-[#174D3A] dark:hover:border-[#8BC9A5]'
            }`}
          >
            <div className="text-sm font-semibold mb-1">Standard (17px)</div>
            <div className="text-xs text-[#626D65] dark:text-[#8E9F94]">Default textbook size</div>
          </button>

          <button
            onClick={() => setFontSizePreference('large')}
            className={`p-3.5 rounded-xl border text-left transition-all ${
              fontSizePreference === 'large'
                ? 'border-[#174D3A] bg-[#DCEFE8] dark:border-[#8BC9A5] dark:bg-[#263C31] text-[#174D3A] dark:text-[#8BC9A5] font-semibold'
                : 'border-[#D9DED6] dark:border-[#39483F] text-[#525E56] dark:text-[#C1CDC4] hover:border-[#174D3A] dark:hover:border-[#8BC9A5]'
            }`}
          >
            <div className="text-base font-semibold mb-1">Large (19px)</div>
            <div className="text-xs text-[#626D65] dark:text-[#8E9F94]">Enhanced legibility</div>
          </button>

          <button
            onClick={() => setFontSizePreference('xl')}
            className={`p-3.5 rounded-xl border text-left transition-all ${
              fontSizePreference === 'xl'
                ? 'border-[#174D3A] bg-[#DCEFE8] dark:border-[#8BC9A5] dark:bg-[#263C31] text-[#174D3A] dark:text-[#8BC9A5] font-semibold'
                : 'border-[#D9DED6] dark:border-[#39483F] text-[#525E56] dark:text-[#C1CDC4] hover:border-[#174D3A] dark:hover:border-[#8BC9A5]'
            }`}
          >
            <div className="text-lg font-semibold mb-1">Extra Large (21px)</div>
            <div className="text-xs text-[#626D65] dark:text-[#8E9F94]">Generous, relaxed format</div>
          </button>
        </div>
      </section>

      {/* 2. Theme & Appearance */}
      <section className="p-6 rounded-2xl border border-[#D9DED6] dark:border-[#39483F] bg-[#FFFFFF] dark:bg-[#1C2620] space-y-4 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#174D3A] dark:text-[#8BC9A5]">
          {theme === 'dark' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          <span>Color Theme</span>
        </div>

        <p className="text-sm text-[#525E56] dark:text-[#C1CDC4] leading-relaxed">
          Switch between warm ivory light mode and deep forest slate dark mode.
        </p>

        <div className="flex items-center gap-3 pt-1">
          <button
            onClick={toggleTheme}
            className="px-4 py-2 rounded-lg border border-[#D9DED6] dark:border-[#39483F] hover:border-[#174D3A] dark:hover:border-[#8BC9A5] text-xs font-semibold flex items-center gap-2 transition-colors text-[#25312B] dark:text-[#F1F5F1]"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-[#F3C969]" /> : <Moon className="w-4 h-4 text-[#174D3A]" />}
            <span>Currently: {theme === 'dark' ? 'Forest Dark Mode' : 'Ivory Light Mode'} (Click to switch)</span>
          </button>
        </div>
      </section>

      {/* 3. Daily Study Goal */}
      <section className="p-6 rounded-2xl border border-[#D9DED6] dark:border-[#39483F] bg-[#FFFFFF] dark:bg-[#1C2620] space-y-4 shadow-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#174D3A] dark:text-[#8BC9A5]">
            <Sparkles className="w-4 h-4 text-[#167D78] dark:text-[#78D4C7]" />
            <span>Daily Learning Goal</span>
          </div>
          {goalSaved && (
            <span className="text-xs text-[#237448] dark:text-[#8BC9A5] font-semibold flex items-center gap-1">
              <Check className="w-3.5 h-3.5" /> Saved
            </span>
          )}
        </div>

        <p className="text-sm text-[#525E56] dark:text-[#C1CDC4] leading-relaxed">
          How many minutes per day would you like to dedicate to learning full-stack concepts?
        </p>

        <div className="flex flex-wrap gap-2 pt-1">
          {['15', '20', '30', '45', '60'].map((mins) => (
            <button
              key={mins}
              onClick={() => handleSaveGoal(mins)}
              className={`px-4 py-2 rounded-lg text-xs font-semibold border transition-all ${
                dailyGoalMinutes === mins
                  ? 'border-[#174D3A] bg-[#EDF6F1] dark:border-[#8BC9A5] dark:bg-[#263C31] text-[#174D3A] dark:text-[#8BC9A5]'
                  : 'border-[#D9DED6] dark:border-[#39483F] text-[#525E56] dark:text-[#C1CDC4] hover:border-[#174D3A] dark:hover:border-[#8BC9A5]'
              }`}
            >
              {mins} minutes
            </button>
          ))}
        </div>
      </section>

      {/* 4. Account & Authentication */}
      <section className="p-6 rounded-2xl border border-[#D9DED6] dark:border-[#39483F] bg-[#FFFFFF] dark:bg-[#1C2620] space-y-4 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#174D3A] dark:text-[#8BC9A5]">
          <Shield className="w-4 h-4" />
          <span>Learner Account</span>
        </div>

        {user ? (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-[#F0F1EA] dark:bg-[#25312B] border border-[#D9DED6] dark:border-[#39483F] space-y-1">
              <div className="text-xs text-[#626D65] dark:text-[#8E9F94]">Full Name</div>
              <div className="text-sm font-semibold text-[#25312B] dark:text-[#F1F5F1]">{user.name}</div>
              <div className="text-xs text-[#626D65] dark:text-[#8E9F94] pt-2">Email Address</div>
              <div className="text-sm font-mono text-[#525E56] dark:text-[#C1CDC4]">{user.email}</div>
            </div>

            <button
              onClick={logout}
              className="px-4 py-2 rounded-lg border border-[#F5C4BF] dark:border-[#622B29] text-[#B42318] dark:text-[#F27F77] hover:bg-[#FDF0EE] dark:hover:bg-[#321918] text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              Sign Out of StackPath Academy
            </button>
          </div>
        ) : (
          <div className="text-sm text-[#626D65] dark:text-[#8E9F94]">
            You are browsing as an unauthenticated guest. Sign in to sync your notes and progress.
          </div>
        )}
      </section>
    </div>
  );
};
