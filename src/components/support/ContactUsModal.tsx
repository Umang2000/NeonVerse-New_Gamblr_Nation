
// src/components/support/ContactUsModal.tsx
"use client";

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useSupport } from '@/context/SupportContext';
import AuthCard from '@/components/auth/AuthCard'; // Reusing AuthCard for consistent styling
import ContactUsForm from './ContactUsForm';
import { Button } from '@/components/ui/button';
import { XIcon } from 'lucide-react';

const ContactUsModal: React.FC = () => {
  const { isContactModalOpen, setContactModalOpen } = useSupport();

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setContactModalOpen(false);
    }
  };

  const titleText = "Contact Us";
  const descriptionText = "Have a question or need assistance? Fill out the form below.";

  return (
    <Dialog open={isContactModalOpen} onOpenChange={handleOpenChange}>
      <DialogOverlay className="bg-background/80 backdrop-blur-sm" />
      <DialogContent 
        className="p-0 border-none shadow-none bg-transparent max-w-md w-full data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
      >
        <DialogTitle className="sr-only">{titleText}</DialogTitle>
        <DialogDescription className="sr-only">{descriptionText}</DialogDescription>
        
        <AuthCard
            title={titleText}
            description={descriptionText}
            showBackButton={false} // AuthCard's back button not needed here
        >
            <ContactUsForm />
        </AuthCard>
        
         <Button
            variant="ghost"
            size="icon"
            onClick={() => setContactModalOpen(false)}
            className="absolute top-2 right-2 text-primary hover:text-accent z-[70] rounded-full h-8 w-8 p-0"
            aria-label="Close contact us modal"
        >
            <XIcon className="h-5 w-5 icon-glow-primary" />
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default ContactUsModal;
