import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, AlertTriangle, Lightbulb, PiggyBank, Calendar, Zap, Award } from 'lucide-react';

export default function Forecast() {
  return (
    <div className="space-y-10">
      <section className="space-y-6">
        <div className="flex flex-col gap-2">
          <span className="text-primary text-xs font-medium uppercase tracking-[0.2em]">Predictive Engine v2.4</span>
          <h2 className="text-4xl md:text-6xl font-headline font-bold leading-tight">Your Financial <br/><span className="text-primary-container">Next Week.</span></h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-surface-container-low p-8 rounded-lg relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
              <Sparkles size={80} />
            </div>
            <p className="text-on-surface-variant text-sm mb-2">Expected spending next week</p>
            <div className="flex items-baseline gap-2">
              <h3 className="text-5xl font-headline font-bold text-on-surface">₹4,500</h3>
              <TrendingUp size={24} className="text-error" />
            </div>
            <div className="mt-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              <span className="text-xs text-on-surface-variant">ML Model: 94% Confidence</span>
            </div>
          </div>

          <div className="bg-surface-container-high p-8 rounded-lg flex flex-col justify-between border-l-4 border-error-dim">
            <div>
              <p className="text-error-dim text-xs font-bold uppercase tracking-widest mb-2">High Risk Alert</p>
              <h4 className="text-2xl font-headline font-medium text-on-surface">Likely to overspend on <span className="text-error">entertainment</span></h4>
            </div>
            <p className="text-on-surface-variant text-sm mt-4">Predicted 24% increase based on historical weekend patterns.</p>
          </div>
        </div>
      </section>

      {/* Trend Graph */}
      <section className="bg-surface-container-low rounded-lg p-8 relative overflow-hidden">
        <div className="flex justify-between items-end mb-10">
          <div className="space-y-1">
            <h3 className="text-xl font-headline font-bold">Spending Forecast</h3>
            <p className="text-on-surface-variant text-sm">Actual vs. Projected Momentum</p>
          </div>
          <div className="flex gap-4 text-xs font-medium">
            <div className="flex items-center gap-2">
              <span className="w-3 h-0.5 bg-outline-variant"></span>
              <span className="text-on-surface-variant">Past</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-0.5 bg-primary border-t border-dashed border-primary"></span>
              <span className="text-primary">Forecast</span>
            </div>
          </div>
        </div>
        <div className="relative h-64 w-full">
          <svg className="w-full h-full" viewBox="0 0 1000 300">
            <line stroke="#3b4861" strokeDasharray="4" strokeWidth="0.5" x1="0" x2="1000" y1="50" y2="50" />
            <line stroke="#3b4861" strokeDasharray="4" strokeWidth="0.5" x1="0" x2="1000" y1="150" y2="150" />
            <line stroke="#3b4861" strokeDasharray="4" strokeWidth="0.5" x1="0" x2="1000" y1="250" y2="250" />
            <defs>
              <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#58f5d1" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#58f5d1" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d="M0,220 Q100,240 200,180 T400,200 T600,140" fill="none" stroke="#687690" strokeWidth="3" />
            <path d="M600,140 Q700,120 800,160 T1000,80" fill="none" stroke="#58f5d1" strokeDasharray="8 4" strokeWidth="4" />
            <path d="M600,140 Q700,120 800,160 T1000,80 L1000,300 L600,300 Z" fill="url(#chartGradient)" />
            <circle cx="600" cy="140" fill="#58f5d1" r="6" />
          </svg>
          <div className="absolute top-4 right-10 flex flex-col items-end gap-2">
            <div className="bg-surface-container-highest px-3 py-1 rounded-full flex items-center gap-2 shadow-lg border border-primary/20">
              <TrendingUp size={14} className="text-primary" />
              <span className="text-xs font-bold">+12.5%</span>
            </div>
          </div>
        </div>
        <div className="flex justify-between mt-4 text-[10px] text-on-surface-variant font-medium uppercase tracking-widest">
          <span>Mon</span><span>Wed</span><span>Fri</span><span className="text-primary font-bold">Today</span><span>Sun</span><span>Tue</span><span>Thu</span>
        </div>
      </section>

      {/* Smart Alerts */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-headline font-bold">Smart Alerts</h3>
          <span className="text-primary text-xs font-medium px-3 py-1 bg-primary/10 rounded-full">2 Active</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AlertItem 
            icon={AlertTriangle} 
            title="Subscription Spike" 
            time="NOW" 
            description="Unusually high recurring charge detected from Cloud Services. ₹2,200 higher than average."
            action="REVIEW TRANSACTION"
            type="error"
          />
          <AlertItem 
            icon={Lightbulb} 
            title="Budget Drift" 
            time="2H AGO" 
            description="At your current pace, you'll exceed your Dining Out budget by Wednesday."
            action="ADJUST LIMIT"
            type="tertiary"
          />
        </div>
      </section>

      {/* Predictive Insights Grid */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 pb-12">
        <StatCard icon={PiggyBank} label="Projected Savings" value="₹12,400" />
        <StatCard icon={Calendar} label="Next Bill Due" value="2 Days" />
        <StatCard icon={Zap} label="Spend Velocity" value="Fast" valueColor="text-error" />
        <StatCard icon={Award} label="Goal On-Track" value="88%" valueColor="text-primary" />
      </section>
    </div>
  );
}

function AlertItem({ icon: Icon, title, time, description, action, type }: any) {
  const colors = {
    error: "bg-error-dim/20 text-error",
    tertiary: "bg-tertiary-container/10 text-tertiary"
  };
  return (
    <div className="group bg-surface-container-low rounded-lg p-6 flex gap-5 hover:bg-surface-container-high transition-all">
      <div className={cn("flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center relative", colors[type as keyof typeof colors])}>
        <Icon size={24} />
        {type === 'error' && <span className="absolute -top-1 -right-1 w-3 h-3 bg-error rounded-full animate-pulse"></span>}
      </div>
      <div className="space-y-1 flex-grow">
        <div className="flex justify-between items-start">
          <h5 className="font-bold text-on-surface">{title}</h5>
          <span className="text-[10px] text-on-surface-variant font-medium">{time}</span>
        </div>
        <p className="text-sm text-on-surface-variant leading-relaxed">{description}</p>
        <div className="pt-3">
          <button className={cn("text-xs font-bold hover:underline", type === 'error' ? "text-error" : "text-tertiary")}>{action}</button>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, valueColor = "text-on-surface" }: any) {
  return (
    <div className="bg-surface-container-low p-6 rounded-lg text-center space-y-2 border-b-2 border-transparent hover:border-primary transition-all">
      <Icon size={20} className="mx-auto text-on-surface-variant" />
      <p className="text-[10px] text-on-surface-variant font-medium uppercase tracking-tighter">{label}</p>
      <h6 className={cn("text-xl font-headline font-bold", valueColor)}>{value}</h6>
    </div>
  );
}

import { TrendingUp } from 'lucide-react';

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
