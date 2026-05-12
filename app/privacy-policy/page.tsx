'use client';

import { Footer } from '@/components/layout/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Lock, Eye, FileText, UserCheck, Mail } from 'lucide-react';

export default function PrivacyPolicyPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 bg-gradient-to-b from-green-50 dark:from-green-950/20 to-transparent">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 max-w-4xl">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <div className="p-4 rounded-full bg-green-100 dark:bg-green-900/30">
                <Shield className="h-12 w-12 text-green-600" />
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-lg text-muted-foreground">
              Last updated: December 17, 2025
            </p>
          </div>

          <Card className="border-2 shadow-xl mb-8">
            <CardContent className="p-8 space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <FileText className="h-6 w-6 text-green-600" />
                  Introduction
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  CRB Status Checker ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our credit report service. Please read this policy carefully to understand our practices regarding your personal data.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Eye className="h-6 w-6 text-green-600" />
                  Information We Collect
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Personal Information</h3>
                    <p>When you register and use our service, we collect:</p>
                    <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                      <li>Full name (first and second name)</li>
                      <li>Email address</li>
                      <li>National ID or Passport number</li>
                      <li>Country of residence</li>
                      <li>Payment information (processed securely through Paystack)</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Automatically Collected Information</h3>
                    <p>We automatically collect certain information when you use our service:</p>
                    <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                      <li>Device information (browser type, operating system)</li>
                      <li>IP address and location data</li>
                      <li>Usage data and service interactions</li>
                      <li>Cookies and similar tracking technologies</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <UserCheck className="h-6 w-6 text-green-600" />
                  How We Use Your Information
                </h2>
                <div className="space-y-2 text-muted-foreground leading-relaxed">
                  <p>We use your information for the following purposes:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>To provide and maintain our credit report services</li>
                    <li>To process your payments securely through Paystack</li>
                    <li>To verify your identity and prevent fraud</li>
                    <li>To retrieve your credit information from licensed Credit Reference Bureaus</li>
                    <li>To send you service-related communications and updates</li>
                    <li>To improve our services and user experience</li>
                    <li>To comply with legal obligations and regulatory requirements</li>
                  </ul>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Lock className="h-6 w-6 text-green-600" />
                  Data Security
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  We implement industry-standard security measures to protect your personal information:
                </p>
                <ul className="list-disc list-inside mt-2 space-y-1 ml-4 text-muted-foreground">
                  <li>256-bit SSL/TLS encryption for all data transmission</li>
                  <li>Secure Firebase authentication and database storage</li>
                  <li>Payment processing through PCI-DSS compliant Paystack</li>
                  <li>Regular security audits and monitoring</li>
                  <li>Restricted access to personal data on a need-to-know basis</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">Information Sharing and Disclosure</h2>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4 text-muted-foreground">
                  <li><strong>Credit Reference Bureaus:</strong> To retrieve your credit report</li>
                  <li><strong>Payment Processors:</strong> Paystack processes payments on our behalf</li>
                  <li><strong>Service Providers:</strong> Firebase for authentication and database services</li>
                  <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">Your Rights</h2>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  You have the following rights regarding your personal information:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4 text-muted-foreground">
                  <li><strong>Access:</strong> Request a copy of your personal data we hold</li>
                  <li><strong>Correction:</strong> Update or correct inaccurate information</li>
                  <li><strong>Deletion:</strong> Request deletion of your personal data (subject to legal requirements)</li>
                  <li><strong>Object:</strong> Object to processing of your personal information</li>
                  <li><strong>Data Portability:</strong> Request transfer of your data to another service</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">Data Retention</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We retain your personal information for as long as necessary to provide our services and comply with legal obligations. Credit reports are stored for your access but expire after 90 days. Account information is retained unless you request deletion.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">Cookies and Tracking</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We use cookies and similar technologies to enhance your experience, analyze usage, and remember your preferences. You can control cookies through your browser settings, but some features may not function properly if cookies are disabled.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">Third-Party Links</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Our service may contain links to third-party websites. We are not responsible for the privacy practices of these external sites. We encourage you to review their privacy policies before providing any personal information.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">Children's Privacy</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Our service is not intended for individuals under 18 years of age. We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us immediately.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">Changes to This Privacy Policy</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We may update this Privacy Policy from time to time. We will notify you of significant changes by email or through a notice on our website. Your continued use of our service after changes constitute acceptance of the updated policy.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Mail className="h-6 w-6 text-green-600" />
                  Contact Us
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  If you have questions about this Privacy Policy or our data practices, please contact us at:
                </p>
                <div className="mt-4 p-4 bg-muted/50 rounded-lg">
                  <p className="font-semibold">CRB Status Checker</p>
                  <p className="text-muted-foreground">Email: privacy@crbstatuschecker.com</p>
                  <p className="text-muted-foreground">Support Hours: Monday - Saturday, 8 AM - 8 PM</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
