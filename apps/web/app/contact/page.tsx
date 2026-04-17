"use client";

import { Button } from '../../components/Button';
import { useState } from 'react';
import { createClientSupabase } from '@repo/lib/supabase/client';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const supabase = createClientSupabase();
    
    const { error } = await supabase.from('contacts').insert([
      { 
        name: formData.name, 
        email: formData.email, 
        message: formData.message,
        created_at: new Date().toISOString()
      }
    ]);

    if (!error) {
      setSent(true);
      setFormData({ name: '', email: '', message: '' });
    } else {
      alert('Error sending message: ' + error.message);
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white selection:bg-cyan-500/30 pb-20">
      <div className="container mx-auto px-6 pt-24 max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none -z-10"></div>
        {/* Left Side: Contact Info */}
        <div className="space-y-6">
          <h1 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 drop-shadow-md tracking-tighter">
            Get in Touch
          </h1>
          <p className="text-lg text-blue-100/80 leading-relaxed font-light">
            Have a question, feedback, or just want to say hi? We'd love to hear from you. Fill out the form and our team will get back to you promptly.
          </p>
          <div className="flex flex-col space-y-4 pt-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 glass-container rounded-full text-cyan-400 border-cyan-500/30 shadow-lg shadow-cyan-500/10">
                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
              </div>
              <span className="text-blue-100 font-medium tracking-tight">krishnamoorthyk.cse@gmail.com</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="p-3 glass-container rounded-full text-purple-400 border-purple-500/30 shadow-lg shadow-purple-500/10">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
              </div>
              <span className="text-blue-100 font-medium tracking-tight">@ClubHubOfficial</span>
            </div>
          </div>
        </div>

        {/* Right Side: Contact Form */}
        <div className="glass-container relative overflow-hidden p-8 border-white/10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.6)] animate-fadeIn">
          <form className="relative z-10 space-y-5" onSubmit={handleSubmit}>
            <div className="space-y-1 group">
              <label className="text-[10px] font-black text-blue-300 uppercase tracking-widest pl-1 group-focus-within:text-cyan-400 transition-colors">Your Name</label>
              <input 
                required 
                type="text" 
                placeholder="Jane Doe" 
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-blue-100/20 outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all backdrop-blur-md" 
              />
            </div>
            <div className="space-y-1 group">
              <label className="text-[10px] font-black text-blue-300 uppercase tracking-widest pl-1 group-focus-within:text-cyan-400 transition-colors">Email Address</label>
              <input 
                required 
                type="email" 
                placeholder="jane@example.com" 
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-blue-100/20 outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all backdrop-blur-md" 
              />
            </div>
            <div className="space-y-1 group">
              <label className="text-[10px] font-black text-blue-300 uppercase tracking-widest pl-1 group-focus-within:text-cyan-400 transition-colors">Message Context</label>
              <textarea 
                required 
                rows={4} 
                placeholder="How can we help today?" 
                value={formData.message}
                onChange={e => setFormData({...formData, message: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-blue-100/20 outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all backdrop-blur-md resize-none"
              ></textarea>
            </div>
            
            {sent && <div className="p-3 bg-green-500/20 border border-green-500/50 rounded-xl text-green-200 text-xs font-bold text-center animate-[shake_0.8s_ease-out]">✓ Success! Message synchronized.</div>}

            <div className="pt-2">
              <Button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-purple-600 to-cyan-500 shadow-xl shadow-purple-500/30 py-4 font-black uppercase tracking-widest text-xs">
                {loading ? 'Transmitting...' : 'Send Message'}
              </Button>
            </div>
          </form>
        </div>

      </div>
    </main>
  );
}
