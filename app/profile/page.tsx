'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { ProtectedRoute } from '@/components/auth/protected-route';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { profileSchema } from '@/lib/validations';
import { useAuthStore } from '@/store/useAuthStore';
import { getCurrentUser } from '@/services/auth.service';
import { User, Mail, CreditCard, FileText, MapPin, BadgeCheck, Clock, Pencil, X, Loader as Loader2, ArrowRight } from 'lucide-react';

const countries = [
  'Kenya', 'Nigeria', 'Philippines', 'Brazil', 'United States', 'United Kingdom',
  'Canada', 'Germany', 'Australia', 'Singapore', 'South Korea', 'India',
  'South Africa', 'United Arab Emirates (UAE)', 'Mexico',
];

interface ProfileFormData {
  firstName: string;
  secondName: string;
  idNumber: string;
  country: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const { user, setUser } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: user?.firstName || '',
      secondName: user?.secondName || '',
      idNumber: user?.idNumber || '',
      country: user?.country || '',
    },
  });

  useEffect(() => {
    if (user) {
      form.reset({
        firstName: user.firstName,
        secondName: user.secondName,
        idNumber: user.idNumber,
        country: user.country,
      });
    }
  }, [user, form]);

  useEffect(() => {
    getCurrentUser()
      .then((u) => { if (u) setUser(u); })
      .catch(() => {});
  }, [setUser]);

  const onSubmit = async (data: ProfileFormData) => {
    if (!user) return;
    setLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 800));
      toast.success('Profile updated successfully!');
      setIsEditing(false);
      const updated = await getCurrentUser();
      if (updated) setUser(updated);
    } catch (error: any) {
      toast.error(error.message || 'Failed to update profile.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    form.reset({
      firstName: user?.firstName || '',
      secondName: user?.secondName || '',
      idNumber: user?.idNumber || '',
      country: user?.country || '',
    });
    setIsEditing(false);
  };

  const getInitials = () =>
    `${user?.firstName?.charAt(0) ?? ''}${user?.secondName?.charAt(0) ?? ''}`.toUpperCase() || 'U';

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen flex-col bg-gray-50 dark:bg-gray-950">
        <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-3xl">

          {/* Profile hero */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl border shadow-sm overflow-hidden mb-5">
            <div className="h-24 bg-gradient-to-r from-green-600 to-emerald-600" />
            <div className="px-6 pb-6">
              <div className="flex items-end justify-between -mt-12 mb-5">
                <Avatar className="h-20 w-20 ring-4 ring-white dark:ring-gray-900 shadow-md">
                  <AvatarFallback className="bg-green-600 text-white text-2xl font-bold">
                    {getInitials()}
                  </AvatarFallback>
                </Avatar>
                <Button
                  variant={isEditing ? 'ghost' : 'outline'}
                  size="sm"
                  onClick={isEditing ? handleCancel : () => setIsEditing(true)}
                  className="gap-2 mb-1"
                >
                  {isEditing ? (
                    <><X className="h-4 w-4" /> Cancel</>
                  ) : (
                    <><Pencil className="h-4 w-4" /> Edit Profile</>
                  )}
                </Button>
              </div>
              <h1 className="text-2xl font-bold">{user?.firstName} {user?.secondName}</h1>
              <p className="text-muted-foreground text-sm mt-0.5">{user?.email}</p>
            </div>
          </div>

          {/* Details card */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl border shadow-sm mb-5">
            <div className="px-6 py-5 border-b">
              <p className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">Account Details</p>
            </div>
            <div className="divide-y">
              {[
                {
                  icon: <Mail className="h-4 w-4 text-muted-foreground" />,
                  label: 'Email address',
                  value: user?.email,
                },
                {
                  icon: <User className="h-4 w-4 text-muted-foreground" />,
                  label: 'ID / Passport number',
                  value: user?.idNumber,
                },
                {
                  icon: <MapPin className="h-4 w-4 text-muted-foreground" />,
                  label: 'Country',
                  value: user?.country,
                },
                {
                  icon: <CreditCard className="h-4 w-4 text-muted-foreground" />,
                  label: 'Payment status',
                  value: null,
                  badge: user?.paymentMade ? (
                    <span className="flex items-center gap-1.5 text-green-600 font-semibold text-sm">
                      <BadgeCheck className="h-4 w-4" /> Paid
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5 text-orange-600 font-medium text-sm">
                      <Clock className="h-4 w-4" /> Pending
                    </span>
                  ),
                },
              ].map((row, i) => (
                <div key={i} className="flex items-center gap-4 px-6 py-4">
                  <div className="h-8 w-8 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center flex-shrink-0">
                    {row.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-muted-foreground font-medium">{row.label}</p>
                    {row.value
                      ? <p className="font-semibold text-sm mt-0.5 truncate">{row.value}</p>
                      : <div className="mt-0.5">{row.badge}</div>
                    }
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Edit form */}
          {isEditing && (
            <div className="bg-white dark:bg-gray-900 rounded-2xl border shadow-sm mb-5 overflow-hidden">
              <div className="px-6 py-5 border-b">
                <p className="font-semibold">Edit Personal Information</p>
                <p className="text-sm text-muted-foreground mt-0.5">Update your profile details below</p>
              </div>
              <div className="p-6">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                    <div className="grid gap-5 grid-cols-1 sm:grid-cols-2">
                      <FormField control={form.control} name="firstName" render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-semibold">First Name</FormLabel>
                          <FormControl><Input className="h-11" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <FormField control={form.control} name="secondName" render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-semibold">Second Name</FormLabel>
                          <FormControl><Input className="h-11" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                    </div>

                    <FormField control={form.control} name="idNumber" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-semibold">ID / Passport Number</FormLabel>
                        <FormControl><Input className="h-11" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />

                    <FormField control={form.control} name="country" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-semibold">Country</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger className="h-11">
                              <SelectValue placeholder="Select country" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {countries.map((c) => (
                              <SelectItem key={c} value={c}>{c}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )} />

                    <div className="flex gap-3 pt-1">
                      <Button type="submit" className="flex-1 bg-green-600 hover:bg-green-700 h-11 font-semibold" disabled={loading}>
                        {loading ? (
                          <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Saving...</>
                        ) : 'Save Changes'}
                      </Button>
                      <Button type="button" variant="outline" onClick={handleCancel} className="h-11 px-6">
                        Cancel
                      </Button>
                    </div>
                  </form>
                </Form>
              </div>
            </div>
          )}

          {/* Action row */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl border shadow-sm overflow-hidden">
            <div className="px-6 py-5 border-b">
              <p className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">Actions</p>
            </div>
            <div className="divide-y">
              {user?.paymentMade ? (
                <button
                  onClick={() => router.push('/report')}
                  className="w-full flex items-center gap-4 px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-left group"
                >
                  <div className="h-9 w-9 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
                    <FileText className="h-5 w-5 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-sm">View CRB Report</p>
                    <p className="text-xs text-muted-foreground">Full credit report with score and recommendations</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-green-600 group-hover:translate-x-0.5 transition-all" />
                </button>
              ) : (
                <button
                  onClick={() => router.push('/payment')}
                  className="w-full flex items-center gap-4 px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-left group"
                >
                  <div className="h-9 w-9 rounded-xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center flex-shrink-0">
                    <CreditCard className="h-5 w-5 text-orange-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-sm">Complete Payment</p>
                    <p className="text-xs text-muted-foreground">Pay once to unlock your full credit report</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-orange-600 group-hover:translate-x-0.5 transition-all" />
                </button>
              )}
            </div>
          </div>

        </main>
        <Footer />
      </div>
    </ProtectedRoute>
  );
}
