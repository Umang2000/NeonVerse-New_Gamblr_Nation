
// src/app/auth/signup/page.tsx
"use client";

import AnimatedBackground from '@/components/ui/AnimatedBackground';
import AuthCard from '@/components/auth/AuthCard';
import SignupForm from '@/components/auth/SignupForm';
import Link from 'next/link';
import { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import Navbar from '@/components/layout/Navbar'; // Added Navbar import


export default function SignupPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.push('/'); // Redirect to home if already logged in
    }
  }, [user, loading, router]);

  if (loading || (!loading && user && router.pathname !== '/')) { // Ensure redirection doesn't cause loop if already on '/'
    return (
      <div className="relative min-h-screen flex items-center justify-center">
        <AnimatedBackground />
        <LoadingSpinner />
      </div>
    );
  }
  
  return (
    <div className="relative min-h-screen flex flex-col"> {/* Changed to flex-col */}
      <AnimatedBackground />
      <Navbar /> {/* Added Navbar */}
      <main className="flex-grow flex items-center justify-center p-4 pt-20"> {/* Adjusted for Navbar height */}
        <AuthCard
          title="Join NeonVerse"
          description="Create your account to dive into the action."
          footerContent={
            <>
              Already have an account?{' '}
              <Link href="/auth/login" className="font-semibold text-primary hover:text-primary/80 hover:underline underline-offset-2 transition-colors">
                Log In
              </Link>
            </>
          }
        >
          <SignupForm />
        </AuthCard>
      </main>
    </div>
  );
}
