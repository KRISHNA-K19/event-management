"use client";

import { useState, useEffect } from 'react';
import { Bell, Search, UserCircle } from 'lucide-react';
import { createClientSupabase } from '@repo/lib/supabase/client';

export default function TopNav() {
  const [userName, setUserName] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const supabase = createClientSupabase();
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserName(user.user_metadata?.full_name || 'Admin User');
        setUserEmail(user.email ?? 'admin@clubhub.tech');
      }
    };
    fetchUser();
  }, []);

  return (
    <header className="h-20 flex-shrink-0 border-b border-white/10 bg-black/20 backdrop-blur-xl z-20 flex items-center justify-between px-8">
      {/* Search Bar */}
      <div className="flex-1 max-w-md hidden md:flex">
        <div className="relative w-full group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-slate-400 group-focus-within:text-cyan-400 transition-colors" />
          </div>
          <input 
            type="text" 
            placeholder="Search across dashboard..." 
            className="w-full bg-slate-900/50 border border-white/10 rounded-full py-2 pl-10 pr-4 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all shadow-inner"
          />
        </div>
      </div>

      {/* Right side Profile actions */}
      <div className="flex items-center gap-6 ml-auto">
        <button className="relative text-slate-400 hover:text-white transition-colors">
          <Bell size={22} className="hover:animate-[shake_0.5s_ease-in-out]" />
          <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-cyan-500 rounded-full border-2 border-slate-900 shadow-[0_0_10px_rgba(6,182,212,0.8)]"></span>
        </button>
        
        <div className="h-8 w-px bg-white/10"></div>
        
        <button className="flex items-center gap-3 group">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">{userName || 'Loading...'}</p>
            <p className="text-xs text-slate-400">{userEmail}</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 p-[2px] shadow-[0_0_15px_rgba(37,99,235,0.4)] transition-transform group-hover:scale-105">
            <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center">
              <UserCircle size={24} className="text-cyan-400" />
            </div>
          </div>
        </button>
      </div>
    </header>
  );
}
