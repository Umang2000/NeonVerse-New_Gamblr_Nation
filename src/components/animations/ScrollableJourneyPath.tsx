
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

const ROCKET_VIEWBOX_WIDTH = 24;
const ROCKET_VIEWBOX_HEIGHT = 38;
const ROCKET_CENTER_X = ROCKET_VIEWBOX_WIDTH / 2; // 12
const ROCKET_CENTER_Y = ROCKET_VIEWBOX_HEIGHT / 2; // 19

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
    
    // For an upward-pointing SVG, +90 degrees aligns its "up" with the path's tangent (direction of travel)
    const rotationAdjustment = 90; 
    const scaleFactor = 0.2; 
 
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercentage = docHeight > 0 ? Math.min(1, Math.max(0, scrollY / docHeight)) : 0;
      
      const drawLength = scrollPercentage * pathLength;
      pathNode.style.strokeDashoffset = `${pathLength - drawLength}`;

      const currentPointLength = Math.max(0, Math.min(drawLength, pathLength - 0.01)); 
      const point = pathNode.getPointAtLength(currentPointLength);
      
      const lookAheadLength = Math.min(currentPointLength + 1, pathLength - 0.001); 
      const nextPoint = pathNode.getPointAtLength(lookAheadLength);
      
      let angle = 0;
      if (point && nextPoint && (nextPoint.x !== point.x || nextPoint.y !== point.y)) {
        angle = Math.atan2(nextPoint.y - point.y, nextPoint.x - point.x) * (180 / Math.PI);
      } else if (point && currentPointLength > 0) { // Fallback for the very end or if path is perfectly vertical/horizontal
        const lookBehindLength = Math.max(0, currentPointLength - 1);
        const prevPoint = pathNode.getPointAtLength(lookBehindLength);
        if (prevPoint && (point.x !== prevPoint.x || point.y !== prevPoint.y)) {
           angle = Math.atan2(point.y - prevPoint.y, point.x - prevPoint.x) * (180 / Math.PI);
        }
      } else if (point && pathLength > 0) { // Fallback for the very start
         const startLookAhead = pathNode.getPointAtLength(Math.min(1, pathLength - 0.001));
         angle = Math.atan2(startLookAhead.y - point.y, startLookAhead.x - point.x) * (180 / Math.PI);
      }
      
      // Adjust translation to align rocket's center (ROCKET_CENTER_X, ROCKET_CENTER_Y in its local coords) with the path point
      const translateX = point.x - ROCKET_CENTER_X;
      const translateY = point.y - ROCKET_CENTER_Y;

      rocketNode.style.transform = `translate(${translateX - 200}px, ${translateY - 460}px) rotate(${angle + rotationAdjustment}deg) scale(${scaleFactor})`;
    };

    handleScroll(); 

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [pathLength]);

  return (
    <div 
      className="fixed inset-0 z-0 pointer-events-none" 
    >
      <svg 
        ref={svgRef} 
        width="100%" 
        height="100%" 
        viewBox="0 0 500 1000" 
        preserveAspectRatio="xMidYMax meet" 
        className="overflow-visible"
      >
        {/* Path 1: Faded Background Track */}
        <path
          d={pathData}
          fill="none"
          stroke="hsl(var(--border) / 0.3)" 
          strokeWidth="2.5" 
          strokeDasharray="5 5" 
        />
        {/* Path 2: Colored Revealed Trail */}
        <path
          ref={revealedPathRef}
          d={pathData}
          fill="none"
          stroke="hsl(var(--primary))" 
          strokeWidth="3" 
          strokeLinecap="round" 
        />
        {/* Rocket - transform-origin is center center by default for CSS transforms on g if not specified for SVG transforms */}
        <g ref={rocketRef} style={{ transformOrigin: 'center center' }}> 
          <VerticalRocketSVG accentColor="hsl(var(--primary))" className="w-full h-full"/>
        </g>
      </svg>
    </div>
  );
};

export default ScrollableJourneyPath;
    
