import React from 'react';
import { motion } from 'motion/react';
import { MapPin, CreditCard, PlusCircle, Shield, LogOut } from 'lucide-react';

export default function Profile() {
  return (
    <div className="space-y-12">
      <section>
        <span className="text-on-surface-variant font-medium text-[10px] uppercase tracking-[0.2em] mb-2 block">Account Settings</span>
        <h2 className="font-headline text-5xl font-bold tracking-tighter text-on-surface mb-4">Switch Persona</h2>
        <p className="text-on-surface-variant max-w-md leading-relaxed">Select a profile to tailor your financial insights and card management experience.</p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Persona 1: Active */}
        <div className="group relative overflow-hidden rounded-lg bg-surface-container-high border-2 border-primary shadow-[0_0_40px_rgba(88,245,209,0.1)] transition-all duration-500 hover:translate-y-[-4px]">
          <div className="absolute top-4 right-4 z-10">
            <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
              Active
            </div>
          </div>
          <div className="p-8 flex flex-col h-full">
            <div className="flex items-start justify-between mb-12">
              <div className="space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary-container p-[2px]">
                  <div className="w-full h-full rounded-2xl bg-surface-container-high flex items-center justify-center overflow-hidden">
                    <img src="https://picsum.photos/seed/mumbai/200/200" alt="F" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                </div>
                <div>
                  <h3 className="font-headline text-3xl font-bold">F</h3>
                  <div className="flex items-center gap-2 text-on-surface-variant">
                    <MapPin size={14} />
                    <span className="text-sm font-medium tracking-tight">Mumbai, MH</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-auto">
              <div className="relative w-full aspect-[1.586/1] rounded-xl bg-gradient-to-br from-[#FFD700] via-[#E2B13C] to-[#8C6239] p-6 overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
                <div className="flex flex-col h-full justify-between">
                  <div className="flex justify-between items-start">
                    <span className="font-headline font-bold text-on-primary-container/80 tracking-widest">GOLD CARD</span>
                    <CreditCard size={20} className="text-on-primary-container/60" />
                  </div>
                  <div>
                    <div className="text-on-primary-container font-mono text-xl tracking-[0.2em] mb-4">•••• •••• •••• 8812</div>
                    <div className="flex justify-between items-end text-on-primary-container/70">
                      <div>
                        <p className="text-[8px] uppercase tracking-widest font-bold">Card Holder</p>
                        <p className="text-xs font-semibold">F. DESAI</p>
                      </div>
                      <div className="w-12 h-8 bg-white/20 rounded-md backdrop-blur-sm"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Persona 2 */}
        <div className="group relative overflow-hidden rounded-lg bg-surface-container-low hover:bg-surface-container-high transition-all duration-500 cursor-pointer hover:translate-y-[-4px]">
          <div className="p-8 flex flex-col h-full">
            <div className="flex items-start justify-between mb-12">
              <div className="space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-surface-container-highest flex items-center justify-center overflow-hidden">
                  <img src="https://picsum.photos/seed/hyderabad/200/200" alt="M" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <div>
                  <h3 className="font-headline text-3xl font-bold opacity-60 group-hover:opacity-100 transition-opacity">M</h3>
                  <div className="flex items-center gap-2 text-on-surface-variant">
                    <MapPin size={14} />
                    <span className="text-sm font-medium tracking-tight">Hyderabad, TS</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-auto">
              <div className="relative w-full aspect-[1.586/1] rounded-xl bg-gradient-to-br from-[#BCC6CC] via-[#989EA3] to-[#71797E] p-6 overflow-hidden opacity-40 group-hover:opacity-100 transition-all duration-500">
                <div className="flex flex-col h-full justify-between">
                  <div className="flex justify-between items-start">
                    <span className="font-headline font-bold text-surface-container-low/80 tracking-widest uppercase">Silver Card</span>
                    <CreditCard size={20} className="text-surface-container-low/60" />
                  </div>
                  <div>
                    <div className="text-surface-container-low font-mono text-xl tracking-[0.2em] mb-4">•••• •••• •••• 4409</div>
                    <div className="flex justify-between items-end text-surface-container-low/70">
                      <div>
                        <p className="text-[8px] uppercase tracking-widest font-bold">Card Holder</p>
                        <p className="text-xs font-semibold uppercase">M. Reddy</p>
                      </div>
                      <div className="w-12 h-8 bg-black/10 rounded-md backdrop-blur-sm"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Secondary Actions */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ActionCard icon={PlusCircle} title="Add Persona" description="Create a new profile for a family member or business." />
        <ActionCard icon={Shield} title="Privacy Mode" description="Obfuscate balances when switching between users." />
        <ActionCard icon={LogOut} title="Session Logout" description="Securely sign out of all active persona sessions." />
      </section>
    </div>
  );
}

function ActionCard({ icon: Icon, title, description }: any) {
  return (
    <div className="p-6 rounded-lg bg-surface-container-low hover:bg-surface-container-high transition-colors group cursor-pointer">
      <Icon size={30} className="text-primary mb-4" />
      <h4 className="font-headline font-bold text-xl mb-1">{title}</h4>
      <p className="text-sm text-on-surface-variant">{description}</p>
    </div>
  );
}
