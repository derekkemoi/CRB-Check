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
import { Shield, Eye, EyeOff, Lock, CircleCheck as CheckCircle2, Loader as Loader2 } from 'lucide-react';
import { track } from '@/lib/meta-pixel'


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

  const onSubmit = async (data: RegisterFormData) => {
    setLoading(true);
    try {
      const user = await registerUser(data);
      setUser(user);
      track('CompleteRegistration')
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
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 flex items-center justify-center py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
        <Card className="w-full max-w-2xl shadow-lg">
          <CardHeader className="space-y-3 text-center px-4 sm:px-6 pb-6">
            <div className="flex justify-center mb-2">
              <div className="relative">
                <div className="absolute inset-0 bg-green-500/20 rounded-full blur-xl"></div>
                <Shield className="h-14 w-14 sm:h-16 sm:w-16 text-green-600 dark:text-green-500 relative" strokeWidth={1.5} />
              </div>
            </div>
            <CardTitle className="text-2xl sm:text-3xl lg:text-4xl font-bold">
              Create Your Account – Get Instant CRB Access
            </CardTitle>
            <CardDescription className="text-sm sm:text-base lg:text-lg">
              Secure registration takes less than 60 seconds
            </CardDescription>
          </CardHeader>

          <CardContent className="px-4 sm:px-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
                <div className="grid gap-4 sm:gap-5 sm:grid-cols-2">
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
                  name="idNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold">ID / Passport Number</FormLabel>
                      <FormControl>
                        <Input placeholder="12345678" className="h-11 sm:h-12 text-base" {...field} />
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

                {/* Password Fields */}
                <div className="grid gap-4 sm:gap-5 sm:grid-cols-2">
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
                          <div className="mt-2 flex items-center gap-2">
                            <div className="flex-1 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                              <div className={`h-full ${passwordStrength.color} transition-all`} style={{ width: passwordStrength.width }} />
                            </div>
                            <span className="text-xs font-medium capitalize">{passwordStrength.strength}</span>
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
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold h-12 text-base"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Creating Account...
                    </>
                  ) : (
                    'Create Account & Continue'
                  )}
                </Button>

                <div className="pt-4 text-center text-sm text-muted-foreground">
                  Already have an account?{' '}
                  <Link href="/login" className="text-green-600 hover:underline font-semibold">
                    Sign in here
                  </Link>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}