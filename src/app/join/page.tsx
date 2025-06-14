
"use client";

import AnimatedBackground from '@/components/ui/AnimatedBackground';
import Navbar from '@/components/layout/Navbar';
import FooterYear from '@/components/layout/FooterYear';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { MailIcon } from 'lucide-react';
import { useSupport } from '@/context/SupportContext';

export default function JoinPage() {
  const { setContactModalOpen } = useSupport();

  return (
    <div className="relative min-h-screen flex flex-col">
      <AnimatedBackground />
      <Navbar />
      <main className="flex-grow z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-12">
        <div className="text-center">
          <h1 className="text-5xl md:text-7xl font-headline font-bold mb-8">
            Embark on Your <span className="text-primary">Neon</span><span className="text-accent">Verse</span> Journey
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto">
            You're one step away from joining a vibrant galaxy of gamers, creators, and explorers. 
            Sign up now to unlock exclusive content, connect with the community, and start your adventure!
          </p>
          
          <div className="bg-card/70 backdrop-blur-md border border-border/30 shadow-xl rounded-lg p-8 max-w-lg mx-auto">
            <h2 className="text-3xl font-headline text-primary mb-6">Create Your Account</h2>
            <p className="text-muted-foreground mb-6">
              The full experience awaits. Account creation will be available here soon. 
              For now, explore our featured games and join the Degen Chat!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline" size="lg" className="text-lg" asChild>
                <Link href="/#games">Explore Games</Link>
              </Button>
              <Button variant="cta" size="lg" className="text-lg" asChild>
                <Link href="/">Back to Home</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      <footer className="py-8 text-center text-muted-foreground border-t border-border/20 mt-auto">
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-4">
          <p>&copy; <FooterYear /> NeonVerse. All rights reserved.</p>
          <Button 
            variant="link" 
            onClick={() => setContactModalOpen(true)}
            className="text-primary hover:text-primary/80"
          >
            <MailIcon className="mr-2 h-4 w-4" />
            Contact Us
          </Button>
        </div>
        <p className="text-sm">Powered by Electric Dreams & Pixel Dust</p>
      </footer>
    </div>
  );
}
