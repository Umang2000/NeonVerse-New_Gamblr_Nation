
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
import { ChatProvider, useChat } from '@/context/ChatContext'; // Added ChatProvider and useChat
import ChatInterface from '@/components/chat/ChatInterface'; // Added
import FloatingChatButton from '@/components/chat/FloatingChatButton'; // Added
import { cn } from '@/lib/utils'; // Added
import Navbar from '@/components/layout/Navbar'; // Assuming Navbar might be needed on all pages. Adjust if not.

// Main layout component that will wrap children with ChatProvider
function SiteLayout({ children }: { children: React.ReactNode }) {
  const { isChatSidebarOpen, toggleChatSidebar } = useChat();

  const getMarginClasses = () => {
    let mlClass = "";
    if (isChatSidebarOpen) {
      // These margins might need fine-tuning depending on the exact width of your chat sidebar
      // and whether you want this behavior on all pages.
      mlClass = "md:ml-[384px] lg:ml-[480px]";
    }
    return mlClass;
  };

  return (
    <>
      {/* Conditionally render Navbar if it's meant to be global, 
          or manage it per-page if layouts differ significantly.
          For now, assuming a global navbar above the main content area.
          If pages like /join have their own navbar, this might need adjustment
          or Navbar might be part of the children for those pages.
          Given current structure, Navbar is in page.tsx, so it might be better managed there
          or by specific page layouts rather than globally here unless all pages share THE exact same Navbar.
          Let's assume for now a global Navbar structure could be desired.
          Re-evaluating based on current structure: Navbar is per-page.
          So, no global Navbar here. Pages will include their own.
      */}

      <div className="flex flex-1 pt-20"> {/* pt-20 assuming a navbar height of 20 units */}
        <main
          className={cn(
            "flex-grow z-10 transition-all duration-300 ease-in-out w-full", // Ensure main takes full width initially
             // Apply margin adjustments based on chat sidebar state
             // This applies to the main content area of *all* pages using this layout.
            {"md:ml-[384px] lg:ml-[480px]": isChatSidebarOpen },
            {"w-full": !isChatSidebarOpen} // explicit full width when closed
          )}
        >
          {children}
        </main>

        {/* Global Chat Sidebar (Left) */}
        <aside
          className={cn(
            "fixed top-0 left-0 h-full bg-card border-r border-border/50 shadow-xl z-30 transition-transform duration-300 ease-in-out flex flex-col rounded-r-lg",
            "w-full md:w-96 lg:w-[480px]",
            isChatSidebarOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <ChatInterface />
        </aside>
      </div>

      <FloatingChatButton
        onToggle={toggleChatSidebar}
        isOpen={isChatSidebarOpen}
      />
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
            <ChatProvider> {/* Wrap with ChatProvider */}
              {loading ? (
                <div className="fixed inset-0 z-[200] flex items-center justify-center bg-background">
                  <LoadingSpinner />
                </div>
              ) : (
                <SiteLayout>{children}</SiteLayout> // Use SiteLayout to include chat components
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
