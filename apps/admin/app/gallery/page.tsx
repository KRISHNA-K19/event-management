"use client";

import { useEffect, useState } from 'react';
import { createClientSupabase } from '@repo/lib/supabase/client';
import { Button } from '../../components/Button';
import { ImageIcon, Trash2, Camera } from 'lucide-react';

export default function GalleryPage() {
  const [photos, setPhotos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPhotos = async () => {
      const supabase = createClientSupabase();
      const { data, error } = await supabase
        .from('events')
        .select('id, title, image_url')
        .not('image_url', 'is', null);
      
      if (!error && data) {
        setPhotos(data);
      }
      setLoading(false);
    };
    fetchPhotos();
  }, []);

  return (
    <div className="pb-10 relative">
      <div className="absolute -top-10 -right-10 w-64 h-64 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none -z-10"></div>
      
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-black bg-gradient-to-r from-purple-400 to-cyan-300 bg-clip-text text-transparent drop-shadow-md">
            Media Hub
          </h1>
          <p className="text-blue-100/70 mt-2 text-sm font-medium">Visual synchronization of your club event captures.</p>
        </div>
        <Button className="bg-gradient-to-r from-purple-600 to-cyan-600 shadow-xl shadow-purple-500/20 px-6 font-bold flex items-center gap-2">
          <Camera size={18} />
          Sync Media
        </Button>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-24 text-slate-500 space-y-4">
          <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="font-bold tracking-widest text-xs uppercase">Opening Vault...</p>
        </div>
      ) : photos.length === 0 ? (
        <div className="py-24 text-center glass-container border-dashed border-white/10">
          <ImageIcon className="mx-auto text-slate-700 mb-4" size={48} />
          <p className="text-slate-500 font-bold uppercase tracking-widest text-sm">No live event captures found.</p>
          <p className="text-slate-600 text-xs mt-2 italic">Add images to your events in the 'Manage Events' section.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {photos.map(photo => (
            <div key={photo.id} className="relative group rounded-2xl overflow-hidden glass-container p-2 border-white/5 hover:border-purple-500/30 transition-all duration-500 shadow-lg hover:shadow-purple-500/10">
              <div className="aspect-square overflow-hidden rounded-xl bg-slate-900">
                <img 
                  src={photo.image_url} 
                  alt={photo.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                />
              </div>
              <div className="absolute inset-x-2 bottom-2 bg-slate-950/90 backdrop-blur-md p-3 translate-y-full group-hover:translate-y-0 transition-all duration-300 rounded-xl border border-white/5 flex justify-between items-center shadow-2xl">
                <span className="text-white text-[10px] font-black uppercase tracking-tighter truncate max-w-[70%]">{photo.title}</span>
                <button className="text-red-400/60 hover:text-red-400 transition-colors">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

