// src/components/animations/ScrollableJourneyPath.tsx
"use client";

import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

// Rocket SVG (moved here for encapsulation, can be a separate component too)
const VerticalRocketSVG = ({ className, accentColor = "hsl(var(--accent))", rocketColor = "#D3D3D3", noseColor = "#FFFFFF", finColor = "#B0B0B0" }: { className?: string; accentColor?: string; rocketColor?: string; noseColor?: string; finColor?: string; }) => (
  <svg viewBox="0 0 24 38" xmlns="http://www.w3.org/2000/svg" className={cn("w-5 h-[32px] overflow-visible", className)}> {/* Adjusted size */}
    {/* Fins */}
    <path d={`M4 28 L1 36 L5 34 Z`} fill={finColor} />
    <path d={`M20 28 L23 36 L19 34 Z`} fill={finColor} />
    {/* Body */}
    <path d={`M6 32 C6 34, 8 36, 12 36 C16 36, 18 34, 18 32 L18 10 C18 4, 12 1, 12 1 C12 1, 6 4, 6 10 Z`} fill={rocketColor} />
    {/* Nose Cone */}
    <path d={`M12 1 C12 1, 15 5, 15 10 L9 10 C9 5, 12 1, 12 1 Z`} fill={noseColor} />
    {/* Thruster detail */}
    <circle cx="12" cy="33" r="3.5" fill={accentColor} stroke="#4A4A4A" strokeWidth="0.5" />
    <circle cx="12" cy="33" r="1.5" fill="hsl(var(--background))" opacity="0.7"/>
  </svg>
);

const ScrollableJourneyPath: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const revealedPathRef = useRef<SVGPathElement>(null);
  const rocketRef = useRef<SVGGElement>(null);

  const [pathLength, setPathLength] = useState(0);

  // Define a winding path. Coordinates are illustrative and need careful adjustment.
  // This path starts top-ish, goes down, wiggles, and continues.
  // Values are percentages of the SVG viewbox (0-1000).
  const pathData = "M 100 50 C 100 150, 300 150, 300 250 S 100 350, 100 450 C 100 550, 400 550, 400 650 S 200 750, 200 850 S 350 950, 350 1000";


  useEffect(() => {
    if (revealedPathRef.current) {
      const length = revealedPathRef.current.getTotalLength();
      setPathLength(length);
      revealedPathRef.current.style.strokeDasharray = `${length} ${length}`;
      revealedPathRef.current.style.strokeDashoffset = `${length}`;
    }
  }, [pathData]); // Recalculate if pathData changes

  useEffect(() => {
    if (!revealedPathRef.current || !rocketRef.current || pathLength === 0) return;

    const pathNode = revealedPathRef.current;
    const rocketNode = rocketRef.current;

    const handleScroll = () => {
      const scrollPercentage = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      const drawLength = scrollPercentage * pathLength;
      
      // Animate path drawing
      pathNode.style.strokeDashoffset = `${pathLength - drawLength}`;

      // Animate rocket position and rotation
      // Ensure drawLength does not exceed pathLength or go below 0
      const currentPointLength = Math.max(0, Math.min(drawLength, pathLength));
      const point = pathNode.getPointAtLength(currentPointLength);
      
      // For rotation, get a point slightly ahead to calculate the angle
      const lookAheadLength = Math.min(currentPointLength + 1, pathLength);
      const nextPoint = pathNode.getPointAtLength(lookAheadLength);
      
      let angle = 0;
      if (point && nextPoint) {
        angle = Math.atan2(nextPoint.y - point.y, nextPoint.x - point.x) * (180 / Math.PI);
      }
      // Rocket SVG points upwards (0 deg is right). Add 90 deg if SVG is vertical up.
      // Since our VerticalRocketSVG points upwards (towards its Y=0), and SVG angle 0 is X-axis positive
      // an angle calculated from points needs adjustment. If rocket points up, add -90.
      const rotationAdjustment = -90; 
      rocketNode.style.transform = `translate(${point.x}px, ${point.y}px) rotate(${angle + rotationAdjustment}deg)`;
    };

    // Initial position
    handleScroll(); 

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [pathLength]); // Re-attach listener if pathLength changes

  return (
    <div 
      className="fixed inset-0 z-0 pointer-events-none" // z-0 to be behind main content
    >
      <svg 
        ref={svgRef} 
        width="100%" 
        height="100%" 
        viewBox="0 0 500 1000" // Example viewBox, adjust based on pathData and desired scale
        preserveAspectRatio="xMidYMax meet" // Ensures path scales nicely but might need adjustment
        className="overflow-visible"
      >
        {/* Path 1: Faded Background Track */}
        <path
          d={pathData}
          fill="none"
          stroke="hsl(var(--border) / 0.3)"
          strokeWidth="3"
          strokeDasharray="6 6" // Dashed appearance
        />
        {/* Path 2: Colored Revealed Trail */}
        <path
          ref={revealedPathRef}
          d={pathData}
          fill="none"
          stroke="hsl(var(--primary))" // Theme color
          strokeWidth="3.5" // Slightly thicker to overlay nicely
          strokeLinecap="round" // Nicer ends for dashes
          strokeDasharray="6 6" // Will be overridden by JS for drawing animation, but keeps dashed style
        />
        {/* Rocket - pointing upwards by default, rotation applied by JS */}
        <g ref={rocketRef} style={{ transformOrigin: 'center center' }}> {/* transform-origin for rocket itself */}
          <VerticalRocketSVG accentColor="hsl(var(--primary))" />
        </g>
      </svg>
    </div>
  );
};

export default ScrollableJourneyPath;
