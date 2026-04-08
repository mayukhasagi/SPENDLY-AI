export type Tab = 'home' | 'spending' | 'insights' | 'forecast' | 'profile';

export interface Transaction {
  id: string;
  name: string;
  amount: number;
  date: string;
  category: string;
  icon: string;
}

export interface Persona {
  id: string;
  name: string;
  location: string;
  avatar: string;
  cardType: 'Gold' | 'Silver';
  cardNumber: string;
  cardHolder: string;
  isActive: boolean;
}
