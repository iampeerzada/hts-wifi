
import React, { useState, useEffect } from 'react';
import { Plan, Category } from '../types';
import { storageService } from '../services/storageService';

interface AdminPanelProps {
  onLogout: () => void;
  refreshPlans: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ onLogout, refreshPlans }) => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [editingPlan, setEditingPlan] = useState<Plan | null>(null);

  useEffect(() => {
    setPlans(storageService.getPlans());
  }, []);

  const handleSave = (plan: Plan) => {
    if (plans.find(p => p.id === plan.id)) {
      storageService.updatePlan(plan);
    } else {
      storageService.addPlan(plan);
    }
    const updated = storageService.getPlans();
    setPlans(updated);
    setEditingPlan(null);
    refreshPlans();
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Delete this plan?')) {
      storageService.deletePlan(id);
      setPlans(storageService.getPlans());
      refreshPlans();
    }
  };

  const createEmptyPlan = (): Plan => ({
    id: Math.random().toString(36).substr(2, 9),
    name: 'New Plan',
    speed: '100 Mbps',
    price: 999,
    dataLimit: 'Unlimited',
    category: Category.INTERNET,
    features: ['Fiber Optic'],
    recommended: false
  });

  return (
    <div className="p-8 max-w-5xl mx-auto pt-16">
      <div className="flex justify-between items-end mb-10 border-b border-white/10 pb-6">
        <div>
          <h1 className="text-2xl font-orbitron font-extrabold tracking-tight">Admin Dashboard</h1>
          <p className="text-gray-500 text-[12px] font-medium mt-1">Control center for Haryana Tele Services</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => setEditingPlan(createEmptyPlan())}
            className="bg-white text-black font-bold px-5 py-2 text-[12px] rounded-md transition-colors hover:bg-zinc-200"
          >
            Add Plan
          </button>
          <button 
            onClick={onLogout}
            className="border border-white/20 px-5 py-2 text-[12px] font-bold rounded-md transition-colors hover:bg-white/10"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {plans.map(plan => (
          <div key={plan.id} className="glass p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 rounded-xl border-white/5">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] text-blue-400 font-bold uppercase tracking-wider">{plan.category}</span>
                {plan.recommended && <span className="bg-blue-600/20 text-blue-400 text-[9px] font-bold px-2 py-0.5 rounded">Popular</span>}
              </div>
              <h3 className="text-base font-bold text-white">{plan.name}</h3>
              <p className="text-[12px] text-zinc-400">{plan.speed} • ₹{plan.price} • {plan.dataLimit}</p>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => setEditingPlan(plan)}
                className="px-4 py-1.5 border border-white/10 hover:border-white/30 text-[11px] font-semibold rounded transition-colors"
              >
                Edit
              </button>
              <button 
                onClick={() => handleDelete(plan.id)}
                className="px-4 py-1.5 border border-red-900/40 text-red-500 hover:border-red-500 text-[11px] font-semibold rounded transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {editingPlan && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 backdrop-blur-xl p-6">
          <div className="bg-zinc-950 w-full max-w-lg p-8 rounded-2xl border border-white/10 shadow-2xl">
            <h2 className="text-xl font-bold mb-6 tracking-tight">
              {plans.find(p => p.id === editingPlan.id) ? 'Edit Plan' : 'New Plan'}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-[11px] text-white/40 mb-1 font-semibold">Plan Name</label>
                <input 
                  type="text" 
                  value={editingPlan.name}
                  onChange={(e) => setEditingPlan({...editingPlan, name: e.target.value})}
                  className="w-full bg-black border border-white/10 p-2.5 text-xs rounded focus:border-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-[11px] text-white/40 mb-1 font-semibold">Category</label>
                <select 
                  value={editingPlan.category}
                  onChange={(e) => setEditingPlan({...editingPlan, category: e.target.value as Category})}
                  className="w-full bg-black border border-white/10 p-2.5 text-xs rounded focus:border-blue-500 outline-none"
                >
                  {Object.values(Category).map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-[11px] text-white/40 mb-1 font-semibold">Speed</label>
                <input 
                  type="text" 
                  value={editingPlan.speed}
                  onChange={(e) => setEditingPlan({...editingPlan, speed: e.target.value})}
                  className="w-full bg-black border border-white/10 p-2.5 text-xs rounded focus:border-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-[11px] text-white/40 mb-1 font-semibold">Price (₹)</label>
                <input 
                  type="number" 
                  value={editingPlan.price}
                  onChange={(e) => setEditingPlan({...editingPlan, price: parseInt(e.target.value) || 0})}
                  className="w-full bg-black border border-white/10 p-2.5 text-xs rounded focus:border-blue-500 outline-none"
                />
              </div>
              <div className="md:col-span-2 flex items-center gap-3 py-2">
                <input 
                  type="checkbox" 
                  id="recommended"
                  checked={editingPlan.recommended}
                  onChange={(e) => setEditingPlan({...editingPlan, recommended: e.target.checked})}
                  className="w-4 h-4 accent-blue-600"
                />
                <label htmlFor="recommended" className="text-[12px] font-bold cursor-pointer">Mark as Recommended</label>
              </div>
            </div>

            <div className="flex gap-3">
              <button 
                onClick={() => handleSave(editingPlan)}
                className="flex-1 bg-white text-black font-bold py-3 text-[13px] rounded-lg hover:bg-zinc-200"
              >
                Save Changes
              </button>
              <button 
                onClick={() => setEditingPlan(null)}
                className="flex-1 border border-white/10 py-3 text-[13px] font-bold rounded-lg hover:bg-white/10"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;