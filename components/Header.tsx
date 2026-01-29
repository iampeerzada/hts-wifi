
import React from 'react';
import { Category } from '../types';

interface HeaderProps {
  onAdminClick: () => void;
  onNavClick: (cat: Category | 'ALL') => void;
  onHomeClick: () => void;
  onSupportClick: () => void;
  onGetStartedClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ 
  onAdminClick, 
  onNavClick, 
  onHomeClick, 
  onSupportClick,
  onGetStartedClick 
}) => {
  return (
    <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="h-20 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 cursor-pointer group flex-shrink-0" onClick={onHomeClick}>
            <div className="relative h-10 md:h-12 flex items-center">
              <img 
                src="logo.png" 
                alt="HTS Logo" 
                className="h-full w-auto object-contain brightness-110"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.parentElement!.innerHTML = '<div class="w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center font-bold text-xs">HTS</div>';
                }}
              />
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="font-orbitron font-extrabold text-[11px] md:text-xs tracking-tight leading-none">
                Haryana Tele
              </span>
              <span className="font-medium text-[8px] md:text-[9px] tracking-wide text-blue-500 leading-none mt-1">
                Services
              </span>
            </div>
          </div>

          <nav className="flex items-center gap-4 md:gap-8 overflow-x-auto no-scrollbar py-2 px-1">
            {['Home', 'Internet', 'IPTV', 'Support'].map((item) => (
              <button 
                key={item}
                onClick={item === 'Support' ? onSupportClick : item === 'Home' ? onHomeClick : () => onNavClick(item.toUpperCase() as any)}
                className="relative text-[12px] md:text-[13px] font-medium text-white/60 hover:text-white transition-all duration-300 py-1 whitespace-nowrap group/nav"
              >
                {item}
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-blue-500 transition-all duration-300 group-hover/nav:w-full"></span>
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
            <button 
              onClick={onAdminClick}
              className="hidden xs:block text-[10px] md:text-[12px] font-medium border border-white/10 px-3 md:px-4 py-1.5 hover:border-blue-500/50 hover:text-blue-400 transition-all opacity-70 hover:opacity-100 rounded-md whitespace-nowrap"
            >
              Admin
            </button>
            <button 
              onClick={onGetStartedClick}
              className="text-[10px] md:text-[12px] font-bold bg-white text-black px-3 md:px-5 py-2 hover:bg-zinc-200 transition-all duration-300 rounded-md whitespace-nowrap"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;