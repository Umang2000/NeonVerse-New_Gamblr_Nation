
// src/components/auth/GlobalAuthModal.tsx
"use client";

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogOverlay,
} from "@/components/ui/dialog";
import { useAuth } from '@/context/AuthContext';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import AuthCard from './AuthCard';
// AnimatedBackground is removed from here. The page's own background will be visible through the overlay.
import { XIcon } from 'lucide-react';
import { Button } from '../ui/button';

const GlobalAuthModal: React.FC = () => {
  const { authModalType, setAuthModalType } = useAuth();

  const isOpen = authModalType !== null;

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setAuthModalType(null);
    }
  };

  let title = "";
  let description = "";
  if (authModalType === 'login') {
    title = "Welcome Back";
    description = "Log in to access your NeonVerse account.";
  } else if (authModalType === 'signup') {
    title = "Join NeonVerse";
    description = "Create your account to dive into the action.";
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogOverlay className="bg-background/80 backdrop-blur-sm" />
      <DialogContent 
        className="p-0 border-none shadow-none bg-transparent max-w-md w-full data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
      >
        {/* AuthCard is now the direct content and visual body of the modal */}
        <AuthCard
            title={title}
            description={description}
            showBackButton={false}
        >
            {authModalType === 'login' && <LoginForm />}
            {authModalType === 'signup' && <SignupForm />}
        </AuthCard>
        
        {/* Custom Close Button, positioned absolutely relative to DialogContent */}
        {/* Since DialogContent is max-w-md and centered, this button will appear at the top-right of the AuthCard. */}
         <Button
            variant="ghost"
            size="icon"
            onClick={() => setAuthModalType(null)}
            // Adjust top/right to position it relative to the card.
            // right-4 top-4 would be inside the DialogContent's original padding box.
            // Since DialogContent is now p-0, to get it outside the card as in image,
            // we might need to adjust based on card's actual rendering or use negative margins,
            // or simply accept it at the very corner of the AuthCard.
            // Let's place it slightly offset from the top-right corner of the max-w-md container.
            // The image's X is more like top-2 right-2 of the viewport, or a bit further from the card.
            // For simplicity and to ensure it's tied to the modal itself:
            className="absolute top-2 right-2 text-primary hover:text-accent z-[70] rounded-full h-8 w-8 p-0"
            aria-label="Close authentication modal"
        >
            <XIcon className="h-5 w-5 icon-glow-primary" />
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default GlobalAuthModal;
