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
  triggerOnce?: boolean;
  transitionDelay?: string; // e.g., "0ms", "100ms", "0.2s"
}

const ScrollAnimate: React.FC<ScrollAnimateProps> = ({
  children,
  className,
  animationBaseClass = 'scroll-animated-item',
  animationVisibleClass = 'is-visible',
  threshold = 0.1, // Trigger when 10% of the element is visible
  triggerOnce = true, // Animate only once
  transitionDelay = '0s', // Default no delay
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (triggerOnce && domRef.current) {
              observer.unobserve(domRef.current);
            }
          }
          // If triggerOnce is false, you might add an "else" block here
          // to set isVisible to false and re-animate on scroll out.
          // For now, with triggerOnce=true, it animates in and stays.
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
  }, [threshold, triggerOnce]);

  const itemStyle: CSSProperties = {
    transitionDelay: transitionDelay,
  };

  return (
    <div
      ref={domRef}
      className={cn(
        animationBaseClass, // Base styles (initial state)
        isVisible && animationVisibleClass, // Styles for visible/animated state
        className // Any additional custom classes
      )}
      style={itemStyle} // Apply transition delay
    >
      {children}
    </div>
  );
};

export default ScrollAnimate;
