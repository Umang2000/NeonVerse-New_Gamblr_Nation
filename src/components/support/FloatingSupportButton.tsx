
"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { HelpCircleIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FloatingSupportButtonProps {
  onToggle: () => void;
  isOpen: boolean;
}

const FloatingSupportButton: React.FC<FloatingSupportButtonProps> = ({ onToggle, isOpen }) => {
  return (
    <Button
      variant="default"
      onClick={onToggle}
      className={cn(
        "fixed bottom-6 right-6 z-[60] rounded-full w-14 h-14 p-0 flex items-center justify-center shadow-xl hover:scale-110 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-all duration-200",
        isOpen ? "hidden" : "flex", 
        "bg-accent hover:bg-accent/90 text-accent-foreground shadow-neon-accent"
      )}
      aria-label={isOpen ? "Support sidebar is open" : "Open support sidebar"}
    >
      <HelpCircleIcon className="h-7 w-7" />
    </Button>
  );
};

export default FloatingSupportButton;
