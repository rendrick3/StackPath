import React, { useState, useEffect } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { SearchModal } from './SearchModal';
import { OnboardingModal } from './OnboardingModal';

interface AppShellProps {
  children: React.ReactNode;
}

export const AppShell: React.FC<AppShellProps> = ({ children }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    return localStorage.getItem('stackpath_sidebar_collapsed') === 'true';
  });
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [onboardingOpen, setOnboardingOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('stackpath_sidebar_collapsed', String(sidebarCollapsed));
  }, [sidebarCollapsed]);

  return (
    <div className="min-h-screen flex bg-[#F7F5EF] dark:bg-[#141B17] text-[#25312B] dark:text-[#F1F5F1] transition-colors">
      {/* Left Navigation Sidebar */}
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        mobileOpen={mobileSidebarOpen}
        onCloseMobile={() => setMobileSidebarOpen(false)}
      />

      {/* Main App Canvas */}
      <div
        className={`flex-1 flex flex-col min-w-0 transition-all duration-200 ease-in-out ${
          sidebarCollapsed ? 'lg:pl-16' : 'lg:pl-64'
        }`}
      >
        <Header
          onOpenMobileSidebar={() => setMobileSidebarOpen(true)}
          onOpenSearch={() => setSearchOpen(true)}
          onOpenOnboarding={() => setOnboardingOpen(true)}
        />

        {/* Content Area */}
        <main className="flex-1">
          {children}
        </main>
      </div>

      {/* Global Modals */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
      <OnboardingModal isOpen={onboardingOpen} onClose={() => setOnboardingOpen(false)} />
    </div>
  );
};
