
import { Plan } from '../types';
import { INITIAL_PLANS } from '../constants';

const STORAGE_KEY = 'hts_plans_db';

export const storageService = {
  getPlans: (): Plan[] => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_PLANS));
      return INITIAL_PLANS;
    }
    return JSON.parse(stored);
  },

  savePlans: (plans: Plan[]): void => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(plans));
  },

  updatePlan: (updatedPlan: Plan): void => {
    const plans = storageService.getPlans();
    const index = plans.findIndex(p => p.id === updatedPlan.id);
    if (index !== -1) {
      plans[index] = updatedPlan;
      storageService.savePlans(plans);
    }
  },

  addPlan: (newPlan: Plan): void => {
    const plans = storageService.getPlans();
    plans.push(newPlan);
    storageService.savePlans(plans);
  },

  deletePlan: (id: string): void => {
    const plans = storageService.getPlans();
    const filtered = plans.filter(p => p.id !== id);
    storageService.savePlans(filtered);
  }
};
