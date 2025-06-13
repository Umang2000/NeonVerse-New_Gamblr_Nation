// src/app/layout.tsx
"use client";

import type { Metadata } from 'next'; // Keep this for static metadata if needed
import { useState, useEffect } from 'react';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import LoadingSpinner from '@/components/ui/LoadingSpinner';

// Static metadata object (can be uncommented if you still want some static parts)
// export const metadata: Metadata = {
// title: 'NeonVerse',
// description: 'A high-contrast, modern dark UI with electric glows and vaporwave-retro flair.',
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [loading, setLoading] = useState(true);
  const [currentTheme, setCurrentTheme] = useState('dark');

  useEffect(() => {
    // Apply theme from localStorage or default
    const storedTheme = localStorage.getItem('themePreference') || 'night'; // 'night' or 'night-pulse'
    if (storedTheme === 'night-pulse') {
      document.documentElement.className = 'dark theme-night-pulse';
      setCurrentTheme('dark theme-night-pulse');
    } else {
      document.documentElement.className = 'dark';
      setCurrentTheme('dark');
    }

    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500); // Shorter duration for demo

    return () => clearTimeout(timer);
  }, []);

  return (
    <html lang="en" className={currentTheme}>
      <head>
        <title>NeonVerse</title>
        <meta name="description" content="A high-contrast, modern dark UI with electric glows and vaporwave-retro flair." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        {loading ? (
          <div className="fixed inset-0 z-[200] flex items-center justify-center bg-background">
            <LoadingSpinner />
          </div>
        ) : (
          children
        )}
        <Toaster />
      </body>
    </html>
  );
}
