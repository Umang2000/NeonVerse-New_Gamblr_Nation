
// src/components/auth/AuthCard.tsx
import React, { type ReactNode } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
// Link and ArrowLeftIcon removed as back button is conditional

interface AuthCardProps {
  title: string;
  description?: string;
  children: ReactNode;
  footerContent?: ReactNode; // Kept for future use if needed within modal
  showBackButton?: boolean; // Default true, set to false for modal
}

const AuthCard: React.FC<AuthCardProps> = ({ title, description, children, footerContent, showBackButton = true }) => {
  return (
    <div className="relative group p-0.5 overflow-hidden rounded-lg max-w-md w-full">
      <div 
        className={cn(
          "absolute inset-0 bg-gradient-to-r from-primary via-accent to-destructive bg-[length:200%_200%] opacity-70 group-hover:opacity-100 transition-opacity duration-500 rounded-lg",
          "animate-gradient-border"
        )}
      />
      <Card className="relative bg-card/80 backdrop-blur-sm border-none shadow-xl">
        {/* Back button removed, modal will have its own close */}
        <CardHeader className={cn("text-center", showBackButton ? "pt-12" : "pt-6")}> {/* Adjust padding if no back button */}
          <CardTitle className="text-3xl font-headline text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
            {title}
          </CardTitle>
          {description && <CardDescription className="text-muted-foreground pt-1">{description}</CardDescription>}
        </CardHeader>
        <CardContent className="space-y-6 px-6 pb-6">
          {children}
        </CardContent>
        {/* Footer content kept for flexibility, e.g. "Switch to Sign Up/Login" is now part of form content */}
        {/* If footerContent is used for something else, it can be re-enabled here */}
        {/* {footerContent && (
          <div className="px-6 pb-6 text-center text-sm text-muted-foreground">
            {footerContent}
          </div>
        )} */}
      </Card>
    </div>
  );
};

export default AuthCard;
