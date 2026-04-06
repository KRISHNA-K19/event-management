"use client";

import { useEffect, useState } from 'react';
import { Event } from '@repo/lib/types/database';
import Link from 'next/link';
import { createClientSupabase } from '@repo/lib/supabase/client';

interface EventCardProps {
  event: Event;
}

export default function EventCard({ event }: EventCardProps) {
  const [isLogged, setIsLogged] = useState(false);
  const supabase = createClientSupabase();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsLogged(!!session);
    });
  }, []);

  return (
    <div className="glass-container p-0 hover:shadow-2xl transition-all duration-300 group relative overflow-hidden flex flex-col h-full">
      <div className="relative h-48 w-full overflow-hidden">
        {event.image_url ? (
          <img 
            src={event.image_url} 
            alt={event.title} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 blur-[1px] group-hover:blur-0"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-900/40 via-slate-900 to-cyan-900/40 flex items-center justify-center">
            <span className="text-white/20 font-black text-4xl uppercase tracking-tighter italic">ClubHub</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60"></div>
      </div>

      <div className="p-6 flex flex-col flex-1 relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-[40px] -mr-16 -mt-16 group-hover:bg-blue-500/20 transition-all duration-500 pointer-events-none"></div>

      
      <h2 className="text-2xl font-black mb-3 text-white group-hover:text-blue-300 transition-colors">{event.title}</h2>
      <p className="text-blue-100/60 mb-4 line-clamp-2 text-sm font-light leading-relaxed">{event.description}</p>
      
      <div className="flex items-center gap-2 mb-6">
        <span className="text-xs font-bold text-blue-300 uppercase tracking-widest bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
          {new Date(event.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
        </span>
      </div>

      <div className="flex gap-3">
        <Link
          href={`/events/${event.id}`}
          className="flex-1 bg-white/5 border border-white/10 hover:bg-white/10 text-white px-4 py-3 rounded-xl text-center text-sm font-bold transition-all backdrop-blur-md"
        >
          Details
        </Link>
        {isLogged ? (
          <Link
            href={`/events/${event.id}#apply`}
            className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-4 py-3 rounded-xl text-center text-sm font-bold shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 hover:scale-[1.02] transition-all"
          >
            Apply Now
          </Link>
        ) : (
          <Link
            href="/login"
            className="flex-1 bg-slate-800 text-slate-400 border border-white/5 px-4 py-3 rounded-xl text-center text-sm font-bold opacity-60 hover:opacity-100 transition-all"
          >
            Login to Apply
          </Link>
        )}
      </div>
    </div>
  </div>
  );
}
