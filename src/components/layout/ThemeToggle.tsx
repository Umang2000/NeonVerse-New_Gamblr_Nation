
// src/components/layout/ThemeToggle.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { MoonIcon, SparklesIcon } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const ThemeToggle: React.FC = () => {
  const [isPulseMode, setIsPulseMode] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem('themePreference');
    const prefersPulse = storedTheme === 'night-pulse';
    setIsPulseMode(prefersPulse);
    applyTheme(prefersPulse);
  }, []);

  const applyTheme = (pulseEnabled: boolean) => {
    if (pulseEnabled) {
      document.documentElement.className = 'dark theme-night-pulse';
    } else {
      document.documentElement.className = 'dark';
    }
  };

  const handleThemeChange = (checked: boolean) => {
    setIsPulseMode(checked);
    localStorage.setItem('themePreference', checked ? 'night-pulse' : 'night');
    applyTheme(checked);
  };

  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center space-x-2">
            <Switch
              id="theme-mode"
              checked={isPulseMode}
              onCheckedChange={handleThemeChange}
              aria-label={isPulseMode ? "Switch to standard glow" : "Switch to enhanced glow"}
            />
            <Label
              htmlFor="theme-mode"
              className="cursor-pointer p-0 flex items-center justify-center bg-transparent"
            >
              {isPulseMode ? (
                <span className="inline-block neon-shadow-destructive bg-transparent">
                  <SparklesIcon className="text-destructive h-5 w-5" />
                </span>
              ) : (
                <span className="inline-block neon-shadow-primary bg-transparent">
                  <MoonIcon className="text-primary h-5 w-5" />
                </span>
              )}
            </Label>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>{isPulseMode ? 'Enhanced Glow Active' : 'Standard Glow Active'}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ThemeToggle;
