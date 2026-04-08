import React from 'react';
import { motion } from 'motion/react';
import { Utensils, Sparkles, Smartphone, Zap } from 'lucide-react';

export default function Insights() {
  return (
    <div className="space-y-10">
      <section className="mb-10">
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-on-surface mb-2">Spending Insights</h1>
        <p className="text-on-surface-variant font-medium text-sm tracking-widest uppercase">Deep Analytics & Behavioural Patterns</p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Large Trend Visualization */}
        <div className="md:col-span-8 bg-surface-container-low rounded-lg p-8 relative overflow-hidden flex flex-col justify-between min-h-[400px]">
          <div>
            <div className="flex justify-between items-start mb-8">
              <div>
                <h2 className="text-xl font-headline font-semibold text-primary mb-1">Weekly Momentum</h2>
                <p className="text-on-surface-variant text-sm">Aggregated daily spend vs. previous week</p>
              </div>
              <div className="flex gap-2">
                <span className="px-3 py-1 bg-surface-container-high rounded-full text-xs text-primary font-medium">Daily</span>
                <span className="px-3 py-1 bg-primary text-on-primary rounded-full text-xs font-medium">Weekly</span>
              </div>
            </div>
            <div className="relative w-full h-48 mt-4">
              <svg className="w-full h-full" viewBox="0 0 800 200">
                <line stroke="#102645" strokeWidth="1" x1="0" x2="800" y1="50" y2="50" />
                <line stroke="#102645" strokeWidth="1" x1="0" x2="800" y1="100" y2="100" />
                <line stroke="#102645" strokeWidth="1" x1="0" x2="800" y1="150" y2="150" />
                <defs>
                  <linearGradient id="line-grad" x1="0%" x2="0%" y1="0%" y2="100%">
                    <stop offset="0%" stopColor="#58f5d1" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#58f5d1" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d="M0,160 L133,140 L266,170 L399,80 L532,100 L665,40 L800,60 L800,200 L0,200 Z" fill="url(#line-grad)" />
                <path d="M0,160 L133,140 L266,170 L399,80 L532,100 L665,40 L800,60" fill="none" stroke="#58f5d1" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
                <circle cx="399" cy="80" fill="#58f5d1" r="4" className="animate-pulse" />
                <circle cx="665" cy="40" fill="#58f5d1" r="4" />
              </svg>
              <div className="flex justify-between mt-4 text-[10px] text-on-surface-variant font-medium tracking-widest uppercase">
                <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-outline-variant/10 grid grid-cols-3 gap-4">
            <InsightStat label="Avg Daily" value="₹142.50" />
            <InsightStat label="Peak Day" value="Friday" valueColor="text-tertiary" />
            <InsightStat label="Variance" value="+12.4%" valueColor="text-error" />
          </div>
        </div>

        {/* Dominant Category */}
        <div className="md:col-span-4 glass-card rounded-lg p-6 flex flex-col justify-between border border-primary/5">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-primary-container/10 flex items-center justify-center mb-6">
              <Utensils size={30} className="text-primary" />
            </div>
            <h3 className="text-on-surface-variant text-xs uppercase tracking-[0.2em] mb-2 font-medium">Dominant Category</h3>
            <p className="text-2xl font-headline font-bold text-on-surface mb-4 leading-tight">Groceries dominate your monthly expenses</p>
            <p className="text-on-surface-variant text-sm leading-relaxed">34% of your total outgoings are linked to supermarket chains, specifically on Tuesday mornings.</p>
          </div>
          <div className="mt-6">
            <div className="w-full h-1.5 bg-surface-container rounded-full overflow-hidden">
              <div className="h-full bg-primary w-[34%]" />
            </div>
            <div className="flex justify-between mt-2 text-xs font-medium">
              <span className="text-primary">₹2,440.00</span>
              <span className="text-on-surface-variant">Total Spent</span>
            </div>
          </div>
        </div>

        {/* Weekend Surge */}
        <div className="md:col-span-4 bg-surface-container-high rounded-lg p-6 flex flex-col items-center justify-center text-center relative overflow-hidden group hover:bg-surface-container-highest transition-colors duration-500">
          <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity">
            <img 
              src="https://picsum.photos/seed/city/800/600?grayscale" 
              alt="City" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="relative z-10">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-tertiary/10 text-tertiary mb-4">
              <Sparkles size={36} />
            </div>
            <h3 className="text-xl font-headline font-bold text-on-surface mb-2">Weekend Surge</h3>
            <p className="text-on-surface-variant text-sm px-4">You spend more on weekends—typically 45% more than your weekday average.</p>
          </div>
        </div>

        {/* Top spending category */}
        <div className="md:col-span-4 bg-surface-container-low rounded-lg p-6 border-l-4 border-primary/30">
          <div className="flex items-start justify-between mb-4">
            <div className="space-y-1">
              <h4 className="text-on-surface-variant text-xs uppercase tracking-widest">Top spending category</h4>
              <p className="text-2xl font-headline font-bold">Tech & Gear</p>
            </div>
            <Smartphone size={24} className="text-primary-dim" />
          </div>
          <div className="flex -space-x-2 overflow-hidden">
            {[1, 2].map(i => (
              <img 
                key={i}
                src={`https://picsum.photos/seed/tech${i}/100/100`} 
                alt="Tech" 
                className="inline-block h-8 w-8 rounded-full ring-2 ring-surface-container-low"
                referrerPolicy="no-referrer"
              />
            ))}
          </div>
        </div>

        {/* Saving Velocity */}
        <div className="md:col-span-4 bg-surface-container rounded-lg p-6 flex flex-col justify-center overflow-hidden">
          <div className="space-y-4">
            <h3 className="text-lg font-headline font-semibold text-on-surface">Saving Velocity</h3>
            <p className="text-on-surface-variant text-sm">Your "discretionary" spending has slowed by 8% this month.</p>
            <div className="relative w-32 h-32 mx-auto mt-6">
              <svg className="w-full h-full transform -rotate-90">
                <circle className="text-surface-container-high" cx="64" cy="64" fill="transparent" r="58" stroke="currentColor" strokeWidth="8" />
                <circle className="text-primary drop-shadow-[0_0_8px_rgba(88,245,209,0.5)]" cx="64" cy="64" fill="transparent" r="58" stroke="currentColor" strokeDasharray="364.4" strokeDashoffset="100.3" strokeWidth="8" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-xl font-headline font-bold">72%</span>
                <span className="text-[8px] uppercase tracking-widest text-on-surface-variant">Efficiency</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Expense Heatmap */}
      <section className="mt-16 mb-20">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-headline font-bold">Expense Heatmap</h2>
            <p className="text-on-surface-variant">Visualizing your spending frequency over 24 hours</p>
          </div>
          <div className="flex gap-4 text-[10px] font-bold tracking-widest uppercase">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-surface-container-high"></span>
              <span className="text-on-surface-variant">Low</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary"></span>
              <span className="text-primary">High</span>
            </div>
          </div>
        </div>
        <div className="bg-surface-container-low rounded-lg p-8">
          <div className="grid grid-cols-12 gap-2 h-48 items-end">
            {[
              { h: 10, label: 'Night', color: 'bg-surface-container-highest/30' },
              { h: 5, label: 'Night', color: 'bg-surface-container-highest/30' },
              { h: 15, label: 'Morning', color: 'bg-tertiary/40' },
              { h: 40, label: 'Morning', color: 'bg-tertiary/60' },
              { h: 65, label: 'Morning', color: 'bg-tertiary' },
              { h: 95, label: 'Afternoon', color: 'bg-primary shadow-[0_0_15px_rgba(88,245,209,0.4)]' },
              { h: 80, label: 'Afternoon', color: 'bg-primary' },
              { h: 50, label: 'Afternoon', color: 'bg-primary/70' },
              { h: 60, label: 'Evening', color: 'bg-secondary' },
              { h: 85, label: 'Evening', color: 'bg-secondary shadow-[0_0_15px_rgba(196,212,251,0.3)]' },
              { h: 20, label: 'Evening', color: 'bg-secondary/50' },
              { h: 10, label: 'Night', color: 'bg-surface-container-highest/30' }
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center justify-end h-full gap-3 group">
                <div 
                  className={cn(
                    "w-full rounded-sm transition-all duration-500 group-hover:scale-x-110",
                    item.color
                  )}
                  style={{ height: `${item.h}%` }}
                />
                <span className="text-[8px] font-bold text-on-surface-variant opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-tighter shrink-0">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-6 text-[10px] uppercase tracking-[0.2em] text-on-surface-variant font-medium border-t border-outline-variant/10 pt-4">
            <span>12 AM</span>
            <span>4 AM</span>
            <span>8 AM</span>
            <span>12 PM</span>
            <span>4 PM</span>
            <span>8 PM</span>
            <span>11 PM</span>
          </div>
        </div>
      </section>
    </div>
  );
}

function InsightStat({ label, value, valueColor = "text-on-surface" }: any) {
  return (
    <div>
      <p className="text-[10px] text-on-surface-variant uppercase tracking-widest mb-1">{label}</p>
      <p className={cn("text-2xl font-headline font-bold", valueColor)}>{value}</p>
    </div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
