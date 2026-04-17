"use client";

import { Button } from '../../components/Button';
import { useState } from 'react';

export default function ApplyPage() {
  const [formData, setFormData] = useState({ name: '', email: '', department: '', reason: '' });
  const [status, setStatus] = useState<null | 'success' | 'error'>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if(formData.name && formData.email) setStatus('success');
    else setStatus('error');
  };

  return (
    <main className="min-h-screen pb-20">
      <div className="container mx-auto px-6 pt-24 max-w-3xl">
        <div className="glass-container relative overflow-hidden animate-float">
          {/* Decorative background glow */}
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-blue-500/20 blur-[80px]"></div>
          <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 rounded-full bg-purple-500/20 blur-[80px]"></div>
          
          <h1 className="text-4xl md:text-5xl font-black mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 drop-shadow-md text-center">
            Join The Club
          </h1>
          <p className="text-blue-100/70 text-center mb-8 font-light">Fill out your details below to submit your primary membership application.</p>
          
          <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-blue-200 uppercase tracking-widest pl-1">Full Name</label>
                <input required type="text" placeholder="John Doe" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-blue-100/30 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all backdrop-blur-md" 
                  onChange={e => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-blue-200 uppercase tracking-widest pl-1">Email Address</label>
                <input required type="email" placeholder="john@example.com" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-blue-100/30 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all backdrop-blur-md" 
                  onChange={e => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-blue-200 uppercase tracking-widest pl-1">Department / Role</label>
              <input type="text" placeholder="Design / Engineering / Marketing" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-blue-100/30 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all backdrop-blur-md" 
                onChange={e => setFormData({...formData, department: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-blue-200 uppercase tracking-widest pl-1">Why do you want to join?</label>
              <textarea required rows={4} placeholder="I want to contribute my skills to..." className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-blue-100/30 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all backdrop-blur-md resize-none" 
                onChange={e => setFormData({...formData, reason: e.target.value})}
              ></textarea>
            </div>

            {status === 'success' && <div className="p-4 bg-green-500/20 border border-green-500/50 rounded-xl text-green-200 text-center">Application submitted successfully! We'll be in touch.</div>}
            {status === 'error' && <div className="p-4 bg-red-500/20 border border-red-500/50 rounded-xl text-red-200 text-center">Please fill out all required fields.</div>}

            <div className="pt-4 text-center">
              <Button type="submit" size="lg" className="w-full md:w-1/2 bg-gradient-to-r from-blue-600 to-cyan-600 shadow-xl shadow-blue-500/30 text-white font-bold tracking-wide">
                Submit Application
              </Button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
