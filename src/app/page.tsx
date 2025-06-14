
"use client";

import Link from 'next/link';
import AnimatedBackground from '@/components/ui/AnimatedBackground';
import Navbar from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import FooterYear from '@/components/layout/FooterYear';
import { ArrowRightIcon, MailIcon, Twitch as TwitchIconLucide } from 'lucide-react'; // Renamed Twitch
import TwitchEmbed from '@/components/media/TwitchEmbed';
import FAQSection from '@/components/page/FAQSection';
import { useSupport } from '@/context/SupportContext';
import { cn } from '@/lib/utils';
import ScrollAnimate from '@/components/ui/ScrollAnimate';
import { 
  NeonPrimeSVG, 
  StreamersOrbitSVG, 
  HelpHubXylosSVG, 
  TheNexusSVG, 
  VerticalRocketSVG 
} from '@/components/common/PlanetSVGs';
import {
  KickLogo,
  TelegramLogo,
  DiscordLogo,
  XLogo
} from '@/components/common/SocialMediaIcons';


const ROCKET_HEIGHT_PX = 38; // Height of VerticalRocketSVG

export default function HomePage() {
  const { setContactModalOpen } = useSupport();

  const journeySegments = [
    { colorClass: 'text-primary', segmentHeight: '120px' },
    { colorClass: 'text-accent', segmentHeight: '120px' },
    { colorClass: 'text-destructive', segmentHeight: '120px' },
    { colorClass: 'text-primary', segmentHeight: '120px' },
  ];

  const getAccentColorFromTextColor = (textColorClass: string) => {
    if (textColorClass === 'text-primary') return 'hsl(var(--primary))';
    if (textColorClass === 'text-accent') return 'hsl(var(--accent))';
    if (textColorClass === 'text-destructive') return 'hsl(var(--destructive))';
    return 'hsl(var(--primary))'; // Default
  };

  const socialLinks = [
    { name: 'Kick', Icon: KickLogo, href: '#' , dataAiHint: "kick logo"},
    { name: 'Twitch', Icon: TwitchIconLucide, href: '#', dataAiHint: "twitch logo" },
    { name: 'Telegram', Icon: TelegramLogo, href: '#', dataAiHint: "telegram logo" },
    { name: 'X/Twitter', Icon: XLogo, href: '#', dataAiHint: "X logo" },
    { name: 'Discord', Icon: DiscordLogo, href: '#', dataAiHint: "discord logo" },
  ];

  return (
    <div className="relative min-h-screen flex flex-col">
      <AnimatedBackground />
      <Navbar />

      <main
        className={cn(
          "flex-grow z-10 container mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden" 
        )}
      >
        {/* Initial Path Segment - "Mission Start" */}
        <ScrollAnimate>
          <div className="text-center pt-24 pb-8 md:pt-28 md:pb-12">
            <h2 className="text-4xl md:text-5xl font-headline mb-4 text-gradient-purple-orange">Mission Start</h2>
          </div>
        </ScrollAnimate>
        
        {/* Planet 1: Neon Prime (Hero Section) */}
        <ScrollAnimate>
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

        <ScrollAnimate className={journeySegments[0].colorClass} style={{ '--segment-height': journeySegments[0].segmentHeight, '--rocket-height': `${ROCKET_HEIGHT_PX}px` } as React.CSSProperties}>
            <div className="journey-segment-container" style={{ height: journeySegments[0].segmentHeight }}>
                <div className="journey-track-revealed"></div>
                <div className="journey-rocket-container p-2">
                    <VerticalRocketSVG accentColor={getAccentColorFromTextColor(journeySegments[0].colorClass)} />
                </div>
            </div>
        </ScrollAnimate>

        {/* Planet 2: Streamer's Orbit (Twitch Livestream Section) */}
        <ScrollAnimate threshold={0.25}>
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

        <ScrollAnimate className={journeySegments[1].colorClass} style={{ '--segment-height': journeySegments[1].segmentHeight, '--rocket-height': `${ROCKET_HEIGHT_PX}px` } as React.CSSProperties}>
            <div className="journey-segment-container" style={{ height: journeySegments[1].segmentHeight }}>
                <div className="journey-track-revealed"></div>
                <div className="journey-rocket-container p-3">
                     <VerticalRocketSVG accentColor={getAccentColorFromTextColor(journeySegments[1].colorClass)} />
                </div>
            </div>
        </ScrollAnimate>
        
        {/* Planet 3: Help Hub Xylos (FAQ Section) */}
        <ScrollAnimate threshold={0.25}>
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

        <ScrollAnimate className={journeySegments[2].colorClass} style={{ '--segment-height': journeySegments[2].segmentHeight, '--rocket-height': `${ROCKET_HEIGHT_PX}px` } as React.CSSProperties}>
            <div className="journey-segment-container" style={{ height: journeySegments[2].segmentHeight }}>
                <div className="journey-track-revealed"></div>
                <div className="journey-rocket-container">
                    <VerticalRocketSVG accentColor={getAccentColorFromTextColor(journeySegments[2].colorClass)}/>
                </div>
            </div>
        </ScrollAnimate>

        {/* Planet 4: The Nexus (Footer section) */}
        <ScrollAnimate>
          <footer id="page-footer" className="planet-section text-center text-muted-foreground border-t border-border/20 mt-12 pb-12 md:pb-16">
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
            
            {/* Social Media Icons */}
            <div className="flex justify-center items-center space-x-5 mt-6">
              {socialLinks.map(({ name, Icon, href, dataAiHint }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`NeonVerse on ${name}`}
                  className="text-muted-foreground hover:text-primary transition-colors duration-200"
                  data-ai-hint={dataAiHint}
                >
                  <Icon className="h-7 w-7" />
                </a>
              ))}
            </div>

            {/* Final smaller decorative journey segment */}
            <div className={cn("journey-segment-container mx-auto mt-10", journeySegments[3].colorClass)} style={{ height: '40px', opacity: 0.6 }}>
                <div className="journey-track-revealed" style={{animationDelay: '0.1s', animationDuration: '0.5s', height: '100%'}}></div>
                 {/* No rocket for the final small segment, or a very small one if desired */}
            </div>
            <div className="text-center pt-8 pb-4">
              <p className="text-3xl md:text-4xl font-headline text-gradient-purple-orange">Journey's End</p>
            </div>
          </footer>
        </ScrollAnimate>
      </main>
    </div>
  );
}


    