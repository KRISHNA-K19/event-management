"use client";

import { Button } from '../../components/Button';
import { useEffect, useState } from 'react';
import { createClientSupabase } from '@repo/lib/supabase/client';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const supabase = createClientSupabase();

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        setUser(user);
      } else {
        router.push('/login');
      }
      setLoading(false);
    });
  }, [router, supabase.auth]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
      </main>
    );
  }

  const fullName = user?.user_metadata?.full_name || 'Member';
  const email = user?.email || '';
  const initials = fullName.slice(0, 2).toUpperCase();

  return (
    <main className="min-h-screen bg-slate-950 text-white selection:bg-cyan-500/30 pb-20">
      
      <div className="container mx-auto px-6 pt-32 max-w-4xl relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] -mr-48 -mt-48 pointer-events-none -z-10"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-600/10 rounded-full blur-[100px] -ml-48 -mb-48 pointer-events-none -z-10"></div>

        <div className="flex flex-col gap-10">
          <div className="space-y-4">
            <h1 className="text-5xl font-black bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent tracking-tighter">
              Account Overview
            </h1>
            <p className="text-slate-400 font-medium">Your global ClubHub identity and membership details.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Identity Card */}
            <div className="md:col-span-1 glass-container p-8 text-center flex flex-col items-center justify-center space-y-6 hover:border-blue-500/40 transition-colors duration-500">
              <div className="relative">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-600 to-cyan-400 p-1">
                  <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center text-4xl font-black text-white">
                    {initials}
                  </div>
                </div>
                <div className="absolute bottom-1 right-1 w-6 h-6 bg-green-500 rounded-full border-4 border-slate-950 shadow-[0_0_15px_rgba(34,197,94,0.5)]"></div>
              </div>
              
              <div>
                <h2 className="text-2xl font-bold text-white tracking-tight">{fullName}</h2>
                <span className="text-[10px] font-black text-cyan-400 bg-cyan-500/10 px-4 py-1 rounded-full border border-cyan-500/20 uppercase tracking-widest mt-2 inline-block shadow-sm">
                  Verified Member
                </span>
              </div>
              
              <div className="w-full pt-6 border-t border-white/5">
                <Button 
                  variant="ghost" 
                  onClick={handleLogout} 
                  className="w-full text-slate-400 hover:text-red-400 hover:bg-red-500/10 border-white/5 font-bold tracking-tight py-3"
                >
                  Sign Out Account
                </Button>
              </div>
            </div>

            {/* Account Details */}
            <div className="md:col-span-2 glass-container p-10 flex flex-col justify-between">
              <div className="space-y-12">
                <div className="grid grid-cols-1 gap-12">
                  <div className="space-y-2 group">
                    <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[.25em] pl-1 group-hover:text-blue-400 transition-colors">Full Identity Name</h4>
                    <p className="text-2xl font-bold text-white border-b border-white/5 pb-4 group-hover:border-blue-500/30 transition-all">{fullName}</p>
                  </div>
                  
                  <div className="space-y-2 group">
                    <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[.25em] pl-1 group-hover:text-blue-400 transition-colors">Primary Email Address</h4>
                    <p className="text-2xl font-medium text-slate-300 border-b border-white/5 pb-4 group-hover:border-blue-500/30 transition-all font-mono">{email}</p>
                  </div>
                </div>
              </div>

              <div className="mt-12 bg-white/5 rounded-2xl p-6 border border-white/5 flex items-start gap-4">
                <div className="p-3 bg-blue-500/10 rounded-xl">
                  <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Your identity is managed by your university authentication provider. 
                  To change your details, please update your account in the official university portal.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}
