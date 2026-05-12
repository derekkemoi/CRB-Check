'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { ProtectedRoute } from '@/components/auth/protected-route';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { purposeSchema } from '@/lib/validations';
import { useAuthStore } from '@/store/useAuthStore';
import { updateReportPurposes } from '@/services/payment.service';
import type { PurposeFormData } from '@/types';
import { Briefcase, Building, ShieldCheck, Home, Landmark, MoreHorizontal, CheckCircle2, Loader2 } from 'lucide-react';

const purposesList = [
  { id: 'employment', label: 'Employment', icon: Briefcase },
  { id: 'loan', label: 'Loan Application', icon: Landmark },
  { id: 'credit_check', label: 'Personal Credit Check', icon: ShieldCheck },
  { id: 'tenant', label: 'Tenant Verification', icon: Home },
  { id: 'business', label: 'Business Purpose', icon: Building },
  { id: 'other', label: 'Other', icon: MoreHorizontal },
];

const loadingSteps = [
  'Connecting to credit databases...',
  'Retrieving your payment history...',
  'Analyzing accounts and inquiries...',
  'Calculating your credit score...',
  'Finalizing your personalized report...',
];

export default function PurposePage() {
  const router = useRouter();
  const { user } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [showGeneratingDialog, setShowGeneratingDialog] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const form = useForm<PurposeFormData>({
    resolver: zodResolver(purposeSchema),
    defaultValues: { purposes: [] },
  });

  const selectedPurposes = form.watch('purposes') || [];

  // Fake generation animation
  const startGenerationAnimation = () => {
    setShowGeneratingDialog(true);
    setProgress(0);
    setCurrentStep(0);
    setIsComplete(false);

    const totalDuration = 6500;
    const interval = 80;
    let elapsed = 0;

    const timer = setInterval(() => {
      elapsed += interval;
      const newProgress = Math.min(Math.floor((elapsed / totalDuration) * 100), 100);
      setProgress(newProgress);

      const newStep = Math.min(Math.floor(elapsed / (totalDuration / loadingSteps.length)), loadingSteps.length - 1);
      setCurrentStep(newStep);

      if (elapsed >= totalDuration) {
        clearInterval(timer);
        setIsComplete(true);
        setTimeout(() => {
          router.push('/payment');
        }, 1200);
      }
    }, interval);
  };

  const onSubmit = async (data: PurposeFormData) => {
    if (!user?.uid) {
      toast.error("User not found. Please login again.");
      return;
    }

    setLoading(true);
    try {
      await updateReportPurposes(user.uid, data.purposes);
      toast.success('Purposes saved successfully!');
      startGenerationAnimation();
    } catch (error: any) {
      toast.error(error.message || 'Failed to save purposes');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen flex-col">
        <main className="flex-1 flex items-center justify-center py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
          <Card className="w-full max-w-3xl shadow-lg">
            <CardHeader className="text-center px-4 sm:px-6 space-y-3">
              <CardTitle className="text-2xl sm:text-3xl lg:text-4xl font-bold">
                What Do You Need Your CRB Report For?
              </CardTitle>
              <CardDescription className="text-sm sm:text-base lg:text-lg">
                Select all that apply. This helps us tailor your report to your needs.
              </CardDescription>
            </CardHeader>

            <CardContent className="px-4 sm:px-6 pb-8">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="purposes"
                    render={() => (
                      <FormItem>
                        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                          {purposesList.map((purpose) => {
                            const Icon = purpose.icon;
                            const isSelected = selectedPurposes.includes(purpose.id);

                            return (
                              <div
                                key={purpose.id}
                                className={`relative cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-lg rounded-xl border p-5 text-center ${
                                  isSelected
                                    ? 'border-green-500 bg-green-50 dark:bg-green-950/30 shadow-md'
                                    : 'border-border hover:border-green-200'
                                }`}
                                onClick={() => {
                                  const newPurposes = isSelected
                                    ? selectedPurposes.filter((p) => p !== purpose.id)
                                    : [...selectedPurposes, purpose.id];
                                  form.setValue('purposes', newPurposes);
                                }}
                              >
                                <div className="flex flex-col items-center space-y-3">
                                  <Icon className={`h-9 w-9 sm:h-10 sm:w-10 ${isSelected ? 'text-green-600' : 'text-muted-foreground'}`} />
                                  <span className={`font-medium ${isSelected ? 'text-green-700 dark:text-green-400' : ''}`}>
                                    {purpose.label}
                                  </span>
                                </div>
                                {isSelected && (
                                  <div className="absolute top-3 right-3 bg-green-600 text-white rounded-full p-0.5">
                                    <CheckCircle2 className="h-4 w-4" />
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {selectedPurposes.length > 0 && (
                    <div className="text-center text-green-600 font-medium">
                      {selectedPurposes.length} purpose{selectedPurposes.length > 1 ? 's' : ''} selected
                    </div>
                  )}

                  <Button
                    type="submit"
                    className="w-full bg-green-600 hover:bg-green-700 h-12 text-base font-semibold"
                    disabled={loading || selectedPurposes.length === 0}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      'Continue to Payment'
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </main>

        {/* Generating Dialog */}
        <Dialog open={showGeneratingDialog} onOpenChange={setShowGeneratingDialog}>
          <DialogContent className="sm:max-w-md" hideCloseButton>
            <div className="py-8 text-center space-y-6">
              {!isComplete ? (
                <>
                  <div className="flex justify-center">
                    <div className="relative">
                      <div className="absolute inset-0 bg-green-500/20 rounded-full blur-xl animate-pulse" />
                      <Loader2 className="h-16 w-16 text-green-600 animate-spin relative" />
                    </div>
                  </div>
                  <h2 className="text-2xl font-bold">Generating Your CRB Report</h2>
                  <p className="text-muted-foreground">Please wait while we prepare your personalized report...</p>

                  <div className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span className="font-bold text-green-600">{Math.round(progress)}%</span>
                    </div>
                    <Progress value={progress} className="h-2.5" />
                  </div>

                  <div className="min-h-[140px] text-left space-y-3">
                    {loadingSteps.map((step, i) => (
                      <div key={i} className={`flex items-start gap-3 ${i > currentStep ? 'opacity-40' : ''}`}>
                        {i < currentStep ? (
                          <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                        ) : i === currentStep ? (
                          <Loader2 className="h-5 w-5 text-green-600 animate-spin mt-0.5" />
                        ) : (
                          <div className="h-5 w-5" />
                        )}
                        <span>{step}</span>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="py-10">
                  <CheckCircle2 className="h-20 w-20 text-green-600 mx-auto" />
                  <h2 className="text-2xl font-bold mt-4 text-green-600">Report Generated!</h2>
                  <p className="text-muted-foreground mt-2">Redirecting to payment page...</p>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </ProtectedRoute>
  );
}