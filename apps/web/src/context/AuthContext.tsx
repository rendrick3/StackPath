import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { SafeUser } from '@stackpath/shared';
import { apiUrl } from '../config/api';

export type FontSizePreference = 'standard' | 'large' | 'xl';

interface AuthContextType {
  user: SafeUser | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  quickDemoLogin: () => Promise<void>;
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  fontSizePreference: FontSizePreference;
  setFontSizePreference: (size: FontSizePreference) => void;
  completedLessonIds: string[];
  isLessonCompleted: (lessonId: string) => boolean;
  toggleLessonProgress: (lessonId: string) => Promise<boolean>;
  refreshProgress: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<SafeUser | null>(null);
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('stackpath_token'));
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>([]);
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    return (localStorage.getItem('stackpath_theme') as 'dark' | 'light') || 'dark';
  });
  const [fontSizePreference, setFontSizePreference] = useState<FontSizePreference>(() => {
    return (localStorage.getItem('stackpath_font_size') as FontSizePreference) || 'standard';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'light') {
      root.classList.remove('dark');
      root.classList.add('light');
    } else {
      root.classList.remove('light');
      root.classList.add('dark');
    }
    localStorage.setItem('stackpath_theme', theme);
  }, [theme]);

  useEffect(() => {
    document.body.classList.remove('font-size-standard', 'font-size-large', 'font-size-xl');
    document.body.classList.add(`font-size-${fontSizePreference}`);
    localStorage.setItem('stackpath_font_size', fontSizePreference);
  }, [fontSizePreference]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const refreshProgress = useCallback(async () => {
    if (!token) {
      setCompletedLessonIds([]);
      return;
    }
    try {
      const res = await fetch(apiUrl('/api/progress/completed'), {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setCompletedLessonIds(data.completedLessonIds || []);
      }
    } catch (err) {
      console.error('Failed to load completed lessons:', err);
    }
  }, [token]);

  useEffect(() => {
    async function loadUser() {
      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const res = await fetch(apiUrl('/api/auth/me'), {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
          await refreshProgress();
        } else {
          setToken(null);
          setUser(null);
          setCompletedLessonIds([]);
          localStorage.removeItem('stackpath_token');
        }
      } catch (err) {
        console.error('Failed to verify session:', err);
      } finally {
        setIsLoading(false);
      }
    }

    loadUser();
  }, [token, refreshProgress]);

  const login = async (email: string, password: string) => {
    try {
      const res = await fetch(apiUrl('/api/auth/login'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();
      if (!res.ok) {
        return { success: false, error: data.message || 'Login failed' };
      }

      setToken(data.token);
      setUser(data.user);
      localStorage.setItem('stackpath_token', data.token);
      return { success: true };
    } catch (err) {
      return { success: false, error: 'Network error connecting to API' };
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      const res = await fetch(apiUrl('/api/auth/register'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });

      const data = await res.json();
      if (!res.ok) {
        return { success: false, error: data.message || 'Registration failed' };
      }

      setToken(data.token);
      setUser(data.user);
      localStorage.setItem('stackpath_token', data.token);
      return { success: true };
    } catch (err) {
      return { success: false, error: 'Network error connecting to API' };
    }
  };

  const quickDemoLogin = async () => {
    const res = await login('student@stackpath.dev', 'Student123!');
    if (!res.success) {
      await register('Alex Mercer', 'student@stackpath.dev', 'Student123!');
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setCompletedLessonIds([]);
    localStorage.removeItem('stackpath_token');
  };

  const isLessonCompleted = (lessonId: string) => {
    return completedLessonIds.includes(lessonId);
  };

  const toggleLessonProgress = async (lessonId: string): Promise<boolean> => {
    if (!token) return false;
    try {
      const res = await fetch(apiUrl('/api/progress/toggle-lesson'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ lessonId })
      });

      if (res.ok) {
        const data = await res.json();
        setCompletedLessonIds(prev => {
          if (data.completed) {
            return prev.includes(lessonId) ? prev : [...prev, lessonId];
          } else {
            return prev.filter(id => id !== lessonId);
          }
        });
        return data.completed;
      }
    } catch (err) {
      console.error('Failed to toggle lesson progress:', err);
    }
    return false;
  };

  return (
    <AuthContext.Provider value={{
      user,
      token,
      isLoading,
      login,
      register,
      logout,
      quickDemoLogin,
      theme,
      toggleTheme,
      fontSizePreference,
      setFontSizePreference,
      completedLessonIds,
      isLessonCompleted,
      toggleLessonProgress,
      refreshProgress
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
