import React from 'react';
import { Button, type ButtonProps } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { PlayIcon } from 'lucide-react';

interface PlayButtonProps extends ButtonProps {}

const PlayButton: React.FC<PlayButtonProps> = ({ className, children, ...props }) => {
  return (
    <Button
      variant="cta"
      size="lg"
      className={cn("font-bold group", className)}
      {...props}
    >
      <PlayIcon className="mr-2 h-5 w-5 group-hover:fill-current transition-transform group-hover:scale-110" />
      {children || 'Play Now'}
    </Button>
  );
};

export default PlayButton;
