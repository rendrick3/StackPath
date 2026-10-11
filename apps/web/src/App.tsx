import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AppShell } from './components/AppShell';
import { LandingPage } from './pages/LandingPage';
import { RoadmapPage } from './pages/RoadmapPage';
import { CurriculumPage } from './pages/CurriculumPage';
import { LessonReaderPage } from './pages/LessonReaderPage';
import { QuizPage } from './pages/QuizPage';
import { ExercisePage } from './pages/ExercisePage';
import { ProjectsPage } from './pages/ProjectsPage';
import { DashboardPage } from './pages/DashboardPage';
import { NotesPage } from './pages/NotesPage';
import { BookmarksPage } from './pages/BookmarksPage';
import { GlossaryPage } from './pages/GlossaryPage';
import { AuthPage } from './pages/AuthPage';
import { SettingsPage } from './pages/SettingsPage';

export function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppShell>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/roadmap" element={<RoadmapPage />} />
            <Route path="/curriculum" element={<CurriculumPage />} />
            <Route path="/lessons/:slug" element={<LessonReaderPage />} />
            <Route path="/quiz/:moduleId" element={<QuizPage />} />
            <Route path="/sandbox" element={<ExercisePage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/notes" element={<NotesPage />} />
            <Route path="/bookmarks" element={<BookmarksPage />} />
            <Route path="/glossary" element={<GlossaryPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="*" element={<LandingPage />} />
          </Routes>
        </AppShell>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

