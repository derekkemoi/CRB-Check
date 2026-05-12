'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { loginSchema } from '@/lib/validations';
import { loginUser } from '@/services/auth.service';
import { useAuthStore } from '@/store/useAuthStore';
import type { LoginFormData } from '@/types';
import { Shield, Lock, CircleCheck as CheckCircle } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const {  user } = useAuthStore();
  const [loading, setLoading] = useState(false);

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  //Redirect if user is already logged in
//   useEffect(() => {
//     if (user?.paymentMade) {
//       router.push('/dashboard');
//     }else{
//         router.push('/purpose');
//     }
//   }, [user, router]);

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true);
    try {
      await loginUser(data.email, data.password);
      toast.success('Welcome back!');
          if (user?.paymentMade) {
      router.push('/dashboard');
    }else{
        router.push('/purpose');
    }
    } catch (error: any) {
      toast.error(error.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 flex items-center justify-center py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-green-50 dark:from-green-950/20 to-transparent">
        <div className="w-full max-w-md">
          <Card className="border-2 shadow-xl">
            <CardHeader className="space-y-3 text-center px-6 sm:px-8 pt-10">
              <div className="flex justify-center mb-2">
                <div className="p-4 rounded-full bg-green-100 dark:bg-green-900/30">
                  <Shield className="h-12 w-12 text-green-600" />
                </div>
              </div>
              <CardTitle className="text-3xl sm:text-4xl font-bold">Welcome Back</CardTitle>
              <CardDescription className="text-base sm:text-lg">
                Log in to access your CRB report
              </CardDescription>
            </CardHeader>
            <CardContent className="px-6 sm:px-8 pb-8">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
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
                            className="h-12 text-base"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-semibold">Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="••••••••"
                            className="h-12 text-base"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex justify-end">
                    <Link href="/register" className="text-sm text-green-600 hover:text-green-700 hover:underline font-medium">
                      Forgot Password?
                    </Link>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-green-600 hover:bg-green-700 h-12 text-lg font-semibold shadow-lg"
                    size="lg"
                    disabled={loading}
                  >
                    {loading ? 'Signing In...' : 'Log In'}
                  </Button>

                  <p className="text-center text-base text-muted-foreground pt-2">
                    Don&apos;t have an account?{' '}
                    <Link href="/register" className="text-green-600 hover:text-green-700 hover:underline font-semibold">
                      Sign Up
                    </Link>
                  </p>
                </form>
              </Form>

              <div className="mt-8 pt-6 border-t">
                <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <Lock className="h-4 w-4 text-green-600" />
                    <span className="font-medium">Secure Login</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="font-medium">256-bit Encryption</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Shield className="h-4 w-4 text-green-600" />
                    <span className="font-medium">Bank-Level Security</span>
                  </div>
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
