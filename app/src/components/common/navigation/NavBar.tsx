"use client";

import { ReactNode } from 'react';
import { NavButton } from './NavButton';
import { useRouter } from 'next/navigation';

interface NavButtonConfig {
  href: string;
  label: string;
  icon?: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

interface NavBarProps {
  buttons: NavButtonConfig[];
  showBackButton?: boolean;
  backHref?: string;
  backLabel?: string;
  maxButtons?: number;
}

export const NavBar = ({
  buttons,
  showBackButton = false,
  backHref = '/dashboard',
  backLabel = 'Back',
  maxButtons = 3,
}: NavBarProps) => {
  const router = useRouter();
  
  // Limit the number of buttons to maxButtons
  const visibleButtons = buttons.slice(0, maxButtons);
  
  // If we have a back button, we need to make room for it
  if (showBackButton && visibleButtons.length >= maxButtons) {
    visibleButtons.pop();
  }

  return (
    <nav className="w-full bg-[#F5E6D3] p-4 shadow-sm">
      <div className="max-w-screen-lg mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {visibleButtons.map((button, index) => (
            <NavButton
              key={index}
              href={button.href}
              label={button.label}
              icon={button.icon}
              onClick={button.onClick}
              disabled={button.disabled}
            />
          ))}
          
          {showBackButton && (
            <NavButton
              href={backHref}
              label={backLabel}
              isBack={true}
              onClick={() => router.push(backHref)}
            />
          )}
        </div>
      </div>
    </nav>
  );
};
