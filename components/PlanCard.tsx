
import React from 'react';
import { Plan } from '../types';
import { SITE_SETTINGS } from '../constants';

interface PlanCardProps {
  plan: Plan;
}

const PlanCard: React.FC<PlanCardProps> = ({ plan }) => {
  const handleConnect = () => {
    const message = `Hello Haryana Tele Services, I am interested in the ${plan.name} plan.
    
Details:
- Speed: ${plan.speed}
- Price: ₹${plan.price}/Month
- Data: ${plan.dataLimit}

Please guide me with the connection process.`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/91${SITE_SETTINGS.mobile1}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className={`relative flex flex-col p-8 glass transition-all duration-500 hover:-translate-y-2 group glow-blue ${plan.recommended ? 'border-blue-500/30' : ''} rounded-xl`}>
      {plan.recommended && (
        <div className="absolute -top-3 left-6 bg-blue-600 text-white text-[10px] font-bold px-3 py-1 shadow-lg rounded-full">
          Recommended
        </div>
      )}
      
      <div className="mb-8">
        <div className="flex justify-between items-start mb-3">
          <p className="text-blue-500 text-[11px] font-bold tracking-wider uppercase">{plan.category}</p>
          <div className="opacity-30 group-hover:opacity-100 transition-opacity">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
          </div>
        </div>
        <h3 className="text-xl md:text-2xl font-bold tracking-tight group-hover:text-blue-400 transition-colors">{plan.name}</h3>
      </div>

      <div className="flex items-baseline mb-6 pb-6 border-b border-white/5">
        <span className="text-3xl md:text-4xl font-extrabold tracking-tighter">₹{plan.price}</span>
        <span className="text-gray-500 text-[12px] ml-2 font-medium">/ Month</span>
      </div>

      <div className="space-y-4 mb-10 flex-grow">
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 flex items-center justify-center bg-blue-500/10 rounded-full">
            <svg className="w-3 h-3 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
          </div>
          <span className="text-[13px] font-medium">{plan.speed} Speed</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 flex items-center justify-center bg-blue-500/10 rounded-full">
            <svg className="w-3 h-3 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
          </div>
          <span className="text-[13px] font-medium">{plan.dataLimit} Data</span>
        </div>
        {plan.features.map((feature, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="w-5 h-5 flex items-center justify-center opacity-30">
              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
            </div>
            <span className="text-[12px] text-gray-500 font-normal">{feature}</span>
          </div>
        ))}
      </div>

      <button 
        onClick={handleConnect}
        className={`w-full py-3 text-[12px] font-bold transition-all duration-300 rounded-lg ${
        plan.recommended 
          ? 'bg-blue-600 text-white hover:bg-blue-500 hover:shadow-lg' 
          : 'bg-white/5 border border-white/10 hover:border-white/30 hover:bg-white/10'
      }`}>
        Get Connected
      </button>
    </div>
  );
};

export default PlanCard;