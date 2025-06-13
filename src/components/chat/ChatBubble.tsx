import React from 'react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface ChatBubbleProps {
  user: {
    name: string;
    avatarUrl?: string;
    isCurrentUser?: boolean;
    nameGradient?: 'purple-orange' | 'blue-purple';
  };
  message: string;
  timestamp: string;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ user, message, timestamp }) => {
  const nameGradientClass = user.nameGradient === 'purple-orange' ? 'text-gradient-purple-orange' : 'bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent';

  return (
    <div className={cn("flex items-start gap-3 my-4", user.isCurrentUser ? "justify-end" : "")}>
      {!user.isCurrentUser && (
        <Avatar className="w-10 h-10 border-2 border-accent shadow-neon-accent">
          <AvatarImage src={user.avatarUrl || `https://placehold.co/40x40.png`} alt={user.name} data-ai-hint="profile avatar" />
          <AvatarFallback>{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
      )}
      <div className={cn(
        "relative max-w-xs md:max-w-md p-0.5 rounded-lg",
        user.isCurrentUser ? "bg-gradient-to-br from-primary to-accent" : "bg-gradient-to-br from-accent to-primary"
      )}>
        <div className={cn(
          "bg-card p-3 rounded-[calc(var(--radius)-2px)]",
        )}>
          <div className="flex items-baseline justify-between mb-1">
            <span className={cn("font-bold text-sm", nameGradientClass)}>{user.name}</span>
            <span className="text-xs text-muted-foreground ml-2">{timestamp}</span>
          </div>
          <p className="text-foreground text-sm leading-relaxed font-body">{message}</p>
        </div>
      </div>
      {user.isCurrentUser && (
         <Avatar className="w-10 h-10 border-2 border-primary shadow-neon-primary">
          <AvatarImage src={user.avatarUrl || `https://placehold.co/40x40.png`} alt={user.name} data-ai-hint="profile avatar" />
          <AvatarFallback>{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
      )}
    </div>
  );
};

export default ChatBubble;
