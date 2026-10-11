import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layers, Sparkles, User, Mail, Lock, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const AuthPage: React.FC = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { login, register, quickDemoLogin } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (isRegister) {
        if (!name.trim()) {
          setError('Name is required');
          setLoading(false);
          return;
        }
        const res = await register(name, email, password);
        if (!res.success) {
          setError(res.error || 'Registration failed');
        } else {
          navigate('/dashboard');
        }
      } else {
        const res = await login(email, password);
        if (!res.success) {
          setError(res.error || 'Login failed');
        } else {
          navigate('/dashboard');
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDemoAccess = async () => {
    setLoading(true);
    setError(null);
    try {
      await quickDemoLogin();
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Demo login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md p-8 rounded-3xl bg-[#FFFFFF] dark:bg-[#1C2620] border border-[#D9DED6] dark:border-[#39483F] shadow-lg space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-[#174D3A] dark:bg-[#8BC9A5] flex items-center justify-center text-white dark:text-[#103A2C] mx-auto shadow-xs">
            <Layers className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-extrabold text-[#25312B] dark:text-[#F1F5F1] tracking-tight">
            {isRegister ? 'Join StackPath Academy' : 'Learner Sign In'}
          </h1>
          <p className="text-xs text-[#525E56] dark:text-[#C1CDC4]">
            {isRegister
              ? 'Create your personal learner profile to sync notes and track real progress.'
              : 'Sign in to access your saved notes, bookmarks, and quiz progress.'}
          </p>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-[#FDF0EE] dark:bg-[#321918] border border-[#F5C4BF] dark:border-[#622B29] text-xs text-[#B42318] dark:text-[#F27F77]">
            {error}
          </div>
        )}

        {/* 1-Click Demo Login Banner */}
        <div className="p-4 rounded-2xl bg-[#EDF6F1] dark:bg-[#263C31] border border-[#DCEFE8] dark:border-[#39483F] text-center space-y-2.5">
          <div className="text-xs font-bold text-[#174D3A] dark:text-[#8BC9A5] flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#167D78] dark:text-[#78D4C7]" />
            Instant Evaluation Access
          </div>
          <p className="text-[11px] text-[#525E56] dark:text-[#C1CDC4]">
            Explore immediately as pre-configured demo student with seeded lessons:
          </p>
          <button
            type="button"
            onClick={handleDemoAccess}
            disabled={loading}
            className="w-full py-2.5 rounded-xl bg-[#174D3A] hover:bg-[#103A2C] text-white dark:bg-[#8BC9A5] dark:text-[#103A2C] dark:hover:bg-[#78D4C7] text-xs font-semibold shadow-xs transition-all flex items-center justify-center gap-1.5"
          >
            <span>Sign In as Demo Student (1-Click)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-[#D9DED6] dark:border-[#39483F]" />
          <span className="text-[10px] uppercase font-mono text-[#626D65] dark:text-[#8E9F94]">or with email</span>
          <div className="flex-1 h-px bg-[#D9DED6] dark:border-[#39483F]" />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegister && (
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#25312B] dark:text-[#F1F5F1]">Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 text-[#626D65] dark:text-[#8E9F94] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Alex Mercer"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-[#F7F5EF] dark:bg-[#141B17] border border-[#D9DED6] dark:border-[#39483F] text-xs text-[#25312B] dark:text-[#F1F5F1] placeholder-[#626D65] dark:placeholder-[#8E9F94] focus:outline-none focus:border-[#174D3A] dark:focus:border-[#8BC9A5]"
                />
              </div>
            </div>
          )}

          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#25312B] dark:text-[#F1F5F1]">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#626D65] dark:text-[#8E9F94] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="student@example.com"
                className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-[#F7F5EF] dark:bg-[#141B17] border border-[#D9DED6] dark:border-[#39483F] text-xs text-[#25312B] dark:text-[#F1F5F1] placeholder-[#626D65] dark:placeholder-[#8E9F94] focus:outline-none focus:border-[#174D3A] dark:focus:border-[#8BC9A5]"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#25312B] dark:text-[#F1F5F1]">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#626D65] dark:text-[#8E9F94] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 8 characters"
                className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-[#F7F5EF] dark:bg-[#141B17] border border-[#D9DED6] dark:border-[#39483F] text-xs text-[#25312B] dark:text-[#F1F5F1] placeholder-[#626D65] dark:placeholder-[#8E9F94] focus:outline-none focus:border-[#174D3A] dark:focus:border-[#8BC9A5]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-xl bg-[#174D3A] hover:bg-[#103A2C] text-white dark:bg-[#8BC9A5] dark:text-[#103A2C] dark:hover:bg-[#78D4C7] text-xs font-semibold transition-all disabled:opacity-50"
          >
            {loading ? 'Processing...' : isRegister ? 'Create Account' : 'Sign In'}
          </button>
        </form>

        <div className="text-center text-xs text-[#525E56] dark:text-[#C1CDC4]">
          {isRegister ? (
            <span>
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => { setIsRegister(false); setError(null); }}
                className="text-[#126B63] dark:text-[#78D4C7] font-semibold hover:underline"
              >
                Sign In
              </button>
            </span>
          ) : (
            <span>
              New to StackPath Academy?{' '}
              <button
                type="button"
                onClick={() => { setIsRegister(true); setError(null); }}
                className="text-[#126B63] dark:text-[#78D4C7] font-semibold hover:underline"
              >
                Create Account
              </button>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
