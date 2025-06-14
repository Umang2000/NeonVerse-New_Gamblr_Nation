
"use client";

import React, { useState, useEffect, useRef } from 'react';
import ChatBubble from './ChatBubble';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ShieldIcon, UsersIcon, SmileIcon, SendHorizonalIcon, InfoIcon, Loader2, XIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { v4 as uuidv4 } from 'uuid';
import ChatRulesModal from './ChatRulesModal';
import { useChat } from '@/context/ChatContext'; // Import useChat

interface User {
  name: string;
  avatarUrl?: string;
  isCurrentUser?: boolean;
  nameGradient?: 'purple-orange' | 'blue-purple';
  isOnline?: boolean;
  dataAiHint?: string;
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
    user: { name: 'NeonPlayerX', avatarUrl: 'https://placehold.co/40x40/00cfff/0e0e0e.png?text=NX', nameGradient: 'blue-purple', isOnline: true, dataAiHint: "profile avatar" },
    message: 'Hey everyone! This NeonVerse theme is sick! 🔥',
    timestamp: '10:00 AM',
  },
  {
    id: '2',
    user: { name: 'SynthWaveRider', avatarUrl: 'https://placehold.co/40x40/a855f7/0e0e0e.png?text=SR', nameGradient: 'purple-orange', isCurrentUser: true, isOnline: true, dataAiHint: "profile avatar" },
    message: 'Totally agree! The glows are amazing. ✨',
    timestamp: '10:01 AM',
  },
  {
    id: '3',
    user: { name: 'PixelProwler', avatarUrl: 'https://placehold.co/40x40/ff6a00/0e0e0e.png?text=PP', nameGradient: 'blue-purple', isOnline: false, dataAiHint: "profile avatar" },
    message: 'Looooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong message to test wrapping behavior.',
    timestamp: '10:02 AM',
  },
];

const MAX_CHARS = 160;
const COOLDOWN_DURATION_SECONDS = 3;

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { setIsChatSidebarOpen } = useChat(); // Get setIsChatSidebarOpen from context

  const [newMessageText, setNewMessageText] = useState('');
  const [remainingChars, setRemainingChars] = useState(MAX_CHARS);
  const [isCooldown, setIsCooldown] = useState(false);
  const [cooldownTimeLeft, setCooldownTimeLeft] = useState(0);
  const [isRulesModalOpen, setIsRulesModalOpen] = useState(false);

  const onlineUsers = 2; // Mocked data
  const emojis = ['😀', '😂', '👍', '❤️', '🔥', '🎉', '💀', '👽'];

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const text = event.target.value;
    if (text.length <= MAX_CHARS) {
      setNewMessageText(text);
      setRemainingChars(MAX_CHARS - text.length);
    }
  };

  const handleEmojiSelect = (emoji: string) => {
    const newText = newMessageText + emoji;
    if (newText.length <= MAX_CHARS) {
      setNewMessageText(newText);
      setRemainingChars(MAX_CHARS - newText.length);
    }
  };

  const startCooldown = () => {
    setIsCooldown(true);
    setCooldownTimeLeft(COOLDOWN_DURATION_SECONDS);
    const timer = setInterval(() => {
      setCooldownTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          setIsCooldown(false);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
  };

  const handleSendMessage = () => {
    if (newMessageText.trim() && !isCooldown) {
      const newMessageData: Message = {
        id: uuidv4(),
        user: {
          name: 'SynthWaveRider', // Current user
          avatarUrl: 'https://placehold.co/40x40/a855f7/0e0e0e.png?text=SR',
          isCurrentUser: true,
          nameGradient: 'purple-orange',
          isOnline: true,
        },
        message: newMessageText.trim(),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prevMessages) => [...prevMessages, newMessageData]);
      setNewMessageText('');
      setRemainingChars(MAX_CHARS);
      startCooldown();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage();
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
      "pt-20" // Padding top to account for global Navbar height (if any fixed navbar exists)
             // Or can be adjusted if this chat interface is always full height from top of viewport
    )}>
      {/* Header */}
      <div className="px-4 py-3 border-b border-border/30 flex items-center justify-between relative"> {/* Added relative for X button positioning */}
        <div className="flex items-center gap-x-3">
          <div className="flex items-center gap-2">
            <ShieldIcon className="h-6 w-6 text-primary icon-glow-primary" />
            <h2 className="text-xl font-headline text-primary">DEGEN CHAT</h2>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <UsersIcon className="h-4 w-4 text-accent icon-glow-accent" />
            <span>{onlineUsers} Online</span>
          </div>
        </div>
        {/* Close button for the sidebar, uses context to close */}
        <button
          onClick={() => setIsChatSidebarOpen(false)} // Use context function
          className="absolute top-1/2 -translate-y-1/2 right-3 p-2 text-primary hover:text-accent z-50 rounded-full hover:bg-primary/10 transition-colors h-8 w-8 flex items-center justify-center"
          aria-label="Close chat sidebar"
        >
          <XIcon className="h-5 w-5 icon-glow-primary" />
        </button>
      </div>

      <ScrollArea className="flex-grow" ref={scrollAreaRef}>
        <div className="space-y-0 p-0">
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

      <form
        onSubmit={handleSubmit}
        className="mt-auto p-3 bg-background/80 backdrop-blur-md border-t border-border/50 shadow-lg space-y-2"
      >
        <div className="flex items-center gap-2">
          <div className="relative flex-grow">
            <Input
              type="text"
              value={newMessageText}
              onChange={handleInputChange}
              placeholder="Type your message..."
              className="pr-10 bg-card/50 border-input focus:shadow-neon-primary focus:border-primary transition-all text-sm h-10"
              maxLength={MAX_CHARS}
              disabled={isCooldown}
            />
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 text-muted-foreground hover:text-primary">
                  <SmileIcon className="h-5 w-5" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-2 bg-popover border-border shadow-xl">
                <div className="grid grid-cols-4 gap-1">
                  {emojis.map(emoji => (
                    <Button
                      key={emoji}
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEmojiSelect(emoji)}
                      className="text-xl hover:bg-primary/10"
                    >
                      {emoji}
                    </Button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          </div>
          <Button
            type="submit"
            size="icon"
            className="w-10 h-10 bg-primary hover:bg-primary/90 text-primary-foreground shadow-neon-primary"
            disabled={isCooldown || !newMessageText.trim()}
          >
            {isCooldown ? <Loader2 className="h-5 w-5 animate-spin" /> : <SendHorizonalIcon className="h-5 w-5" />}
          </Button>
        </div>
        <div className="flex items-center justify-between text-xs text-muted-foreground px-1">
          <Button
            variant="link"
            size="sm"
            onClick={() => setIsRulesModalOpen(true)}
            className="p-0 h-auto text-muted-foreground hover:text-primary text-xs flex items-center gap-1"
          >
            <InfoIcon className="h-3 w-3" /> Chat Rules
          </Button>
          <span>{remainingChars}/{MAX_CHARS}{isCooldown && ` (Wait ${cooldownTimeLeft}s)`}</span>
        </div>
      </form>
      <ChatRulesModal isOpen={isRulesModalOpen} onOpenChange={setIsRulesModalOpen} />
    </div>
  );
};

export default ChatInterface;
