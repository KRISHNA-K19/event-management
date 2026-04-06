import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ClubHub Admin",
  description: "Admin panel for ClubHub",
};

import Sidebar from "../components/Sidebar";
import TopNav from "../components/TopNav";
import { createServerSupabase } from "@repo/lib/supabase/server";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createServerSupabase();
  const { data: { user } } = await supabase.auth.getUser();
  const isAuthenticated = user?.email === "krishnamoorthyk.cse@gmail.com";

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="flex h-screen overflow-hidden bg-slate-950 text-white selection:bg-cyan-500/30">
        
        {isAuthenticated ? (
          <>
            <Sidebar />
            <div className="flex-1 flex flex-col relative w-full h-full overflow-hidden">
              <TopNav />
              
              {/* Ambient Background Glow */}
              <div className="fixed inset-0 bg-gradient-to-br from-slate-950 via-[rgba(15,23,42,1)] to-blue-950/80 -z-10" />
              <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none -z-10" />
              
              <main className="flex-1 overflow-y-auto p-6 md:p-10 hide-scrollbar relative z-10 w-full animate-[fadeIn_0.5s_ease-out]">
                {children}
              </main>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col relative w-full h-full overflow-hidden items-center justify-center p-6">
            {/* Ambient Background Glow for Login */}
            <div className="fixed inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-black -z-10" />
            <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-blue-600/5 rounded-full blur-[150px] pointer-events-none -z-10" />
            
            <main className="relative z-10 w-full flex justify-center animate-[fadeIn_0.5s_ease-out]">
              {children}
            </main>
          </div>
        )}
        
      </body>
    </html>
  );
}
