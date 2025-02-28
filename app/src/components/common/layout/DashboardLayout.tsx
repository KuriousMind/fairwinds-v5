"use client";

import { ReactNode } from 'react';
import { NavBar } from '../navigation/NavBar';
import { useAuth } from '@/context/auth/AuthContext';
import { useRouter } from 'next/navigation';

interface DashboardLayoutProps {
  children: ReactNode;
  title?: string;
  showNavBar?: boolean;
  navButtons?: Array<{
    href: string;
    label: string;
    icon?: ReactNode;
    onClick?: () => void;
    disabled?: boolean;
  }>;
  showBackButton?: boolean;
  backHref?: string;
  backLabel?: string;
}

export const DashboardLayout = ({
  children,
  title = 'Fairwinds RV',
  showNavBar = true,
  navButtons = [],
  showBackButton = false,
  backHref = '/dashboard',
  backLabel = 'Back',
}: DashboardLayoutProps) => {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  // If not authenticated and not loading, redirect to login
  if (!isLoading && !isAuthenticated) {
    router.push('/login');
    return null;
  }

  // Default navigation buttons if none provided
  const defaultButtons = [
    {
      href: '/rv',
      label: 'My RV',
    },
    {
      href: '/maintenance',
      label: 'Maintenance',
      disabled: true, // Disabled for MVP
    },
    {
      href: '/settings',
      label: 'Settings',
      disabled: true, // Disabled for MVP
    },
  ];

  const buttons = navButtons.length > 0 ? navButtons : defaultButtons;

  return (
    <div className="min-h-screen flex flex-col bg-[#F5E6D3]">
      {showNavBar && (
        <NavBar
          buttons={buttons}
          showBackButton={showBackButton}
          backHref={backHref}
          backLabel={backLabel}
        />
      )}
      
      <main className="flex-grow p-4">
        {title && (
          <h1 className="text-2xl font-bold text-[#8B4513] mb-6">{title}</h1>
        )}
        {children}
      </main>
      
      <footer className="p-4 text-center text-sm text-[#1D3557]">
        <p>© {new Date().getFullYear()} Fairwinds RV App</p>
      </footer>
    </div>
  );
};
