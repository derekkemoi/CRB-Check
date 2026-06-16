'use client';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ProtectedRoute } from '@/components/auth/protected-route';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuthStore } from '@/store/useAuthStore';
import { verifyPayment } from '@/services/payment.service';
import { getCurrentUser } from '@/services/auth.service';
import { CircleCheck as CheckCircle, Circle as XCircle, Loader as Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function VerifyPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, setUser } = useAuthStore();

  const [status, setStatus] = useState<'loading' | 'success' | 'failed'>('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const reference = searchParams.get('reference');
    const trxref = searchParams.get('trxref'); // Paystack sometimes uses this

    const paymentReference = reference || trxref;

    if (!paymentReference) {
      setStatus('failed');
      setMessage('Missing payment reference or user information.');
      return;
    }

    const verify = async () => {
      try {
        const result = await verifyPayment(paymentReference);
        console.log('Verification result:', result.paymentStatus);
        if (result && result.paymentStatus === 'paid') {
          // Refresh user in store so paymentMade: true is reflected everywhere
          const updatedUser = await getCurrentUser();
          if (updatedUser) setUser(updatedUser);

          setStatus('success');
          setMessage('Your CRB Report has been successfully generated!');

          setTimeout(() => {
            router.push('/dashboard');
          }, 2500);
        } else {
          setStatus('failed');
          setMessage('Payment verification failed. Please try again.');
        }
      } catch (error: any) {
        console.error('Verification error:', error);
        setStatus('failed');
        setMessage(error.message || 'Something went wrong during verification.');
      }
    };

    verify();
  }, [searchParams, user, router, setUser]);

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen flex-col bg-gradient-to-b from-green-50 dark:from-green-950/20 to-transparent">
        <main className="flex-1 flex items-center justify-center py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
          <Card className="w-full max-w-md shadow-xl">
            <CardHeader className="text-center px-6 pt-10 pb-6">
              {status === 'loading' && (
                <>
                  <div className="flex justify-center mb-6">
                    <Loader2 className="h-16 w-16 text-green-600 animate-spin" />
                  </div>
                  <CardTitle className="text-2xl">Verifying Your Payment</CardTitle>
                  <CardDescription className="text-base mt-2">
                    Please wait while we confirm your transaction...
                  </CardDescription>
                </>
              )}

              {status === 'success' && (
                <>
                  <div className="flex justify-center mb-6">
                    <CheckCircle className="h-20 w-20 text-green-600" />
                  </div>
                  <CardTitle className="text-3xl text-green-600">Payment Successful!</CardTitle>
                  <CardDescription className="text-base mt-3">
                    {message || 'Your CRB Report has been generated successfully.'}
                  </CardDescription>
                </>
              )}

              {status === 'failed' && (
                <>
                  <div className="flex justify-center mb-6">
                    <XCircle className="h-20 w-20 text-red-500" />
                  </div>
                  <CardTitle className="text-2xl text-red-600">Payment Verification Failed</CardTitle>
                  <CardDescription className="text-base mt-3">
                    {message || 'We could not verify your payment.'}
                  </CardDescription>
                </>
              )}
            </CardHeader>

            <CardContent className="px-6 pb-8 space-y-4">
              {status === 'success' && (
                <Button asChild className="w-full h-12 text-base" size="lg">
                  <Link href="/dashboard">Go to Dashboard</Link>
                </Button>
              )}

              {status === 'failed' && (
                <>
                  <Button asChild variant="outline" className="w-full h-12" size="lg">
                    <Link href="/payment">Try Payment Again</Link>
                  </Button>
                  <Button asChild variant="ghost" className="w-full" size="lg">
                    <Link href="/dashboard">Go to Dashboard</Link>
                  </Button>
                </>
              )}
            </CardContent>
          </Card>
        </main>
      </div>
    </ProtectedRoute>
  );
}