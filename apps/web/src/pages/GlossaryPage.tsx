import React, { useState } from 'react';
import { Compass, Search } from 'lucide-react';
import { glossary } from '@stackpath/content';

export const GlossaryPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const categories = ['ALL', 'Fundamentals', 'Frontend', 'Backend', 'Database', 'Security', 'DevOps'];

  const filteredGlossary = glossary.filter(term => {
    const matchesSearch =
      term.term.toLowerCase().includes(search.toLowerCase()) ||
      (term.fullForm && term.fullForm.toLowerCase().includes(search.toLowerCase())) ||
      term.simpleExplanation.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === 'ALL' || term.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EDF6F1] dark:bg-[#263C31] border border-[#DCEFE8] dark:border-[#39483F] text-[#174D3A] dark:text-[#8BC9A5] text-xs font-semibold mb-2">
          <Compass className="w-3.5 h-3.5 text-[#167D78] dark:text-[#78D4C7]" />
          <span>Technical Terminology</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-[#25312B] dark:text-[#F1F5F1] tracking-tight">
          Developer Vocabulary & Glossary
        </h1>
        <p className="text-sm sm:text-base text-[#525E56] dark:text-[#C1CDC4] max-w-2xl mt-1 leading-relaxed">
          Every acronym and buzzword explained in plain English, with real production context and tangible code snippets.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-[#FFFFFF] dark:bg-[#1C2620] border border-[#D9DED6] dark:border-[#39483F] flex flex-col md:flex-row gap-4 items-center justify-between shadow-xs">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-[#626D65] dark:text-[#8E9F94] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search terms (e.g. DNS, DOM, JWT)..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#F7F5EF] dark:bg-[#141B17] border border-[#D9DED6] dark:border-[#39483F] text-xs text-[#25312B] dark:text-[#F1F5F1] placeholder-[#626D65] dark:placeholder-[#8E9F94] focus:outline-none focus:border-[#174D3A] dark:focus:border-[#8BC9A5]"
          />
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-1.5 w-full md:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-[#174D3A] text-white dark:bg-[#8BC9A5] dark:text-[#103A2C] shadow-xs'
                  : 'bg-[#F0F1EA] dark:bg-[#25312B] text-[#525E56] dark:text-[#C1CDC4] hover:text-[#25312B] dark:hover:text-[#F1F5F1] border border-[#D9DED6] dark:border-[#39483F]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Terms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredGlossary.map((item) => (
          <div
            key={item.term}
            id={item.term}
            className="p-6 rounded-2xl bg-[#FFFFFF] dark:bg-[#1C2620] border border-[#D9DED6] dark:border-[#39483F] space-y-3 shadow-xs"
          >
            <div className="flex items-center justify-between">
              <div>
                <span className="text-lg font-extrabold text-[#25312B] dark:text-[#F1F5F1] mr-2">
                  {item.term}
                </span>
                {item.fullForm && (
                  <span className="text-xs text-[#167D78] dark:text-[#78D4C7] font-mono">
                    ({item.fullForm})
                  </span>
                )}
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#EDF6F1] dark:bg-[#263C31] text-[#174D3A] dark:text-[#8BC9A5]">
                {item.category}
              </span>
            </div>

            <div className="text-xs sm:text-sm text-[#25312B] dark:text-[#F1F5F1] leading-relaxed">
              <strong className="text-[#174D3A] dark:text-[#8BC9A5]">In Simple English:</strong>{' '}
              {item.simpleExplanation}
            </div>

            <div className="text-xs text-[#525E56] dark:text-[#C1CDC4] leading-relaxed pt-2 border-t border-[#F0F1EA] dark:border-[#25312B]">
              <strong className="text-[#25312B] dark:text-[#F1F5F1]">Why It Matters:</strong>{' '}
              {item.whyItMatters}
            </div>

            {item.example && (
              <div className="p-2.5 rounded-xl bg-[#141B17] border border-[#28362E] text-xs font-mono text-[#A8E0BE] overflow-x-auto">
                {item.example}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
