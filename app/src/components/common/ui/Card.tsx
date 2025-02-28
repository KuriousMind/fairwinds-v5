import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  title?: string;
  className?: string;
  onClick?: () => void;
}

export const Card = ({ children, title, className = '', onClick }: CardProps) => {
  return (
    <div 
      className={`bg-white rounded-lg shadow-md p-4 ${onClick ? 'cursor-pointer hover:shadow-lg transition-shadow' : ''} ${className}`}
      onClick={onClick}
    >
      {title && <h2 className="text-xl font-semibold text-[#1D3557] mb-4">{title}</h2>}
      {children}
    </div>
  );
};
