
"use client";

import { useState } from 'react';
import AnimatedBackground from '@/components/ui/AnimatedBackground';
import Navbar from '@/components/layout/Navbar';
import GameCard from '@/components/game/GameCard';
import { Button } from '@/components/ui/button';
import FooterYear from '@/components/layout/FooterYear';
import { ArrowRightIcon, XIcon } from 'lucide-react'; 
import FloatingChatButton from '@/components/chat/FloatingChatButton';
import ChatInterface from '@/components/chat/ChatInterface';
import FloatingSupportButton from '@/components/support/FloatingSupportButton'; // Added
import SupportInterface from '@/components/support/SupportInterface'; // Added
import TwitchEmbed from '@/components/media/TwitchEmbed';
import { cn } from '@/lib/utils';

const games = [
  { id: '1', title: 'Cosmic Drift Racer', imageUrl: 'https://placehold.co/600x400/003366/00cfff.png', category: 'Racing', dataAiHint: 'space race' },
  { id: '2', title: 'Synthwave Striker', imageUrl: 'https://placehold.co/600x400/4B0082/a855f7.png', category: 'Action', dataAiHint: 'synthwave action' },
  { id: '3', title: 'Neon Grid Runner', imageUrl: 'https://placehold.co/600x400/FF4500/ff6a00.png', category: 'Arcade', dataAiHint: 'neon grid' },
  { id: '4', title: 'Galaxy Guardians', imageUrl: 'https://placehold.co/600x400/1E90FF/00cfff.png', category: 'Strategy', dataAiHint: 'galaxy strategy' },
];

export default function HomePage() {
  const [isChatSidebarOpen, setIsChatSidebarOpen] = useState(false);
  const [isSupportSidebarOpen, setIsSupportSidebarOpen] = useState(false); // Added

  // Calculate main content margin based on open sidebars
  const getMarginClasses = () => {
    let mlClass = "";
    let mrClass = "";
    if (isChatSidebarOpen) {
      mlClass = "md:ml-[384px] lg:ml-[480px]";
    }
    if (isSupportSidebarOpen) {
      mrClass = "md:mr-[384px] lg:mr-[480px] xl:mr-[560px]"; // Adjusted support sidebar width
    }
    return cn(mlClass, mrClass);
  };

  return (
    <div className="relative min-h-screen flex flex-col">
      <AnimatedBackground />
      <Navbar />

      <div className="flex flex-1 pt-20"> {/* pt-20 for navbar height */}
        <main
          className={cn(
            "flex-grow z-10 container mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-300 ease-in-out",
            getMarginClasses()
          )}
        >
          {/* Hero Section */}
          <section className="py-16 md:py-24 text-center">
            <h1 className="text-5xl md:text-7xl font-headline font-bold mb-6">
              Welcome to <span className="text-primary">Neon</span><span className="text-accent">Verse</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto">
              Dive into a universe of high-octane games, vibrant communities, and retro-futuristic vibes.
            </p>
            <Button variant="cta" size="lg" className="text-lg px-8 py-4 group">
              Join The Universe <ArrowRightIcon className="ml-2 h-5 w-5" />
            </Button>
          </section>

          {/* Game Cards Section */}
          <section id="games" className="py-12">
            <h2 className="text-4xl font-headline font-bold text-center mb-10">Featured Games</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {games.map((game) => (
                <GameCard
                  key={game.id}
                  title={game.title}
                  imageUrl={game.imageUrl}
                  category={game.category}
                  dataAiHint={game.dataAiHint}
                />
              ))}
            </div>
          </section>

          {/* Twitch Livestream Section */}
          <section id="livestream" className="py-12">
            <h2 className="text-4xl font-headline font-bold text-center mb-10">
              Live <span className="text-destructive">Now</span>
            </h2>
            <div className="max-w-4xl mx-auto px-4">
              <TwitchEmbed channel="afterhoursaz" />
            </div>
          </section>

          {/* Footer section (simple) */}
          <footer className="py-8 text-center text-muted-foreground border-t border-border/20 mt-12">
            <p>&copy; <FooterYear /> NeonVerse. All rights reserved.</p>
            <p className="text-sm">Powered by Electric Dreams & Pixel Dust</p>
          </footer>
        </main>

        {/* Chat Sidebar (Left) */}
        <aside
          className={cn(
            "fixed top-0 left-0 h-full bg-card border-r border-border/50 shadow-xl z-30 transition-transform duration-300 ease-in-out flex flex-col rounded-r-lg", 
            "w-full md:w-96 lg:w-[480px]", 
            isChatSidebarOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
           <button 
            onClick={() => setIsChatSidebarOpen(false)} 
            className="absolute top-[calc(5rem+0.75rem)] right-3 p-2 text-primary hover:text-accent z-50 rounded-md hover:bg-primary/10 transition-colors"
            aria-label="Close chat sidebar"
          >
            <XIcon className="h-5 w-5 icon-glow-primary" />
          </button>
          <ChatInterface />
        </aside>

        {/* Support Sidebar (Right) */}
        <aside
          className={cn(
            "fixed top-0 right-0 h-full bg-card border-l border-border/50 shadow-xl z-30 transition-transform duration-300 ease-in-out flex flex-col rounded-l-lg",
            "w-full md:w-[384px] lg:w-[480px] xl:w-[560px]", // Support sidebar can be wider
            isSupportSidebarOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          <button
            onClick={() => setIsSupportSidebarOpen(false)}
            className="absolute top-[calc(5rem+0.75rem)] left-3 p-2 text-accent hover:text-primary z-50 rounded-md hover:bg-accent/10 transition-colors" // Adjusted for left positioning of button
            aria-label="Close support sidebar"
          >
            <XIcon className="h-5 w-5 icon-glow-accent" />
          </button>
          <SupportInterface />
        </aside>
      </div>

      <FloatingChatButton 
        onToggle={() => setIsChatSidebarOpen(!isChatSidebarOpen)} 
        isOpen={isChatSidebarOpen} 
      />
      <FloatingSupportButton
        onToggle={() => setIsSupportSidebarOpen(!isSupportSidebarOpen)}
        isOpen={isSupportSidebarOpen}
      />
    </div>
  );
}
