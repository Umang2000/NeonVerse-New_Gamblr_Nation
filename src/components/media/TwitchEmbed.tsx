
"use client";

import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import LoadingSpinner from '@/components/ui/LoadingSpinner'; // For a themed loading state

interface TwitchEmbedProps {
  channel: string;
  className?: string;
}

const TwitchEmbed: React.FC<TwitchEmbedProps> = ({ channel, className }) => {
  const [parentDomain, setParentDomain] = useState<string | null>(null);

  useEffect(() => {
    // This will only run on the client, after initial hydration
    // For local development, this might be 'localhost'
    // For production, it will be the actual domain.
    setParentDomain(window.location.hostname);
  }, []);

  if (!parentDomain) {
    return (
      <div className={cn("aspect-video w-full overflow-hidden rounded-lg border-2 border-primary shadow-neon-primary bg-card flex flex-col items-center justify-center text-center p-4", className)}>
        <LoadingSpinner />
        <p className="text-muted-foreground mt-4">Loading Twitch Stream...</p>
        <p className="text-xs text-muted-foreground/70 mt-1">(Ensuring secure connection)</p>
      </div>
    );
  }

  const twitchUrl = `https://player.twitch.tv/?channel=${channel}&parent=${parentDomain}&autoplay=false&muted=true&theme=dark`;

  return (
    <div className={cn("aspect-video w-full overflow-hidden rounded-lg border-2 border-primary shadow-neon-primary", className)}>
      <iframe
        src={twitchUrl}
        height="100%"
        width="100%"
        allowFullScreen={true}
        className="rounded-md" // rounded-md might be slightly different from parent's rounded-lg.
        title={`Twitch Stream for ${channel}`}
        scrolling="no" // Often recommended for Twitch embeds
      ></iframe>
    </div>
  );
};

export default TwitchEmbed;
