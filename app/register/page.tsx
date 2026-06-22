'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { registerSchema } from '@/lib/validations';
import { registerUser } from '@/services/auth.service';
import { useAuthStore } from '@/store/useAuthStore';
import type { RegisterFormData } from '@/types';
import { Shield, Eye, EyeOff, Lock, CheckCircle2, Loader2, ArrowRight } from 'lucide-react';
import { track } from '@/lib/meta-pixel';

const countries = [
  'Kenya', 'Nigeria', 'Philippines', 'Brazil', 'United States', 'United Kingdom',
  'Canada', 'Germany', 'Australia', 'Singapore', 'South Korea', 'India',
  'South Africa', 'United Arab Emirates (UAE)', 'Mexico'
];

const getPasswordStrength = (password: string): { strength: 'weak' | 'medium' | 'strong'; color: string; width: string } => {
  if (!password) return { strength: 'weak', color: 'bg-gray-300', width: '0%' };
  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[^a-zA-Z0-9]/.test(password)) score++;
  if (score <= 2) return { strength: 'weak', color: 'bg-red-500', width: '33%' };
  if (score <= 3) return { strength: 'medium', color: 'bg-yellow-500', width: '66%' };
  return { strength: 'strong', color: 'bg-green-500', width: '100%' };
};

const passwordRequirements = [
  { label: 'At least 8 characters', test: (pw: string) => pw.length >= 8 },
  { label: 'One uppercase letter', test: (pw: string) => /[A-Z]/.test(pw) },
  { label: 'One number', test: (pw: string) => /\d/.test(pw) },
];

export default function RegisterPage() {
  const router = useRouter();
  const { setUser } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({
    strength: 'weak' as 'weak' | 'medium' | 'strong',
    color: 'bg-gray-300',
    width: '0%'
  });

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: '',
      secondName: '',
      email: '',
      password: '',
      confirmPassword: '',
      idNumber: '',
      country: 'Kenya',
    },
  });

  const passwordValue = form.watch('password') || '';

  const onSubmit = async (data: RegisterFormData) => {
    setLoading(true);
    try {
      const user = await registerUser(data);
      setUser(user);
      
      track('CompleteRegistration');
      track('Lead');

      toast.success('Account created successfully!', {
        description: 'Welcome to CRB Status Checker',
        icon: <CheckCircle2 className="h-5 w-5 text-green-600" />,
      });
      router.push('/purpose');
    } catch (error: any) {
      toast.error(error.message || 'Registration failed', {
        description: 'Please try again or use a different email',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <main className="flex-1 flex items-center justify-center py-6 sm:py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-2xl">
          {/* Progress Indicator */}
          <div className="flex items-center justify-between mb-6 px-1">
            <div className="font-medium text-green-600 flex items-center gap-1.5 text-sm">
              Step 1 of 4
              <ArrowRight className="h-4 w-4" />
            </div>
            <div className="flex gap-1.5">
              <div className="w-2 h-2 bg-green-600 rounded-full" />
              <div className="w-2 h-2 bg-gray-300 rounded-full" />
              <div className="w-2 h-2 bg-gray-300 rounded-full" />
              <div className="w-2 h-2 bg-gray-300 rounded-full" />
            </div>
          </div>

          <Card className="shadow-lg">
            <CardHeader className="space-y-3 text-center px-4 sm:px-6 pb-4">
              <div className="flex justify-center mb-2">
                <div className="relative">
                  <div className="absolute inset-0 bg-green-500/20 rounded-full blur-xl" />
                  <Shield className="h-12 w-12 sm:h-14 sm:w-14 text-green-600 relative" strokeWidth={1.5} />
                </div>
              </div>
              <CardTitle className="text-2xl sm:text-3xl font-bold">
                Create Your Free Account
              </CardTitle>
              <CardDescription className="text-base">
                Registration takes less than 60 seconds.<br />
                No payment required at this step.
              </CardDescription>
            </CardHeader>

            {/* Trust Card */}
            <div className="mx-4 sm:mx-6 -mt-2 mb-6 bg-green-50 border border-green-200 rounded-2xl p-4">
              <div className="grid grid-cols-1 gap-2 text-sm">
                <div className="flex items-center gap-2 text-green-700">
                  <CheckCircle2 className="h-4 w-4 flex-shrink-0" /> Registration is completely free
                </div>
                <div className="flex items-center gap-2 text-green-700">
                  <CheckCircle2 className="h-4 w-4 flex-shrink-0" /> Your report will be generated before any payment
                </div>
                <div className="flex items-center gap-2 text-green-700">
                  <CheckCircle2 className="h-4 w-4 flex-shrink-0" /> Secure &amp; encrypted
                </div>
              </div>
            </div>

            <CardContent className="px-4 sm:px-6 pb-8">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-semibold">First Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John" className="h-11 sm:h-12 text-base" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="secondName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-semibold">Second Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Doe" className="h-11 sm:h-12 text-base" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-semibold">Email Address</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="john.doe@example.com" className="h-11 sm:h-12 text-base" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="country"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-semibold">Country</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="h-11 sm:h-12 text-base">
                              <SelectValue placeholder="Select your country" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {countries.map((country) => (
                              <SelectItem key={country} value={country}>
                                {country}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="idNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-semibold">ID / Passport Number</FormLabel>
                        <FormControl>
                          <Input placeholder="12345678" className="h-11 sm:h-12 text-base" {...field} />
                        </FormControl>
                        <p className="text-xs text-muted-foreground mt-1.5">
                          Used only to securely retrieve your credit information
                        </p>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Password Fields */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-semibold">Password</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••"
                                className="h-11 sm:h-12 text-base pr-10"
                                {...field}
                                onChange={(e) => {
                                  field.onChange(e);
                                  setPasswordStrength(getPasswordStrength(e.target.value));
                                }}
                              />
                              <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                              >
                                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                              </button>
                            </div>
                          </FormControl>

                          {field.value && (
                            <div className="mt-3">
                              <div className="flex items-center gap-2 mb-2">
                                <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                                  <div className={`h-full ${passwordStrength.color} transition-all`} style={{ width: passwordStrength.width }} />
                                </div>
                                <span className="text-xs font-medium capitalize text-muted-foreground">{passwordStrength.strength}</span>
                              </div>
                              <div className="space-y-1.5 text-xs">
                                {passwordRequirements.map((req, i) => (
                                  <div key={i} className={`flex items-center gap-2 ${req.test(passwordValue) ? 'text-green-600' : 'text-muted-foreground'}`}>
                                    <CheckCircle2 className={`h-3.5 w-3.5 ${req.test(passwordValue) ? '' : 'opacity-40'}`} />
                                    {req.label}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-semibold">Confirm Password</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="••••••••"
                                className="h-11 sm:h-12 text-base pr-10"
                                {...field}
                              />
                              <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                              >
                                {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                              </button>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold h-14 text-base shadow-lg shadow-green-600/30"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Creating Your Account...
                      </>
                    ) : (
                      'Create Free Account'
                    )}
                  </Button>

                  <p className="text-center text-xs text-muted-foreground">
                    No payment required yet. You will review your report before paying.
                  </p>

                  <div className="pt-2 text-center text-sm text-muted-foreground">
                    Already have an account?{' '}
                    <Link href="/login" className="text-green-600 hover:underline font-medium">
                      Sign in here
                    </Link>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}