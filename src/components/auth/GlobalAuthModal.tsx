
// src/components/auth/GlobalAuthModal.tsx
"use client";

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogTitle, // Import DialogTitle
  DialogDescription, // Import DialogDescription
} from "@/components/ui/dialog";
import { useAuth } from '@/context/AuthContext';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import AuthCard from './AuthCard';
import { XIcon } from 'lucide-react';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';

const GlobalAuthModal: React.FC = () => {
  const { authModalType, setAuthModalType } = useAuth();

  const isOpen = authModalType !== null;

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setAuthModalType(null);
    }
  };

  let titleText = "";
  let descriptionText = "";
  if (authModalType === 'login') {
    titleText = "Welcome Back";
    descriptionText = "Log in to access your NeonVerse account.";
  } else if (authModalType === 'signup') {
    titleText = "Join NeonVerse";
    descriptionText = "Create your account to dive into the action.";
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogOverlay className="bg-background/80 backdrop-blur-sm" />
      <DialogContent 
        className="p-0 border-none shadow-none bg-transparent max-w-md w-full data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
      >
        {/* Add sr-only DialogTitle and DialogDescription for accessibility */}
        <DialogTitle className="sr-only">{titleText}</DialogTitle>
        {descriptionText && <DialogDescription className="sr-only">{descriptionText}</DialogDescription>}
        
        <AuthCard
            title={titleText}
            description={descriptionText}
            showBackButton={false}
        >
            <div className="relative"> {/* Container for smooth transition - min-h-[480px] removed for better responsiveness on short screens */}
              <div
                className={cn(
                  "transition-opacity duration-300 ease-in-out",
                  authModalType === 'login'
                    ? "opacity-100"
                    : "opacity-0 pointer-events-none absolute inset-0"
                )}
              >
                <LoginForm />
              </div>
              <div
                className={cn(
                  "transition-opacity duration-300 ease-in-out",
                  authModalType === 'signup'
                    ? "opacity-100"
                    : "opacity-0 pointer-events-none absolute inset-0"
                )}
              >
                <SignupForm />
              </div>
            </div>
        </AuthCard>
        
         <Button
            variant="ghost"
            size="icon"
            onClick={() => setAuthModalType(null)}
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
