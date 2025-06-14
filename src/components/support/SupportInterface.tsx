
'use client';

import { useState, type FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { HelpCircle, Send, Loader2 } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

const faqItems = [
  {
    question: "How do I reset my password?",
    answer: "You can reset your password by clicking the 'Forgot Password' link on the login page. Follow the instructions sent to your email address."
  },
  {
    question: "Where can I find my purchased items?",
    answer: "Purchased items from the marketplace are usually added to your in-game inventory or a specific section in your profile. If you can't find them, please check your transaction history or contact support."
  },
  {
    question: "How does the Daily Case work?",
    answer: "The Daily Case can be claimed once every 24 hours. It contains a random reward from a predefined loot table. Make sure to log in daily to maximize your rewards!"
  },
  {
    question: "Are there any rules for the forum?",
    answer: "Yes, please be respectful to other users, avoid spamming, and do not share any personal information. Detailed community guidelines can be found pinned in the 'General Discussion' section of the forum."
  },
  {
    question: "How can I report a bug or a player?",
    answer: "You can report bugs through the 'Game Test' feedback forms or via this support contact form. To report a player, please use the in-game reporting tools or provide detailed information (username, incident description, screenshots if possible) via the contact form."
  }
];

export default function SupportInterface() {
  const { toast } = useToast();
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
      variant: "default", // or "success" if you define such a variant
    });
    
    setName('');
    setEmail('');
    setMessage('');
    setIsSubmitting(false);
  };

  // Card styling that mimics a "glass card" effect consistent with the theme
  const cardClasses = "bg-card/70 backdrop-blur-md border border-border/30 shadow-xl rounded-lg";

  return (
    <div className={cn(
      "flex flex-col h-full w-full overflow-hidden",
      "pt-20" // Account for Navbar height + close button area
    )}>
      <div className="p-4 border-b border-border/30 text-center">
        <h2 className="text-xl font-headline text-accent">Support Center</h2>
      </div>
      <ScrollArea className="flex-grow p-4 md:p-6">
        <div className="space-y-8">
          <div className="text-center">
            {/* Using text-accent for the icon and relying on icon-glow-accent utility for glow */}
            <HelpCircle className="mx-auto h-12 w-12 text-accent icon-glow-accent mb-3" /> 
            <p className="text-muted-foreground mt-1 text-sm">Need help? We're here for you. Check our FAQs or send us a message.</p>
          </div>

          <div className="space-y-8"> {/* Changed from grid to vertical stack */}
            <Card className={cardClasses}>
              <CardHeader>
                <CardTitle className="text-2xl text-primary flex items-center">
                  <Send className="mr-3 h-5 w-5" /> Contact Us
                </CardTitle>
                <CardDescription>Fill out the form below and we'll get back to you.</CardDescription>
              </CardHeader>
              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="support-name" className="text-muted-foreground">Full Name</Label>
                    <Input id="support-name" placeholder="John Doe" value={name} onChange={(e) => setName(e.target.value)} required className="bg-background/50 border-input focus:shadow-neon-primary focus:border-primary transition-all"/>
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="support-email" className="text-muted-foreground">Email Address</Label>
                    <Input id="support-email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required className="bg-background/50 border-input focus:shadow-neon-primary focus:border-primary transition-all"/>
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="support-message" className="text-muted-foreground">Your Message</Label>
                    <Textarea id="support-message" placeholder="Describe your issue or question in detail..." value={message} onChange={(e) => setMessage(e.target.value)} rows={5} required className="bg-background/50 border-input focus:shadow-neon-primary focus:border-primary transition-all"/>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" variant="cta" size="lg" disabled={isSubmitting} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground shadow-neon-accent">
                    {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </CardFooter>
              </form>
            </Card>

            <Card className={cardClasses}>
              <CardHeader>
                <CardTitle className="text-2xl text-primary flex items-center">
                  <HelpCircle className="mr-3 h-5 w-5" /> FAQs
                </CardTitle>
                <CardDescription>Find answers to common questions below.</CardDescription>
              </CardHeader>
              <CardContent>
                {faqItems.length > 0 ? (
                  <Accordion type="single" collapsible className="w-full">
                    {faqItems.map((item, index) => (
                      <AccordionItem value={`item-${index}`} key={index} className="border-border/50">
                        <AccordionTrigger className="text-left hover:text-accent text-foreground/90 text-base py-3">
                          {item.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground text-sm pb-3">
                          {item.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                ) : (
                  <p className="text-muted-foreground text-center py-4">No FAQs available at the moment.</p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
