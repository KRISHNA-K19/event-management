"use client";

import { useState } from 'react';
import { Button } from '../../components/Button';
import { createClientSupabase } from '@repo/lib/supabase/client';
import { Lock, Mail } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (email !== 'krishnamoorthyk.cse@gmail.com') {
      setError('Access denied. Only authorized admin can log in.');
      setLoading(false);
      return;
    }

    const supabase = createClientSupabase();
    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
    } else {
      // Set the dummy cookie for middleware visibility if needed, 
      // but Supabase cookies are handled automatically by createBrowserClient.
      document.cookie = "admin_session=true; path=/; max-age=86400; SameSite=Strict";
      window.location.href = "/";
    }
  };

  return (
    <div className="w-full max-w-md animate-float">
      <div className="relative rounded-2xl border border-white/10 bg-slate-900/40 backdrop-blur-xl p-8 overflow-hidden shadow-[0_25px_50px_rgba(0,0,0,0.5)] shadow-blue-500/20">
        <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/20 rounded-full blur-[60px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-600/20 rounded-full blur-[60px] pointer-events-none"></div>
        
        <div className="relative z-10">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-black bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent drop-shadow-md mb-2">
              Admin Login
            </h1>
            <p className="text-slate-400 text-sm">Secure authorization gateway.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <div className="text-red-400 text-xs font-semibold bg-red-500/10 border border-red-500/20 p-3 rounded-lg text-center animate-pulse">
                {error}
              </div>
            )}
            
            <div className="space-y-2 relative group">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-widest pl-1">Email Address</label>
              <div className="relative">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@clubhub.tech" 
                  className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 pl-11 text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none backdrop-blur-md transition-colors" 
                  required
                />
                <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-cyan-400 transition-colors" />
              </div>
            </div>

            <div className="space-y-2 relative group">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-widest pl-1">Password</label>
              <div className="relative">
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••" 
                  className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 pl-11 text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none backdrop-blur-md transition-colors" 
                  required
                />
                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-cyan-400 transition-colors" />
              </div>
            </div>

            <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 mt-4 shadow-[0_0_15px_rgba(37,99,235,0.3)]">
              {loading ? 'Authenticating...' : 'Sign In'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
