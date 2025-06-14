
// src/components/support/ContactUsForm.tsx
'use client';

import { useState, type FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { CardContent, CardFooter } from '@/components/ui/card'; // Only content and footer needed if wrapped by AuthCard
import { Send, Loader2 } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { useSupport } from '@/context/SupportContext';

export default function ContactUsForm() {
  const { toast } = useToast();
  const { setContactModalOpen } = useSupport();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call for form submission
    await new Promise(resolve => setTimeout(resolve, 1500));

    console.log('Support Request:', { name, email, message });
    toast({
      title: "Message Sent!",
      description: "Our support team will get back to you shortly.",
      variant: "default",
    });
    
    setName('');
    setEmail('');
    setMessage('');
    setIsSubmitting(false);
    setContactModalOpen(false); // Close modal on successful submission
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardContent className="space-y-4 pt-6"> {/* Added pt-6 as AuthCard has its own header padding */}
        <div className="space-y-1.5">
          <Label htmlFor="contact-name" className="text-muted-foreground">Full Name</Label>
          <Input 
            id="contact-name" 
            placeholder="John Doe" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
            className="bg-card/50 border-input focus:shadow-neon-primary focus:border-primary transition-all"
            disabled={isSubmitting}
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="contact-email" className="text-muted-foreground">Email Address</Label>
          <Input 
            id="contact-email" 
            type="email" 
            placeholder="you@example.com" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
            className="bg-card/50 border-input focus:shadow-neon-primary focus:border-primary transition-all"
            disabled={isSubmitting}
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="contact-message" className="text-muted-foreground">Your Message</Label>
          <Textarea 
            id="contact-message" 
            placeholder="Describe your issue or question in detail..." 
            value={message} 
            onChange={(e) => setMessage(e.target.value)} 
            rows={4} // Reduced from 5 to 4 for better fit on small screens
            required 
            className="bg-card/50 border-input focus:shadow-neon-primary focus:border-primary transition-all"
            disabled={isSubmitting}
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          type="submit" 
          size="lg" 
          disabled={isSubmitting} 
          className="w-full bg-accent hover:bg-accent/90 text-accent-foreground shadow-neon-accent"
        >
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isSubmitting ? 'Sending...' : 'Send Message'}
          {!isSubmitting && <Send className="ml-2 h-4 w-4" />}
        </Button>
      </CardFooter>
    </form>
  );
}
