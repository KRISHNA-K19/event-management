import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  glow?: boolean;
}

export function Card({ children, className = '', glow = false }: CardProps) {
  return (
    <div className={`
      relative rounded-2xl border border-white/10 bg-slate-900/40 backdrop-blur-xl 
      overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.12)]
      transition-all duration-300 group
      ${glow ? 'hover:shadow-[0_0_25px_rgba(59,130,246,0.2)] hover:border-blue-500/30' : ''}
      ${className}
    `}>
      {/* Decorative gradient orb */}
      {glow && (
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/10 rounded-full blur-[50px] group-hover:bg-cyan-500/20 transition-colors duration-500 pointer-events-none"></div>
      )}
      <div className="relative z-10 w-full h-full p-6">
        {children}
      </div>
    </div>
  );
}
