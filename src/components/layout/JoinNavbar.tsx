// src/components/layout/JoinNavbar.tsx
"use client";

import Link from 'next/link';
import { UserCircle2Icon, LogOutIcon, LogInIcon } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { useAuth } from '@/context/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from '../ui/button';

const JoinNavbar: React.FC = () => {
  const { user, loading, signOutUser, setAuthModalType } = useAuth();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md shadow-lg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center text-primary hover:text-primary/80 transition-colors">
            <div className="mr-3">
              {/* Placeholder for logo image/icon */}
            </div>
            <span className="text-3xl font-headline font-bold">
              <span className="text-primary">Neon</span><span className="text-accent">Verse</span>
            </span>
          </Link>
          <div className="flex items-center space-x-3">
            <ThemeToggle />
            {!loading && (
              <>
                {user ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="relative h-10 w-10 rounded-full p-0">
                        <Avatar className="h-9 w-9 border-2 border-primary hover:shadow-neon-primary transition-shadow">
                          <AvatarImage src={user.photoURL || `https://placehold.co/40x40.png`} alt={user.displayName || user.email || 'User'} data-ai-hint="profile avatar" />
                          <AvatarFallback>
                            {user.displayName ? user.displayName.substring(0, 2).toUpperCase() : <UserCircle2Icon className="h-7 w-7 text-primary" />}
                          </AvatarFallback>
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="end" forceMount>
                      <DropdownMenuLabel className="font-normal">
                        <div className="flex flex-col space-y-1">
                          <p className="text-sm font-medium leading-none text-foreground">
                            {user.displayName || user.email?.split('@')[0]}
                          </p>
                          <p className="text-xs leading-none text-muted-foreground">
                            {user.email}
                          </p>
                        </div>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={signOutUser} className="cursor-pointer">
                        <LogOutIcon className="mr-2 h-4 w-4" />
                        Log out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      onClick={() => setAuthModalType('login')}
                      className="px-3 py-1.5 text-sm"
                    >
                      <LogInIcon className="mr-1.5 h-4 w-4" />
                      Login
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default JoinNavbar;
