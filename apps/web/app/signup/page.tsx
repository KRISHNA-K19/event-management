"use client";

import { Button } from '../../components/Button';
import { useState } from 'react';
import { createClientSupabase } from '@repo/lib/supabase/client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClientSupabase();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { error, data } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
        }
      }
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push('/profile');
      router.refresh();
    }
  };

  return (
    <main className="min-h-screen pb-20">
      <div className="container mx-auto px-6 pt-24 max-w-lg">
        <div className="glass-container relative overflow-hidden animate-float">
          <div className="absolute top-0 left-0 -ml-16 -mt-16 w-48 h-48 rounded-full bg-purple-500/20 blur-[60px]"></div>
          
          <h1 className="text-4xl font-black mb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 drop-shadow-md text-center">
            Create Account
          </h1>
          <p className="text-blue-100/70 text-center mb-8 font-light">Join the vanguard of community events.</p>

          <form onSubmit={handleSignup} className="relative z-10 space-y-5">
            <div className="space-y-1">
              <label className="text-xs font-bold text-blue-200 uppercase tracking-widest pl-1">Full Name</label>
              <input required type="text" placeholder="John Doe" value={name} onChange={e => setName(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-blue-100/30 outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all backdrop-blur-md" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-blue-200 uppercase tracking-widest pl-1">Email Address</label>
              <input required type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-blue-100/30 outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all backdrop-blur-md" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-blue-200 uppercase tracking-widest pl-1">Password</label>
              <input required type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-blue-100/30 outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all backdrop-blur-md" />
            </div>

            {error && <div className="p-3 bg-red-500/20 border border-red-500/50 rounded-xl text-red-200 text-sm text-center">{error}</div>}

            <div className="pt-2">
              <Button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 shadow-xl shadow-purple-500/20 font-bold">
                {loading ? 'Creating...' : 'Sign Up'}
              </Button>
            </div>
          </form>

          <div className="text-center mt-6 z-10 relative">
            <p className="text-blue-200/60 text-sm">
              Already have an account? <Link href="/login" className="text-purple-400 hover:text-purple-300 font-bold transition-colors">Sign In</Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
