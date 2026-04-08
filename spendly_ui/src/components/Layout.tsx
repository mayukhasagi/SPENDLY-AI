import React from 'react';
import { motion } from 'motion/react';
import { Home, BarChart3, Sparkles, TrendingUp, User, Bell } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { Tab } from '@/src/types';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

export default function Layout({ children, activeTab, onTabChange }: LayoutProps) {
  const navItems = [
    { id: 'home' as Tab, label: 'Home', icon: Home },
    { id: 'spending' as Tab, label: 'Spending', icon: BarChart3 },
    { id: 'insights' as Tab, label: 'Insights', icon: Sparkles },
    { id: 'forecast' as Tab, label: 'Forecast', icon: TrendingUp },
    { id: 'profile' as Tab, label: 'Profile', icon: User },
  ];

  return (
    <div className="min-h-screen bg-surface text-on-surface pb-32">
      {/* Top App Bar */}
      <header className="fixed top-0 w-full z-50 bg-surface/60 backdrop-blur-xl shadow-[0_20px_40px_rgba(0,0,0,0.08)]">
        <div className="flex justify-between items-center px-6 h-16 max-w-5xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-surface-container-high ring-2 ring-primary/20">
              <img
                src="https://picsum.photos/seed/user/100/100"
                alt="User"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-primary-container bg-clip-text text-transparent font-headline tracking-tight">
              Spendly
            </span>
          </div>
          <button className="w-10 h-10 flex items-center justify-center rounded-full text-primary hover:bg-surface-container-high transition-colors active:scale-95 duration-300">
            <Bell size={20} />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-24 px-6 max-w-5xl mx-auto">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 w-full z-50 rounded-t-[24px] bg-surface/80 backdrop-blur-2xl shadow-[0_-10px_30px_rgba(0,0,0,0.2)]">
        <div className="flex justify-around items-center h-20 px-4 pb-2 max-w-5xl mx-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={cn(
                  "flex flex-col items-center justify-center transition-all active:scale-90",
                  isActive 
                    ? "text-primary bg-surface-container-high rounded-full px-4 py-1 shadow-[0_0_15px_rgba(88,245,209,0.2)]" 
                    : "text-on-surface-variant opacity-70 hover:text-primary"
                )}
              >
                <Icon size={20} fill={isActive ? "currentColor" : "none"} />
                <span className="text-[10px] uppercase tracking-widest mt-1 font-medium">
                  {item.label}
                </span>
                {isActive && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute -bottom-1 w-1 h-1 bg-primary rounded-full"
                  />
                )}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Desktop Side Nav (Visible on md+) */}
      <div className="hidden md:flex fixed left-8 top-1/2 -translate-y-1/2 flex-col gap-6 p-4 glass-card rounded-full z-50">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={cn(
                "w-12 h-12 flex items-center justify-center rounded-full transition-all",
                isActive 
                  ? "bg-primary text-on-primary" 
                  : "text-on-surface-variant hover:text-primary hover:bg-surface-container-high"
              )}
            >
              <Icon size={24} fill={isActive ? "currentColor" : "none"} />
            </button>
          );
        })}
      </div>
    </div>
  );
}
