
// src/components/auth/AuthCard.tsx
import React, { type ReactNode } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { Button } from '../ui/button';
import { ArrowLeftIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AuthCardProps {
  title: string;
  description?: string;
  children: ReactNode;
  footerContent?: ReactNode;
  showBackButton?: boolean;
}

const AuthCard: React.FC<AuthCardProps> = ({ title, description, children, footerContent, showBackButton = true }) => {
  return (
    <div className="relative group p-0.5 overflow-hidden rounded-lg max-w-md w-full">
      <div 
        className={cn(
          "absolute inset-0 bg-gradient-to-r from-primary via-accent to-destructive bg-[length:200%_200%] opacity-70 group-hover:opacity-100 transition-opacity duration-500 rounded-lg",
          "animate-gradient-border" // Keep continuous animation for auth cards
        )}
      />
      <Card className="relative bg-card/80 backdrop-blur-sm border-none shadow-xl"> {/* Removed explicit border, relies on gradient */}
        {showBackButton && (
           <Button variant="ghost" size="icon" className="absolute top-4 left-4 text-primary hover:text-accent z-10" asChild>
            <Link href="/">
              <ArrowLeftIcon className="h-5 w-5" />
              <span className="sr-only">Back to home</span>
            </Link>
          </Button>
        )}
        <CardHeader className="pt-12 text-center"> {/* Increased top padding for back button space */}
          <CardTitle className="text-3xl font-headline text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
            {title}
          </CardTitle>
          {description && <CardDescription className="text-muted-foreground pt-1">{description}</CardDescription>}
        </CardHeader>
        <CardContent className="space-y-6 px-6 pb-6">
          {children}
        </CardContent>
        {footerContent && (
          <div className="px-6 pb-6 text-center text-sm text-muted-foreground">
            {footerContent}
          </div>
        )}
      </Card>
    </div>
  );
};

export default AuthCard;
