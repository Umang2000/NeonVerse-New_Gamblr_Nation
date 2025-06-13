
"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { PanelRightClose, PanelRightOpen } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FloatingChatButtonProps {
  onToggle: () => void;
  isOpen: boolean;
}

const FloatingChatButton: React.FC<FloatingChatButtonProps> = ({ onToggle, isOpen }) => {
  return (
    <Button
      variant="default"
      onClick={onToggle}
      className={cn(
        "fixed bottom-6 right-6 z-[60] rounded-full w-14 h-14 p-0 flex items-center justify-center shadow-xl hover:scale-110 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-all duration-200",
        isOpen ? "hidden" : "flex", // Hide if open, show if closed
        isOpen // Styling for the button based on its conceptual state (even if hidden when open)
          ? "bg-accent hover:bg-accent/90 text-accent-foreground hover:shadow-neon-accent"
          : "bg-primary hover:bg-primary/90 text-primary-foreground hover:shadow-neon-primary"
      )}
      aria-label={isOpen ? "Close chat sidebar" : "Open chat sidebar"}
    >
      {/* Icon always reflects action to take: Open if closed, Close if open (conceptually) */}
      {/* Since the button is hidden when open, it will effectively always show PanelRightOpen */}
      {isOpen ? <PanelRightClose className="h-7 w-7" /> : <PanelRightOpen className="h-7 w-7" />}
    </Button>
  );
};

export default FloatingChatButton;
