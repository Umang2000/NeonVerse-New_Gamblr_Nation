
"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { MessageSquareIcon } from 'lucide-react'; // Changed icon
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
        "bg-primary hover:bg-primary/90 text-primary-foreground shadow-neon-primary" // Consistent styling, added shadow-neon-primary
      )}
      aria-label={isOpen ? "Chat is open" : "Open chat sidebar"} // Aria label updated
    >
      {/* Icon always reflects action to take: Open chat. Button is hidden when chat is open. */}
      <MessageSquareIcon className="h-7 w-7" />
    </Button>
  );
};

export default FloatingChatButton;

