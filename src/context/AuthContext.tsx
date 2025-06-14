
// src/context/AuthContext.tsx
"use client";

import React, { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from 'uuid'; // For generating UIDs

// Define a simpler User type for localStorage
interface User {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
}

type AuthModalType = 'login' | 'signup' | null;

interface AuthContextType {
  user: User | null;
  loading: boolean;
  emailSignIn: (email: string, pass: string) => Promise<void>;
  emailSignUp: (email: string, pass: string) => Promise<void>;
  googleSignIn: () => Promise<void>; // Remains placeholder
  signOutUser: () => Promise<void>;
  authModalType: AuthModalType;
  setAuthModalType: (type: AuthModalType) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const LOCAL_STORAGE_USERS_KEY = 'neonverse_users';
const LOCAL_STORAGE_CURRENT_USER_KEY = 'neonverse_currentUser';

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [authModalType, setAuthModalType] = useState<AuthModalType>(null);
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    console.warn(
      "SECURITY WARNING: You are using localStorage-based authentication for prototyping. " +
      "This is NOT secure for production environments. Do NOT store real credentials this way."
    );

    try {
      const storedUser = localStorage.getItem(LOCAL_STORAGE_CURRENT_USER_KEY);
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Error reading user from localStorage:", error);
      localStorage.removeItem(LOCAL_STORAGE_CURRENT_USER_KEY); // Clear corrupted data
    }
    setLoading(false);
  }, []);

  const getStoredUsers = (): Array<User & { passwordHash: string }> => {
    try {
      const users = localStorage.getItem(LOCAL_STORAGE_USERS_KEY);
      return users ? JSON.parse(users) : [];
    } catch (error) {
      console.error("Error reading stored users from localStorage:", error);
      localStorage.removeItem(LOCAL_STORAGE_USERS_KEY); // Clear corrupted data
      return [];
    }
  };

  const saveStoredUsers = (users: Array<User & { passwordHash: string }>) => {
    try {
      localStorage.setItem(LOCAL_STORAGE_USERS_KEY, JSON.stringify(users));
    } catch (error) {
      console.error("Error saving users to localStorage:", error);
    }
  };

  const setCurrentUserInStorage = (currentUser: User | null) => {
    if (currentUser) {
      try {
        localStorage.setItem(LOCAL_STORAGE_CURRENT_USER_KEY, JSON.stringify(currentUser));
      } catch (error) {
        console.error("Error saving current user to localStorage:", error);
      }
    } else {
      localStorage.removeItem(LOCAL_STORAGE_CURRENT_USER_KEY);
    }
    setUser(currentUser);
  };

  const emailSignUp = async (email: string, pass: string) => {
    setLoading(true);
    const storedUsers = getStoredUsers();
    const existingUser = storedUsers.find(u => u.email === email);

    if (existingUser) {
      toast({ variant: "destructive", title: "Signup Failed", description: "Email already in use." });
      setLoading(false);
      return;
    }

    // In a real app, hash the password. For prototype, store as is (highly insecure).
    const passwordHash = pass; // Simple mock, NOT FOR PRODUCTION
    const newUser: User = {
      uid: uuidv4(),
      email,
      displayName: email.split('@')[0], // Basic display name
      photoURL: `https://placehold.co/40x40.png?text=${email.substring(0,2).toUpperCase()}` // Placeholder avatar
    };

    const updatedUsers = [...storedUsers, { ...newUser, passwordHash }];
    saveStoredUsers(updatedUsers);
    setCurrentUserInStorage(newUser);

    toast({ title: "Signup Successful", description: `Welcome, ${newUser.displayName}!` });
    setAuthModalType(null); // Close modal
    setLoading(false);
  };

  const emailSignIn = async (email: string, pass: string) => {
    setLoading(true);
    const storedUsers = getStoredUsers();
    const foundUser = storedUsers.find(u => u.email === email);

    if (!foundUser) {
      toast({ variant: "destructive", title: "Login Failed", description: "User not found." });
      setLoading(false);
      return;
    }

    // In a real app, compare hashed passwords. Here, direct compare (highly insecure).
    if (foundUser.passwordHash !== pass) {
      toast({ variant: "destructive", title: "Login Failed", description: "Incorrect password." });
      setLoading(false);
      return;
    }
    
    const currentUser: User = {
        uid: foundUser.uid,
        email: foundUser.email,
        displayName: foundUser.displayName,
        photoURL: foundUser.photoURL,
    };

    setCurrentUserInStorage(currentUser);
    toast({ title: "Login Successful", description: `Welcome back, ${currentUser.displayName}!` });
    setAuthModalType(null); // Close modal
    setLoading(false);
  };

  const googleSignIn = async () => {
    console.log("Attempting Google sign in (localStorage prototype - placeholder)");
    toast({ title: "Google Sign In Clicked", description: "This is a placeholder for localStorage auth." });
    // This functionality is complex to replicate safely with only localStorage.
  };

  const signOutUser = async () => {
    setCurrentUserInStorage(null);
    toast({ title: "Signed Out", description: "You have been successfully signed out." });
    router.push('/'); // Navigate to home or login page
  };

  const value = {
    user,
    loading,
    emailSignIn,
    emailSignUp,
    googleSignIn,
    signOutUser,
    authModalType,
    setAuthModalType,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
