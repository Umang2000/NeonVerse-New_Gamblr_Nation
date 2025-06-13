
"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import ChatInterface from './ChatInterface';
import { MessageSquareIcon, XIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

const FloatingChatButton: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <>
      <Button
        variant="default" // This will be overridden by cn() for specific styling
        onClick={() => setIsChatOpen(!isChatOpen)}
        className={cn(
          "fixed bottom-6 right-6 z-50 rounded-full w-14 h-14 p-0 flex items-center justify-center shadow-xl hover:scale-110 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-all duration-200",
          isChatOpen 
            ? "bg-accent hover:bg-accent/90 text-accent-foreground hover:shadow-neon-accent" 
            : "bg-primary hover:bg-primary/90 text-primary-foreground hover:shadow-neon-primary"
        )}
        aria-label={isChatOpen ? "Close chat" : "Open chat"}
      >
        {isChatOpen ? <XIcon className="h-7 w-7" /> : <MessageSquareIcon className="h-7 w-7" />}
      </Button>

      {isChatOpen && (
        <div 
          className="fixed bottom-[5.75rem] right-6 z-40 w-full max-w-sm h-[calc(100vh-8rem)] max-h-[550px] rounded-lg shadow-2xl border border-border/50 flex flex-col overflow-hidden bg-card data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-bottom-full data-[state=open]:slide-in-from-bottom-12"
          data-state={isChatOpen ? "open" : "closed"}
        >
          <ChatInterface />
        </div>
      )}
    </>
  );
};

export default FloatingChatButton;
