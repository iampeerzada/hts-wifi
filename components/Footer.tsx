
import React from 'react';
import { SITE_SETTINGS } from '../constants';
import { View } from '../App';
import { Category } from '../types';

interface FooterProps {
  onNavigate: (view: View) => void;
  onFilterClick: (cat: Category | 'ALL') => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate, onFilterClick }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black py-16 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          <div className="md:col-span-5">
            <div className="flex flex-col gap-4 mb-8 cursor-pointer group" onClick={() => onNavigate('HOME')}>
              <div className="h-12 w-auto flex items-start">
                <img 
                  src="logo.png" 
                  alt="HTS Logo" 
                  className="h-full w-auto object-contain"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.parentElement!.innerHTML = '<div class="w-10 h-10 bg-blue-600 flex items-center justify-center rounded-md font-bold text-xs">HTS</div>';
                  }}
                />
              </div>
              <span className="font-orbitron font-extrabold text-lg tracking-tight">Haryana Tele Services</span>
            </div>
            <p className="text-gray-500 text-sm max-w-sm leading-relaxed">
              Pioneering fiber-optic excellence across Haryana. Delivering world-class speeds and reliable entertainment for every household.
            </p>
          </div>
          
          <div className="md:col-span-3">
            <h4 className="text-[11px] font-bold tracking-widest mb-6 text-white/30 uppercase">Navigate</h4>
            <ul className="space-y-3 text-[13px] text-gray-500 font-medium">
              <li><button onClick={() => onFilterClick('ALL')} className="hover:text-blue-500 transition-colors">Broadband Plans</button></li>
              <li><button onClick={() => onFilterClick(Category.IPTV)} className="hover:text-blue-500 transition-colors">IPTV Services</button></li>
              <li><button onClick={() => onNavigate('COVERAGE')} className="hover:text-blue-500 transition-colors">Network Coverage</button></li>
              <li><button onClick={() => onNavigate('TERMS')} className="hover:text-blue-500 transition-colors">Legal Terms</button></li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <h4 className="text-[11px] font-bold tracking-widest mb-6 text-white/30 uppercase">Assistance</h4>
            <ul className="space-y-3 text-[13px] text-gray-500 font-medium">
              <li><a href={`tel:${SITE_SETTINGS.mobile1}`} className="hover:text-white transition-colors">{SITE_SETTINGS.mobile1}</a></li>
              <li><a href={`mailto:${SITE_SETTINGS.email}`} className="hover:text-white transition-colors">HTS Support Center</a></li>
              <li><button onClick={() => onNavigate('GRIEVANCE')} className="hover:text-blue-500 transition-colors">Customer Redressal</button></li>
              <li><button onClick={() => onNavigate('PAY_BILL')} className="hover:text-blue-500 transition-colors">Secure Billing</button></li>
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[11px] text-gray-600 font-medium text-center md:text-left">
            © {currentYear} Haryana Tele Services — All rights reserved
          </p>
          <p className="text-[11px] text-gray-600 font-medium">
            Designed by <a href="https://ifastx.in" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-blue-500 transition-all">iFastX</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;