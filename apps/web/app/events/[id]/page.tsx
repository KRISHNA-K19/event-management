"use client";

import { useEffect, useState, use } from 'react';
import Navbar from '../../../components/Navbar';
import { createClientSupabase } from '@repo/lib/supabase/client';
import { Button } from '../../../components/Button';
import { useRouter } from 'next/navigation';

interface PageProps {
  params: Promise<{ id: string }>
}

export default function EventDetailPage({ params }: PageProps) {
  const { id } = use(params);
  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [applied, setApplied] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchEvent = async () => {
      const supabase = createClientSupabase();
      
      const { data: { session } } = await supabase.auth.getSession();
      setIsLogged(!!session);

      const res = await fetch(`/api/events`);
      const allEvents = await res.json();
      const found = allEvents.find((e: any) => e.id === id);
      
      if (found) setEvent(found);
      setLoading(false);
    };
    fetchEvent();
  }, [id]);

  const handleApply = async () => {
    if (!isLogged) {
      router.push('/login');
      return;
    }

    setApplying(true);
    const supabase = createClientSupabase();
    const { data: { user } } = await supabase.auth.getUser();

    const { error } = await supabase.from('applications').insert([
      {
        event_id: id,
        user_id: user?.id,
        status: 'pending'
      }
    ]);

    if (!error) {
      setApplied(true);
    } else {
      alert(error.message);
    }
    setApplying(false);
  };

  if (loading) return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  if (!event) return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-black mb-4">Event Not Found</h1>
      <p className="text-slate-400 mb-8">This event may have been removed or doesn't exist.</p>
      <Button onClick={() => router.push('/events')}>Back to Events</Button>
    </div>
  );

  return (
    <main className="min-h-screen bg-slate-950 text-white selection:bg-cyan-500/30 pb-20">
      <Navbar />
      
      <div className="relative pt-32 pb-20 px-6 container mx-auto overflow-hidden">
        {/* Advanced Ambient Glows */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none -z-10" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none -z-10" />

        <div className="max-w-4xl mx-auto">
          <div className="glass-container p-0 relative overflow-hidden animate-fadeIn border-none shadow-[0_32px_64px_-16px_rgba(0,0,0,0.6)]">
            {/* Visual Hero Section */}
            {event.image_url && (
              <div className="relative w-full h-[320px] overflow-hidden rounded-t-3xl">
                <img src={event.image_url} alt={event.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent"></div>
              </div>
            )}
            
            <div className="p-8 md:p-12">
              {/* Header section with badge */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
              <div className="space-y-3">
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest bg-cyan-500/10 px-4 py-1.5 rounded-full border border-cyan-500/20">
                  {new Date(event.event_date).toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                </span>
                <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent drop-shadow-lg leading-tight">
                  {event.title}
                </h1>
              </div>
              
              <div className="flex-shrink-0">
                <div className="glass-container !bg-white/5 border-white/10 px-6 py-4 flex flex-col items-center justify-center text-center backdrop-blur-md">
                  <span className="text-xs uppercase text-slate-400 font-bold tracking-tighter mb-1">Status</span>
                  <span className="text-xl font-black text-white">UPCOMING</span>
                </div>
              </div>
            </div>

            {/* Description and Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2 space-y-8">
                <div>
                  <h3 className="text-xl font-bold text-white mb-4 border-l-4 border-cyan-500 pl-4">About the Event</h3>
                  <p className="text-slate-300 leading-relaxed text-lg font-light">
                    {event.description}
                  </p>
                </div>
                
                <div className="p-6 bg-white/5 rounded-2xl border border-white/5 space-y-4">
                  <h4 className="text-sm font-bold text-blue-300 uppercase tracking-widest">Location Info</h4>
                  <p className="text-white font-medium flex items-center gap-3">
                    <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,211,238,0.8)]"></span>
                    {event.location || 'Announced Soon'}
                  </p>
                </div>
              </div>

              {/* Action Sidebar */}
              <div className="space-y-6">
                <div className="glass-container !bg-gradient-to-br !from-blue-600/20 !to-cyan-600/10 border-blue-500/30 p-8 text-center space-y-6">
                  <h3 className="text-2xl font-black text-white">Interested?</h3>
                  <p className="text-blue-100/60 text-sm">Join this event and connect with fellow club members.</p>
                  
                  {applied ? (
                    <div className="py-4 px-6 bg-green-500/20 border border-green-500/40 rounded-xl text-green-300 font-bold animate-[shake_0.8s_ease-out]">
                      ✓ Application Sent
                    </div>
                  ) : (
                    <Button 
                      onClick={handleApply} 
                      disabled={applying}
                      className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 shadow-xl shadow-blue-500/30 py-4 text-lg font-black tracking-wide"
                    >
                      {applying ? 'Sending...' : isLogged ? 'APPLY NOW' : 'LOGIN TO APPLY'}
                    </Button>
                  )}
                  
                  <p className="text-[10px] uppercase text-slate-500 tracking-widest font-black">
                    * Limited spots available
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

          <div className="mt-10 text-center">
            <button onClick={() => router.back()} className="text-slate-500 hover:text-white transition-colors text-sm font-bold flex items-center justify-center gap-2 mx-auto uppercase tracking-widest">
              &larr; Return to directory
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
