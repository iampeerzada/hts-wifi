
export enum Category {
  INTERNET = 'INTERNET',
  IPTV = 'IPTV',
  COMBO = 'COMBO'
}

export interface Plan {
  id: string;
  name: string;
  speed: string; // e.g. "100 Mbps"
  price: number;
  dataLimit: string; // e.g. "Unlimited"
  category: Category;
  features: string[];
  recommended: boolean;
}

export interface SiteSettings {
  brandName: string;
  mobile1: string;
  mobile2: string;
  email: string;
  domain: string;
}
