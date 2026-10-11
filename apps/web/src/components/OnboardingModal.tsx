import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, CheckCircle2, ArrowRight, X, Compass } from 'lucide-react';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleStartFirstLesson = () => {
    onClose();
    navigate('/lessons/how-computers-work-and-execute-code');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-[#FFFFFF] dark:bg-[#1C2620] border border-[#D9DED6] dark:border-[#39483F] rounded-3xl shadow-2xl p-6 sm:p-8 relative overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-lg text-[#626D65] dark:text-[#8E9F94] hover:text-[#25312B] dark:hover:text-[#F1F5F1] hover:bg-[#F0F1EA] dark:hover:bg-[#25312B] transition-colors"
          aria-label="Close guide"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Eyebrow */}
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#EDF6F1] dark:bg-[#263C31] border border-[#DCEFE8] dark:border-[#39483F] text-[#174D3A] dark:text-[#8BC9A5] text-xs font-semibold w-max mb-4">
          <Sparkles className="w-3.5 h-3.5 text-[#167D78] dark:text-[#78D4C7]" />
          Welcome to StackPath Academy
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#25312B] dark:text-[#F1F5F1] tracking-tight mb-3">
          Your University for Full-Stack Development
        </h2>

        <p className="text-sm text-[#525E56] dark:text-[#C1CDC4] leading-relaxed mb-6">
          You do not need to know programming syntax, computers, servers, terminals, or databases beforehand. 
          We start from <strong>absolute zero</strong> and guide you step by step into an independent, industry-ready software engineer.
        </p>

        {/* What does Full Stack mean in simple English? */}
        <div className="p-4 rounded-2xl bg-[#F0F1EA] dark:bg-[#25312B] border border-[#D9DED6] dark:border-[#39483F] mb-6 space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-[#174D3A] dark:text-[#8BC9A5] flex items-center gap-1.5">
            <Compass className="w-4 h-4 text-[#167D78] dark:text-[#78D4C7]" />
            What is "Full-Stack Development" in Simple English?
          </div>
          <p className="text-xs text-[#525E56] dark:text-[#C1CDC4] leading-relaxed">
            A full-stack developer builds both sides of a digital application:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div className="p-3 rounded-xl bg-[#FFFFFF] dark:bg-[#1C2620] border border-[#D9DED6] dark:border-[#39483F]">
              <span className="text-xs font-bold text-[#25312B] dark:text-[#F1F5F1] block mb-1">1. The Frontend (Client)</span>
              <span className="text-[11px] text-[#525E56] dark:text-[#C1CDC4] leading-normal block">
                Everything the human sees on screen: buttons, layouts, animations, and forms (HTML, CSS, JavaScript, React).
              </span>
            </div>
            <div className="p-3 rounded-xl bg-[#FFFFFF] dark:bg-[#1C2620] border border-[#D9DED6] dark:border-[#39483F]">
              <span className="text-xs font-bold text-[#25312B] dark:text-[#F1F5F1] block mb-1">2. The Backend (Server & DB)</span>
              <span className="text-[11px] text-[#525E56] dark:text-[#C1CDC4] leading-normal block">
                The invisible engine in the cloud that secures passwords, runs business logic, and saves data (Node.js, Express, PostgreSQL).
              </span>
            </div>
          </div>
        </div>

        {/* Learning Commitments */}
        <div className="space-y-2 mb-8">
          <div className="flex items-center gap-2.5 text-xs text-[#525E56] dark:text-[#C1CDC4]">
            <CheckCircle2 className="w-4 h-4 text-[#237448] dark:text-[#8BC9A5] shrink-0" />
            <span><strong className="text-[#25312B] dark:text-[#F1F5F1]">Concept before syntax:</strong> We explain the real problem before showing code.</span>
          </div>
          <div className="flex items-center gap-2.5 text-xs text-[#525E56] dark:text-[#C1CDC4]">
            <CheckCircle2 className="w-4 h-4 text-[#237448] dark:text-[#8BC9A5] shrink-0" />
            <span><strong className="text-[#25312B] dark:text-[#F1F5F1]">Real persisted progress:</strong> Quizzes, study notes, and exercises save to your account.</span>
          </div>
          <div className="flex items-center gap-2.5 text-xs text-[#525E56] dark:text-[#C1CDC4]">
            <CheckCircle2 className="w-4 h-4 text-[#237448] dark:text-[#8BC9A5] shrink-0" />
            <span><strong className="text-[#25312B] dark:text-[#F1F5F1]">11 Practical Capstones:</strong> Build real software from personal websites to full-stack CRMs.</span>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <button
            onClick={handleStartFirstLesson}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#174D3A] hover:bg-[#103A2C] text-white dark:bg-[#8BC9A5] dark:text-[#103A2C] dark:hover:bg-[#78D4C7] text-sm font-bold shadow-sm transition-all flex items-center justify-center gap-2"
          >
            Start Lesson 1: How Computers Work
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => { onClose(); navigate('/roadmap'); }}
            className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-[#F0F1EA] dark:bg-[#25312B] hover:bg-[#DCEFE8] dark:hover:bg-[#39483F] text-[#25312B] dark:text-[#F1F5F1] text-sm font-semibold transition-colors"
          >
            Explore Roadmap First
          </button>
        </div>
      </div>
    </div>
  );
};
