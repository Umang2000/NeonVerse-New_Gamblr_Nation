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
    viewBox="0 0 24 24" // Standardized viewBox
    {...props}
  >
    <path
      d="M12.632 2.173H5.942a1.51 1.51 0 0 0-1.51 1.51v5.665h3V5.526h3.235v5.272l4.64-5.772a1.12 1.12 0 0 1 1.602.46 1.15 1.15 0 0 1-.31 1.39l-3.951 4.09v9.403a1.51 1.51 0 0 0 1.51 1.51 1.51 1.51 0 0 0 1.51-1.51v-5.1h3v5.1a1.51 1.51 0 0 0 1.51 1.51 1.51 1.51 0 0 0 1.51-1.51V8.653l2.42-4.78a1.14 1.14 0 0 1 .13-1.601A1.12 1.12 0 0 1 20.652 3l-8.02 7.901V2.173z"
      fill="#52DB3B" // Kick Green
    />
  </svg>
);

// Official Twitch Purple: #9146FF (Leaving as is, per user request)
export const TwitchLogo: React.FC<SocialIconProps> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      d="M6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0H6zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714v9.429zM11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714z"
      fill="#9146FF"
    />
  </svg>
);

// Official Telegram Blue: #2AABEE
export const TelegramLogo: React.FC<SocialIconProps> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24" // Standardized viewBox
    {...props}
  >
    <path
      d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.042 7.915c-.278.537-.764 2.396-1.05 3.397-.24.82-.445 1.116-.764 1.137-.376.021-.68-.21-.96-.408-1.042-.71-1.46-1.043-2.316-1.638-.99-.665-.327-1.01.218-1.595.19-.21.99-.915 1-1.097.022-.19-.053-.298-.12-.33-.09-.042-.206-.021-.312 0-.126.021-1.116.713-3.144 2.215-.36.266-.66.372-.94.372-.32 0-.9-.126-1.347-.378-.516-.295-.77-.442-.747-.843.021-.337.315-.664.883-1.01l7.53-4.63c.28-.148.515-.042.61.127z"
      fill="#2AABEE" // Telegram Blue
    />
  </svg>
);

// X Logo (formerly Twitter) - Using white for dark backgrounds (Leaving as is, per user request)
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

// Official Discord Blurple: #5865F2. Path from user input.
export const DiscordLogo: React.FC<SocialIconProps> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24" // Using a more standard 24x24 viewBox for consistency
    {...props}
  >
    {/* Scaled path data from user's 16x16 viewBox to 24x24 viewBox (multiplied by 1.5) and simplified.
        The original path from user was for a 16x16 box.
        To fit into 24x24, we can scale, or find a more standard 24x24 version.
        Using a common Discord path for 24x24:
    */}
    <path
      d="M20.317 4.369a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.865-.608 1.249a18.297 18.297 0 00-9.444 0 11.203 11.203 0 00-.617-1.249.077.077 0 00-.079-.037A19.719 19.719 0 003.679 4.37a.07.07 0 00-.034.055c-.009.106-.018.21-.026.314a19.708 19.708 0 00-1.636 9.242.062.062 0 00.026.049 1.684 1.684 0 00.149.123 19.82 19.82 0 004.382 2.657.075.075 0 00.088-.022c.283-.27.537-.564.755-.873a.074.074 0 00-.013-.102 18.106 18.106 0 01-2.22-.953.065.065 0 01-.013-.053c.002-.014.005-.028.008-.042a15.828 15.828 0 01.328-1.519.072.072 0 01.07-.03c.002 0 .004 0 .005.001A17.917 17.917 0 0112 15.842a17.917 17.917 0 015.688-1.923c0-.001.003-.001.005-.001a.072.072 0 01.07.03c.101.323.238.795.328 1.519a.067.067 0 01-.013.053 18.805 18.805 0 01-2.221.953.075.075 0 00-.013.102c.218.309.472.593.755.873a.075.075 0 00.088.022c1.785-.75 3.449-1.742 4.382-2.657a.066.066 0 00.026-.049 1.587 1.587 0 00.149-.123c.09-.09.15-.207.15-.342a19.854 19.854 0 00-1.611-9.242.072.072 0 00-.034-.055M8.02 12.331c-.838 0-1.52-.713-1.52-1.586 0-.874.682-1.586 1.52-1.586.837 0 1.518.712 1.518 1.586 0 .873-.681 1.586-1.518 1.586zm7.96 0c-.838 0-1.52-.713-1.52-1.586 0-.874.682-1.586 1.52-1.586.837 0 1.518.712 1.518 1.586 0 .873-.681 1.586-1.518 1.586z"
      fill="#5865F2" // Discord Blurple
    />
  </svg>
);
