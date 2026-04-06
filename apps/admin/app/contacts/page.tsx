"use client";

import { useEffect, useState } from 'react';
import { createClientSupabase } from '@repo/lib/supabase/client';
import { Button } from '../../components/Button';
import { Mail, Trash2, Archive, MessageSquare } from 'lucide-react';

export default function ContactsPage() {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    const supabase = createClientSupabase();
    const { data, error } = await supabase
      .from('contacts')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (!error && data) {
      setMessages(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleDelete = async (id: string) => {
    const supabase = createClientSupabase();
    const { error } = await supabase.from('contacts').delete().eq('id', id);
    if (!error) {
      setMessages(messages.filter(m => m.id !== id));
    }
  };

  return (
    <div className="pb-10 relative">
      <div className="absolute -top-10 -left-10 w-64 h-64 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none -z-10"></div>
      
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-black bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent drop-shadow-md">
            Inbox Hub
          </h1>
          <p className="text-blue-100/70 mt-2 text-sm font-medium">Monitoring inbound student inquiries and feedback.</p>
        </div>
      </div>

      {/* Admin Identity Card */}
      <div className="mb-12">
        <div className="glass-container p-8 relative overflow-hidden group border-cyan-500/30 !bg-gradient-to-br !from-cyan-900/20 !via-slate-950 !to-transparent shadow-[0_0_50px_rgba(34,211,238,0.1)]">
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-[80px] group-hover:bg-cyan-500/20 transition-colors duration-700"></div>
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 relative z-10">
            <div className="space-y-4">
              <span className="text-[10px] font-black bg-cyan-500 text-slate-950 px-3 py-1 rounded-full uppercase tracking-[.25em] shadow-[0_0_15px_rgba(34,211,238,0.4)]">
                Lead Administrator
              </span>
              <h2 className="text-4xl font-black text-white tracking-tighter italic">KRISHNAMOORTHY K</h2>
              <div className="flex flex-wrap gap-6 text-sm font-bold">
                <a href="mailto:krishnamoorthyk.cse@gmail.com" className="flex items-center gap-2 text-cyan-400 hover:text-white transition-colors">
                  <span className="p-2 bg-white/5 rounded-lg">📧</span>
                  krishnamoorthyk.cse@gmail.com
                </a>
                <a href="tel:8056500986" className="flex items-center gap-2 text-blue-400 hover:text-white transition-colors">
                  <span className="p-2 bg-white/5 rounded-lg">📞</span>
                  +91 8056500986
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
          <MessageSquare className="text-blue-500" size={20} />
          Incoming Sync
        </h2>
        <p className="text-slate-500 text-xs font-medium italic">Recent messages from the public contact form.</p>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-24 text-slate-500 space-y-4">
          <div className="w-10 h-10 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="font-bold tracking-widest text-[10px] uppercase">Decrypting Messages...</p>
        </div>
      ) : messages.length === 0 ? (
        <div className="py-24 text-center glass-container border-dashed border-white/10">
          <Mail className="mx-auto text-slate-700 mb-4 opacity-20" size={48} />
          <p className="text-slate-500 font-bold uppercase tracking-widest text-sm">Inbox is empty.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {messages.map(msg => (
            <div key={msg.id} className="neon-card flex flex-col justify-between group h-full border-white/5 hover:border-blue-500/30 transition-all duration-500">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-black text-white tracking-tight">{msg.name}</h3>
                    <a href={`mailto:${msg.email}`} className="text-cyan-400 hover:text-cyan-300 text-xs font-bold transition-colors">{msg.email}</a>
                  </div>
                  <span className="text-slate-500 text-[10px] uppercase font-black tracking-tighter">
                    {new Date(msg.created_at).toLocaleDateString()}
                  </span>
                </div>
                <div className="p-4 bg-white/5 rounded-xl border border-white/5 text-blue-100/70 text-sm leading-relaxed min-h-[80px]">
                  "{msg.message}"
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-white/5">
                <button onClick={() => handleDelete(msg.id)} className="text-slate-500 hover:text-red-400 transition-colors">
                  <Trash2 size={16} />
                </button>
                <div className="flex gap-2">
                  <Button size="sm" variant="ghost" className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white">Archive</Button>
                  <Button size="sm" className="bg-gradient-to-r from-cyan-600 to-blue-600 px-4 text-[10px] font-black uppercase tracking-widest py-2">Reply</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

