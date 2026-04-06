"use client";

import { ReactNode, MouseEvent } from "react";

interface ButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

export const Button = ({ 
  children, 
  className = '', 
  onClick,
  variant = 'default',
  size = 'md',
  type = 'button',
  disabled = false
}: ButtonProps) => {
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (!disabled && onClick) onClick(e);
  };

  const getVariantClasses = () => {
    if (disabled) return 'bg-white/5 text-slate-500 cursor-not-allowed border border-white/5';
    switch(variant) {
      case 'ghost':
        return 'bg-transparent text-blue-300 hover:text-white hover:bg-white/10 transition-colors border border-transparent shadow-none';
      case 'outline':
        return 'bg-transparent border border-cyan-500 text-cyan-400 hover:bg-cyan-500/20 transition-all shadow-[0_0_10px_rgba(6,182,212,0.2)] hover:shadow-[0_0_20px_rgba(6,182,212,0.5)]';
      case 'default':
      default:
        return 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-[0_0_15px_rgba(59,130,246,0.4)] hover:shadow-[0_0_25px_rgba(59,130,246,0.8)] hover:scale-[1.02] transition-all duration-300';
    }
  };

  const baseClasses = 'inline-flex items-center justify-center font-bold rounded-xl relative overflow-hidden focus:outline-none focus:ring-2 focus:ring-cyan-500/50 active:scale-95';
  const sizeClasses = size === 'sm' ? 'px-4 py-2 text-sm' : size === 'lg' ? 'px-10 py-4 text-lg' : 'px-6 py-3 text-base';

  return (
    <button
      type={type}
      disabled={disabled}
      className={`${baseClasses} ${sizeClasses} ${getVariantClasses()} ${className}`}
      onClick={handleClick}
    >
      {children}
    </button>
  );
};
