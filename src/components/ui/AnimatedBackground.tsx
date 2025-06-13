"use client";

import React, { useEffect, useState } from 'react';

const AnimatedBackground: React.FC = () => {
  const [stars, setStars] = useState<React.ReactNode[]>([]);

  useEffect(() => {
    const numStars = 100;
    const newStars = [];
    for (let i = 0; i < numStars; i++) {
      const style: React.CSSProperties = {
        position: 'absolute',
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        width: `${Math.random() * 2 + 1}px`,
        height: `${Math.random() * 2 + 1}px`,
        backgroundColor: 'hsl(var(--foreground))',
        borderRadius: '50%',
        animationName: 'twinkle',
        animationDuration: `${Math.random() * 5 + 2}s`,
        animationTimingFunction: 'ease-in-out',
        animationIterationCount: 'infinite',
        animationDelay: `${Math.random() * 3}s`,
        opacity: Math.random() * 0.5 + 0.2, // Initial opacity
      };
      newStars.push(<div key={`star-${i}`} style={style} />);
    }
    setStars(newStars);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-background">
      <div className="aurora-overlay" />
      <div className="relative w-full h-full">
        {stars}
      </div>
    </div>
  );
};

export default AnimatedBackground;
