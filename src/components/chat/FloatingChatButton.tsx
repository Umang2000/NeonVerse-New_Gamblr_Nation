
"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { MessageSquareIcon, XIcon } from 'lucide-react'; // Keep XIcon if needed for future logic, or remove if strictly open-only
import { cn } from '@/lib/utils';
import { useChat } from '@/context/ChatContext'; // Import useChat

interface FloatingChatButtonProps {
  // onToggle and isOpen are no longer passed as props
}

const FloatingChatButton: React.FC<FloatingChatButtonProps> = () => {
  const { isChatSidebarOpen, toggleChatSidebar } = useChat(); // Use context

  return (
    <Button
      variant="default"
      onClick={toggleChatSidebar} // Use toggle function from context
      className={cn(
        "fixed bottom-6 left-6 z-[60] rounded-full w-14 h-14 p-0 flex items-center justify-center shadow-xl hover:scale-110 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-all duration-200",
        isChatSidebarOpen ? "hidden" : "flex", // Hide if open, show if closed, based on context state
        "bg-primary hover:bg-primary/90 text-primary-foreground shadow-neon-primary"
      )}
      aria-label={isChatSidebarOpen ? "Chat is open" : "Open chat sidebar"}
    >
      <MessageSquareIcon className="h-7 w-7" />
    </Button>
  );
};

export default FloatingChatButton;
