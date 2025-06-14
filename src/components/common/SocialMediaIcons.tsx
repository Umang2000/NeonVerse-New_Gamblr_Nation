// src/components/common/SocialMediaIcons.tsx
"use client";

import React from 'react';

interface SocialIconProps extends React.SVGProps<SVGSVGElement> {
  // any additional props if needed in the future
}

// Official Kick Green: #52DB3B
export const KickLogo: React.FC<SocialIconProps> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24" // Adjusted viewBox for typical icon usage
    {...props}
  >
    <path 
      d="M12.632 2.173H5.942a1.51 1.51 0 0 0-1.51 1.51v5.665h3V5.526h3.235v5.272l4.64-5.772a1.12 1.12 0 0 1 1.602.46 1.15 1.15 0 0 1-.31 1.39l-3.951 4.09v9.403a1.51 1.51 0 0 0 1.51 1.51 1.51 1.51 0 0 0 1.51-1.51v-5.1h3v5.1a1.51 1.51 0 0 0 1.51 1.51 1.51 1.51 0 0 0 1.51-1.51V8.653l2.42-4.78a1.14 1.14 0 0 1 .13-1.601A1.12 1.12 0 0 1 20.652 3l-8.02 7.901V2.173z" 
      fill="#52DB3B" 
    />
  </svg>
);

// Official Twitch Purple: #9146FF
export const TwitchLogo: React.FC<SocialIconProps> = (props) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24"
    {...props}
  >
    <path 
      d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0H6zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714v9.429z" 
      fill="#9146FF"
    />
  </svg>
);

// Official Telegram Blue: #2AABEE
export const TelegramLogo: React.FC<SocialIconProps> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    {...props}
  >
    <path 
      d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.042 7.915c-.278.537-.764 2.396-1.05 3.397-.24.82-.445 1.116-.764 1.137-.376.021-.68-.21-.96-.408-1.042-.71-1.46-1.043-2.316-1.638-.99-.665-.327-1.01.218-1.595.19-.21.99-.915 1-1.097.022-.19-.053-.298-.12-.33-.09-.042-.206-.021-.312 0-.126.021-1.116.713-3.144 2.215-.36.266-.66.372-.94.372-.32 0-.9-.126-1.347-.378-.516-.295-.77-.442-.747-.843.021-.337.315-.664.883-1.01l7.53-4.63c.28-.148.515-.042.61.127z" 
      fill="#2AABEE"
    />
  </svg>
);

// Official Discord Blurple: #5865F2
export const DiscordLogo: React.FC<SocialIconProps> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 245 245" // Native Discord logo viewBox is often large
    {...props}
  >
    <path 
      d="M207.295 38.351S187.352 26.968 168.601 22.825c-6.532-1.428-12.822-2.365-18.895-2.738-.643-.054-1.3-.054-1.942.018-11.401.965-22.273 4.156-32.102 9.065a111.42 111.42 0 0 0-16.536 7.576c-26.241 12.87-43.837 32.853-51.433 55.441-1.341 4.045-2.112 8.246-2.427 12.564-.469 6.368-.29 12.79.447 19.124.797 6.942 2.219 13.784 4.381 20.358 4.293 12.98 10.985 24.787 19.851 34.922 12.03 13.738 27.675 24.013 45.418 30.012 5.341 1.802 10.748 3.239 16.236 4.328 10.739 2.126 21.782 3.016 32.868 2.653 10.954-.356 21.754-1.996 32.083-4.832 15.688-4.298 30.075-11.397 42.42-20.916 7.425-5.71 13.567-12.536 18.272-20.183 6.035-9.842 9.803-20.732 10.985-32.067.457-4.329.418-8.686-.096-12.997-.562-4.792-1.745-9.492-3.46-13.987-4.992-12.98-12.862-24.5-22.862-33.877-6.915-6.495-14.376-12.388-22.254-17.519zm-50.706 109.816c-6.195 0-11.205-5.184-11.205-11.587s5.01-11.587 11.205-11.587c6.194 0 11.205 5.184 11.205 11.587.018 6.42-4.992 11.587-11.205 11.587zm-49.035 0c-6.195 0-11.205-5.184-11.205-11.587s5.01-11.587 11.205-11.587c6.195 0 11.205 5.184 11.205 11.587 0 6.42-5.01 11.587-11.205 11.587z" 
      fill="#5865F2"
    />
  </svg>
);

// X Logo (formerly Twitter) - Using white for dark backgrounds
export const XLogo: React.FC<SocialIconProps> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24" // Common aspect ratio for icons
    {...props}
  >
    <path 
      d="M18.901 1.153h3.68l-8.04 9.19L24 22.847h-7.407l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.153h7.593l5.241 6.931ZM17.61 20.644h2.039L6.486 3.24H4.298Z" 
      fill="#FFFFFF" // White for better contrast on dark background
    />
  </svg>
);
