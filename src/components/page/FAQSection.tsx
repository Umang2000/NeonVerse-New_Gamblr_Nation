
// src/components/page/FAQSection.tsx
'use client';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { HelpCircle } from 'lucide-react';
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
    answer: "You can report bugs through the 'Game Test' feedback forms or via our contact form. To report a player, please use the in-game reporting tools or provide detailed information (username, incident description, screenshots if possible) via the contact form."
  }
];

const cardClasses = "bg-card/70 backdrop-blur-md border border-border/30 shadow-xl rounded-lg";

export default function FAQSection() {
  return (
    <Card className={cn(cardClasses, "w-full")}>
      <CardHeader>
        <CardTitle className="text-2xl md:text-3xl text-primary flex items-center">
          <HelpCircle className="mr-3 h-6 w-6 md:h-7 md:w-7" /> Frequently Asked Questions
        </CardTitle>
        <CardDescription className="text-base">Find answers to common questions below.</CardDescription>
      </CardHeader>
      <CardContent>
        {faqItems.length > 0 ? (
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, index) => (
              <AccordionItem value={`item-${index}`} key={index} className="border-border/50">
                <AccordionTrigger className="text-left hover:text-accent text-foreground/90 text-base md:text-lg py-3 md:py-4">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-sm md:text-base pb-3 md:pb-4">
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
  );
}
