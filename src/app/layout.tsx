
// src/app/layout.tsx
"use client";

import type { Metadata } from 'next';
import { useState, useEffect } from 'react';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { AuthProvider } from '@/context/AuthContext';
import GlobalAuthModal from '@/components/auth/GlobalAuthModal';
import { SupportProvider } from '@/context/SupportContext'; // Added
import ContactUsModal from '@/components/support/ContactUsModal'; // Added

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedTheme = localStorage.getItem('themePreference') || 'night';
    if (storedTheme === 'night-pulse') {
      document.documentElement.className = 'dark theme-night-pulse';
    } else {
      document.documentElement.className = 'dark';
    }

    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <html lang="en"> 
      <head>
        <title>NeonVerse</title>
        <meta name="description" content="A high-contrast, modern dark UI with electric glows and vaporwave-retro flair." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased bg-background text-foreground overflow-x-hidden">
        <AuthProvider>
          <SupportProvider> {/* Added SupportProvider */}
            {loading ? (
              <div className="fixed inset-0 z-[200] flex items-center justify-center bg-background">
                <LoadingSpinner />
              </div>
            ) : (
              children
            )}
            <GlobalAuthModal />
            <ContactUsModal /> {/* Added ContactUsModal */}
            <Toaster />
          </SupportProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
