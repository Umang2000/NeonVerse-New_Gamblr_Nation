
// src/components/layout/ThemeToggle.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { MoonIcon, SparklesIcon } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

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
          <MoonIcon className={cn("h-5 w-5", isPulseMode ? "text-gray-500" : "text-primary")} />
            <Switch
              checked={isPulseMode}
              onCheckedChange={handleThemeChange}
              aria-label={isPulseMode ? "Switch to standard glow" : "Switch to enhanced glow"}
              className={isPulseMode ? 'data-[state=checked]:icon-glow-destructive' : 'data-[state=unchecked]:icon-glow-primary'}           
           />
            <Label
              htmlFor="theme-mode"
              className={cn(
                "cursor-pointer p-0 flex items-center justify-center bg-transparent", // Base styles for the label
              )}
            >
            </Label>
            <SparklesIcon className={cn("h-5 w-5", isPulseMode ? "text-destructive" : "text-gray-500")} />
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
