"use client";

import { useEffect, useState } from 'react';
import DataTable from '../../components/DataTable';
import { Button } from '../../components/Button';
import { createClientSupabase } from '@repo/lib/supabase/client';

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedApp, setSelectedApp] = useState<any>(null);

  const fetchApps = async () => {
    const res = await fetch('/api/applications');
    if (res.ok) {
      const data = await res.json();
      setApplications(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchApps();
  }, []);

  const handleAction = async (id: string, newStatus: string) => {
    const supabase = createClientSupabase();
    const { error } = await supabase.from('applications').update({ status: newStatus }).eq('id', id);
    if (!error) {
      fetchApps();
      if (selectedApp && selectedApp.id === id) {
        setSelectedApp({...selectedApp, status: newStatus});
      }
    } else {
      alert(error.message);
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center h-64 text-white">
      <div className="w-8 h-8 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mr-3"></div>
      Loading applications...
    </div>
  );

  return (
    <div className="pb-10 relative">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-black bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent drop-shadow-md">
            Student Applications
          </h1>
          <p className="text-blue-100/70 mt-2 text-sm">Review incoming registrations for your club events.</p>
        </div>
      </div>

      <div className="glass-container p-6 shadow-2xl">
        {/* Modal Overlay */}
        {selectedApp && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
            <div className="w-full max-w-lg glass-container p-8 relative overflow-hidden shadow-[0_0_80px_rgba(34,211,238,0.2)]">
              <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-[80px]"></div>
              
              <button 
                onClick={() => setSelectedApp(null)}
                className="absolute top-6 right-6 text-slate-400 hover:text-white transition-colors"
              >
                ✕
              </button>

              <div className="relative z-10">
                <span className="text-[10px] font-black bg-cyan-500/20 text-cyan-400 px-3 py-1 rounded-full border border-cyan-500/30 uppercase tracking-[0.2em] mb-4 inline-block">
                  Detail View
                </span>
                
                <h2 className="text-3xl font-black text-white mb-2">{selectedApp.profile?.full_name || 'Anonymous Student'}</h2>
                <a href={`mailto:${selectedApp.profile?.email}`} className="text-blue-400 hover:text-cyan-400 text-sm transition-colors mb-8 block">
                  {selectedApp.profile?.email || 'No email provided'}
                </a>

                <div className="space-y-6 mb-10 pt-4 border-t border-white/5">
                  <div>
                    <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Applying for Event</h4>
                    <p className="text-white font-medium">{selectedApp.event?.title || 'Unknown Event'}</p>
                  </div>
                  <div>
                    <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Current Status</h4>
                    <p className={`font-black uppercase tracking-tighter ${
                      selectedApp.status === 'approved' ? 'text-green-400' : 
                      selectedApp.status === 'rejected' ? 'text-red-400' : 'text-yellow-400'
                    }`}>
                      {selectedApp.status || 'pending'}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  {selectedApp.status === 'pending' || !selectedApp.status ? (
                    <>
                      <Button 
                        onClick={() => handleAction(selectedApp.id, 'approved')} 
                        className="flex-1 bg-green-600/20 text-green-400 border-green-500/30 hover:bg-green-600 hover:text-white"
                      >
                        Approve
                      </Button>
                      <Button 
                        onClick={() => handleAction(selectedApp.id, 'rejected')}
                        className="flex-1 bg-red-600/20 text-red-400 border-red-500/30 hover:bg-red-600 hover:text-white"
                      >
                        Reject
                      </Button>
                    </>
                  ) : (
                    <Button 
                      onClick={() => handleAction(selectedApp.id, 'pending')}
                      className="flex-1 bg-white/5 text-slate-400 hover:bg-white/10"
                    >
                      Reset to Pending
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {applications.length === 0 ? (
          <div className="py-12 text-center text-slate-500 font-bold uppercase tracking-widest bg-white/5 rounded-2xl border border-white/5">
            No applications recorded yet.
          </div>
        ) : (
          <DataTable headers={['Event Title', 'Student Name', 'Date Received', 'Status', 'Actions']}>
            {applications.map(app => (
              <tr key={app.id} className="hover:bg-white/5 transition-colors group border-b border-white/5">
                <td className="px-6 py-4 whitespace-nowrap text-white font-medium">
                  {app.event?.title || 'Unknown Event'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-blue-200">
                  {app.profile?.full_name || 'Anonymous Student'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-blue-100/50 text-sm">
                  {new Date(app.created_at).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-tighter border shadow-sm ${
                    app.status === 'approved' ? 'bg-green-500/10 text-green-400 border-green-500/30' : 
                    app.status === 'rejected' ? 'bg-red-500/10 text-red-400 border-red-500/30' : 
                    'bg-yellow-500/10 text-yellow-400 border-yellow-500/30'
                  }`}>
                    {app.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap flex gap-4">
                  {(app.status === 'pending' || !app.status) && (
                    <>
                      <button onClick={() => handleAction(app.id, 'approved')} className="text-green-400 hover:text-green-300 font-black text-xs uppercase tracking-widest transition-all">Approve</button>
                      <button onClick={() => handleAction(app.id, 'rejected')} className="text-red-400 hover:text-red-300 font-black text-xs uppercase tracking-widest transition-all">Reject</button>
                    </>
                  )}
                  <button onClick={() => setSelectedApp(app)} className="text-cyan-400 hover:scale-110 font-bold text-xs uppercase tracking-tighter transition-all">View</button>
                </td>
              </tr>
            ))}
          </DataTable>
        )}
      </div>
    </div>
  );
}
