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
import { CheckCircle, CreditCard, Shield, Lock, Loader2 } from 'lucide-react';
import { track } from '@/lib/meta-pixel'

const purposeLabels: Record<string, string> = {
  employment: 'Employment Verification',
  loan: 'Loan Application',
  credit_check: 'Personal Credit Check',
  tenant: 'Tenant Verification',
  business: 'Business Purpose',
  other: 'Other',
};

export default function PaymentPage() {
  const router = useRouter();
  const { user } = useAuthStore();

  const [loading, setLoading] = useState(false);
  const [userCountry, setUserCountry] = useState<string>('');
  const [priceInfo, setPriceInfo] = useState<ReturnType<typeof getPriceByCountry> | null>(null);
  const [hasReport, setHasReport] = useState(false);
  const [reportResult, setReportResult] = useState<FetchReportResult | null>(null);

  useEffect(() => {
    track('ViewContent', {
      content_name: 'CRB Report'
    })
  }, [])

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

          // Check report status using the new service
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
        })


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
      <div className="flex min-h-screen flex-col">
        <main className="flex-1 flex items-center justify-center py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
          <Card className="w-full max-w-2xl shadow-lg">
            <CardHeader className="text-center px-4 sm:px-6 space-y-3">
              <div className="flex justify-center mb-2">
                <div className="relative">
                  <div className="absolute inset-0 bg-green-500/20 rounded-full blur-xl"></div>
                  <CreditCard className="h-12 w-12 sm:h-14 sm:w-14 text-green-600 relative" />
                </div>
              </div>
              <CardTitle className="text-2xl sm:text-3xl lg:text-4xl font-bold">
                Complete Your Payment – Unlock Your CRB Report Instantly
              </CardTitle>
              <CardDescription className="text-sm sm:text-base lg:text-lg">
                Secure payment powered by Paystack. Your report will be ready immediately after payment.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6 px-4 sm:px-6 pb-8">
              <div className="relative bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 rounded-xl p-6 sm:p-8 border-2 border-green-200 dark:border-green-800 shadow-md">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge className="bg-green-600 text-white px-4 py-1 text-xs font-semibold shadow-lg">
                    MOST POPULAR
                  </Badge>
                </div>
                <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
                  <span className="text-xl font-semibold">CRB Report</span>
                  <div className="text-center sm:text-right">
                    <div className="text-5xl sm:text-6xl font-bold text-green-600">
                      {priceInfo ? priceInfo.displayPrice : '...'}
                    </div>
                    <span className="text-sm text-muted-foreground">One-time payment • Instant Access</span>
                  </div>
                </div>

                <div className="space-y-4">
                  {['Full credit history', 'Current credit score & analysis', 'Personalized recommendations', 'Valid for official use'].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                      <span className="text-base font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-5 text-sm sm:text-base">
                <div className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <p className="text-blue-900 dark:text-blue-100 font-medium">
                    You will be securely redirected to Paystack. Your report will be generated instantly after successful payment.
                  </p>
                </div>
              </div>

              <Button
                onClick={handlePayment}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold shadow-xl shadow-green-600/30 hover:shadow-green-600/40 transition-all duration-200 hover:scale-[1.02]"
                size="lg"
                disabled={loading || !priceInfo}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Redirecting to Paystack...
                  </span>
                ) : priceInfo ? (
                  `Pay ${priceInfo.displayPrice} & Get Report Now`
                ) : (
                  'Loading Price...'
                )}
              </Button>

              <div className="flex flex-col items-center gap-3 text-sm text-muted-foreground">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5">
                    <Lock className="h-4 w-4" />
                    <span>Secure</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Shield className="h-4 w-4" />
                    <span>Encrypted</span>
                  </div>
                </div>
                <p className="text-xs">Powered by Paystack • 100% Secure Payment</p>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </ProtectedRoute>
  );
}