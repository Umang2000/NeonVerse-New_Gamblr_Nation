
// src/components/auth/GlobalAuthModal.tsx
"use client";

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogClose, // For potential custom close button if needed, DialogTitle for ARIA
} from "@/components/ui/dialog";
import { useAuth } from '@/context/AuthContext';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import AuthCard from './AuthCard';
import AnimatedBackground from '../ui/AnimatedBackground'; // To have the themed background in the modal
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
      <DialogContent className="p-0 border-none shadow-none bg-transparent max-w-md w-full data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95">
        {/* AnimatedBackground can be part of DialogContent or DialogOverlay for different effects */}
        {/* For full coverage behind the card, it's better here. */}
        <div className="relative min-h-screen flex items-center justify-center p-4">
            <AnimatedBackground /> {/* This ensures the bg covers the modal viewport */}
             <Button
                variant="ghost"
                size="icon"
                onClick={() => setAuthModalType(null)}
                className="absolute top-6 right-6 text-primary hover:text-accent z-[60]" // z-index ensures it's above AuthCard's gradient
                aria-label="Close authentication modal"
            >
                <XIcon className="h-6 w-6 icon-glow-primary" />
            </Button>
            <AuthCard
                title={title}
                description={description}
                showBackButton={false} // Important: Hide default back button
            >
                {authModalType === 'login' && <LoginForm />}
                {authModalType === 'signup' && <SignupForm />}
            </AuthCard>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GlobalAuthModal;
