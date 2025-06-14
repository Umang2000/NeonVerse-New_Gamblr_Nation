
"use client";

import React from 'react';
import { cn } from '@/lib/utils';

// Planet SVGs as functional components
export const NeonPrimeSVG = () => (
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

export const StreamersOrbitSVG = () => (
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

export const HelpHubXylosSVG = () => (
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

export const TheNexusSVG = () => (
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

export const VerticalRocketSVG = ({ className, accentColor = "hsl(var(--accent))" }: { className?: string; accentColor?: string; }) => (
  <svg viewBox="0 0 24 38" xmlns="http://www.w3.org/2000/svg" className={cn("w-6 h-[38px] rocket-svg", className)}>
    <g transform="rotate(180 12 18.5)">
      {/* Fins */}
      <path d="M4 28 L1 36 L5 34 Z" fill="#B0B0B0" />
      <path d="M20 28 L23 36 L19 34 Z" fill="#B0B0B0" />
      {/* Body */}
      <path d="M6 32 C6 34, 8 36, 12 36 C16 36, 18 34, 18 32 L18 10 C18 4, 12 1, 12 1 C12 1, 6 4, 6 10 Z" fill="#D3D3D3" />
      {/* Nose Cone */}
      <path d="M12 1 C12 1, 15 5, 15 10 L9 10 C9 5, 12 1, 12 1 Z" fill="#FFFFFF" />
      {/* Thruster detail (circle at the bottom) */}
      <circle cx="12" cy="33" r="3.5" fill={accentColor} stroke="#4A4A4A" strokeWidth="0.5" />
      <circle cx="12" cy="33" r="1.5" fill="hsl(var(--background))" opacity="0.7"/>
    </g>
  </svg>
);
