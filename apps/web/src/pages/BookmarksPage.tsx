import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Bookmark, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const BookmarksPage: React.FC = () => {
  const { user, token } = useAuth();
  const [bookmarks, setBookmarks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadBookmarks() {
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const res = await fetch('/api/bookmarks', {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          setBookmarks(data.bookmarks || []);
        }
      } catch (err) {
        console.error('Failed to load bookmarks:', err);
      } finally {
        setLoading(false);
      }
    }
    loadBookmarks();
  }, [token]);

  if (!user) {
    return (
      <div className="max-w-md mx-auto my-20 p-8 rounded-2xl bg-[#FFFFFF] dark:bg-[#1C2620] border border-[#D9DED6] dark:border-[#39483F] text-center shadow-xs">
        <h2 className="text-base font-bold text-[#25312B] dark:text-[#F1F5F1] mb-2">Sign In Required</h2>
        <p className="text-xs text-[#525E56] dark:text-[#C1CDC4] mb-4">Please sign in to access your saved lesson bookmarks.</p>
        <Link to="/auth" className="text-xs text-[#126B63] dark:text-[#78D4C7] font-semibold hover:underline">
          Go to Sign In
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EDF6F1] dark:bg-[#263C31] border border-[#DCEFE8] dark:border-[#39483F] text-[#174D3A] dark:text-[#8BC9A5] text-xs font-semibold mb-2">
          <Bookmark className="w-3.5 h-3.5 text-[#167D78] dark:text-[#78D4C7]" />
          <span>Saved for Review</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#25312B] dark:text-[#F1F5F1] tracking-tight">
          Bookmarked Lessons
        </h1>
        <p className="text-xs sm:text-sm text-[#525E56] dark:text-[#C1CDC4] mt-1">
          Quickly revisit lessons you flagged for revision or deeper study.
        </p>
      </div>

      {loading ? (
        <div className="text-center py-16 text-xs text-[#626D65] dark:text-[#8E9F94]">Loading saved bookmarks...</div>
      ) : bookmarks.length === 0 ? (
        <div className="p-10 rounded-2xl bg-[#FFFFFF] dark:bg-[#1C2620] border border-[#D9DED6] dark:border-[#39483F] text-center shadow-xs space-y-3">
          <Bookmark className="w-8 h-8 text-[#626D65] dark:text-[#8E9F94] mx-auto" />
          <h3 className="text-sm font-bold text-[#25312B] dark:text-[#F1F5F1]">No bookmarks saved yet</h3>
          <p className="text-xs text-[#525E56] dark:text-[#C1CDC4] max-w-sm mx-auto">
            Click the "Save" bookmark button at the top of any lesson to keep it right here.
          </p>
          <Link
            to="/curriculum"
            className="inline-flex px-4 py-2 rounded-xl bg-[#174D3A] hover:bg-[#103A2C] text-white dark:bg-[#8BC9A5] dark:text-[#103A2C] text-xs font-semibold"
          >
            Browse Curriculum
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {bookmarks.map((bm) => (
            <Link
              key={bm.id}
              to={`/lessons/${bm.lessonSlug}`}
              className="p-4 rounded-xl bg-[#FFFFFF] dark:bg-[#1C2620] border border-[#D9DED6] dark:border-[#39483F] hover:border-[#174D3A] dark:hover:border-[#8BC9A5] transition-all flex items-center justify-between group shadow-xs"
            >
              <div>
                <span className="text-[10px] font-mono text-[#626D65] dark:text-[#8E9F94] uppercase tracking-widest block mb-0.5">
                  {bm.moduleTitle}
                </span>
                <h3 className="text-sm font-bold text-[#25312B] dark:text-[#F1F5F1] group-hover:text-[#174D3A] dark:group-hover:text-[#8BC9A5] transition-colors">
                  {bm.lessonTitle}
                </h3>
              </div>
              <ArrowRight className="w-4 h-4 text-[#626D65] group-hover:text-[#174D3A] dark:text-[#8E9F94] dark:group-hover:text-[#8BC9A5] group-hover:translate-x-1 transition-all" />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
