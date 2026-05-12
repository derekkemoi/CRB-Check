'use client';

import { Footer } from '@/components/layout/footer';
import { Card, CardContent } from '@/components/ui/card';
import { FileText, AlertTriangle, CreditCard, RefreshCw, Scale, UserX } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 bg-gradient-to-b from-green-50 dark:from-green-950/20 to-transparent">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 max-w-4xl">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <div className="p-4 rounded-full bg-green-100 dark:bg-green-900/30">
                <Scale className="h-12 w-12 text-green-600" />
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">Terms of Service</h1>
            <p className="text-lg text-muted-foreground">
              Last updated: December 17, 2025
            </p>
          </div>

          <Card className="border-2 shadow-xl mb-8">
            <CardContent className="p-8 space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <FileText className="h-6 w-6 text-green-600" />
                  Acceptance of Terms
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  By accessing and using CRB Status Checker's services, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, you may not use our services. We reserve the right to modify these terms at any time, and your continued use constitutes acceptance of any changes.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">Service Description</h2>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  CRB Status Checker provides instant access to credit bureau reports from licensed Credit Reference Bureaus. Our service includes:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4 text-muted-foreground">
                  <li>Instant credit report generation and delivery</li>
                  <li>Credit score analysis and recommendations</li>
                  <li>Secure online access to your credit information</li>
                  <li>PDF download and print capabilities</li>
                  <li>24/7 availability of the service platform</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">User Eligibility</h2>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  To use our service, you must:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4 text-muted-foreground">
                  <li>Be at least 18 years of age</li>
                  <li>Provide accurate and truthful personal information</li>
                  <li>Have a valid national ID or passport</li>
                  <li>Own the identity information you submit</li>
                  <li>Have legal capacity to enter into binding contracts</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <CreditCard className="h-6 w-6 text-green-600" />
                  Payment and Fees
                </h2>
                <div className="space-y-3 text-muted-foreground leading-relaxed">
                  <p>
                    <strong className="text-foreground">Service Fee:</strong> Our credit report service requires a one-time payment of $2.00 (or equivalent in your local currency).
                  </p>
                  <p>
                    <strong className="text-foreground">Payment Processing:</strong> All payments are processed securely through Paystack, our trusted payment gateway. We do not store your payment card information.
                  </p>
                  <p>
                    <strong className="text-foreground">Currency:</strong> Prices are displayed in USD and your local currency. The final amount charged will be based on current exchange rates.
                  </p>
                  <p>
                    <strong className="text-foreground">No Recurring Charges:</strong> This is a one-time payment. We do not operate on a subscription model.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <RefreshCw className="h-6 w-6 text-green-600" />
                  Refund Policy
                </h2>
                <div className="space-y-3 text-muted-foreground leading-relaxed">
                  <p>
                    Due to the instant nature of our service and the immediate delivery of credit reports, <strong className="text-foreground">refunds are generally not provided once a report has been generated and delivered.</strong>
                  </p>
                  <p>Refunds may be considered in the following exceptional circumstances:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Payment was processed but no report was generated due to technical errors on our end</li>
                    <li>Duplicate payment for the same service</li>
                    <li>Unauthorized transaction (subject to verification)</li>
                  </ul>
                  <p>
                    To request a refund, contact our support team within 48 hours of payment with your payment reference and a detailed explanation.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <AlertTriangle className="h-6 w-6 text-green-600" />
                  Accuracy and Disclaimer
                </h2>
                <div className="space-y-3 text-muted-foreground leading-relaxed">
                  <p>
                    <strong className="text-foreground">Data Source:</strong> Credit reports are generated using data from licensed Credit Reference Bureaus. We act as a facilitator and do not create, modify, or guarantee the accuracy of the information.
                  </p>
                  <p>
                    <strong className="text-foreground">No Liability:</strong> We are not responsible for errors, inaccuracies, or omissions in credit reports provided by Credit Reference Bureaus.
                  </p>
                  <p>
                    <strong className="text-foreground">Disputes:</strong> If you identify errors in your credit report, you must contact the relevant Credit Reference Bureau or financial institution directly to dispute the information.
                  </p>
                  <p>
                    <strong className="text-foreground">Not Financial Advice:</strong> The credit improvement recommendations provided are general guidelines and do not constitute professional financial advice.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">Report Validity</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Credit reports generated through our service are typically valid for 30-90 days, depending on the requirements of the requesting institution (bank, employer, landlord, etc.). We recommend obtaining a fresh report if yours is older than 30 days.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">Acceptable Use</h2>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  You agree to use our service only for lawful purposes. Prohibited activities include:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4 text-muted-foreground">
                  <li>Requesting reports using false or stolen identity information</li>
                  <li>Accessing credit information of another person without authorization</li>
                  <li>Using our service for identity theft or fraud</li>
                  <li>Attempting to reverse engineer, hack, or compromise our systems</li>
                  <li>Reselling or redistributing credit reports without permission</li>
                  <li>Using automated tools or bots to access our service</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">Intellectual Property</h2>
                <p className="text-muted-foreground leading-relaxed">
                  All content on our website, including text, graphics, logos, software, and design, is the property of CRB Status Checker and protected by copyright laws. You may not reproduce, distribute, or create derivative works without our express written permission.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">Account Security</h2>
                <p className="text-muted-foreground leading-relaxed">
                  You are responsible for maintaining the confidentiality of your account credentials. You must notify us immediately of any unauthorized access or security breaches. We are not liable for any losses resulting from unauthorized use of your account.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <UserX className="h-6 w-6 text-green-600" />
                  Account Termination
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  We reserve the right to suspend or terminate your account if you:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4 text-muted-foreground">
                  <li>Violate these Terms of Service</li>
                  <li>Provide false or misleading information</li>
                  <li>Engage in fraudulent or illegal activities</li>
                  <li>Abuse or misuse our service</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">Limitation of Liability</h2>
                <p className="text-muted-foreground leading-relaxed">
                  To the fullest extent permitted by law, CRB Status Checker shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our service. Our total liability is limited to the amount you paid for the service.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">Indemnification</h2>
                <p className="text-muted-foreground leading-relaxed">
                  You agree to indemnify and hold harmless CRB Status Checker from any claims, damages, losses, liabilities, and expenses arising from your violation of these terms or misuse of our service.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">Governing Law</h2>
                <p className="text-muted-foreground leading-relaxed">
                  These Terms of Service are governed by and construed in accordance with the laws of the jurisdiction where our company is registered. Any disputes shall be resolved in the courts of that jurisdiction.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">Changes to Terms</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We reserve the right to modify these Terms of Service at any time. Significant changes will be communicated via email or website notice. Your continued use after changes constitute acceptance of the updated terms.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
                <p className="text-muted-foreground leading-relaxed">
                  For questions about these Terms of Service, please contact us:
                </p>
                <div className="mt-4 p-4 bg-muted/50 rounded-lg">
                  <p className="font-semibold">CRB Status Checker</p>
                  <p className="text-muted-foreground">Email: support@crbstatuschecker.com</p>
                  <p className="text-muted-foreground">Support Hours: Monday - Saturday, 8 AM - 8 PM</p>
                </div>
              </div>

              <div className="pt-6 border-t">
                <p className="text-sm text-muted-foreground italic">
                  By using our service, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
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
