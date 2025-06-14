
"use client";

import React, { createContext, useContext, useState, type ReactNode } from 'react';

interface ChatContextType {
  isChatSidebarOpen: boolean;
  setIsChatSidebarOpen: (isOpen: boolean) => void;
  toggleChatSidebar: () => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isChatSidebarOpen, setIsChatSidebarOpen] = useState(false);

  const toggleChatSidebar = () => {
    setIsChatSidebarOpen(prev => !prev);
  };

  const value = {
    isChatSidebarOpen,
    setIsChatSidebarOpen,
    toggleChatSidebar,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

export const useChat = (): ChatContextType => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};
