"use client";

import { useEffect, useState } from "react";
import { Event } from '@repo/lib/types/database';
import EventCard from '../../components/EventCard';
import Navbar from '../../components/Navbar';

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/events")
      .then((res) => res.json())
      .then((data) => {
        setEvents(data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to fetch events');
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="flex justify-center items-center h-64"><div>Loading...</div></div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-8">Events</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
        {events.length === 0 && (
          <p className="text-center text-gray-500 mt-8">No events found. Check back later!</p>
        )}
      </div>
    </div>
  );
}
