"use client";

import Link from 'next/link';
import { Button } from './Button';

export default function AdminNavbar() {
  return (
    <nav className={`glass backdrop-blur-xl border-b border-primary-500/30 shadow-neon sticky top-0 z-50 bg-black/30 p-4`}>
      <div className={`container mx-auto flex justify-between items-center`}>
        <Link href="/" className={`text-2xl font-black text-neon hover:animate-pulse transition-all duration-300`}>Admin Panel</Link>
        <div className={`flex space-x-2`}>
          <Link href="/events/manage" className={`admin-nav-link`}>Events</Link>
          <Link href="/applications" className={`admin-nav-link`}>Applications</Link>
          <Link href="/contacts" className={`admin-nav-link`}>Contacts</Link>
          <Link href="/gallery" className={`admin-nav-link`}>Gallery</Link>
        </div>
      </div>
    </nav>
  );
}
