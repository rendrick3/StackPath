import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Clock,
  Map,
  Compass,
  FileText,
  BookMarked,
  Sparkles,
  ChevronRight,
  Calendar,
  Layers
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { UserStats } from '@stackpath/shared';
import { modules, lessons } from '@stackpath/content';
import { apiUrl } from '../config/api';

export const DashboardPage: React.FC = () => {
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(apiUrl('/api/progress/stats'), {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (res.ok) {
          const data = await res.json();
          setStats(data);
        }
      } catch (err) {
        console.error('Failed to load dashboard statistics:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, [token]);

  if (!user) {
    return (
      <div className="max-w-lg mx-auto my-20 p-8 rounded-2xl border border-[#D9DED6] dark:border-[#39483F] bg-[#FFFFFF] dark:bg-[#1C2620] text-center space-y-4 shadow-sm">
        <div className="w-12 h-12 rounded-xl bg-[#EDF6F1] dark:bg-[#263C31] text-[#174D3A] dark:text-[#8BC9A5] flex items-center justify-center mx-auto">
          <BookOpen className="w-6 h-6" />
        </div>
        <h2 className="text-xl font-bold text-[#25312B] dark:text-[#F1F5F1]">
          Sign In to Your Learning Space
        </h2>
        <p className="text-sm text-[#525E56] dark:text-[#C1CDC4]">
          Your dashboard saves your exact location, notes, and progress so you can resume anytime without friction.
        </p>
        <div className="pt-2">
          <Link
            to="/auth"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#174D3A] hover:bg-[#103A2C] text-white dark:bg-[#8BC9A5] dark:text-[#103A2C] dark:hover:bg-[#78D4C7] text-xs font-semibold shadow-xs"
          >
            Sign In or Create Account
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto py-20 text-center text-sm text-[#626D65] dark:text-[#8E9F94]">
        Loading your learning workspace...
      </div>
    );
  }

  const completedCount = stats?.completedLessonsCount || 0;
  const totalLessons = stats?.totalLessons || lessons.length;
  const percentage = stats?.overallPercentage || 0;

  // Active module
  const activeModuleSlug = stats?.currentModuleName;
  const activeModule = modules.find(m => m.title === activeModuleSlug) || modules[0];
  const activeModuleLessons = lessons.filter(l => l.moduleId === activeModule.id);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-10">
      {/* 1. Concise Greeting & Learning Status */}
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#25312B] dark:text-[#F1F5F1] tracking-tight">
          Good day, {user.name.split(' ')[0]}
        </h1>
        <p className="text-sm text-[#525E56] dark:text-[#C1CDC4]">
          {completedCount === 0
            ? 'Ready to write your first line of code? Let us begin at the very start.'
            : `You have completed ${completedCount} of ${totalLessons} lessons on your path to full-stack.`}
        </p>
      </div>

      {/* 2. Main Feature: Prominent "Continue Learning" Section */}
      <section className="p-6 sm:p-8 rounded-2xl border border-[#DCEFE8] dark:border-[#39483F] bg-[#FFFFFF] dark:bg-[#1C2620] shadow-sm space-y-6">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-[#174D3A] dark:text-[#8BC9A5]">
            Current Focus
          </span>
          <span className="text-xs text-[#626D65] dark:text-[#8E9F94] font-medium">
            Phase {stats?.currentPhaseNumber || 1} • {stats?.currentModuleName || activeModule.title}
          </span>
        </div>

        <div className="space-y-2">
          <h2 className="text-xl sm:text-2xl font-bold text-[#25312B] dark:text-[#F1F5F1]">
            {stats?.currentLessonTitle || 'How Computers Think & Execute Code'}
          </h2>
          <p className="text-sm text-[#525E56] dark:text-[#C1CDC4] leading-relaxed max-w-2xl">
            Learn the foundational mechanics of machine instructions, CPU execution, and volatile RAM storage.
          </p>
        </div>

        {/* Clear Primary Action Button */}
        <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-[#F0F1EA] dark:border-[#25312B]">
          <div className="flex items-center gap-3 text-xs text-[#626D65] dark:text-[#8E9F94]">
            <span className="flex items-center gap-1.5 font-medium">
              <Clock className="w-3.5 h-3.5 text-[#167D78] dark:text-[#78D4C7]" />
              Estimated 12–15 minutes
            </span>
          </div>

          <Link
            to={`/lessons/${stats?.currentLessonSlug || 'how-computers-work-and-execute-code'}`}
            className="px-6 py-3 rounded-lg bg-[#174D3A] hover:bg-[#103A2C] text-white dark:bg-[#8BC9A5] dark:text-[#103A2C] dark:hover:bg-[#78D4C7] text-sm font-semibold transition-colors flex items-center justify-center gap-2 shadow-xs group"
          >
            <span>Continue Learning</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </section>

      {/* 3. Progress Overview (Restrained & Honest) */}
      <section className="p-6 rounded-xl border border-[#D9DED6] dark:border-[#39483F] bg-[#FFFFFF] dark:bg-[#1C2620] space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-[#25312B] dark:text-[#F1F5F1]">
            Curriculum Progress
          </h3>
          <span className="text-xs font-semibold text-[#174D3A] dark:text-[#8BC9A5]">
            {percentage}% Complete
          </span>
        </div>

        {/* Restrained progress track */}
        <div className="w-full bg-[#F0F1EA] dark:bg-[#25312B] rounded-full h-2 overflow-hidden">
          <div
            className="bg-[#174D3A] dark:bg-[#8BC9A5] h-2 rounded-full transition-all duration-300"
            style={{ width: `${Math.max(2, percentage)}%` }}
          />
        </div>

        <div className="flex items-center justify-between text-xs text-[#626D65] dark:text-[#8E9F94] pt-1">
          <span>{completedCount} lessons completed</span>
          <span>{totalLessons - completedCount} lessons remaining</span>
        </div>
      </section>

      {/* 4. Current Module & Upcoming Lessons */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-[#25312B] dark:text-[#F1F5F1]">
              {activeModule.title}
            </h3>
            <p className="text-xs text-[#626D65] dark:text-[#8E9F94] mt-0.5">
              Module {activeModule.moduleNumber} • {activeModule.difficulty}
            </p>
          </div>
          <Link
            to={`/curriculum#${activeModule.slug}`}
            className="text-xs font-semibold text-[#126B63] dark:text-[#78D4C7] hover:underline"
          >
            View all modules
          </Link>
        </div>

        <div className="border border-[#D9DED6] dark:border-[#39483F] rounded-xl bg-[#FFFFFF] dark:bg-[#1C2620] divide-y divide-[#F0F1EA] dark:divide-[#25312B]">
          {activeModuleLessons.map((l) => (
            <Link
              key={l.id}
              to={`/lessons/${l.slug}`}
              className="p-4 flex items-center justify-between hover:bg-[#F0F1EA] dark:hover:bg-[#25312B] transition-colors group"
            >
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-[#EDF6F1] dark:bg-[#263C31] text-[#174D3A] dark:text-[#8BC9A5] text-xs font-semibold flex items-center justify-center shrink-0">
                  {l.order}
                </span>
                <div>
                  <h4 className="text-sm font-medium text-[#25312B] dark:text-[#F1F5F1] group-hover:text-[#174D3A] dark:group-hover:text-[#8BC9A5] transition-colors">
                    {l.title}
                  </h4>
                  <span className="text-xs text-[#626D65] dark:text-[#8E9F94]">{l.estimatedMinutes} mins</span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-[#626D65] dark:text-[#8E9F94] group-hover:text-[#25312B] dark:group-hover:text-[#F1F5F1] transition-colors" />
            </Link>
          ))}
        </div>
      </section>

      {/* 5. Library Shortcuts (Notes & Bookmarks) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link
          to="/notes"
          className="p-5 rounded-xl border border-[#D9DED6] dark:border-[#39483F] bg-[#FFFFFF] dark:bg-[#1C2620] hover:border-[#174D3A] dark:hover:border-[#8BC9A5] transition-all group shadow-xs"
        >
          <div className="flex items-center gap-2 mb-1.5 text-xs font-semibold text-[#25312B] dark:text-[#F1F5F1]">
            <FileText className="w-4 h-4 text-[#167D78] dark:text-[#78D4C7]" />
            <span>My Study Notes ({stats?.notesCount || 0})</span>
          </div>
          <p className="text-xs text-[#525E56] dark:text-[#C1CDC4] leading-relaxed">
            Review your personal reflections and key takeaways saved from lessons.
          </p>
        </Link>

        <Link
          to="/bookmarks"
          className="p-5 rounded-xl border border-[#D9DED6] dark:border-[#39483F] bg-[#FFFFFF] dark:bg-[#1C2620] hover:border-[#174D3A] dark:hover:border-[#8BC9A5] transition-all group shadow-xs"
        >
          <div className="flex items-center gap-2 mb-1.5 text-xs font-semibold text-[#25312B] dark:text-[#F1F5F1]">
            <BookMarked className="w-4 h-4 text-[#174D3A] dark:text-[#8BC9A5]" />
            <span>Saved Bookmarks ({stats?.bookmarksCount || 0})</span>
          </div>
          <p className="text-xs text-[#525E56] dark:text-[#C1CDC4] leading-relaxed">
            Quickly return to lessons you flagged for deep review or revision.
          </p>
        </Link>
      </div>

      {/* 6. Honest Recent Activity (Only if real data exists) */}
      {stats?.weeklyActivity && stats.weeklyActivity.some(d => d.count > 0) && (
        <section className="p-5 rounded-xl border border-[#D9DED6] dark:border-[#39483F] bg-[#FFFFFF] dark:bg-[#1C2620] space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#626D65] dark:text-[#8E9F94]">
            Recent Activity (Last 7 Days)
          </h3>
          <div className="flex items-end gap-2 h-16 pt-2">
            {stats.weeklyActivity.map((day) => {
              const height = Math.min(100, Math.max(12, day.count * 30));
              const dayName = new Date(day.date).toLocaleDateString('en-US', { weekday: 'narrow' });
              return (
                <div key={day.date} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                  <div
                    className={`w-full rounded-sm ${day.count > 0 ? 'bg-[#167D78] dark:bg-[#78D4C7]' : 'bg-[#F0F1EA] dark:bg-[#25312B]'}`}
                    style={{ height: `${height}%` }}
                    title={`${day.date}: ${day.count} activities`}
                  />
                  <span className="text-[10px] text-[#626D65] dark:text-[#8E9F94]">{dayName}</span>
                </div>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
};
