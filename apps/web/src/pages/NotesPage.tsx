import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Trash2, ArrowRight, Search } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { apiUrl } from '../config/api';

export const NotesPage: React.FC = () => {
  const { user, token } = useAuth();
  const [notes, setNotes] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadNotes() {
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const res = await fetch(apiUrl('/api/notes'), {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          setNotes(data.notes || []);
        }
      } catch (err) {
        console.error('Failed to load notes:', err);
      } finally {
        setLoading(false);
      }
    }
    loadNotes();
  }, [token]);

  const handleDelete = async (lessonId: string) => {
    if (!token) return;
    try {
      const res = await fetch(apiUrl(`/api/notes/${lessonId}`), {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        setNotes(prev => prev.filter(n => n.lessonId !== lessonId));
      }
    } catch (err) {
      console.error('Failed to delete note:', err);
    }
  };

  const filteredNotes = notes.filter(n =>
    (n.lessonTitle || '').toLowerCase().includes(search.toLowerCase()) ||
    (n.content || '').toLowerCase().includes(search.toLowerCase())
  );

  if (!user) {
    return (
      <div className="max-w-md mx-auto my-20 p-8 rounded-2xl bg-[#FFFFFF] dark:bg-[#1C2620] border border-[#D9DED6] dark:border-[#39483F] text-center shadow-xs">
        <h2 className="text-base font-bold text-[#25312B] dark:text-[#F1F5F1] mb-2">Sign In Required</h2>
        <p className="text-xs text-[#525E56] dark:text-[#C1CDC4] mb-4">Please sign in to view and search your personal study notes.</p>
        <Link to="/auth" className="text-xs text-[#126B63] dark:text-[#78D4C7] font-semibold hover:underline">
          Go to Sign In
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EDF6F1] dark:bg-[#263C31] border border-[#DCEFE8] dark:border-[#39483F] text-[#174D3A] dark:text-[#8BC9A5] text-xs font-semibold mb-2">
            <FileText className="w-3.5 h-3.5 text-[#167D78] dark:text-[#78D4C7]" />
            <span>Personal Notebook</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#25312B] dark:text-[#F1F5F1] tracking-tight">
            Study Notes & Annotations
          </h1>
          <p className="text-xs sm:text-sm text-[#525E56] dark:text-[#C1CDC4] mt-1">
            Private reflections and personal code snippets saved across your lessons.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-[#626D65] dark:text-[#8E9F94] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search notes..."
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#FFFFFF] dark:bg-[#1C2620] border border-[#D9DED6] dark:border-[#39483F] text-xs text-[#25312B] dark:text-[#F1F5F1] placeholder-[#626D65] dark:placeholder-[#8E9F94] focus:outline-none focus:border-[#174D3A] dark:focus:border-[#8BC9A5]"
          />
        </div>
      </div>

      {loading ? (
        <div className="text-center py-16 text-xs text-[#626D65] dark:text-[#8E9F94]">Loading your notes...</div>
      ) : filteredNotes.length === 0 ? (
        <div className="p-10 rounded-2xl bg-[#FFFFFF] dark:bg-[#1C2620] border border-[#D9DED6] dark:border-[#39483F] text-center shadow-xs space-y-3">
          <FileText className="w-8 h-8 text-[#626D65] dark:text-[#8E9F94] mx-auto" />
          <h3 className="text-sm font-bold text-[#25312B] dark:text-[#F1F5F1]">No notes recorded yet</h3>
          <p className="text-xs text-[#525E56] dark:text-[#C1CDC4] max-w-sm mx-auto">
            Use the "Notes" button inside any lesson reader to save your thoughts and insights here.
          </p>
          <Link
            to="/curriculum"
            className="inline-flex px-4 py-2 rounded-xl bg-[#174D3A] hover:bg-[#103A2C] text-white dark:bg-[#8BC9A5] dark:text-[#103A2C] text-xs font-semibold"
          >
            Explore Lessons
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredNotes.map((note) => (
            <div
              key={note.id}
              className="p-5 rounded-2xl bg-[#FFFFFF] dark:bg-[#1C2620] border border-[#D9DED6] dark:border-[#39483F] space-y-3 flex flex-col justify-between shadow-xs"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono text-[#626D65] dark:text-[#8E9F94]">
                    {new Date(note.updatedAt).toLocaleDateString()}
                  </span>
                  <button
                    onClick={() => handleDelete(note.lessonId)}
                    className="p-1.5 rounded text-[#626D65] hover:text-[#B42318] hover:bg-[#FDF0EE] dark:hover:bg-[#321918] transition-colors"
                    title="Delete note"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <h3 className="text-sm font-bold text-[#25312B] dark:text-[#F1F5F1] mb-2">
                  {note.lessonTitle}
                </h3>
                <p className="text-xs sm:text-sm text-[#525E56] dark:text-[#C1CDC4] whitespace-pre-line leading-relaxed">
                  {note.content}
                </p>
              </div>

              {note.lessonSlug && (
                <div className="pt-3 border-t border-[#F0F1EA] dark:border-[#25312B] flex justify-end">
                  <Link
                    to={`/lessons/${note.lessonSlug}`}
                    className="text-xs font-semibold text-[#126B63] dark:text-[#78D4C7] hover:underline flex items-center gap-1"
                  >
                    Jump to Lesson <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
