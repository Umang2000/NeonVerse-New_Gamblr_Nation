
// src/components/auth/LoginForm.tsx
"use client";

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label'; // Keep if used explicitly, FormLabel is preferred
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useAuth } from '@/context/AuthContext';
import { SocialButton, GoogleIcon } from './SocialButton';
import { Separator } from '../ui/separator';
import { Loader2 } from 'lucide-react';

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const LoginForm: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const { emailSignIn, googleSignIn, setAuthModalType } = useAuth();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    setIsLoading(true);
    await emailSignIn(values.email, values.password).catch(console.error);
    setIsLoading(false);
    // Modal will be closed by AuthContext if login is successful
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    await googleSignIn().catch(console.error);
    setIsLoading(false);
    // Modal will be closed by AuthContext if login is successful
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
        <Button type="submit" variant="cta" className="w-full py-3 text-base" disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Log In
        </Button>
        
        <div className="relative my-6">
          <Separator className="absolute inset-0 flex items-center" />
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
          </div>
        </div>

        <SocialButton 
          providerName="Google" 
          icon={GoogleIcon} 
          onClick={handleGoogleSignIn}
          disabled={isLoading}
        />

        <div className="text-center text-sm text-muted-foreground">
          Don't have an account?{' '}
          <Button
            variant="link"
            type="button"
            onClick={() => setAuthModalType('signup')}
            className="font-semibold text-primary hover:text-primary/80 p-0 h-auto"
            disabled={isLoading}
          >
            Sign Up
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default LoginForm;
