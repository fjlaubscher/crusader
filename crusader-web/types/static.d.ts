interface SelectOption {
  value: string;
  description: string;
}
interface CrusadeFactions {
  totalAeldari: number;
  totalChaos: number;
  totalImperium: number;
  totalNecrons: number;
  totalOrks: number;
  totalTau: number;
  totalTyranids: number;
  totalVotann: number;
}

type Variant = 'info' | 'success' | 'error' | 'warning' | 'accent';

declare module 'react-helmet';
