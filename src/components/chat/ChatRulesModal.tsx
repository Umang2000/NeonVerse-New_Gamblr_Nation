
// src/components/chat/ChatRulesModal.tsx
"use client";

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  // DialogDescription, // No longer needed for this design
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { FileTextIcon } from 'lucide-react'; // Using FileTextIcon for a "rules document" feel
import { ScrollArea } from '../ui/scroll-area';
import { cn } from '@/lib/utils';

interface ChatRulesModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

// Keeping the existing rules array, but they could be shortened to match the image if desired.
const rules = [
    "Be respectful to all members. No harassment, hate speech, or bullying.",
    "Keep conversations civil. Disagreements are fine, personal attacks are not.",
    "No spamming, excessive self-promotion, or flooding the chat with messages.",
    "Do not share personal information (yours or others').",
    "No NSFW (Not Safe For Work) content. This includes text, images, or links.",
    "Stick to English to ensure everyone can participate.",
    "Impersonating other users or staff is strictly prohibited.",
    "Do not attempt to bypass chat filters or moderation.",
    "Follow instructions from moderators and admins.",
    "Violations may result in warnings, mutes, or permanent bans."
];

const ChatRulesModal: React.FC<ChatRulesModalProps> = ({ isOpen, onOpenChange }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent 
        className={cn(
          "sm:max-w-md bg-background/95 backdrop-blur-sm border border-primary/20 shadow-xl rounded-lg neon-shadow-primary p-0", 
          "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95" 
        )}
      >
        <DialogHeader className="flex flex-row justify-between items-center pt-6 px-6 pb-4 border-b border-border/30">
          <DialogTitle className="font-headline text-3xl font-bold text-foreground">
            CHAT RULES
          </DialogTitle>
          <FileTextIcon className="h-7 w-7 text-accent icon-glow-accent" />
        </DialogHeader>
        
        <ScrollArea className="max-h-[50vh] px-6 py-4"> 
            <div className="space-y-3">
            {rules.map((rule, index) => (
                <div key={index} className="bg-card p-3.5 rounded-lg shadow-md text-foreground/90 text-sm">
                    {rule}
                </div>
            ))}
            </div>
        </ScrollArea>
        
        <DialogFooter className="px-6 pb-6 pt-4 border-t border-border/30">
          <DialogClose asChild>
            <Button 
              type="button" 
              className="w-full py-3 text-base bg-accent hover:bg-accent/90 text-accent-foreground shadow-neon-accent"
            >
              I Understand
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ChatRulesModal;
