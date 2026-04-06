"use client";

import { useEffect, useState, use } from 'react';
import { Button } from '../../../../components/Button';
import { useRouter } from 'next/navigation';
import { createClientSupabase } from '@repo/lib/supabase/client';

interface PageProps {
  params: Promise<{ id: string }>
}

export default function EditEventPage({ params }: PageProps) {
  const { id } = use(params);
  const router = useRouter();
  const [formData, setFormData] = useState({ title: '', date: '', location: '', description: '', imageUrl: '' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      const res = await fetch(`/api/events`);
      const events = await res.json();
      const event = events.find((e: any) => e.id === id);
      if (event) {
        setFormData({
          title: event.title,
          date: event.date,
          location: event.location || '',
          description: event.description,
          imageUrl: event.image_url || '',
        });
      }
      setLoading(false);
    };
    fetchEvent();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const res = await fetch(`/api/events/update?id=${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    if (res.ok) router.push('/events/manage');
    else {
      const data = await res.json();
      alert(data.error || 'Failed to update event');
      setSaving(false);
    }
  };

  if (loading) return <div className="p-10 text-white">Loading event data...</div>;

  return (
    <div className="flex justify-center pb-10">
      <div className="w-full max-w-2xl glass-container relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-[80px]"></div>

        <button onClick={() => router.back()} className="text-blue-300 hover:text-white text-sm mb-6 flex items-center transition-colors">
          &larr; Back to Manage
        </button>
        
        <h1 className="text-3xl font-black bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent drop-shadow-md mb-2">
          Edit Event
        </h1>
        <p className="text-blue-100/70 text-sm mb-8">Modify the details of your existing event.</p>

        <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-blue-200 uppercase tracking-widest pl-1">Event Title</label>
            <input required type="text" value={formData.title}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none backdrop-blur-md" 
              onChange={e => setFormData({...formData, title: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-blue-200 uppercase tracking-widest pl-1">Image URL (Optional)</label>
            <input type="url" value={formData.imageUrl}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none backdrop-blur-md transition-all" 
              onChange={e => setFormData({...formData, imageUrl: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-blue-200 uppercase tracking-widest pl-1">Date</label>
              <input required type="date" value={formData.date}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-blue-100 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none backdrop-blur-md [color-scheme:dark]" 
                onChange={e => setFormData({...formData, date: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-blue-200 uppercase tracking-widest pl-1">Location</label>
              <input required type="text" value={formData.location}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none backdrop-blur-md" 
                onChange={e => setFormData({...formData, location: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-blue-200 uppercase tracking-widest pl-1">Description</label>
            <textarea required rows={4} value={formData.description}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none backdrop-blur-md resize-none"
              onChange={e => setFormData({...formData, description: e.target.value})}
            ></textarea>
          </div>

          <div className="pt-4 flex justify-end">
            <Button type="submit" disabled={saving} className="bg-gradient-to-r from-blue-600 to-cyan-600 shadow-xl shadow-cyan-500/20 font-bold px-8">
              {saving ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
