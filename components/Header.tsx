
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
          {/* Logo Section */}
          <div className="flex items-center gap-2 cursor-pointer group flex-shrink-0" onClick={onHomeClick}>
            <div className="relative h-10 md:h-12 flex items-center">
              <img 
                src="/logo.png" 
                alt="HTS Logo" 
                className="h-full w-auto object-contain brightness-110"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.parentElement!.innerHTML = '<div class="w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center font-bold text-xs text-white">H</div>';
                }}
              />
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="font-orbitron font-extrabold text-[11px] md:text-xs tracking-tight leading-none text-white">
                Haryana Tele
              </span>
              <span className="font-medium text-[8px] md:text-[9px] tracking-wide text-blue-500 leading-none mt-1">
                Services
              </span>
            </div>
          </div>

          {/* Navigation - Always visible & scrollable on mobile */}
          <nav className="flex items-center gap-4 md:gap-8 overflow-x-auto no-scrollbar py-2 px-1 flex-grow justify-center md:justify-start">
            {['Home', 'Internet', 'IPTV', 'Support'].map((item) => (
              <button 
                key={item}
                onClick={item === 'Support' ? onSupportClick : item === 'Home' ? onHomeClick : () => onNavClick(item.toUpperCase() as any)}
                className="flex items-center gap-1.5 relative text-[12px] md:text-[13px] font-medium text-white/60 hover:text-white transition-all duration-300 py-1 whitespace-nowrap group/nav"
              >
                {item === 'Home' && (
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                )}
                {item}
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-blue-500 transition-all duration-300 group-hover/nav:w-full"></span>
              </button>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
            <button 
              onClick={onAdminClick}
              className="hidden xs:block text-[10px] md:text-[11px] font-medium border border-white/10 px-3 md:px-4 py-1.5 hover:border-blue-500/50 hover:text-blue-400 transition-all opacity-70 hover:opacity-100 rounded-md whitespace-nowrap"
            >
              Admin
            </button>
            <button 
              onClick={onGetStartedClick}
              className="text-[10px] md:text-[11px] font-bold bg-white text-black px-3 md:px-5 py-2 hover:bg-zinc-200 transition-all duration-300 rounded-md whitespace-nowrap"
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
