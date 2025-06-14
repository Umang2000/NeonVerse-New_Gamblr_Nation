
"use client";

import Link from 'next/link';
import AnimatedBackground from '@/components/ui/AnimatedBackground';
import Navbar from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import FooterYear from '@/components/layout/FooterYear';
import { ArrowRightIcon, MailIcon } from 'lucide-react';
import TwitchEmbed from '@/components/media/TwitchEmbed';
import FAQSection from '@/components/page/FAQSection';
import { useSupport } from '@/context/SupportContext';
import { cn } from '@/lib/utils';
import ScrollAnimate from '@/components/ui/ScrollAnimate';

// Planet SVGs as functional components
const NeonPrimeSVG = () => (
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
    <defs>
      <radialGradient id="neonPrimeGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
        <stop offset="0%" style={{ stopColor: 'hsl(var(--primary))', stopOpacity: 1 }} />
        <stop offset="60%" style={{ stopColor: 'hsl(var(--accent))', stopOpacity: 0.8 }} />
        <stop offset="100%" style={{ stopColor: 'hsl(var(--background))', stopOpacity: 0.3 }} />
      </radialGradient>
      <filter id="neonPrimeGlow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    <circle cx="50" cy="50" r="40" fill="url(#neonPrimeGradient)" filter="url(#neonPrimeGlow)" />
    <circle cx="50" cy="50" r="42" stroke="hsl(var(--primary) / 0.5)" strokeWidth="1.5" fill="none" />
  </svg>
);

const StreamersOrbitSVG = () => (
  <svg viewBox="0 0 120 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
    <defs>
      <radialGradient id="streamerOrbitGradient" cx="50%" cy="50%" r="70%">
        <stop offset="0%" style={{ stopColor: 'hsl(var(--accent))' }} />
        <stop offset="100%" style={{ stopColor: 'hsl(var(--destructive))' }} />
      </radialGradient>
      <filter id="streamerOrbitGlow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    <ellipse cx="60" cy="50" rx="55" ry="18" stroke="hsl(var(--primary) / 0.8)" strokeWidth="2.5" fill="none" transform="rotate(-15 60 50)" />
    <ellipse cx="60" cy="50" rx="50" ry="12" stroke="hsl(var(--primary) / 0.4)" strokeWidth="2" fill="none" transform="rotate(-15 60 50) translate(0, 2)" />
    <circle cx="60" cy="50" r="28" fill="url(#streamerOrbitGradient)" filter="url(#streamerOrbitGlow)" />
  </svg>
);

const HelpHubXylosSVG = () => (
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
    <defs>
      <linearGradient id="xylosGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: 'hsl(var(--primary) / 0.8)' }} />
        <stop offset="100%" style={{ stopColor: 'hsl(var(--accent) / 0.8)' }} />
      </linearGradient>
      <filter id="xylosGlow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    <path d="M50 5 L95 25 L95 75 L50 95 L5 75 L5 25 Z" fill="url(#xylosGradient)" stroke="hsl(var(--foreground) / 0.7)" strokeWidth="2" filter="url(#xylosGlow)" />
    <line x1="50" y1="5" x2="50" y2="95" stroke="hsl(var(--foreground) / 0.3)" strokeWidth="1" />
    <line x1="5" y1="25" x2="95" y2="75" stroke="hsl(var(--foreground) / 0.3)" strokeWidth="1" />
    <line x1="5" y1="75" x2="95" y2="25" stroke="hsl(var(--foreground) / 0.3)" strokeWidth="1" />
  </svg>
);

const TheNexusSVG = () => (
  <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
     <defs>
        <filter id="nexusGlowSmall" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
    <circle cx="40" cy="40" r="30" fill="hsl(var(--primary) / 0.3)" filter="url(#nexusGlowSmall)" />
    <circle cx="40" cy="40" r="22" fill="hsl(var(--accent) / 0.5)" />
    <circle cx="40" cy="40" r="14" fill="hsl(var(--destructive))" />
    <circle cx="40" cy="40" r="6" fill="hsl(var(--foreground))" />
  </svg>
);

const RocketWithTrailSVG = ({ className, trailColorClass = "text-primary" }: { className?: string; trailColorClass?: string; }) => (
  <svg viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg" className={cn("w-32 h-16 md:w-40 md:h-20", className)}>
    <defs>
       <filter id="rocketGlow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    {/* Rocket Body */}
    <path d="M150 50 Q145 30 120 25 L115 20 Q125 10 140 10 Q165 20 170 45 L175 60 Q165 70 140 70 Q125 70 115 65 L120 60 Q145 55 150 50Z" fill="hsl(var(--foreground) / 0.9)" stroke="hsl(var(--card-foreground))" strokeWidth="1" filter="url(#rocketGlow)" />
    {/* Window */}
    <circle cx="155" cy="48" r="7" fill="hsl(var(--primary))" stroke="hsl(var(--background))" strokeWidth="1.5" />
    {/* Fins */}
    <path d="M120 25 L100 10 L110 23 Z" fill="hsl(var(--muted))" />
    <path d="M120 60 L100 75 L110 62 Z" fill="hsl(var(--muted))" />
    <path d="M130 35 L120 30 L125 48 L120 55 L130 50 Z" fill="hsl(var(--destructive))" />
    {/* Dashed Trail */}
    <path 
      d="M20 50 C40 30, 70 30, 90 50 S110 70, 130 50" 
      stroke="currentColor" 
      strokeWidth="3" 
      fill="none" 
      strokeDasharray="8, 8" 
      className={cn("opacity-75", trailColorClass)}
    />
  </svg>
);


export default function HomePage() {
  const { setContactModalOpen } = useSupport();

  return (
    <div className="relative min-h-screen flex flex-col">
      <AnimatedBackground />
      <Navbar />

      <main
        className={cn(
          "flex-grow z-10 container mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden" // Added overflow-hidden to main
        )}
      >
        {/* Initial Path Segment - "Mission Start" */}
        <ScrollAnimate transitionDelay="0ms">
          <div className="text-center pt-24 pb-8 md:pt-28 md:pb-12">
            <h2 className="text-4xl md:text-5xl font-headline mb-4 text-gradient-purple-orange">Mission Start</h2>
            <div className="journey-path-segment text-primary mx-auto" style={{ height: '60px' }}></div>
          </div>
        </ScrollAnimate>
        
        <ScrollAnimate transitionDelay="50ms" className="flex justify-start -mt-8 ml-4 md:ml-12 opacity-80">
            <RocketWithTrailSVG className="-rotate-[15deg]" trailColorClass="text-primary" />
        </ScrollAnimate>


        {/* Planet 1: Neon Prime (Hero Section) */}
        <ScrollAnimate transitionDelay="100ms">
          <section id="home" className="planet-section text-center">
            <div className="planet-image-container w-48 h-48 md:w-60 md:h-60">
              <NeonPrimeSVG />
            </div>
            <h2 className="planet-name">Neon Prime</h2>
            <h1 className="text-5xl md:text-7xl font-headline font-bold mb-6">
              Welcome to <span className="text-primary">Neon</span><span className="text-accent">Verse</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto">
              Dive into a universe of high-octane games, vibrant communities, and retro-futuristic vibes.
            </p>
            <Button variant="cta" size="lg" className="text-lg px-8 py-4 group" asChild>
              <Link href="/join">
                Join The Universe <ArrowRightIcon className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </section>
        </ScrollAnimate>

        <ScrollAnimate transitionDelay="200ms">
          <div className="journey-path-segment text-accent mx-auto" style={{ height: '100px' }}></div>
        </ScrollAnimate>

        <ScrollAnimate transitionDelay="250ms" className="flex justify-end -mt-10 mr-4 md:mr-16 opacity-90">
            <RocketWithTrailSVG className="rotate-[5deg]" trailColorClass="text-accent" />
        </ScrollAnimate>

        {/* Planet 2: Streamer's Orbit (Twitch Livestream Section) */}
        <ScrollAnimate transitionDelay="300ms">
          <section id="livestream" className="planet-section">
             <div className="planet-image-container w-44 h-44 md:w-52 md:h-52">
              <StreamersOrbitSVG />
            </div>
            <h2 className="planet-name">Streamer's Orbit</h2>
            <h3 className="text-4xl font-headline font-bold text-center mb-10 text-foreground">
              Live <span className="text-destructive">Now</span>
            </h3>
            <div className="max-w-4xl mx-auto px-4">
              <TwitchEmbed channel="afterhoursaz" />
            </div>
          </section>
        </ScrollAnimate>

        <ScrollAnimate transitionDelay="400ms">
          <div className="journey-path-segment text-destructive mx-auto" style={{ height: '100px' }}></div>
        </ScrollAnimate>
        
        <ScrollAnimate transitionDelay="450ms" className="flex justify-center -mt-8 opacity-80">
            <RocketWithTrailSVG className="rotate-[0deg]" trailColorClass="text-destructive" />
        </ScrollAnimate>


        {/* Planet 3: Help Hub Xylos (FAQ Section) */}
        <ScrollAnimate transitionDelay="500ms">
          <section id="faq" className="planet-section">
            <div className="planet-image-container w-40 h-40 md:w-48 md:h-48">
              <HelpHubXylosSVG />
            </div>
            <h2 className="planet-name">Help Hub Xylos</h2>
            <h3 className="text-4xl font-headline font-bold text-center mb-10 text-foreground">
              Frequently Asked <span className="text-accent">Questions</span>
            </h3>
            <div className="max-w-3xl mx-auto">
              <FAQSection />
            </div>
          </section>
        </ScrollAnimate>

        <ScrollAnimate transitionDelay="600ms">
          <div className="journey-path-segment text-primary mx-auto" style={{ height: '100px' }}></div>
        </ScrollAnimate>

        {/* Planet 4: The Nexus (Footer section) */}
        <ScrollAnimate transitionDelay="700ms">
          <footer className="planet-section text-center text-muted-foreground border-t border-border/20 mt-12 pb-12 md:pb-16">
            <div className="planet-image-container w-32 h-32 md:w-36 md:h-36 opacity-80">
              <TheNexusSVG />
            </div>
            <h2 className="planet-name">The Nexus</h2>
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
            <div className="journey-path-segment text-accent mx-auto mt-10" style={{ height: '40px', opacity: 0.6 }}></div>
            <div className="text-center pt-8 pb-4">
              <p className="text-3xl md:text-4xl font-headline text-gradient-purple-orange">Journey's End</p>
            </div>
          </footer>
        </ScrollAnimate>
      </main>
    </div>
  );
}
    

    