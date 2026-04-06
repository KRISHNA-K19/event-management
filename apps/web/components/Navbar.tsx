"use client";

import Link from 'next/link';
import { Button } from './Button';
import { SITE_NAME } from '@repo/lib/utils/constants';
import { useEffect, useState } from 'react';
import { createClientSupabase } from '@repo/lib/supabase/client';

export default function Navbar() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const supabase = createClientSupabase();
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <nav className={`glass backdrop-blur-xl border-b border-white/10 shadow-lg sticky top-0 z-50 bg-slate-900/40 p-4`}>
      <div className={`container mx-auto flex justify-between items-center`}>
        <Link href="/" className="text-2xl font-black bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent hover:animate-pulse transition-all duration-300 drop-shadow-[0_0_10px_rgba(56,189,248,0.5)]">
          {SITE_NAME}
        </Link>
        <div className="flex space-x-2">
          <Link href="/about"><Button size="sm" variant="ghost">About</Button></Link>
          <Link href="/events"><Button size="sm">Events</Button></Link>
          <Link href="/contact"><Button size="sm">Contact</Button></Link>
          {user ? (
            <Link href="/profile"><Button size="sm">Profile</Button></Link>
          ) : (
            <Link href="/login"><Button size="sm">Login</Button></Link>
          )}
        </div>
      </div>
    </nav>
  );
}
