
import { Plan, Category, SiteSettings } from './types';

export const INITIAL_PLANS: Plan[] = [
  {
    id: '1',
    name: 'Standard Fiber',
    speed: '40 Mbps',
    price: 499,
    dataLimit: 'Unlimited',
    category: Category.INTERNET,
    features: ['High Speed Fiber', 'Free Installation', '24/7 Support'],
    recommended: false
  },
  {
    id: '2',
    name: 'Pro Streamer',
    speed: '100 Mbps',
    price: 799,
    dataLimit: 'Unlimited',
    category: Category.INTERNET,
    features: ['Ultra-Low Latency', 'Free Dual-Band Router', 'Static IP Available'],
    recommended: true
  },
  {
    id: '3',
    name: 'IPTV Premium',
    speed: 'Best Effort',
    price: 250,
    dataLimit: 'Unlimited',
    category: Category.IPTV,
    features: ['500+ Channels', 'HD Content', 'Multi-Device Support'],
    recommended: false
  },
  {
    id: '4',
    name: 'Family Combo',
    speed: '150 Mbps',
    price: 1199,
    dataLimit: 'Unlimited',
    category: Category.COMBO,
    features: ['High Speed Internet', 'Free IPTV Subscription', 'Free Router'],
    recommended: false
  }
];

export const SITE_SETTINGS: SiteSettings = {
  brandName: 'Haryana Tele Services',
  mobile1: '9518631356',
  mobile2: '9050932000',
  email: 'haryanateleservices07@gmail.com',
  domain: 'htswifi.com'
};

export const ADMIN_USER = '9518631356';
export const ADMIN_PASSWORD = 'mmc@#2315';
