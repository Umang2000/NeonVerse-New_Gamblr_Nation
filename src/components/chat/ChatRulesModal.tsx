
// src/components/chat/ChatRulesModal.tsx
"use client";

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { ShieldAlertIcon } from 'lucide-react';
import { ScrollArea } from '../ui/scroll-area';

interface ChatRulesModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

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
      <DialogContent className="sm:max-w-md bg-card border-border/50 shadow-xl">
        <DialogHeader className="text-left">
          <DialogTitle className="flex items-center gap-2 text-xl text-primary">
            <ShieldAlertIcon className="h-5 w-5 icon-glow-primary" />
            Chat Rules
          </DialogTitle>
          <DialogDescription className="text-muted-foreground pt-1">
            Please follow these rules to maintain a friendly and positive chat environment.
          </DialogDescription>
        </DialogHeader>
        
        <ScrollArea className="max-h-[50vh] pr-4 my-4">
            <ul className="space-y-2 text-sm text-foreground/90 list-decimal list-inside pl-2">
            {rules.map((rule, index) => (
                <li key={index}>{rule}</li>
            ))}
            </ul>
        </ScrollArea>
        
        <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
            <Button type="button" variant="outline" className="shadow-neon-primary hover:shadow-neon-accent">
              Got it
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ChatRulesModal;
