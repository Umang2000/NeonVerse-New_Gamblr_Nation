
"use client";

// Removed useState for isChatSidebarOpen, it's now global
import Link from 'next/link';
import AnimatedBackground from '@/components/ui/AnimatedBackground';
import Navbar from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import FooterYear from '@/components/layout/FooterYear';
import { ArrowRightIcon, MailIcon } from 'lucide-react'; // XIcon removed as chat close is handled within ChatInterface
// FloatingChatButton and ChatInterface removed, they are now global
import TwitchEmbed from '@/components/media/TwitchEmbed';
import FAQSection from '@/components/page/FAQSection';
import { useSupport } from '@/context/SupportContext';
import { cn } from '@/lib/utils';
// Game data and GameCard import removed as games are on join page

export default function HomePage() {
  // isChatSidebarOpen and setIsChatSidebarOpen removed
  const { setContactModalOpen } = useSupport();

  // getMarginClasses function removed, this logic is now in RootLayout

  return (
    <div className="relative min-h-screen flex flex-col">
      <AnimatedBackground />
      <Navbar /> {/* Each page will render its own specific Navbar */}

      {/* The main content structure is now simplified as chat sidebar and its margin adjustments are global */}
      <main
        className={cn(
          "flex-grow z-10 container mx-auto px-4 sm:px-6 lg:px-8"
          // No dynamic margin classes here, handled by RootLayout's main tag
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
          <Button variant="cta" size="lg" className="text-lg px-8 py-4 group" asChild>
            <Link href="/join">
              Join The Universe <ArrowRightIcon className="ml-2 h-5 w-5" />
            </Link>
          </Button>
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

        {/* FAQ Section */}
        <section id="faq" className="py-12">
          <h2 className="text-4xl font-headline font-bold text-center mb-10">
            Frequently Asked <span className="text-accent">Questions</span>
          </h2>
          <div className="max-w-3xl mx-auto">
            <FAQSection />
          </div>
        </section>

        {/* Footer section */}
        <footer className="py-8 text-center text-muted-foreground border-t border-border/20 mt-12">
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
      </main>

      {/* Chat Sidebar and FloatingChatButton removed from here, they are in RootLayout */}
    </div>
  );
}
