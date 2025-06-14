
// src/context/SupportContext.tsx
"use client";

import React, { createContext, useContext, useState, type ReactNode } from "react";

interface SupportContextType {
  isContactModalOpen: boolean;
  setContactModalOpen: (isOpen: boolean) => void;
}

const SupportContext = createContext<SupportContextType | undefined>(undefined);

export const SupportProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isContactModalOpen, setContactModalOpen] = useState(false);

  const value = {
    isContactModalOpen,
    setContactModalOpen,
  };

  return <SupportContext.Provider value={value}>{children}</SupportContext.Provider>;
};

export const useSupport = (): SupportContextType => {
  const context = useContext(SupportContext);
  if (context === undefined) {
    throw new Error("useSupport must be used within a SupportProvider");
  }
  return context;
};
