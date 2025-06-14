
// src/components/chat/ChatRulesModal.tsx
"use client";

import React from 'react';
import {
  Dialog,
  DialogPortal, // Used for positioning the modal
  DialogOverlay, // The semi-transparent background
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import * as DialogPrimitive from "@radix-ui/react-dialog"; // To use Content primitive
import { Button } from '@/components/ui/button';
import { FileTextIcon } from 'lucide-react';
import { ScrollArea } from '../ui/scroll-area';
import { cn } from '@/lib/utils';

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
      <DialogPortal>
        <DialogOverlay />
        <DialogPrimitive.Content
          className={cn(
            // Base positioning, animation, and default styling from shadcn/ui DialogContent
            "fixed left-[50%] top-[50%] z-50 grid w-full translate-x-[-50%] translate-y-[-50%] shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]",
            // Custom styles for this specific ChatRulesModal
            "sm:max-w-md bg-background/95 backdrop-blur-sm border border-primary/20 neon-shadow-primary p-0 rounded-lg",
            "max-h-[90vh] overflow-y-auto md:max-h-[calc(100vh-4rem)]" // Ensure modal itself scrolls if content overflows
            // No explicit 'gap-4' as padding is handled internally by header/footer/content
            // The X button normally rendered by DialogContent is intentionally omitted here
          )}
        >
          <DialogHeader className="flex flex-row justify-between items-center pt-6 px-4 sm:px-6 pb-4 border-b border-border/30">
            <DialogTitle className="font-headline text-3xl font-bold text-foreground">
              CHAT RULES
            </DialogTitle>
            <FileTextIcon className="h-7 w-7 text-accent icon-glow-accent" />
          </DialogHeader>
          
          <ScrollArea className="max-h-[50vh] px-4 sm:px-6 py-4"> 
              <div className="space-y-3">
              {rules.map((rule, index) => (
                <div key={index} className="bg-accent p-3 sm:p-3.5 rounded-lg shadow-neon-accent text-accent-foreground text-sm">
                      {rule}
                  </div>
              ))}
              </div>
          </ScrollArea>
          
          <DialogFooter className="px-4 sm:px-6 pb-6 pt-4 border-t border-border/30">
            <DialogClose asChild>
              <Button 
                type="button" 
                className="w-full py-3 text-base bg-accent hover:bg-accent/90 text-accent-foreground shadow-neon-accent"
              >
                I Understand
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogPrimitive.Content>
      </DialogPortal>
    </Dialog>
  );
};

export default ChatRulesModal;
