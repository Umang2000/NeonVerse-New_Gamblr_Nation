
// src/components/animations/ScrollableJourneyPath.tsx
"use client";

import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

// Rocket SVG (points upwards by default)
const VerticalRocketSVG = ({ className, accentColor = "hsl(var(--accent))", rocketColor = "#D3D3D3", noseColor = "#FFFFFF", finColor = "#B0B0B0" }: { className?: string; accentColor?: string; rocketColor?: string; noseColor?: string; finColor?: string; }) => (
  <svg viewBox="0 0 24 38" xmlns="http://www.w3.org/2000/svg" className={cn("w-full h-auto overflow-visible", className)}> {/* Base size adjusted by scale in parent */}
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
  // Values are percentages of the SVG viewbox (0-1000 for height, 0-500 for width).
  const pathData = "M 100 50 C 100 150, 300 150, 300 250 S 100 350, 100 450 C 100 550, 400 550, 400 650 S 200 750, 200 850 S 350 950, 350 1000";


  useEffect(() => {
    if (revealedPathRef.current) {
      const length = revealedPathRef.current.getTotalLength();
      setPathLength(length);
      revealedPathRef.current.style.strokeDasharray = `${length} ${length}`;
      revealedPathRef.current.style.strokeDashoffset = `${length}`; // Initially hide the revealed path
    }
  }, [pathData]); // Rerun if pathData changes, though it's static here

  useEffect(() => {
    if (!revealedPathRef.current || !rocketRef.current || pathLength === 0) return;

    const pathNode = revealedPathRef.current;
    const rocketNode = rocketRef.current;
    
    // For an upward-pointing SVG, +90 degrees aligns its "up" with the path's tangent
    const rotationAdjustment = 90; 
    const scaleFactor = 0.2; // Rocket scale factor
 
    const handleScroll = () => {
      // Calculate scroll percentage (0 to 1)
      const scrollY = window.scrollY || window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercentage = docHeight > 0 ? Math.min(1, Math.max(0, scrollY / docHeight)) : 0;
      
      // Animate path drawing: make strokeDashoffset go from pathLength to 0
      const drawLength = scrollPercentage * pathLength;
      pathNode.style.strokeDashoffset = `${pathLength - drawLength}`;

      // Animate rocket position and rotation
      // Ensure currentPointLength is slightly less than pathLength to avoid issues at the very end.
      const currentPointLength = Math.max(0, Math.min(drawLength, pathLength - 0.01)); 
      const point = pathNode.getPointAtLength(currentPointLength);
      
      // For rotation, get a point slightly ahead to calculate the angle
      // Ensure lookAhead doesn't exceed pathLength.
      const lookAheadLength = Math.min(currentPointLength + 1, pathLength); 
      const nextPoint = pathNode.getPointAtLength(lookAheadLength);
      
      let angle = 0;
      if (point && nextPoint && (nextPoint.x !== point.x || nextPoint.y !== point.y)) {
        angle = Math.atan2(nextPoint.y - point.y, nextPoint.x - point.x) * (180 / Math.PI);
      } else if (point) {
        // Fallback for the very start/end or if path is perfectly vertical/horizontal at a segment
        const lookBehindLength = Math.max(0, currentPointLength - 1);
        const prevPoint = pathNode.getPointAtLength(lookBehindLength);
        if (prevPoint && (point.x !== prevPoint.x || point.y !== prevPoint.y)) {
           angle = Math.atan2(point.y - prevPoint.y, point.x - prevPoint.x) * (180 / Math.PI);
        }
      }
      
      // Apply transform with scaling
      // The rocket SVG itself is 24 units wide, 38 units high. transform-origin is center.
      rocketNode.style.transform = `translate(${point.x - 200}px, ${point.y - 460}px) rotate(${angle + rotationAdjustment}deg) scale(${scaleFactor})`;
    };

    // Initial position and orientation
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
        viewBox="0 0 500 1000" // Example viewBox, adjust based on pathData and desired scale/aspect ratio
        preserveAspectRatio="xMidYMax meet" // Ensures path scales nicely relative to its viewBox. Consider "none" if you want full viewport stretching.
        className="overflow-visible"
      >
        {/* Path 1: Faded Background Track */}
        <path
          d={pathData}
          fill="none"
          stroke="hsl(var(--border) / 0.3)" // Fainter color for the track
          strokeWidth="2.5" // Slightly thinner path for a smaller rocket
          strokeDasharray="5 5" // Dashed appearance (5px dash, 5px gap)
        />
        {/* Path 2: Colored Revealed Trail */}
        <path
          ref={revealedPathRef}
          d={pathData}
          fill="none"
          stroke="hsl(var(--primary))" // Theme color
          strokeWidth="3" // Slightly thicker to overlay nicely, adjusted for visibility
          strokeLinecap="round" 
          // strokeDasharray and strokeDashoffset will be set by JS
        />
        {/* Rocket - pointing upwards by default, rotation and scale applied by JS */}
        <g ref={rocketRef} style={{ transformOrigin: 'center center' }}> {/* transform-origin for rocket itself, centered on its viewBox */}
          {/* Rocket SVG takes full width/height of its <g> container, scaling is applied to <g> */}
          <VerticalRocketSVG accentColor="hsl(var(--primary))" className="w-full h-full"/>
        </g>
      </svg>
    </div>
  );
};

export default ScrollableJourneyPath;

    