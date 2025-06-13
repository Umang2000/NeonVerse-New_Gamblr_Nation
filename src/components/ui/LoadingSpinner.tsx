// src/components/ui/LoadingSpinner.tsx
"use client";

import { cn } from "@/lib/utils";

const LoadingSpinner = ({ className }: { className?: string }) => {
  return (
    <div className={cn("flex items-center justify-center w-full h-full", className)}>
      <div className="loader"></div>
      <style jsx>{`
        .loader {
          width: 48px;
          height: 48px;
          border: 5px solid hsl(var(--primary));
          border-bottom-color: transparent;
          border-radius: 50%;
          display: inline-block;
          box-sizing: border-box;
          animation: rotation 1s linear infinite;
          box-shadow: 0 0 10px hsl(var(--primary) / 0.53), 0 0 20px hsl(var(--primary) / 0.27);
        }

        .theme-night-pulse .loader {
          box-shadow: 0 0 15px hsl(var(--primary) / 0.7), 0 0 30px hsl(var(--primary) / 0.4), 0 0 45px hsl(var(--primary) / 0.15);
        }

        @keyframes rotation {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default LoadingSpinner;
