
// src/context/AuthContext.tsx
"use client";

import type { User as FirebaseUser } from "firebase/auth";
import { onAuthStateChanged, signOut as firebaseSignOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import React, { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

interface AuthContextType {
  user: FirebaseUser | null;
  loading: boolean;
  emailSignIn: (email: string, pass: string) => Promise<void>; // Placeholder
  emailSignUp: (email: string, pass: string) => Promise<void>; // Placeholder
  googleSignIn: () => Promise<void>; // Placeholder
  signOutUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Placeholder functions - actual implementation in next step
  const emailSignIn = async (email: string, pass: string) => {
    console.log("Attempting email sign in with:", email); // Placeholder
    // Actual Firebase signInWithEmailAndPassword will go here
    toast({ title: "Sign In Clicked", description: "Functionality pending." });
  };

  const emailSignUp = async (email: string, pass: string) => {
    console.log("Attempting email sign up with:", email); // Placeholder
    // Actual Firebase createUserWithEmailAndPassword will go here
    toast({ title: "Sign Up Clicked", description: "Functionality pending." });
  };

  const googleSignIn = async () => {
    console.log("Attempting Google sign in"); // Placeholder
    // Actual Firebase GoogleAuthProvider logic will go here
    toast({ title: "Google Sign In Clicked", description: "Functionality pending." });
  };

  const signOutUser = async () => {
    try {
      await firebaseSignOut(auth);
      toast({ title: "Signed Out", description: "You have been successfully signed out." });
      router.push('/'); // Redirect to home after sign out
    } catch (error: any) {
      console.error("Error signing out: ", error);
      toast({ variant: "destructive", title: "Sign Out Error", description: error.message });
    }
  };

  const value = {
    user,
    loading,
    emailSignIn,
    emailSignUp,
    googleSignIn,
    signOutUser,
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
