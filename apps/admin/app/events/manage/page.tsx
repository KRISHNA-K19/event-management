"use client";

import { useEffect, useState } from 'react';
import DataTable from '../../../components/DataTable';
import { Button } from '../../../components/Button';
import Link from 'next/link';

export default function ManageEventsPage() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      const res = await fetch("/api/events");
      const data = await res.json();
      if (!data.error) setEvents(data);
      setLoading(false);
    };
    fetchEvents();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this event?')) return;
    const res = await fetch(`/api/events/delete?id=${id}`, { method: 'DELETE' });
    if (res.ok) setEvents(events.filter(e => e.id !== id));
  };

  return (
    <div className="pb-10">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-black bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent drop-shadow-md">
            Manage Events
          </h1>
          <p className="text-blue-100/70 mt-2 text-sm">Create, modify, and track your organization's events.</p>
        </div>
        <Link href="/events/create">
          <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 shadow-xl shadow-cyan-500/20">
            + New Event
          </Button>
        </Link>
      </div>

      <div className="glass-container p-6 shadow-2xl">
        <DataTable headers={['Event Name', 'Date', 'Actions']}>
          {loading ? (
            <tr><td colSpan={3} className="text-center p-4">Loading events...</td></tr>
          ) : events.length === 0 ? (
            <tr><td colSpan={3} className="text-center p-4">No events found</td></tr>
          ) : events.map(evt => (
            <tr key={evt.id} className="hover:bg-white/5 transition-colors group">
              <td className="px-6 py-4 whitespace-nowrap text-white font-medium">{evt.title}</td>
              <td className="px-6 py-4 whitespace-nowrap text-blue-200">{evt.date}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <Link href={`/events/edit/${evt.id}`}>
                  <button className="text-cyan-400 hover:text-cyan-300 mr-4 font-semibold transition-colors">Edit</button>
                </Link>
                <button 
                  onClick={() => handleDelete(evt.id)}
                  className="text-red-400 hover:text-red-300 font-semibold transition-colors"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </DataTable>
      </div>
    </div>
  );
}
