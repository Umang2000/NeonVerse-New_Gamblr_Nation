
// src/components/auth/SignupForm.tsx
"use client";

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label'; // Keep if used explicitly
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useAuth } from '@/context/AuthContext';
import { SocialButton, GoogleIcon } from './SocialButton';
import { Separator } from '../ui/separator';
import { Loader2 } from 'lucide-react';

const signupSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match.",
  path: ["confirmPassword"],
});

type SignupFormValues = z.infer<typeof signupSchema>;

const SignupForm: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const { emailSignUp, googleSignIn, setAuthModalType } = useAuth();

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (values: SignupFormValues) => {
    setIsLoading(true);
    await emailSignUp(values.email, values.password).catch(console.error);
    setIsLoading(false);
    // Modal will be closed by AuthContext if signup is successful
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    await googleSignIn().catch(console.error);
    setIsLoading(false);
     // Modal will be closed by AuthContext if signup is successful
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel className="text-muted-foreground">Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="you@example.com"
                  {...field}
                  className="bg-card/50 border-input focus:shadow-neon-primary focus:border-primary transition-all"
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel className="text-muted-foreground">Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="••••••••"
                  {...field}
                  className="bg-card/50 border-input focus:shadow-neon-primary focus:border-primary transition-all"
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel className="text-muted-foreground">Confirm Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="••••••••"
                  {...field}
                  className="bg-card/50 border-input focus:shadow-neon-primary focus:border-primary transition-all"
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" variant="cta" className="w-full py-3 text-base" disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Create Account
        </Button>

        <div className="relative my-6">
          <Separator className="absolute inset-0 flex items-center" />
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground">Or sign up with</span>
          </div>
        </div>

        <SocialButton 
          providerName="Google" 
          icon={GoogleIcon} 
          onClick={handleGoogleSignIn}
          disabled={isLoading}
        />
         <div className="text-center text-sm text-muted-foreground">
          Already have an account?{' '}
          <Button
            variant="link"
            type="button"
            onClick={() => setAuthModalType('login')}
            className="font-semibold text-primary hover:text-primary/80 p-0 h-auto"
            disabled={isLoading}
          >
            Log In
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default SignupForm;
