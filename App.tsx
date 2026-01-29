
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import PlanCard from './components/PlanCard';
import Footer from './components/Footer';
import AdminPanel from './components/AdminPanel';
import PageContent from './components/PageContent';
import WhatsAppButton from './components/WhatsAppButton';
import { Plan, Category } from './types';
import { storageService } from './services/storageService';
import { SITE_SETTINGS, ADMIN_USER, ADMIN_PASSWORD } from './constants';

export type View = 'HOME' | 'COVERAGE' | 'TERMS' | 'GRIEVANCE' | 'PAY_BILL';

const App: React.FC = () => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [filter, setFilter] = useState<Category | 'ALL'>('ALL');
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [loginUser, setLoginUser] = useState('');
  const [loginPass, setLoginPass] = useState('');
  const [currentView, setCurrentView] = useState<View>('HOME');

  useEffect(() => {
    setPlans(storageService.getPlans());
  }, []);

  const handleAdminLogin = () => {
    if (loginUser === ADMIN_USER && loginPass === ADMIN_PASSWORD) {
      setIsAdmin(true);
      setShowAdminLogin(false);
      setLoginUser('');
      setLoginPass('');
    } else {
      alert('Invalid Credentials');
    }
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleNavClick = (cat: Category | 'ALL') => {
    setFilter(cat);
    if (currentView !== 'HOME') {
      setCurrentView('HOME');
      setTimeout(() => scrollToSection('plans'), 200);
    } else {
      scrollToSection('plans');
    }
  };

  const handleGetStarted = () => {
    if (currentView !== 'HOME') {
      setCurrentView('HOME');
      setTimeout(() => scrollToSection('plans'), 200);
    } else {
      scrollToSection('plans');
    }
  };

  const handleSupportClick = () => {
    if (currentView !== 'HOME') {
      setCurrentView('HOME');
      setTimeout(() => scrollToSection('contact'), 200);
    } else {
      scrollToSection('contact');
    }
  };

  const navigateTo = (view: View) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const filteredPlans = filter === 'ALL' 
    ? plans 
    : plans.filter(p => p.category === filter);

  if (isAdmin) {
    return (
      <div className="min-h-screen bg-black text-white selection:bg-blue-500/30">
        <AdminPanel 
          onLogout={() => setIsAdmin(false)} 
          refreshPlans={() => setPlans(storageService.getPlans())}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-black overflow-x-hidden selection:bg-blue-500/30">
      <Header 
        onAdminClick={() => setShowAdminLogin(true)} 
        onNavClick={handleNavClick}
        onHomeClick={() => navigateTo('HOME')}
        onSupportClick={handleSupportClick}
        onGetStartedClick={handleGetStarted}
      />
      
      <main className="flex-grow">
        {currentView === 'HOME' ? (
          <>
            <Hero onGetStarted={handleGetStarted} />
            <section id="plans" className="py-20 px-6 max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <div className="inline-block px-3 py-1 border border-blue-500/20 bg-blue-500/5 rounded-full mb-4">
                   <span className="text-[10px] font-bold text-blue-500 uppercase tracking-wider">Premium Offerings</span>
                </div>
                <h2 className="text-3xl md:text-5xl font-orbitron font-extrabold mb-5 tracking-tight">
                  Pick Your <span className="text-blue-500">Speed</span>
                </h2>
                <p className="text-gray-500 max-w-lg mx-auto text-[13px] md:text-[14px] font-medium leading-relaxed">
                  Engineered for ultra-low latency, high-bandwidth applications, and seamless 4K streaming experience.
                </p>
              </div>

              <div className="flex justify-center gap-2 md:gap-4 mb-16 flex-wrap">
                {(['ALL', Category.INTERNET, Category.IPTV, Category.COMBO] as const).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setFilter(cat)}
                    className={`px-8 py-2.5 rounded-full text-[12px] font-semibold transition-all duration-300 ${
                      filter === cat 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-white/5 text-white/50 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    {cat.charAt(0) + cat.slice(1).toLowerCase()}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPlans.map(plan => (
                  <PlanCard key={plan.id} plan={plan} />
                ))}
              </div>
            </section>

            <section id="contact" className="py-24 bg-zinc-900/10 border-t border-white/5">
              <div className="max-w-6xl mx-auto px-6 text-center">
                <h2 className="text-2xl md:text-4xl font-orbitron font-extrabold mb-16 tracking-tight">Get Connected <span className="text-blue-500">Today</span></h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-8 glass rounded-xl group hover:border-blue-500/20 transition-all duration-500">
                    <p className="text-[11px] text-blue-500 mb-4 font-bold tracking-widest uppercase">Direct Line</p>
                    <p className="text-lg font-bold tracking-tight mb-1">{SITE_SETTINGS.mobile1}</p>
                    <p className="text-lg font-bold tracking-tight">{SITE_SETTINGS.mobile2}</p>
                  </div>
                  <div className="p-8 glass rounded-xl group hover:border-blue-500/20 transition-all duration-500">
                    <p className="text-[11px] text-blue-500 mb-4 font-bold tracking-widest uppercase">Email Access</p>
                    <p className="text-base font-bold tracking-tight break-all">{SITE_SETTINGS.email}</p>
                  </div>
                  <div className="p-8 glass rounded-xl group hover:border-blue-500/20 transition-all duration-500">
                    <p className="text-[11px] text-blue-500 mb-4 font-bold tracking-widest uppercase">Online Portal</p>
                    <p className="text-lg font-bold tracking-tight">{SITE_SETTINGS.domain}</p>
                  </div>
                </div>
              </div>
            </section>
          </>
        ) : (
          <PageContent view={currentView} />
        )}
      </main>

      <Footer onNavigate={navigateTo} onFilterClick={handleNavClick} />
      
      <WhatsAppButton />

      {/* Admin Login Modal */}
      {showAdminLogin && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-xl px-6">
          <div className="bg-zinc-950 p-10 rounded-xl w-full max-w-md border border-white/10 relative shadow-2xl">
            <h3 className="text-xl font-orbitron font-extrabold mb-8 tracking-tight">System <span className="text-blue-500">Login</span></h3>
            <div className="space-y-6 mb-10">
              <div>
                <label className="block text-[11px] text-white/40 mb-2 font-semibold">Authorized Mobile</label>
                <input 
                  type="text" 
                  placeholder="9518631356" 
                  value={loginUser}
                  onChange={(e) => setLoginUser(e.target.value)}
                  className="w-full p-3 bg-white/5 border border-white/10 focus:outline-none focus:border-blue-500/50 transition-all text-sm rounded-lg"
                />
              </div>
              <div>
                <label className="block text-[11px] text-white/40 mb-2 font-semibold">Access Key</label>
                <input 
                  type="password" 
                  placeholder="••••••••" 
                  value={loginPass}
                  onChange={(e) => setLoginPass(e.target.value)}
                  className="w-full p-3 bg-white/5 border border-white/10 focus:outline-none focus:border-blue-500/50 transition-all text-sm rounded-lg"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={handleAdminLogin}
                className="flex-1 bg-blue-600 text-white font-bold py-3 text-[13px] hover:bg-blue-500 transition-all rounded-lg"
              >
                Access
              </button>
              <button 
                onClick={() => setShowAdminLogin(false)}
                className="flex-1 border border-white/10 py-3 text-[13px] font-bold hover:bg-white/10 transition-all rounded-lg"
              >
                Abort
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;