"use client";

import Link from 'next/link';
import { ReactNode } from 'react';

interface NavButtonProps {
  href: string;
  label: string;
  icon?: ReactNode;
  onClick?: () => void;
  isBack?: boolean;
  disabled?: boolean;
}

export const NavButton = ({
  href,
  label,
  icon,
  onClick,
  isBack = false,
  disabled = false,
}: NavButtonProps) => {
  const handleClick = (e: React.MouseEvent) => {
    if (disabled) {
      e.preventDefault();
      return;
    }
    
    if (onClick) {
      onClick();
    }
  };

  const buttonClasses = `
    flex items-center justify-center gap-2 p-4 rounded-lg
    transition-all duration-200 ease-in-out
    ${isBack 
      ? 'bg-white text-[#1D3557] hover:bg-gray-100' 
      : 'bg-[#2B6CB0] text-white hover:bg-[#1e5a9a]'
    }
    ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
    shadow-md hover:shadow-lg
    font-medium text-lg
    w-full
  `;

  return (
    <Link 
      href={disabled ? '#' : href} 
      className={buttonClasses}
      onClick={handleClick}
      aria-disabled={disabled}
    >
      {icon && <span className="text-xl">{icon}</span>}
      <span>{label}</span>
    </Link>
  );
};
