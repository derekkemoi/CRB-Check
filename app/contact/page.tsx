'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { Footer } from '@/components/layout/footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Mail, Clock, MessageSquare, Send, HelpCircle } from 'lucide-react';
import Link from 'next/link';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(20, 'Message must be at least 20 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const [loading, setLoading] = useState(false);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));

      toast.success('Message sent successfully! We will respond within 2 hours during business hours.');
      form.reset();
    } catch (error) {
      toast.error('Failed to send message. Please try again or email us directly.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 bg-gradient-to-b from-green-50 dark:from-green-950/20 to-transparent">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 max-w-5xl">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <div className="p-4 rounded-full bg-green-100 dark:bg-green-900/30">
                <MessageSquare className="h-12 w-12 text-green-600" />
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">Contact Us</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Have questions or need assistance? We're here to help. Send us a message and we'll respond as soon as possible.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3 mb-8">
            <Card className="border-2 shadow-lg">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-3">
                  <div className="p-3 rounded-full bg-green-100 dark:bg-green-900/30">
                    <Mail className="h-6 w-6 text-green-600" />
                  </div>
                </div>
                <CardTitle className="text-lg">Email Support</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-muted-foreground mb-2">For general inquiries and support</p>
                <a href="mailto:support@crbstatuschecker.com" className="text-green-600 hover:text-green-700 font-semibold">
                  support@crbstatuschecker.com
                </a>
              </CardContent>
            </Card>

            <Card className="border-2 shadow-lg">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-3">
                  <div className="p-3 rounded-full bg-green-100 dark:bg-green-900/30">
                    <Clock className="h-6 w-6 text-green-600" />
                  </div>
                </div>
                <CardTitle className="text-lg">Support Hours</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-muted-foreground mb-2">Monday - Saturday</p>
                <p className="font-semibold">8:00 AM - 8:00 PM</p>
                <p className="text-xs text-muted-foreground mt-2">Response time: Within 2 hours</p>
              </CardContent>
            </Card>

            <Card className="border-2 shadow-lg">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-3">
                  <div className="p-3 rounded-full bg-green-100 dark:bg-green-900/30">
                    <HelpCircle className="h-6 w-6 text-green-600" />
                  </div>
                </div>
                <CardTitle className="text-lg">Need Quick Help?</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-muted-foreground mb-3">Check our FAQ section for instant answers</p>
                <Link href="/#faq">
                  <Button variant="outline" size="sm" className="w-full">
                    View FAQ
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          <Card className="border-2 shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl">Send Us a Message</CardTitle>
              <CardDescription>
                Fill out the form below and we'll get back to you as soon as possible
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                  <div className="grid gap-5 grid-cols-1 sm:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-semibold">Full Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="John Doe"
                              className="h-11"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-semibold">Email Address</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="john.doe@example.com"
                              className="h-11"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-semibold">Subject</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="How can we help you?"
                            className="h-11"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-semibold">Message</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Please describe your inquiry in detail..."
                            className="min-h-[150px] resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full bg-green-600 hover:bg-green-700 h-12 text-base font-semibold"
                    size="lg"
                    disabled={loading}
                  >
                    {loading ? (
                      'Sending...'
                    ) : (
                      <>
                        <Send className="mr-2 h-5 w-5" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </Form>

              <div className="mt-8 p-4 bg-muted/50 rounded-lg border">
                <p className="text-sm text-muted-foreground text-center">
                  <strong className="text-foreground">Note:</strong> For urgent payment or technical issues, please email us directly at support@crbstatuschecker.com with your payment reference number.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
