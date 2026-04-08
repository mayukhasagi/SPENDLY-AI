import React from 'react';
import { motion } from 'motion/react';
import { ShoppingCart, Zap, Plane, Calendar } from 'lucide-react';

export default function Spending() {
  const transactions = [
    { id: '1', name: 'Whole Foods Market', amount: -84.20, date: 'Today • 2:45 PM', category: 'Groceries', icon: ShoppingCart, color: 'text-primary' },
    { id: '2', name: 'Electric Utility Co.', amount: -156.00, date: 'Yesterday • 9:12 AM', category: 'Bills', icon: Zap, color: 'text-tertiary' },
    { id: '3', name: 'Delta Airlines', amount: -420.00, date: 'Oct 24 • 4:30 PM', category: 'Travel', icon: Plane, color: 'text-secondary' },
  ];

  return (
    <div className="space-y-10">
      <section className="space-y-2">
        <p className="text-on-surface-variant font-medium text-xs tracking-[0.2em] uppercase">Executive Overview</p>
        <h1 className="font-headline text-5xl font-bold tracking-tighter text-on-surface">Your Spending</h1>
      </section>

      {/* Summary Tiles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-surface-container-low rounded-lg p-6 relative overflow-hidden group">
          <p className="font-medium text-[10px] text-on-surface-variant uppercase tracking-widest mb-1">Today</p>
          <p className="font-headline text-3xl font-bold text-primary">₹142.50</p>
          <div className="mt-4 flex items-center gap-2 text-error text-xs font-medium">
            <TrendingUp size={14} />
            <span>12% vs yesterday</span>
          </div>
        </div>
        <div className="bg-surface-container-high rounded-lg p-6 relative overflow-hidden border-l-4 border-primary/30">
          <p className="font-medium text-[10px] text-on-surface-variant uppercase tracking-widest mb-1">This Week</p>
          <p className="font-headline text-3xl font-bold text-on-surface">₹1,280.00</p>
          <div className="mt-4 flex items-center gap-2 text-primary text-xs font-medium">
            <TrendingDown size={14} />
            <span>4% vs last week</span>
          </div>
        </div>
        <div className="bg-surface-container-low rounded-lg p-6 relative overflow-hidden group">
          <p className="font-medium text-[10px] text-on-surface-variant uppercase tracking-widest mb-1">This Month</p>
          <p className="font-headline text-3xl font-bold text-on-surface">₹4,520.88</p>
          <div className="mt-4 flex items-center gap-2 text-on-surface-variant text-xs font-medium">
            <Calendar size={14} />
            <span>On track for goal</span>
          </div>
        </div>
      </div>

      {/* Category Distribution & Weekly Trends */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <div className="md:col-span-2 bg-surface-container-low rounded-lg p-8 flex flex-col items-center justify-center space-y-6">
          <h3 className="w-full text-left font-headline text-xl font-bold">Category Distribution</h3>
          <div className="relative w-48 h-48 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" fill="transparent" r="40" stroke="#0b203d" strokeWidth="12" />
              <circle cx="50" cy="50" fill="transparent" r="40" stroke="#58f5d1" strokeDasharray="251.2" strokeDashoffset="150.7" strokeLinecap="round" strokeWidth="12" />
              <circle cx="50" cy="50" fill="transparent" r="40" stroke="#6cd6ff" strokeDasharray="251.2" strokeDashoffset="210" strokeLinecap="round" strokeWidth="12" style={{ transform: 'rotate(144deg)', transformOrigin: 'center' }} />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-[10px] text-on-surface-variant font-medium uppercase">Top Pick</span>
              <span className="text-xl font-bold font-headline">Bills</span>
            </div>
          </div>
          <div className="w-full grid grid-cols-2 gap-4">
            <CategoryItem label="Bills" color="bg-primary" percentage="40%" />
            <CategoryItem label="Groceries" color="bg-tertiary" percentage="25%" />
            <CategoryItem label="Travel" color="bg-secondary-container" percentage="20%" />
            <CategoryItem label="Other" color="bg-outline-variant" percentage="15%" />
          </div>
        </div>

        <div className="md:col-span-3 bg-surface-container-low rounded-lg p-8 space-y-8 flex flex-col">
          <div className="flex justify-between items-end">
            <div>
              <h3 className="font-headline text-xl font-bold">Weekly Trends</h3>
              <p className="text-sm text-on-surface-variant">Daily expense activity</p>
            </div>
            <div className="flex gap-2">
              <span className="px-3 py-1 bg-surface-container-high rounded-full text-[10px] font-bold text-primary uppercase tracking-tighter">Current</span>
              <span className="px-3 py-1 bg-surface-container-low rounded-full text-[10px] font-bold text-on-surface-variant uppercase tracking-tighter">Previous</span>
            </div>
          </div>
          <div className="flex-grow flex items-end justify-between gap-2 px-2 min-h-[200px]">
            {[32, 24, 40, 28, 36, 20, 16].map((h, i) => (
              <div key={i} className="flex flex-col items-center gap-2 w-full group">
                <div className="relative w-full">
                  <div className="w-full bg-surface-container-high rounded-t-sm transition-colors group-hover:bg-primary/20" style={{ height: `${h * 4}px` }} />
                  <div className={cn("absolute bottom-0 w-full rounded-t-sm", i === 2 ? "bg-primary shadow-[0_0_15px_rgba(88,245,209,0.3)]" : "bg-primary/40")} style={{ height: `${h * 3.5}px` }} />
                </div>
                <span className="text-[10px] font-medium text-on-surface-variant uppercase">{['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <section className="space-y-6 pb-8">
        <div className="flex justify-between items-center">
          <h3 className="font-headline text-2xl font-bold">Recent Activities</h3>
          <button className="text-primary text-sm font-medium hover:underline">View All</button>
        </div>
        <div className="space-y-3">
          {transactions.map((t) => (
            <div key={t.id} className="group flex items-center gap-4 p-4 bg-surface-container-low rounded-lg transition-all hover:bg-surface-container-high">
              <div className={cn("w-12 h-12 rounded-full bg-surface-container-high flex items-center justify-center border border-white/5 group-hover:scale-110 transition-transform", t.color)}>
                <t.icon size={20} />
              </div>
              <div className="flex-grow">
                <p className="font-medium text-on-surface">{t.name}</p>
                <p className="text-xs text-on-surface-variant">{t.date}</p>
              </div>
              <div className="text-right">
                <p className="font-headline font-bold text-on-surface">{t.amount < 0 ? `-₹${Math.abs(t.amount).toFixed(2)}` : `+₹${t.amount.toFixed(2)}`}</p>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant">{t.category}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function CategoryItem({ label, color, percentage }: { label: string, color: string, percentage: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className={cn("w-2 h-2 rounded-full", color)} />
      <span className="text-xs font-medium text-on-surface">{label}</span>
      <span className="ml-auto text-xs text-on-surface-variant">{percentage}</span>
    </div>
  );
}

function TrendingUp(props: any) { return <TrendingUpIcon {...props} /> }
function TrendingDown(props: any) { return <TrendingDownIcon {...props} /> }

import { TrendingUp as TrendingUpIcon, TrendingDown as TrendingDownIcon } from 'lucide-react';

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
