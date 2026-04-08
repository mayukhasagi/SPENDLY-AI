import React from 'react';
import { motion } from 'motion/react';
import { CreditCard, Coffee, Car } from 'lucide-react';

export default function Home() {
  return (
    <div className="space-y-10">
      {/* Hero Greeting */}
      <section className="space-y-2">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-headline font-bold text-on-surface tracking-tight"
        >
          Good Evening, Mayu 👋
        </motion.h1>
        <div className="flex items-center gap-3 text-on-surface-variant text-xs tracking-wide">
          <span className="px-3 py-1 rounded-full bg-surface-container-high/50 border border-outline-variant/10">F</span>
          <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-surface-container-high/50 border border-outline-variant/10">
            <CreditCard size={14} className="text-primary" />
            Gold Card
          </span>
          <span className="px-3 py-1 rounded-full bg-surface-container-high/50 border border-outline-variant/10">Mumbai</span>
        </div>
      </section>

      {/* Spending Overview */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Monthly Spending */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="md:col-span-7 p-8 rounded-lg glass-card relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-[60px] rounded-full -mr-16 -mt-16 group-hover:bg-primary/20 transition-all duration-700"></div>
          <div className="relative z-10 space-y-4">
            <p className="text-on-surface-variant font-medium uppercase tracking-widest text-[10px]">Monthly Spending</p>
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-headline font-bold text-on-surface">₹42,850</span>
              <span className="text-primary text-sm font-medium">+12% vs last month</span>
            </div>
            <div className="w-full h-1 bg-surface-container rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: '72%' }}
                transition={{ duration: 1, delay: 0.5 }}
                className="h-full bg-gradient-to-r from-primary to-primary-container"
              />
            </div>
            <p className="text-sm text-on-surface-variant">72% of monthly budget exhausted</p>
          </div>
        </motion.div>

        {/* Weekly Average */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="md:col-span-5 p-8 rounded-lg bg-surface-container-low flex flex-col justify-between group"
        >
          <div className="space-y-4">
            <p className="text-on-surface-variant font-medium uppercase tracking-widest text-[10px]">Weekly Average</p>
            <h3 className="text-3xl font-headline font-bold text-on-surface">₹9,420</h3>
          </div>
          <div className="mt-8 flex items-end gap-2 h-20">
            {[40, 60, 30, 90, 50, 45, 20].map((height, i) => (
              <div 
                key={i}
                className={cn(
                  "flex-1 rounded-t-sm transition-all duration-300",
                  i === 3 ? "bg-primary/80" : "bg-surface-container-high group-hover:bg-primary/30"
                )}
                style={{ height: `${height}%` }}
              />
            ))}
          </div>
        </motion.div>

        {/* Today's Activity */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="md:col-span-12 p-8 rounded-lg bg-surface-container-high border-l-4 border-primary/50 flex flex-col md:flex-row md:items-center justify-between gap-6"
        >
          <div>
            <p className="text-on-surface-variant font-medium uppercase tracking-widest text-[10px] mb-2">Today's Activity</p>
            <h3 className="text-2xl font-headline font-bold text-on-surface">₹1,240.00</h3>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
            <div className="flex items-center gap-3 bg-surface/40 px-4 py-2 rounded-full whitespace-nowrap">
              <Coffee size={16} className="text-tertiary" />
              <span className="text-sm">Starbucks • ₹450</span>
            </div>
            <div className="flex items-center gap-3 bg-surface/40 px-4 py-2 rounded-full whitespace-nowrap">
              <Car size={16} className="text-primary" />
              <span className="text-sm">Uber • ₹790</span>
            </div>
          </div>
        </motion.div>
      </section>

    </div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
