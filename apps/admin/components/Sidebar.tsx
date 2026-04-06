"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Calendar, Users, Mail, Image as ImageIcon, CheckSquare, LogOut } from 'lucide-react';
import { SITE_NAME } from '@repo/lib/utils/constants';
import { createClientSupabase } from '@repo/lib/supabase/client';

export default function Sidebar() {
  const pathname = usePathname();

  const handleLogout = async () => {
    const supabase = createClientSupabase();
    await supabase.auth.signOut();
    document.cookie = "admin_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    window.location.href = "/login";
  };

  const navItems = [
    { name: 'Overview', href: '/', icon: LayoutDashboard },
    { name: 'Events', href: '/events/manage', icon: Calendar },
    { name: 'Applications', href: '/applications', icon: CheckSquare },
    { name: 'Contacts', href: '/contacts', icon: Mail },
    { name: 'Gallery', href: '/gallery', icon: ImageIcon },
  ];

  return (
    <aside className="w-64 flex-shrink-0 hidden md:flex flex-col border-r border-white/10 bg-black/40 backdrop-blur-2xl z-20 h-full">
      <div className="h-20 flex items-center px-8 border-b border-white/10">
        <span className="text-2xl font-black bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent drop-shadow-md">
          {SITE_NAME || 'ClubHub'}
        </span>
      </div>
      
      <div className="flex-1 py-8 px-4 flex flex-col gap-2 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== '/');
          const Icon = item.icon;
          
          return (
            <Link key={item.name} href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group
                ${isActive 
                  ? 'bg-blue-600/20 text-cyan-400 shadow-[0_0_15px_rgba(37,99,235,0.2)] border border-blue-500/30' 
                  : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/5'
                }`}
            >
              <Icon size={20} className={`transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110 group-hover:text-cyan-300'}`} />
              <span className="font-semibold">{item.name}</span>
            </Link>
          );
        })}
      </div>

      <div className="p-4 border-t border-white/10">
        <button 
          onClick={handleLogout}
          className="flex w-full items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors group"
        >
          <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="font-semibold">Log Out</span>
        </button>
      </div>
    </aside>
  );
}
