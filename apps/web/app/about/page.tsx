"use client";

import { Button } from '../../components/Button';
import { SITE_NAME } from '@repo/lib/utils/constants';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white selection:bg-cyan-500/30 pb-20 relative overflow-hidden">
      {/* Top Background Glow for Navbar */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-cyan-600/15 rounded-full blur-[120px] pointer-events-none -z-10"></div>
      
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center pt-32 pb-16 px-6">
        <div className="absolute inset-0 max-w-4xl mx-auto rounded-full blur-[100px] bg-blue-600/20 -z-10 animate-glowPulse"></div>
        <div className="text-center max-w-3xl glass-container animate-float">
          <h1 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent drop-shadow-lg">
            About {SITE_NAME}
          </h1>
          <p className="text-lg md:text-xl text-blue-100/80 leading-relaxed font-light">
            We are the vanguard of community events. Built for visionaries, creators, and leaders who want to transform the ordinary into the extraordinary. 
          </p>
        </div>
      </section>

      {/* Mission & Vision Grid */}
      <section className="container mx-auto px-6 mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div className="neon-card transform transition-all duration-500 hover:scale-[1.02]">
            <div className="text-blue-400 mb-4">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
            </div>
            <h2 className="text-3xl font-bold mb-4 text-white">Our Mission</h2>
            <p className="text-blue-100/70 text-lg leading-relaxed">
              To empower communities by providing an all-in-one dynamic platform that seamlessly merges event logistics with beautiful, unforgettable member experiences.
            </p>
          </div>

          <div className="neon-card transform transition-all duration-500 hover:scale-[1.02]">
            <div className="text-purple-400 mb-4">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.478 0-8.268-2.943-9.542-7z"></path></svg>
            </div>
            <h2 className="text-3xl font-bold mb-4 text-white">Our Vision</h2>
            <p className="text-blue-100/70 text-lg leading-relaxed">
              Envisioning a world where connecting and participating in meaningful club activities is as thrilling as the events themselves, uniting passion with aesthetics.
            </p>
          </div>
        </div>
      </section>

      {/* Call To Action */}
      <section className="container mx-auto px-6 mt-20 text-center">
        <div className="glass-container inline-block border-purple-500/30">
          <h3 className="text-2xl md:text-3xl font-bold mb-6 text-white drop-shadow-md">
            Ready to shape the future with us?
          </h3>
          <a href="/apply" className="inline-block mt-2">
            <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600">
              Apply For Membership
            </Button>
          </a>
        </div>
      </section>
    </main>
  );
}
