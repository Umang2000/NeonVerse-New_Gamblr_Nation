"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Gamepad2Icon, MessageSquareIcon, HomeIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { name: 'Home', href: '/', icon: HomeIcon },
  { name: 'Games', href: '#games', icon: Gamepad2Icon },
  { name: 'Forums', href: '#forums', icon: MessageSquareIcon },
];

const Navbar: React.FC = () => {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md shadow-lg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="text-3xl font-headline font-bold text-primary hover:text-primary/80 transition-colors">
            NeonVerse
          </Link>
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => {
              const isActive = item.href === '/' ? pathname === item.href : pathname.startsWith(item.href);
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
                  <span
                    className={cn(
                      "absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary to-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left",
                      isActive ? "scale-x-100" : ""
                    )}
                  />
                  {isActive && <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-primary neon-shadow-primary opacity-50" />}
                </Link>
              );
            })}
          </div>
          <div className="md:hidden">
            {/* Mobile menu button can be added here */}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
