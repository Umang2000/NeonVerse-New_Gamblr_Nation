import Image from 'next/image';
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import PlayButton from './PlayButton';
import { cn } from '@/lib/utils';

interface GameCardProps {
  title: string;
  imageUrl: string;
  category: string;
  dataAiHint?: string;
}

const GameCard: React.FC<GameCardProps> = ({ title, imageUrl, category, dataAiHint }) => {
  return (
    <div className="relative group p-0.5 overflow-hidden rounded-lg">
      <div 
        className={cn(
          "absolute inset-0 bg-gradient-to-r from-primary via-accent to-destructive bg-[length:200%_200%] opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg",
          "group-hover:animate-gradient-border" 
        )}
      />
      <Card className="relative bg-card overflow-hidden transition-all duration-300 ease-out transform group-hover:scale-[1.01]">
        <CardHeader className="p-0">
          <div className="aspect-video overflow-hidden relative">
            <Image
              src={imageUrl}
              alt={title}
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-500 ease-out group-hover:scale-110"
              data-ai-hint={dataAiHint}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent group-hover:from-black/50 group-hover:via-accent/20 transition-all duration-300" />
            <div className="absolute top-2 right-2 bg-destructive/80 text-destructive-foreground px-2 py-1 rounded-md text-xs font-semibold backdrop-blur-sm">
              {category}
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-4 space-y-2">
          <CardTitle className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
            {title}
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Experience the thrill in this exciting new adventure.
          </p>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <PlayButton className="w-full" />
        </CardFooter>
      </Card>
    </div>
  );
};

export default GameCard;
