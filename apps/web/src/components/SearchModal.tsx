import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, BookOpen, Layers, Compass, FolderGit2, ArrowRight } from 'lucide-react';
import { searchCurriculum } from '@stackpath/content';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  const results = searchCurriculum(query);
  const totalResults =
    results.modules.length +
    results.lessons.length +
    results.glossary.length +
    results.projects.length;

  const handleSelect = (path: string) => {
    navigate(path);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-[#FFFFFF] dark:bg-[#1C2620] border border-[#D9DED6] dark:border-[#39483F] rounded-2xl shadow-xl overflow-hidden flex flex-col max-h-[80vh]">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 border-b border-[#D9DED6] dark:border-[#39483F] bg-[#F7F5EF] dark:bg-[#141B17]">
          <Search className="w-5 h-5 text-[#167D78] dark:text-[#78D4C7] mr-3" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search concepts, modules, lessons, projects, or glossary terms..."
            className="w-full py-4 bg-transparent text-sm text-[#25312B] dark:text-[#F1F5F1] placeholder-[#626D65] dark:placeholder-[#8E9F94] focus:outline-none"
            autoFocus
          />
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-[#626D65] dark:text-[#8E9F94] hover:text-[#25312B] dark:hover:text-[#F1F5F1] hover:bg-[#F0F1EA] dark:hover:bg-[#25312B]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results List */}
        <div className="overflow-y-auto p-4 space-y-4 flex-1">
          {query.trim() === '' ? (
            <div className="text-center py-8 text-xs text-[#626D65] dark:text-[#8E9F94]">
              Type keywords like "HTML", "CPU", "HTTP", "React", or "REST" to search.
            </div>
          ) : totalResults === 0 ? (
            <div className="text-center py-8 text-xs text-[#525E56] dark:text-[#C1CDC4]">
              No results found for "{query}". Try another technical keyword.
            </div>
          ) : (
            <>
              {/* Lessons */}
              {results.lessons.length > 0 && (
                <div>
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#626D65] dark:text-[#8E9F94] mb-2 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-[#174D3A] dark:text-[#8BC9A5]" />
                    Lessons ({results.lessons.length})
                  </h4>
                  <div className="space-y-1">
                    {results.lessons.map(l => (
                      <button
                        key={l.id}
                        onClick={() => handleSelect(`/lessons/${l.slug}`)}
                        className="w-full text-left p-2.5 rounded-lg hover:bg-[#F0F1EA] dark:hover:bg-[#25312B] transition-colors flex items-center justify-between group"
                      >
                        <div>
                          <div className="text-sm font-semibold text-[#25312B] dark:text-[#F1F5F1] group-hover:text-[#174D3A] dark:group-hover:text-[#8BC9A5]">
                            {l.title}
                          </div>
                          <div className="text-xs text-[#525E56] dark:text-[#C1CDC4] line-clamp-1">{l.subtitle}</div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-[#167D78] dark:text-[#78D4C7] opacity-0 group-hover:opacity-100 transition-opacity" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Modules */}
              {results.modules.length > 0 && (
                <div>
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#626D65] dark:text-[#8E9F94] mb-2 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-[#167D78] dark:text-[#78D4C7]" />
                    Modules ({results.modules.length})
                  </h4>
                  <div className="space-y-1">
                    {results.modules.map(m => (
                      <button
                        key={m.id}
                        onClick={() => handleSelect(`/curriculum#${m.slug}`)}
                        className="w-full text-left p-2.5 rounded-lg hover:bg-[#F0F1EA] dark:hover:bg-[#25312B] transition-colors flex items-center justify-between group"
                      >
                        <div>
                          <div className="text-sm font-semibold text-[#25312B] dark:text-[#F1F5F1] group-hover:text-[#167D78] dark:group-hover:text-[#78D4C7]">
                            {m.title}
                          </div>
                          <div className="text-xs text-[#525E56] dark:text-[#C1CDC4] line-clamp-1">{m.description}</div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-[#167D78] dark:text-[#78D4C7] opacity-0 group-hover:opacity-100 transition-opacity" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Glossary Terms */}
              {results.glossary.length > 0 && (
                <div>
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#626D65] dark:text-[#8E9F94] mb-2 flex items-center gap-1.5">
                    <Compass className="w-3.5 h-3.5 text-[#8A5A00] dark:text-[#F3C969]" />
                    Glossary Terms ({results.glossary.length})
                  </h4>
                  <div className="space-y-1">
                    {results.glossary.map(g => (
                      <button
                        key={g.term}
                        onClick={() => handleSelect(`/glossary#${g.term}`)}
                        className="w-full text-left p-2.5 rounded-lg hover:bg-[#F0F1EA] dark:hover:bg-[#25312B] transition-colors flex items-center justify-between group"
                      >
                        <div>
                          <div className="text-sm font-semibold text-[#25312B] dark:text-[#F1F5F1] group-hover:text-[#8A5A00] dark:group-hover:text-[#F3C969] flex items-center gap-2">
                            <span>{g.term}</span>
                            {g.fullForm && (
                              <span className="text-[11px] text-[#626D65] dark:text-[#8E9F94] font-normal">
                                ({g.fullForm})
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-[#525E56] dark:text-[#C1CDC4] line-clamp-1">{g.simpleExplanation}</div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-[#8A5A00] dark:text-[#F3C969] opacity-0 group-hover:opacity-100 transition-opacity" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Projects */}
              {results.projects.length > 0 && (
                <div>
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#626D65] dark:text-[#8E9F94] mb-2 flex items-center gap-1.5">
                    <FolderGit2 className="w-3.5 h-3.5 text-[#237448] dark:text-[#8BC9A5]" />
                    Projects ({results.projects.length})
                  </h4>
                  <div className="space-y-1">
                    {results.projects.map(p => (
                      <button
                        key={p.id}
                        onClick={() => handleSelect(`/projects#${p.id}`)}
                        className="w-full text-left p-2.5 rounded-lg hover:bg-[#F0F1EA] dark:hover:bg-[#25312B] transition-colors flex items-center justify-between group"
                      >
                        <div>
                          <div className="text-sm font-semibold text-[#25312B] dark:text-[#F1F5F1] group-hover:text-[#237448] dark:group-hover:text-[#8BC9A5]">
                            Project {p.projectNumber}: {p.title}
                          </div>
                          <div className="text-xs text-[#525E56] dark:text-[#C1CDC4] line-clamp-1">{p.problemStatement}</div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-[#237448] dark:text-[#8BC9A5] opacity-0 group-hover:opacity-100 transition-opacity" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
