"use client";

import React, { useState, useEffect, useRef } from 'react';
import ChatBubble from './ChatBubble';
import ChatInput from './ChatInput';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { v4 as uuidv4 } from 'uuid';  // Import UUID for unique message IDs

interface User {
  name: string;
  avatarUrl?: string;
  isCurrentUser?: boolean;
  nameGradient?: 'purple-orange' | 'blue-purple';
  isOnline?: boolean;
}

interface Message {
  id: string;
  user: User;
  message: string;
  timestamp: string;
}

const initialMessages: Message[] = [
  {
    id: '1',
    user: { name: 'NeonPlayerX', avatarUrl: 'https://placehold.co/40x40/00cfff/0e0e0e.png?text=NX', nameGradient: 'blue-purple', isOnline: true },
    message: 'Hey everyone! This NeonVerse theme is sick! 🔥',
    timestamp: '10:00 AM',
  },
  {
    id: '2',
    user: { name: 'SynthWaveRider', avatarUrl: 'https://placehold.co/40x40/a855f7/0e0e0e.png?text=SR', nameGradient: 'purple-orange', isCurrentUser: true, isOnline: true },
    message: 'Totally agree! The glows are amazing. ✨',
    timestamp: '10:01 AM',
  },
  {
    id: '3',
    user: { name: 'BytePioneer', avatarUrl: 'https://placehold.co/40x40/ff6a00/0e0e0e.png?text=BP', nameGradient: 'blue-purple', isOnline: false },
    message: 'Anyone up for a match in "Cosmic Drift"? The new update is live!',
    timestamp: '10:02 AM',
  },
  {
    id: '4',
    user: { name: 'GlitchMaster', avatarUrl: 'https://placehold.co/40x40/00cfff/0e0e0e.png?text=GM', nameGradient: 'blue-purple', isOnline: true },
    message: 'Just joined! Loving the vibes here.',
    timestamp: '10:03 AM',
  },
];

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = (newMessageText: string) => {
    const newMessage: Message = {
      id: uuidv4(),  // Use UUID for unique IDs
      user: {
        name: 'SynthWaveRider', // Current user
        avatarUrl: 'https://placehold.co/40x40/a855f7/0e0e0e.png?text=SR',
        isCurrentUser: true,
        nameGradient: 'purple-orange',
        isOnline: true,
      },
      message: newMessageText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  useEffect(() => {
    if (scrollAreaRef.current) {
      const viewport = scrollAreaRef.current.querySelector('div[data-radix-scroll-area-viewport]');
      if (viewport) {
        viewport.scrollTop = viewport.scrollHeight;
      }
    }
  }, [messages]);

  return (
    <div className={cn(
      "flex flex-col h-full w-full overflow-hidden",
      "pt-20" // Added pt-20 to account for Navbar height
    )}>
      <div className="p-4 border-b border-border/30">
        <h2 className="text-xl font-headline text-center text-primary">Live Chat Lobby</h2>
      </div>
      <ScrollArea className="flex-grow p-4" ref={scrollAreaRef}>
        <div className="space-y-4">
          {messages.map((msg) => (
            <ChatBubble
              key={msg.id}
              user={msg.user}
              message={msg.message}
              timestamp={msg.timestamp}
            />
          ))}
        </div>
      </ScrollArea>
      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default ChatInterface;
