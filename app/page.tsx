'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Shield, Zap, Lock, CheckCircle, FileText, Clock, TrendingUp, UserCheck, Search, FileCheck, Lightbulb, Star, ArrowRight, Users, Award, CreditCard } from 'lucide-react';
import { BASE_PRICE_USD, BASE_PRICE_KES, CURRENCY_SYMBOLS } from '@/lib/constants';

export default function Home() {
  const [showStickyCta, setShowStickyCta] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowStickyCta(window.scrollY > 600);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="flex min-h-screen flex-col">

      <main className="flex-1">
        <section className="relative overflow-hidden py-16 sm:py-24 lg:py-32">
          <div className="absolute inset-0 bg-gradient-to-b from-green-50 dark:from-green-950/20 to-transparent" />

          <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-5xl text-center">
              <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-green-100 dark:bg-green-900/30 rounded-full">
                <Award className="h-4 w-4 text-green-600 dark:text-green-400" />
                <span className="text-sm font-semibold text-green-700 dark:text-green-300">10,000+ Reports Delivered</span>
              </div>

              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-7xl mb-6 px-4 leading-tight">
                Instant CRB Status Check –{' '}
                <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  Unlock Loans & Financial Freedom
                </span>{' '}
                in 60 Seconds
              </h1>

              <p className="text-xl sm:text-2xl font-medium text-muted-foreground mb-8 max-w-3xl mx-auto px-4">
                Get Your Full Credit Report – Trusted by Thousands Worldwide
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto mb-10 px-4">
                <div className="flex items-center gap-3 bg-white dark:bg-gray-900 p-4 rounded-xl shadow-sm border-2 border-green-200 hover:border-green-400 transition-colors">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-base text-gray-900 dark:text-gray-100">Check Blacklist Status</p>
                    <p className="text-sm text-muted-foreground">Know if you're blacklisted from borrowing</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-white dark:bg-gray-900 p-4 rounded-xl shadow-sm border-2 border-blue-200 hover:border-blue-400 transition-colors">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-base text-gray-900 dark:text-gray-100">Know Your Limit</p>
                    <p className="text-sm text-muted-foreground">See how much loan you can borrow</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center px-4 mb-12">
                <Button size="lg" asChild className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white text-lg py-6 px-10 h-auto shadow-lg shadow-green-600/30">
                  <Link href="/register" className="flex items-center gap-2">
                    Get Your Report Now
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </Button>
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-6 sm:gap-8 px-4">
                <div className="flex items-center gap-2 bg-white dark:bg-gray-900 px-4 py-2 rounded-lg shadow-sm border">
                  <Shield className="h-6 w-6 text-green-600" />
                  <span className="text-sm font-medium">Paystack Secure</span>
                </div>
                <div className="flex items-center gap-2 bg-white dark:bg-gray-900 px-4 py-2 rounded-lg shadow-sm border">
                  <Lock className="h-6 w-6 text-green-600" />
                  <span className="text-sm font-medium">Bank-Level Security</span>
                </div>
                <div className="flex items-center gap-2 bg-white dark:bg-gray-900 px-4 py-2 rounded-lg shadow-sm border">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                  <span className="text-sm font-medium">Instant Delivery</span>
                </div>
              </div>

              <div className="mt-12 pt-8 border-t">
                <p className="text-sm text-muted-foreground mb-4">Trusted by employers and financial institutions worldwide</p>
                <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-xs font-semibold text-muted-foreground/60">
                  <span>Major Banks</span>
                  <span>Financial Institutions</span>
                  <span>Employers</span>
                  <span>Government Agencies</span>
                  <span>Landlords</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="py-16 sm:py-20 lg:py-24 bg-muted/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 px-4">Why Choose Our Service?</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto px-4">
                The fastest and most reliable way to access your credit bureau report
              </p>
            </div>

            <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
              <Card className="border-2 hover:border-green-500 transition-all hover:shadow-lg">
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                    <Zap className="h-8 w-8 text-green-600" />
                  </div>
                  <CardTitle className="text-xl mb-3">Instant Access – Results in 60 Seconds</CardTitle>
                  <CardDescription className="text-base">
                    No waiting, no paperwork. Get your complete report immediately.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-2 hover:border-green-500 transition-all hover:shadow-lg">
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                    <Shield className="h-8 w-8 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl mb-3">Bank-Level Security</CardTitle>
                  <CardDescription className="text-base">
                    Your data is encrypted and 100% confidential. Trusted by thousands.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-2 hover:border-green-500 transition-all hover:shadow-lg">
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                    <FileText className="h-8 w-8 text-purple-600" />
                  </div>
                  <CardTitle className="text-xl mb-3">Detailed & Accurate Reports</CardTitle>
                  <CardDescription className="text-base">
                    Complete credit history, score, and analysis. Accepted everywhere.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-2 hover:border-green-500 transition-all hover:shadow-lg">
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                    <Clock className="h-8 w-8 text-orange-600" />
                  </div>
                  <CardTitle className="text-xl mb-3">24/7 Availability</CardTitle>
                  <CardDescription className="text-base">
                    Access your report anytime, anywhere from any device.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="py-16 sm:py-20 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 px-4">
                Get Your Credit Report in 4 Simple Steps
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto px-4">
                Less than 2 minutes from start to finish
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="grid gap-8 md:gap-10">
                <div className="grid md:grid-cols-[auto,1fr] gap-6 items-center">
                  <div className="flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-green-500 to-green-600 text-white shrink-0 shadow-lg">
                    <div className="text-center">
                      <UserCheck className="h-8 w-8 sm:h-10 sm:w-10 mx-auto mb-1" />
                      <span className="text-lg font-bold">1</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-bold mb-2">Register & Verify</h3>
                    <p className="text-lg text-muted-foreground">
                      Quick sign-up with your ID. Secure and encrypted.
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-[auto,1fr] gap-6 items-center">
                  <div className="flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-white shrink-0 shadow-lg">
                    <div className="text-center">
                      <CreditCard className="h-8 w-8 sm:h-10 sm:w-10 mx-auto mb-1" />
                      <span className="text-lg font-bold">2</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-bold mb-2">Make Secure Payment</h3>
                    <p className="text-lg text-muted-foreground">
                      Pay instantly via Paystack. All major cards accepted.
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-[auto,1fr] gap-6 items-center">
                  <div className="flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 text-white shrink-0 shadow-lg">
                    <div className="text-center">
                      <FileCheck className="h-8 w-8 sm:h-10 sm:w-10 mx-auto mb-1" />
                      <span className="text-lg font-bold">3</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-bold mb-2">Instant Report Generation</h3>
                    <p className="text-lg text-muted-foreground">
                      Your complete report ready in 60 seconds or less.
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-[auto,1fr] gap-6 items-center">
                  <div className="flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 text-white shrink-0 shadow-lg">
                    <div className="text-center">
                      <TrendingUp className="h-8 w-8 sm:h-10 sm:w-10 mx-auto mb-1" />
                      <span className="text-lg font-bold">4</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-bold mb-2">Download & Use</h3>
                    <p className="text-lg text-muted-foreground">
                      Print, share, or use for loans and employment immediately.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-16 text-center">
                <Button size="lg" asChild className="bg-green-600 hover:bg-green-700 text-white px-8">
                  <Link href="/register" className="flex items-center gap-2">
                    Start Your Check Now
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section id="reviews" className="py-16 sm:py-20 lg:py-24 bg-muted/50 overflow-hidden">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-12 sm:mb-16">
            <div className="text-center">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 px-4">
                Trusted by Thousands of Customers Worldwide
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto px-4">
                Real reviews from real customers who got their reports instantly
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="flex gap-4 animate-scroll">
              {[...Array(2)].flatMap(() => [
                { name: "Peter Kamau", location: "Nairobi, Kenya", rating: 5, review: "Got my CRB report in 2 minutes! Used it for my KCB loan application and was approved same day. Best service ever!" },
                { name: "Grace Wanjiru", location: "Mombasa, Kenya", rating: 5, review: "I needed a report urgently for a job interview. Got it instantly! The employer was impressed with how fast I provided it." },
                { name: "John Ochieng", location: "Kisumu, Kenya", rating: 5, review: "Very professional service. Helped me understand my credit score and why my previous loan was rejected. Highly recommended!" },
                { name: "Mary Akinyi", location: "Nairobi, Kenya", rating: 5, review: "Fast, secure, and affordable! I was skeptical at first but the report was genuine and accepted by Equity Bank without any issues." },
                { name: "David Mwangi", location: "Nakuru, Kenya", rating: 5, review: "Excellent! Paid via M-Pesa through Paystack and got my report immediately. No hassles, no delays. Worth every shilling." },
                { name: "James Wilson", location: "USA", rating: 5, review: "Received my report in under 3 minutes! Very fast and professional service. Highly recommend for anyone applying for a loan." },
                { name: "Sarah Johnson", location: "UK", rating: 5, review: "The process was straightforward and the report was detailed. Helped me understand my credit standing better." },
                { name: "Michael Chen", location: "Singapore", rating: 5, review: "Excellent service! Got my report instantly. The customer support team was very helpful." },
                { name: "Emma Thompson", location: "Canada", rating: 5, review: "Quick and reliable. Used it for my job application and it was accepted everywhere I submitted it." },
                { name: "Ahmed Hassan", location: "UAE", rating: 5, review: "Impressed by the speed and accuracy. Will definitely use again when I need to update my report." },
                { name: "Sophie Anderson", location: "Australia", rating: 5, review: "Easy to use platform. The report format is clear and accepted by all financial institutions." },
                { name: "Raj Patel", location: "India", rating: 5, review: "The report helped me understand why my loan application was rejected. Now working on improving my score." },
                { name: "William Davis", location: "Canada", rating: 5, review: "Used it for my mortgage application. The bank accepted it without any questions. Professional service!" },
                { name: "Thandiwe Nkosi", location: "South Africa", rating: 5, review: "Simple and efficient. Got exactly what I needed for my tenant verification process." },
                { name: "Thomas White", location: "USA", rating: 5, review: "Professional and trustworthy service. The report was comprehensive and delivered instantly." },
              ]).map((review, index) => (
                <Card key={index} className="shrink-0 w-[350px] sm:w-[400px] border-2">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback className="bg-green-600 text-white font-semibold">
                          {review.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-base font-bold">{review.name}</CardTitle>
                        <p className="text-xs text-muted-foreground">{review.location}</p>
                        <div className="flex gap-1 mt-2">
                          {Array.from({ length: review.rating }).map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground leading-relaxed">{review.review}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="pricing" className="py-16 sm:py-20 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 px-4">Simple, Transparent Pricing</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto px-4">
                One-time payment for instant access to your complete credit report
              </p>
            </div>

            <div className="max-w-md mx-auto px-4">
              <div className="relative">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                  <Badge className="bg-green-600 text-white px-4 py-1 text-sm font-bold">MOST POPULAR</Badge>
                </div>
                <Card className="border-4 border-green-600 shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-green-600/10 rounded-full -mr-16 -mt-16"></div>
                  <CardHeader className="text-center pb-8 pt-10">
                    <CardTitle className="text-3xl font-bold">Complete Credit Report</CardTitle>
                    <div className="mt-6 space-y-2">
                      <div className="text-6xl font-bold text-green-600">${BASE_PRICE_USD}</div>
                      <div className="text-2xl font-semibold text-muted-foreground">
                        or {CURRENCY_SYMBOLS.KES} {BASE_PRICE_KES}
                      </div>
                    </div>
                    <CardDescription className="mt-4 text-base font-medium">
                      One-time payment • Instant delivery • No subscription
                    </CardDescription>
                    <div className="mt-4 inline-flex items-center gap-2 bg-orange-100 dark:bg-orange-900/30 px-4 py-2 rounded-full">
                      <Clock className="h-4 w-4 text-orange-600" />
                      <span className="text-sm font-semibold text-orange-700 dark:text-orange-300">Instant Access – No Waiting</span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6 pb-8">
                    <ul className="space-y-4">
                      {[
                        'Complete credit history & score',
                        'All account details & inquiries',
                        'Payment history analysis',
                        'Instant digital delivery (60 seconds)',
                        'Download & print unlimited times',
                        'Accepted by all banks & employers',
                        '24/7 access from any device',
                        'Bank-level security & encryption',
                      ].map((feature) => (
                        <li key={feature} className="flex items-start gap-3">
                          <CheckCircle className="h-6 w-6 text-green-600 shrink-0 mt-0.5" />
                          <span className="text-base">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Button className="w-full bg-green-600 hover:bg-green-700 text-white h-14 text-lg font-bold shadow-lg" size="lg" asChild>
                      <Link href="/register" className="flex items-center gap-2">
                        Get Your Report Now
                        <ArrowRight className="h-5 w-5" />
                      </Link>
                    </Button>

                    <p className="text-center text-sm text-muted-foreground">
                      Trusted by 10,000+ customers • Secure payment via Paystack
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <section id="faq" className="py-16 sm:py-20 lg:py-24 bg-muted/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 px-4">
                Frequently Asked Questions
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto px-4">
                Everything you need to know about our credit report service
              </p>
            </div>

            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>What is a credit report and why do I need it?</AccordionTrigger>
                  <AccordionContent>
                    A credit report is a detailed document that shows your credit history, including loans, credit cards, payment behavior, and credit score. You need it for loan applications, employment verification, tenant screening, and understanding your financial standing.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger>How long does it take to get my report?</AccordionTrigger>
                  <AccordionContent>
                    Your credit report is generated instantly after payment confirmation. Most customers receive their reports within 2-3 minutes. The report is delivered directly to your email and available in your dashboard.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger>Is my personal information secure?</AccordionTrigger>
                  <AccordionContent>
                    Absolutely. We use bank-level 256-bit SSL encryption to protect your data. Your information is never shared with third parties without your consent, and all transactions are processed through secure payment gateways.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4">
                  <AccordionTrigger>What payment methods do you accept?</AccordionTrigger>
                  <AccordionContent>
                    We accept major credit cards, debit cards, and local payment methods through our secure payment gateway. All payment methods are processed instantly, allowing you to get your report immediately.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-5">
                  <AccordionTrigger>Is the report accepted by banks and employers?</AccordionTrigger>
                  <AccordionContent>
                    Yes, our reports are sourced directly from licensed Credit Reference Bureaus in your country and are widely accepted by banks, financial institutions, employers, and landlords globally.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-6">
                  <AccordionTrigger>Can I download and print my report?</AccordionTrigger>
                  <AccordionContent>
                    Yes, you can download your report as a PDF file and print it as many times as needed. The report remains accessible in your dashboard for future reference.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-7">
                  <AccordionTrigger>What if I find errors in my report?</AccordionTrigger>
                  <AccordionContent>
                    If you identify any errors or discrepancies, you should contact the specific Credit Reference Bureau directly to dispute the information. We provide contact details for all CRBs in your report for easy follow-up.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-8">
                  <AccordionTrigger>How often should I check my credit report?</AccordionTrigger>
                  <AccordionContent>
                    It's recommended to check your credit report at least once every 6 months to monitor your credit health, identify potential fraud, and address any issues before applying for credit.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-9">
                  <AccordionTrigger>What information is included in the report?</AccordionTrigger>
                  <AccordionContent>
                    Your report includes your credit score, personal details, credit accounts (loans, credit cards), payment history, credit inquiries, public records, and a summary of your overall credit standing.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-10">
                  <AccordionTrigger>Do I need an ID to get my report?</AccordionTrigger>
                  <AccordionContent>
                    Yes, you need a valid national ID or passport number for identity verification. This is a regulatory requirement to ensure that credit information is only released to the rightful owner.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-11">
                  <AccordionTrigger>What is a good credit score?</AccordionTrigger>
                  <AccordionContent>
                    Credit scores typically range from 300 to 850 in most countries. Generally, a score of 700+ is considered good to excellent, 650-699 is fair, and below 650 may need improvement. Your report includes a detailed breakdown of factors affecting your score specific to your region.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-12">
                  <AccordionTrigger>Can someone else request my report?</AccordionTrigger>
                  <AccordionContent>
                    No. Only you can request your own report. We require identity verification to ensure that credit information is only shared with the individual it belongs to, maintaining strict privacy and security.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-13">
                  <AccordionTrigger>How do I improve my credit score?</AccordionTrigger>
                  <AccordionContent>
                    Pay all bills on time, reduce your debt-to-income ratio, avoid multiple loan applications, correct any errors on your report, and maintain older credit accounts. Your report includes personalized recommendations.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-14">
                  <AccordionTrigger>What if I've never had a loan or credit card?</AccordionTrigger>
                  <AccordionContent>
                    If you have no credit history, your report will show limited information. However, you can still get a report confirming you have a clean record, which is useful for employment or rental applications.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-15">
                  <AccordionTrigger>Is there a refund policy?</AccordionTrigger>
                  <AccordionContent>
                    Due to the instant nature of our service, we do not offer refunds once the report has been generated and delivered. However, if you experience technical issues preventing report delivery, please contact support immediately.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-16">
                  <AccordionTrigger>Can I get reports for multiple people?</AccordionTrigger>
                  <AccordionContent>
                    Each report requires individual verification and payment. You cannot request reports for other people as this violates privacy regulations. Each person must request their own report using their ID.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-17">
                  <AccordionTrigger>How long is the report valid?</AccordionTrigger>
                  <AccordionContent>
                    Credit reports are typically valid for 30-90 days, depending on the requesting institution's requirements. Banks and employers usually accept reports issued within the last 30 days.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-18">
                  <AccordionTrigger>What if my payment fails?</AccordionTrigger>
                  <AccordionContent>
                    If your payment fails, you can retry the payment process. Common reasons include insufficient funds, incorrect payment details, or network issues. Contact your payment provider or our support team if the problem persists.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-19">
                  <AccordionTrigger>Do you offer customer support?</AccordionTrigger>
                  <AccordionContent>
                    Yes, our customer support team is available via email and phone during business hours (8 AM - 8 PM, Monday to Saturday). We respond to all inquiries within 2 hours during business hours.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-20">
                  <AccordionTrigger>Can I access my report on mobile?</AccordionTrigger>
                  <AccordionContent>
                    Yes, our platform is fully mobile-responsive. You can register, pay, and access your report from any smartphone, tablet, or computer. The report is optimized for viewing on all screen sizes.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </section>
      </main>

      {showStickyCta && (
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-white dark:bg-gray-900 border-t shadow-2xl animate-in slide-in-from-bottom">
          <div className="container mx-auto max-w-4xl flex items-center justify-between gap-4">
            <div className="hidden sm:block">
              <p className="font-bold text-lg">Ready to check your credit status?</p>
              <p className="text-sm text-muted-foreground">Get your complete report in 60 seconds</p>
            </div>
            <Button size="lg" asChild className="bg-green-600 hover:bg-green-700 text-white font-bold shadow-lg whitespace-nowrap">
              <Link href="/register" className="flex items-center gap-2">
                Get Report Now
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      )}


      <Footer />
    </div>
  );
}
