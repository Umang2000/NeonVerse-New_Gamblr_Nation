
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Gamepad2Icon, MessageSquareIcon, HomeIcon, LogInIcon, LogOutIcon, UserCircle2Icon } from 'lucide-react';
import { cn } from '@/lib/utils';
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

const navItems = [
  { name: 'Home', href: '/', icon: HomeIcon },
  { name: 'Games', href: '#games', icon: Gamepad2Icon },
  { name: 'Forums', href: '#forums', icon: MessageSquareIcon },
];

const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { user, loading, signOutUser, setAuthModalType } = useAuth();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md shadow-lg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="text-3xl font-headline font-bold text-primary hover:text-primary/80 transition-colors">
            NeonVerse
          </Link>
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const isStrictMatch = pathname === item.href;
              const isActive = item.href === '/' ? isStrictMatch : (item.href !== '/' && pathname.startsWith(item.href)); // Adjusted for # links potentially
              
              const underlineClass = cn(
                "absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary to-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left",
                isActive ? "scale-x-100 neon-shadow-primary" : "group-hover:neon-shadow-primary"
              );

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "relative px-3 py-2 text-lg font-medium text-foreground hover:text-primary transition-colors group",
                    isActive ? "text-primary" : ""
                  )}
                >
                  {item.name}
                  <span className={underlineClass} />
                  {isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-primary neon-shadow-primary opacity-50" />
                 )}
                </Link>
              );
            })}
          </div>
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
                            <UserCircle2Icon className="h-7 w-7 text-primary" />
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
                    {/* Sign Up button removed, accessed via Login modal */}
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

export default Navbar;
