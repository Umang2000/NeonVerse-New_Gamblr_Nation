
"use client";

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { SendHorizonalIcon } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="sticky bottom-0 mt-auto p-4 bg-background/80 backdrop-blur-md border-t border-border shadow-lg" // Changed shadow-2xl to shadow-lg
    >
      <div className="flex items-center gap-2 bg-card/50 backdrop-blur-sm border border-border/30 rounded-lg p-2 inner-shadow focus-within:ring-2 focus-within:ring-primary">
        <Input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-grow bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0 text-foreground placeholder:text-muted-foreground"
          aria-label="Chat message input"
        />
        <Button type="submit" size="icon" variant="ghost" className="text-primary hover:text-primary/80 hover:bg-primary/10 rounded-full">
          <SendHorizonalIcon className="h-5 w-5" />
          <span className="sr-only">Send message</span>
        </Button>
      </div>
    </form>
  );
};

export default ChatInput;
