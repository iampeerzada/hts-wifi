
import React, { useState, useEffect, useCallback } from 'react';
import { View } from '../App';
// Import SITE_SETTINGS to fix the missing reference error
import { SITE_SETTINGS } from '../constants';

interface PageContentProps {
  view: View;
}

const PageContent: React.FC<PageContentProps> = ({ view }) => {
  const [showScanner, setShowScanner] = useState(false);
  const upiId = "haryanateleservices07@ok";
  const upiUrl = `upi://pay?pa=${upiId}&pn=Haryana%20Tele%20Services&cu=INR`;
  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(upiUrl)}`;

  const closeScanner = useCallback(() => {
    setShowScanner(false);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && showScanner) {
        closeScanner();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showScanner, closeScanner]);

  const renderContent = () => {
    switch (view) {
      case 'COVERAGE':
        return (
          <div className="space-y-8">
            <h1 className="text-2xl md:text-3xl font-orbitron font-extrabold tracking-tight">Network Coverage</h1>
            <p className="text-gray-400 leading-relaxed text-[14px]">
              Haryana Tele Services provides high-speed fiber connectivity across major districts in Haryana. We are constantly expanding our infrastructure to reach more remote areas.
            </p>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {['Rohtak', 'Hisar', 'Jind', 'Bhiwani', 'Sonipat', 'Panipat', 'Gurugram', 'Faridabad'].map(city => (
                <div key={city} className="p-4 glass text-center font-bold text-[12px] tracking-wide transition-colors hover:border-blue-500/30 rounded-lg">{city}</div>
              ))}
            </div>
          </div>
        );
      case 'TERMS':
        return (
          <div className="space-y-8">
            <h1 className="text-2xl md:text-3xl font-orbitron font-extrabold tracking-tight">Terms of Service</h1>
            <div className="space-y-4">
              {[
                { t: '1. Service Provision', d: 'HTS provides internet services on an "as-is" basis. We strive for 99.9% uptime.' },
                { t: '2. Fair Usage Policy', d: 'Unlimited plans are subject to commercial fair usage policies for stability.' },
                { t: '3. Billing', d: 'Monthly billing cycles apply. Service may be suspended for non-payment.' }
              ].map((s, i) => (
                <section key={i} className="glass p-5 rounded-lg border-white/5">
                  <h3 className="text-white font-bold mb-2 text-sm">{s.t}</h3>
                  <p className="text-gray-400 text-[13px]">{s.d}</p>
                </section>
              ))}
            </div>
          </div>
        );
      case 'GRIEVANCE':
        return (
          <div className="space-y-8">
            <h1 className="text-2xl md:text-3xl font-orbitron font-extrabold tracking-tight">Grievance Redressal</h1>
            <p className="text-gray-400 text-sm leading-relaxed">
              We aim to resolve any issues within 24-48 working hours. For unresolved complaints, please reach our Nodal Officer.
            </p>
            <div className="p-8 glass border-blue-500/20 rounded-xl relative overflow-hidden">
              <h3 className="text-blue-500 font-bold mb-4 text-[11px] tracking-widest uppercase">Nodal Officer Details</h3>
              <p className="text-lg font-bold mb-1 break-all">{SITE_SETTINGS.email}</p>
              <p className="text-[12px] text-gray-500 font-medium mt-4">Working Hours: Mon-Sat (10:00 AM - 6:00 PM)</p>
            </div>
          </div>
        );
      case 'PAY_BILL':
        return (
          <div className="space-y-12 text-center py-6">
            <div className="space-y-3">
              <h1 className="text-3xl md:text-4xl font-orbitron font-extrabold tracking-tight">Secure <span className="text-blue-500">Payments</span></h1>
              <p className="text-gray-400 text-sm max-w-sm mx-auto">Settle your broadband invoices instantly via UPI.</p>
            </div>
            
            <div className="max-w-sm mx-auto p-8 glass rounded-2xl space-y-6">
              <div className="space-y-1">
                <label className="block text-[10px] text-white/30 font-bold tracking-widest uppercase">UPI ID</label>
                <p className="text-base font-bold text-white tracking-wide">{upiId}</p>
              </div>

              <button 
                onClick={() => setShowScanner(true)}
                className="w-full bg-white text-black font-bold py-3 text-[13px] hover:bg-zinc-200 transition-all rounded-lg"
              >
                Reveal QR Scanner
              </button>

              <div className="relative flex items-center py-2">
                <div className="flex-grow border-t border-white/5"></div>
                <span className="mx-4 text-[10px] text-white/20 font-bold">OR</span>
                <div className="flex-grow border-t border-white/5"></div>
              </div>

              <div className="space-y-4">
                 <input 
                  type="text" 
                  placeholder="Customer ID" 
                  className="w-full bg-black border border-white/10 p-3 text-xs focus:border-blue-500 outline-none rounded-lg"
                />
                <button className="w-full border border-white/10 text-white/40 font-bold py-3 text-[12px] hover:text-white transition-all rounded-lg">
                  Fetch Invoice
                </button>
              </div>
            </div>

            {showScanner && (
              <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-2xl p-6">
                <div className="bg-white p-8 rounded-2xl max-w-xs w-full text-center shadow-2xl animate-fade-in">
                  <h3 className="text-black font-bold text-lg mb-1">Scan to Pay</h3>
                  <p className="text-zinc-500 text-[11px] font-medium mb-6">Haryana Tele Services</p>

                  <div className="bg-white p-2 rounded-lg border border-zinc-100 mb-6">
                    <img src={qrImageUrl} alt="UPI QR" className="w-full h-auto" />
                  </div>

                  <button 
                    onClick={closeScanner}
                    className="w-full bg-black text-white font-bold py-3 text-[12px] hover:bg-zinc-800 transition-all rounded-lg"
                  >
                    Close <span className="text-[10px] opacity-40 font-normal ml-1">(Esc)</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-[50vh] py-16 px-6 max-w-4xl mx-auto">
      {renderContent()}
    </div>
  );
};

export default PageContent;
