"use client";

import Link from "next/link";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { Calendar, Users, Mail, Image as ImageIcon, BarChart3, TrendingUp, Activity, CheckSquare } from "lucide-react";

import { useEffect, useState } from "react";
import { createClientSupabase } from "@repo/lib/supabase/client";

export default function AdminHomePage() {
  const [stats, setStats] = useState({ events: 0, members: 0, applications: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      const supabase = createClientSupabase();
      
      const { count: eventCount } = await supabase.from('events').select('*', { count: 'exact', head: true });
      const { count: appCount } = await supabase.from('applications').select('*', { count: 'exact', head: true });
      const { count: memberCount } = await supabase.from('profiles').select('*', { count: 'exact', head: true });
      
      setStats({
        events: eventCount || 0,
        members: memberCount || 0,
        applications: appCount || 0
      });
      setLoading(false);
    };
    fetchStats();
  }, []);

  return (
    <div className="space-y-8 pb-10">
      
      {/* Header */}
      <div className="flex justify-between items-end relative">
        <div className="absolute -top-10 -left-10 w-64 h-64 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none -z-10"></div>
        <div>
          <h1 className="text-4xl font-black mb-2 text-white drop-shadow-md bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
            Admin Overview
          </h1>
          <p className="text-slate-400 font-medium">Monitoring ClubHub performance and student engagement.</p>
        </div>
        <div className="hidden md:flex gap-4">
          <div className="text-right">
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">System Status</p>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]"></span>
              <span className="text-xs font-bold text-green-400">OPERATIONAL</span>
            </div>
          </div>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card glow className="group border-blue-500/20">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 rounded-xl bg-blue-500/20 text-blue-400 group-hover:scale-110 transition-transform shadow-lg shadow-blue-500/10"><Calendar size={20} /></div>
            <span className="text-[10px] font-black text-green-400 flex items-center bg-green-500/10 px-2 py-1 rounded-full uppercase tracking-tighter shadow-sm border border-green-500/20">Live</span>
          </div>
          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Active Events</p>
          <h3 className="text-4xl font-black text-white mt-1 drop-shadow-sm">{loading ? '...' : stats.events}</h3>
        </Card>
        
        <Card glow className="group border-purple-500/20">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 rounded-xl bg-purple-500/20 text-purple-400 group-hover:scale-110 transition-transform shadow-lg shadow-purple-500/10"><Users size={20} /></div>
            <span className="text-[10px] font-black text-green-400 flex items-center bg-green-500/10 px-2 py-1 rounded-full uppercase tracking-tighter shadow-sm border border-green-500/20">Realtime</span>
          </div>
          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Total Members</p>
          <h3 className="text-4xl font-black text-white mt-1 drop-shadow-sm">{loading ? '...' : stats.members}</h3>
        </Card>

        <Card glow className="group border-cyan-500/20">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 rounded-xl bg-cyan-500/20 text-cyan-400 group-hover:scale-110 transition-transform shadow-lg shadow-cyan-500/10"><CheckSquare size={20} /></div>
            <span className="text-[10px] font-black text-slate-400 flex items-center bg-white/5 px-2 py-1 rounded-full uppercase tracking-tighter border border-white/10 shadow-sm">Queue</span>
          </div>
          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Applications</p>
          <h3 className="text-4xl font-black text-white mt-1 drop-shadow-sm">{loading ? '...' : stats.applications}</h3>
        </Card>

        <Card glow className="group border-pink-500/20 !bg-gradient-to-br !from-pink-600/10 !via-slate-900 !to-transparent">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 rounded-xl bg-pink-500/20 text-pink-400 group-hover:scale-110 transition-transform shadow-lg shadow-pink-500/10"><Mail size={20} /></div>
            <span className="text-[10px] font-black text-white flex items-center bg-pink-500/40 px-2 py-1 rounded-full uppercase tracking-tighter shadow-[0_0_10px_rgba(236,72,153,0.3)]">Admin Info</span>
          </div>
          <p className="text-pink-200/50 text-[10px] font-bold uppercase tracking-[0.2em] mb-1">KRISHNAMOORTHY K</p>
          <div className="space-y-1">
             <p className="text-[11px] font-black text-white break-all tracking-tight">krishnamoorthyk.cse@gmail.com</p>
             <p className="text-lg font-black text-cyan-400 tracking-tighter">+91 8056500986</p>
          </div>
        </Card>
      </div>

      {/* Quick Actions Grid */}
      <div>
        <h2 className="text-xl font-bold text-white mb-4 mt-8 flex items-center gap-3">
          <BarChart3 className="text-cyan-400" size={24} />
          <span>Management Center</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link href="/events/manage" className="block">
            <Card glow className="h-full flex items-center gap-6 group hover:-translate-y-1 hover:shadow-blue-500/20 transition-all border-transparent hover:border-blue-500/50 cursor-pointer">
              <div className="p-4 rounded-xl bg-slate-800/50 text-blue-400 border border-white/5 shadow-inner"><Calendar size={32} /></div>
              <div>
                <h2 className="text-xl font-black text-white mb-1 group-hover:text-cyan-400 transition-colors tracking-tight">Events Portal</h2>
                <p className="text-slate-400 text-xs font-medium">Launch and modify club sessions</p>
              </div>
            </Card>
          </Link>
          <Link href="/applications" className="block">
            <Card glow className="h-full flex items-center gap-6 group hover:-translate-y-1 hover:shadow-purple-500/20 transition-all border-transparent hover:border-blue-500/50 cursor-pointer">
              <div className="p-4 rounded-xl bg-slate-800/50 text-purple-400 border border-white/5 shadow-inner"><CheckSquare size={32} /></div>
              <div>
                <h2 className="text-xl font-black text-white mb-1 group-hover:text-cyan-400 transition-colors tracking-tight">Admission Queue</h2>
                <p className="text-slate-400 text-xs font-medium">Review pending student requests</p>
              </div>
            </Card>
          </Link>
          <Link href="/gallery" className="block">
            <Card glow className="h-full flex items-center gap-6 group hover:-translate-y-1 hover:shadow-cyan-500/20 transition-all border-transparent hover:border-blue-500/50 cursor-pointer">
              <div className="p-4 rounded-xl bg-slate-800/50 text-cyan-400 border border-white/5 shadow-inner"><ImageIcon size={32} /></div>
              <div>
                <h2 className="text-xl font-black text-white mb-1 group-hover:text-cyan-400 transition-colors tracking-tight">Media Hub</h2>
                <p className="text-slate-400 text-xs font-medium">Manage event visual memories</p>
              </div>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
}

