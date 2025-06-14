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
  style?: React.CSSProperties; // Moved inside the interface
}

const ScrollAnimate: React.FC<ScrollAnimateProps> = ({
  children,
  className,
  animationBaseClass = 'scroll-animated-item',
  animationVisibleClass = 'is-visible',
  threshold = 0.1, // Trigger when 10% of the element is visible
  transitionDelay = '0s', // Default no delay
  style, // Added to destructuring
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Set visibility based on whether the element is intersecting
          setIsVisible(entry.isIntersecting);
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
  }, [threshold]); // Rerun observer if threshold changes

  const itemStyle: CSSProperties = {
    transitionDelay: isVisible ? transitionDelay : '0s', // Apply delay only for "in" animation
    ...style, // Spread the passed style prop
  };

  return (
    <div
      ref={domRef}
      className={cn(
        animationBaseClass, // Base styles (initial state)
        isVisible && animationVisibleClass, // Styles for visible/animated state
        className // Any additional custom classes
      )}
      style={itemStyle} // Apply combined styles
    >
      {children}
    </div>
  );
};

export default ScrollAnimate;
