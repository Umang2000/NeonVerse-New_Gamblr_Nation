
"use client";

import Link from 'next/link';
import Image from 'next/image'; // Import next/image
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

export default function HomePage() {
  const { setContactModalOpen } = useSupport();

  return (
    <div className="relative min-h-screen flex flex-col">
      <AnimatedBackground />
      <Navbar />

      <main
        className={cn(
          "flex-grow z-10 container mx-auto px-4 sm:px-6 lg:px-8"
        )}
      >
        {/* Initial Path Segment - "Mission Start" */}
        <ScrollAnimate transitionDelay="0ms">
          <div className="text-center pt-24 pb-8 md:pt-28 md:pb-12">
            <h2 className="text-4xl md:text-5xl font-headline mb-4 text-gradient-purple-orange">Mission Start</h2>
            <div className="journey-path-segment text-primary mx-auto" style={{ height: '60px' }}></div>
          </div>
        </ScrollAnimate>

        {/* Planet 1: Neon Prime (Hero Section) */}
        <ScrollAnimate transitionDelay="100ms">
          <section className="planet-section text-center">
            <Image 
              src="https://placehold.co/250x250.png" 
              alt="Neon Prime" 
              width={250} 
              height={250} 
              className="planet-image mx-auto" 
              data-ai-hint="futuristic home city planet" 
            />
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
          <div className="journey-path-segment text-accent mx-auto my-8 md:my-12"></div>
        </ScrollAnimate>

        {/* Planet 2: Streamer's Orbit (Twitch Livestream Section) */}
        <ScrollAnimate transitionDelay="300ms">
          <section id="livestream" className="planet-section">
            <Image 
              src="https://placehold.co/200x200.png" 
              alt="Streamer's Orbit" 
              width={200} 
              height={200} 
              className="planet-image mx-auto"
              data-ai-hint="satellite network planet"
            />
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
          <div className="journey-path-segment text-destructive mx-auto my-8 md:my-12"></div>
        </ScrollAnimate>

        {/* Planet 3: Help Hub Xylos (FAQ Section) */}
        <ScrollAnimate transitionDelay="500ms">
          <section id="faq" className="planet-section">
            <Image 
              src="https://placehold.co/200x200.png" 
              alt="Help Hub Xylos" 
              width={200} 
              height={200} 
              className="planet-image mx-auto"
              data-ai-hint="crystalline knowledge planet"
            />
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
          <div className="journey-path-segment text-primary mx-auto my-8 md:my-12"></div>
        </ScrollAnimate>

        {/* Planet 4: The Nexus (Footer section) */}
        <ScrollAnimate transitionDelay="700ms">
          <footer className="planet-section text-center text-muted-foreground border-t border-border/20 mt-12 pb-12 md:pb-16">
            <Image 
              src="https://placehold.co/150x150.png" 
              alt="The Nexus" 
              width={150} 
              height={150} 
              className="planet-image mx-auto opacity-80"
              data-ai-hint="cosmic central hub"
            />
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
          </footer>
        </ScrollAnimate>
      </main>
    </div>
  );
}
