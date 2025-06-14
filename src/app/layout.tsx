
// src/app/layout.tsx
"use client";

import type { Metadata } from 'next';
import { useState, useEffect } from 'react';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { AuthProvider } from '@/context/AuthContext';
import GlobalAuthModal from '@/components/auth/GlobalAuthModal';
import { SupportProvider } from '@/context/SupportContext';
import ContactUsModal from '@/components/support/ContactUsModal';
import { ChatProvider, useChat } from '@/context/ChatContext';
import ChatInterface from '@/components/chat/ChatInterface';
import FloatingChatButton from '@/components/chat/FloatingChatButton';
import { cn } from '@/lib/utils';
// Navbar is rendered per-page, so it's not globally here.

// Main layout component that will wrap children with ChatProvider
function SiteLayout({ children }: { children: React.ReactNode }) {
  const { isChatSidebarOpen } = useChat(); // Removed toggleChatSidebar as it's not used here

  return (
    <>
      {/* 
        The main application navbar (h-20) is rendered by individual pages 
        (e.g., page.tsx, join/page.tsx) and is expected to be fixed at the top.
        This outer div provides a top padding container for the main scrollable content
        of each page, ensuring that page content starts below its own fixed navbar.
      */}
      <div className="flex flex-1 pt-20"> {/* This pushes content below page-specific fixed navbars */}
        <main
          className={cn(
            "flex-grow z-10 transition-all duration-300 ease-in-out w-full",
            // Apply margin adjustments based on chat sidebar state
            {"md:ml-[384px] lg:ml-[480px]": isChatSidebarOpen },
            {"w-full": !isChatSidebarOpen} 
          )}
        >
          {children}
        </main>

        {/* Global Chat Sidebar (Left) */}
        <aside
          className={cn(
            "fixed left-0 bg-card border-r border-border/50 shadow-xl z-30 transition-transform duration-300 ease-in-out flex flex-col rounded-r-lg",
            "top-20", // Explicitly start 20 units (5rem) from the top, below where h-20 navbar sits
            "h-[calc(100vh-5rem)]", // Height is viewport height minus 5rem (navbar height)
            "w-full md:w-96 lg:w-[480px]",
            isChatSidebarOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <ChatInterface /> {/* ChatInterface internally uses h-full to fill this aside */}
        </aside>
      </div>

      <FloatingChatButton />
    </>
  );
}


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
          <SupportProvider>
            <ChatProvider>
              {loading ? (
                <div className="fixed inset-0 z-[200] flex items-center justify-center bg-background">
                  <LoadingSpinner />
                </div>
              ) : (
                <SiteLayout>{children}</SiteLayout>
              )}
              <GlobalAuthModal />
              <ContactUsModal />
              <Toaster />
            </ChatProvider>
          </SupportProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
