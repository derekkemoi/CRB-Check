'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ProtectedRoute } from '@/components/auth/protected-route';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuthStore } from '@/store/useAuthStore';
import { initiatePayment } from '@/services/payment.service';
import { fetchReport, type FetchReportResult } from '@/services/report.service';
import { getCurrentUser } from '@/services/auth.service';
import { getPriceByCountry } from '@/lib/price-utils';
import { toast } from 'sonner';
import { CheckCircle, CreditCard, Shield, Lock, Loader2, ArrowRight } from 'lucide-react';
import { track } from '@/lib/meta-pixel';

export default function PaymentPage() {
  const router = useRouter();
  const { user } = useAuthStore();

  const [loading, setLoading] = useState(false);
  const [userCountry, setUserCountry] = useState<string>('');
  const [priceInfo, setPriceInfo] = useState<ReturnType<typeof getPriceByCountry> | null>(null);
  const [hasReport, setHasReport] = useState(false);
  const [reportResult, setReportResult] = useState<FetchReportResult | null>(null);

  useEffect(() => {
    track('ViewContent', { content_name: 'CRB Report' });
  }, []);

  // Load user country, price, and check report status
  useEffect(() => {
    const loadUserData = async () => {
      if (!user) return;
      try {
        const currentUser = await getCurrentUser();
        if (currentUser) {
          const country = currentUser.country || 'Kenya';
          setUserCountry(country);
          setPriceInfo(getPriceByCountry(country));

          try {
            const result = await fetchReport();
            setReportResult(result);
            setHasReport(result.success);
          } catch (err) {
            setHasReport(false);
            setReportResult(null);
          }
        }
      } catch (error) {
        console.error('Error loading user data:', error);
        setPriceInfo(getPriceByCountry('Kenya'));
        setHasReport(false);
      }
    };

    loadUserData();
  }, [user]);

  // Redirect if user already has a report
  useEffect(() => {
    if (hasReport) {
      router.push('/dashboard');
    }
  }, [hasReport, router]);

  const handlePayment = async () => {
    if (!user || !priceInfo) {
      toast.error("Missing user or pricing information");
      return;
    }

    setLoading(true);
    try {
      const response = await initiatePayment(
        user.uid,
        user.email || '',
        priceInfo.amount,
        priceInfo.currency,
        `${window.location.origin}/verify`
      );

      track('InitiateCheckout', {
        value: priceInfo.amount,
        currency: 'KES'
      });

      if (response.authorization_url) {
        window.location.href = response.authorization_url;
      } else {
        toast.error('Failed to initiate payment. No authorization URL received.');
      }
    } catch (error: any) {
      toast.error(error.message || 'Payment initiation failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen flex-col bg-gray-50">
        <main className="flex-1 flex items-center justify-center py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-2xl space-y-8">
            
            {/* Progress Indicator */}
            <div className="flex items-center justify-between text-sm mb-2 px-1">
              <div className="font-medium text-green-600 flex items-center gap-1.5">
                Step 3 of 4
                <ArrowRight className="h-4 w-4" />
              </div>
              <div className="flex gap-1.5 text-muted-foreground">
                <div className="w-2 h-2 bg-green-600 rounded-full" />
                <div className="w-2 h-2 bg-green-600 rounded-full" />
                <div className="w-2 h-2 bg-green-600 rounded-full" />
                <div className="w-2 h-2 bg-gray-300 rounded-full" />
              </div>
            </div>

            {/* Report Preview Card */}
            <Card className="border-orange-200 bg-orange-50 shadow-md">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 bg-orange-500 rounded-full animate-pulse" />
                  <CardTitle className="text-xl text-orange-900">Your Report Is Ready</CardTitle>
                </div>
                <CardDescription className="text-orange-700">
                  We&apos;ve already generated your personalized CRB report.
                </CardDescription>
              </CardHeader>

              <CardContent className="pt-0">
                <div className="bg-white rounded-xl p-5 border border-orange-100 space-y-5">
                  {[
                    "Credit Score",
                    "CRB Status",
                    "Credit History"
                  ].map((label, i) => (
                    <div key={i} className="flex justify-between items-center py-1">
                      <div className="flex items-center gap-2 text-gray-700 font-medium">
                        <Lock className="h-4 w-4 text-orange-500" />
                        {label}
                      </div>
                      <span className="blur-sm select-none text-sm font-medium">Available</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Green Success Card */}
            <Card className="border-green-200 bg-green-50 shadow-sm">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="h-7 w-7 text-green-600" />
                </div>
                <h3 className="font-semibold text-green-900 text-lg">Report Successfully Generated</h3>
                <p className="text-green-700 mt-2 text-sm">
                  Your personalized CRB report is ready.<br />
                  Complete payment to unlock your results instantly.
                </p>
              </CardContent>
            </Card>

            {/* Main Payment Card */}
            <Card className="w-full shadow-lg">
              <CardHeader className="text-center px-4 sm:px-6 space-y-4 pt-8">
                {/* Secure Badge */}
                <div className="flex justify-center">
                  <Badge variant="secondary" className="text-sm px-4 py-1 font-medium">
                    Secure CRB Report Access
                  </Badge>
                </div>

                <div className="flex justify-center mb-2">
                  <div className="relative">
                    <div className="absolute inset-0 bg-green-500/20 rounded-full blur-xl" />
                    <CreditCard className="h-12 w-12 sm:h-14 sm:w-14 text-green-600 relative" />
                  </div>
                </div>

                <CardTitle className="text-2xl sm:text-3xl font-bold text-gray-900">
                  Your CRB Report Is Ready
                </CardTitle>

                <CardDescription className="text-base sm:text-lg">
                  Your report is ready and waiting for unlock.
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-8 px-4 sm:px-6 pb-10">
                {/* Pricing Section */}
                <div className="relative bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 sm:p-8 border-2 border-green-200 shadow-md">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-green-600 text-white px-5 py-1 text-xs font-semibold shadow-lg">
                      MOST POPULAR
                    </Badge>
                  </div>

                  <div className="flex flex-col items-center text-center">
                    <span className="text-2xl font-semibold text-gray-800">Full CRB Report</span>
                    <div className="mt-4">
                      <div className="text-6xl font-bold text-green-600 tracking-tighter">
                        {priceInfo ? priceInfo.displayPrice : 'KES 100'}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1 font-medium">One-time Payment</p>
                    </div>
                  </div>

                  <div className="mt-8 space-y-4">
                    {[
                      'Full credit history & repayment behavior',
                      'Current credit score & detailed analysis',
                      'Risk assessment & personalized recommendations',
                      'Valid for banks, loans & official use'
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                        <span className="text-[15px]">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Stats - Mobile First
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { value: "100%", label: "SECURE" },
                    { value: "INSTANT", label: "ACCESS" },
                    { value: "24/7", label: "AVAILABLE" }
                  ].map((stat, i) => (
                    <div key={i} className="text-center bg-white rounded-2xl p-5 border shadow-sm">
                      <div className="text-3xl font-bold text-green-600">{stat.value}</div>
                      <div className="text-xs text-muted-foreground mt-1.5 font-medium tracking-widest">{stat.label}</div>
                    </div>
                  ))}
                </div> */}

                {/* Trust / Payment Methods */}
                <div className="bg-green-50 border border-green-200 rounded-2xl p-6">
                  <p className="font-semibold text-green-800 mb-4">Pay securely with trusted methods</p>
                  <div className="flex flex-wrap gap-x-8 gap-y-4 justify-center text-green-700">
                    <div className="flex items-center gap-2 text-sm font-medium">✓ M-Pesa</div>
                    <div className="flex items-center gap-2 text-sm font-medium">✓ Visa</div>
                    <div className="flex items-center gap-2 text-sm font-medium">✓ Mastercard</div>
                  </div>
                  <p className="text-center text-xs text-green-600 mt-5">Trusted payment processing • Your data is safe</p>
                </div>

                {/* Payment Protection */}
                <div className="rounded-2xl border bg-muted/60 p-5 text-sm">
                  <p className="font-semibold flex items-center gap-2 mb-2">
                    <Shield className="h-4 w-4 text-green-600" />
                    Payment Protection
                  </p>
                  <p className="text-muted-foreground text-xs leading-relaxed">
                    If payment succeeds but your report does not unlock automatically, our support team will assist you immediately.
                  </p>
                </div>

                {/* CTA Button */}
                <div className="space-y-3 pt-2">
                  <Button
                    onClick={handlePayment}
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-8 text-lg shadow-xl shadow-green-600/30 hover:shadow-green-600/40 transition-all duration-200 hover:scale-[1.01] active:scale-[0.985]"
                    size="lg"
                    disabled={loading || !priceInfo}
                  >
                    {loading ? (
                      <span className="flex items-center gap-3">
                        <Loader2 className="h-6 w-6 animate-spin" />
                        Redirecting to secure checkout...
                      </span>
                    ) : (
                      "Get My CRB Report Now"
                    )}
                  </Button>

                  <p className="text-center text-sm font-medium text-muted-foreground">
                    Only KES {priceInfo?.amount || 100}
                  </p>
                </div>

                {/* Bottom Trust */}
                <div className="flex flex-col items-center gap-3 text-xs text-muted-foreground pt-2">
                  <div className="flex items-center gap-5">
                    <div className="flex items-center gap-1.5">
                      <Lock className="h-4 w-4" /> Secure
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Shield className="h-4 w-4" /> Encrypted
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle className="h-4 w-4" /> Instant
                    </div>
                  </div>
                  <p>🔒 Your transaction is fully protected</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}