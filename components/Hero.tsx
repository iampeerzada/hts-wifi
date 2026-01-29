
import React from 'react';
import { SITE_SETTINGS } from '../constants';

interface HeroProps {
  onGetStarted: () => void;
}

const Hero: React.FC<HeroProps> = ({ onGetStarted }) => {
  return (
    <section className="relative h-[75vh] md:h-[80vh] flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.9)), url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2072')`,
          animation: 'kenburns 30s linear infinite alternate'
        }}
      />
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-500/10 blur-[100px] pointer-events-none rounded-full" />

      <div className="relative z-10 text-center px-6 max-w-4xl">
        <div className="inline-block px-3 py-1 glass rounded-full mb-6 animate-fade-in">
          <span className="text-[11px] font-semibold tracking-wide text-blue-400">Next Gen Fiber Infrastructure</span>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-orbitron font-extrabold mb-6 tracking-tight leading-[1.1] text-glow">
          The Future of <br className="hidden md:block"/> <span className="text-blue-500">Connectivity</span>
        </h1>
        
        <p className="text-sm md:text-lg text-gray-400 mb-10 font-normal tracking-tight max-w-xl mx-auto leading-relaxed">
          Experience ultra high-speed fiber internet and premium entertainment services designed for the modern Haryana home.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button 
            onClick={onGetStarted}
            className="group relative px-10 py-3.5 bg-white text-black text-[13px] font-bold transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] rounded-md"
          >
            View Plans
          </button>
          <a 
            href={`https://wa.me/91${SITE_SETTINGS.mobile1}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-10 py-3.5 border border-white/20 text-white text-[13px] font-bold hover:bg-white/10 transition-all duration-300 rounded-md"
          >
            Contact Sales
          </a>
        </div>
      </div>

      <style>{`
        @keyframes kenburns {
          0% { transform: scale(1); }
          100% { transform: scale(1.08); }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
};

export default Hero;