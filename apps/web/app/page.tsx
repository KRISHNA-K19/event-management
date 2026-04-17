"use client";

import { Button } from '../components/Button';
import { SITE_NAME } from '@repo/lib/utils/constants';

export default function HomePage() {
  return (
    <main className="">
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-[rgba(30,58,138,0.3)] to-slate-900">
        <div className="[background:rgba(255,255,255,0.1)] backdrop-blur-xl p-12 rounded-3xl neon-glow max-w-4xl mx-8 animate-glowPulse">
          <h1 className="text-6xl md:text-7xl font-black mb-8 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-600 bg-clip-text text-transparent drop-shadow-2xl">
            Welcome to {SITE_NAME}
          </h1>
          <p className="text-2xl mb-12 text-blue-100/90 leading-relaxed drop-shadow-lg">
            Discover epic events, connect with the community, and level up your experience
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <a href="/events" className="neon-button">
              <Button>🌟 Explore Events</Button>
            </a>
            <a href="/apply" className="neon-button">
              <Button>✨ Join Now</Button>
            </a>
          </div>

          <div className="mt-8 pt-8 border-t border-white/10 flex flex-col items-center">
            <h3 className="text-xl font-medium text-white mb-4">Stay updated via our newsletter</h3>
            <form className="flex w-full max-w-md gap-2" onSubmit={(e) => e.preventDefault()}>
              <input type="email" required placeholder="Enter your email" className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white placeholder-blue-100/40 outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all bg-opacity-30 backdrop-blur-lg" />
              <Button type="submit" size="sm" className="bg-cyan-500 hover:bg-cyan-400 text-slate-900 border-none font-bold shadow-[0_0_15px_rgba(34,211,238,0.4)]">Subscribe</Button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
