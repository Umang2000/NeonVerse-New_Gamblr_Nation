// src/components/ui/ScrollAnimate.tsx
"use client";
import React, { useEffect, useRef, useState, type CSSProperties } from 'react';
import { cn } from '@/lib/utils';

interface ScrollAnimateProps {
  children: React.ReactNode;
  className?: string; // Additional classes for the wrapper div
  animationBaseClass?: string; // e.g., 'scroll-animated-item'
  animationVisibleClass?: string; // e.g., 'is-visible'
  threshold?: number;
  transitionDelay?: string; // e.g., "0ms", "100ms", "0.2s"
  // triggerOnce prop removed to allow animation in and out
}

const ScrollAnimate: React.FC<ScrollAnimateProps> = ({
  children,
  className,
  animationBaseClass = 'scroll-animated-item',
  animationVisibleClass = 'is-visible',
  threshold = 0.1, 
  transitionDelay = '0s',
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting); // Animate in and out
        });
      },
      { threshold }
    );

    const currentRef = domRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold]);

  const itemStyle: CSSProperties = {
    transitionDelay: isVisible ? transitionDelay : '0s', 
  };

  return (
    <div
      ref={domRef}
      className={cn(
        animationBaseClass,
        isVisible && animationVisibleClass,
        className
      )}
      style={itemStyle}
    >
      {children}
    </div>
  );
};

export default ScrollAnimate;
