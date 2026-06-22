'use client';
import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { ProtectedRoute } from '@/components/auth/protected-route';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Form, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { purposeSchema } from '@/lib/validations';
import { generateReport } from '@/services/report.service';
import type { PurposeFormData } from '@/types';
import {
  Briefcase,
  Building,
  ShieldCheck,
  Home,
  Landmark,
  MoreHorizontal,
  CheckCircle2,
  Loader2,
  ArrowRight,
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { track } from '@/lib/meta-pixel';

const purposesList = [
  { id: 'employment', label: 'Employment', icon: Briefcase },
  { id: 'loan', label: 'Loan Application', icon: Landmark },
  { id: 'credit_check', label: 'Personal Credit Check', icon: ShieldCheck },
  { id: 'tenant', label: 'Tenant Verification', icon: Home },
  { id: 'business', label: 'Business Purpose', icon: Building },
  { id: 'other', label: 'Other', icon: MoreHorizontal },
];

const loadingSteps = [
  'Verifying your identity...',
  'Searching credit records...',
  'Analyzing financial history...',
  'Preparing your personalized report...',
  'Finalizing results...',
];

export default function PurposePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showGeneratingDialog, setShowGeneratingDialog] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const animationTimer = useRef<NodeJS.Timeout | null>(null);

  const form = useForm<PurposeFormData>({
    resolver: zodResolver(purposeSchema),
    defaultValues: {
      purposes: [],
    },
  });

  const selectedPurposes = form.watch('purposes') || [];

  const startGenerationAnimation = () => {
    setShowGeneratingDialog(true);
    setProgress(0);
    setCurrentStep(0);
    setIsComplete(false);

    const totalDuration = 4500; // Reduced wait time
    const interval = 80;
    let elapsed = 0;

    animationTimer.current = setInterval(() => {
      elapsed += interval;
      const newProgress = Math.min(Math.floor((elapsed / totalDuration) * 95), 95);
      setProgress(newProgress);

      const newStep = Math.min(
        Math.floor(elapsed / (totalDuration / loadingSteps.length)),
        loadingSteps.length - 1
      );
      setCurrentStep(newStep);

      if (elapsed >= totalDuration && animationTimer.current) {
        clearInterval(animationTimer.current);
      }
    }, interval);
  };

  const onSubmit = async (_data: PurposeFormData) => {
    setLoading(true);
    try {
      startGenerationAnimation();

      const [result] = await Promise.all([
        generateReport(),
        new Promise(resolve => setTimeout(resolve, 4500))
      ]);

      // Clear animation
      if (animationTimer.current) {
        clearInterval(animationTimer.current);
      }

      setProgress(100);
      setCurrentStep(loadingSteps.length - 1);
      setIsComplete(true);

      sessionStorage.setItem('current_report_id', result.reportId);

      // Track conversion event
      track('Lead');

      toast.success('Report generated successfully');

      // Brief delay to show success state
      setTimeout(() => {
        router.push('/payment');
      }, 1600);
    } catch (error: any) {
      if (animationTimer.current) {
        clearInterval(animationTimer.current);
      }
      setShowGeneratingDialog(false);
      toast.error(
        error?.response?.data?.message ||
        error.message ||
        'Failed to generate report. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen flex-col bg-gray-50">
        <main className="flex-1 flex items-center justify-center py-6 sm:py-12 px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-3xl">
            {/* Progress Indicator */}
            <div className="flex items-center justify-between mb-6 px-1">
              <div className="font-medium text-green-600 flex items-center gap-1.5 text-sm">
                Step 2 of 4
                <ArrowRight className="h-4 w-4" />
              </div>
              <div className="flex gap-1.5">
                <div className="w-2 h-2 bg-green-600 rounded-full" />
                <div className="w-2 h-2 bg-green-600 rounded-full" />
                <div className="w-2 h-2 bg-green-600 rounded-full" />
                <div className="w-2 h-2 bg-gray-300 rounded-full" />
              </div>
            </div>

            <Card className="shadow-lg">
              <CardHeader className="text-center px-4 sm:px-6 space-y-3 pb-6">
                <CardTitle className="text-2xl sm:text-3xl font-bold">
                  Why Do You Need Your Credit Report?
                </CardTitle>
                <CardDescription className="text-sm sm:text-base">
                  Select all that apply. This helps us tailor your report to your specific needs.
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
                          <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                            {purposesList.map((purpose) => {
                              const Icon = purpose.icon;
                              const isSelected = selectedPurposes.includes(purpose.id);
                              return (
                                <div
                                  key={purpose.id}
                                  className={`relative cursor-pointer transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.985] rounded-2xl border p-4 text-center ${
                                    isSelected
                                      ? 'border-green-500 bg-green-50 shadow-md'
                                      : 'border-border hover:border-green-200 hover:bg-green-50/50'
                                  }`}
                                  onClick={() => {
                                    const newPurposes = isSelected
                                      ? selectedPurposes.filter((p) => p !== purpose.id)
                                      : [...selectedPurposes, purpose.id];
                                    form.setValue('purposes', newPurposes, { shouldValidate: true });
                                  }}
                                >
                                  <div className="flex flex-col items-center space-y-2.5">
                                    <Icon className={`h-7 w-7 sm:h-8 sm:w-8 ${isSelected ? 'text-green-600' : 'text-muted-foreground'}`} />
                                    <span className={`font-medium text-sm sm:text-base leading-tight ${isSelected ? 'text-green-700' : 'text-gray-700'}`}>
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
                      <div className="flex justify-center">
                        <div className="inline-flex items-center gap-1.5 bg-green-100 text-green-700 text-sm font-medium px-4 py-1.5 rounded-full">
                          <CheckCircle2 className="h-4 w-4" />
                          {selectedPurposes.length} Selected
                        </div>
                      </div>
                    )}

                    {/* Trust Message */}
                    <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
                      <p className="text-green-700 text-sm font-medium flex items-center justify-center gap-2">
                        ✓ Report generation is completely free
                      </p>
                      <p className="text-green-600 text-xs mt-1">
                        You only pay to unlock the full results
                      </p>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-green-600 hover:bg-green-700 h-14 text-base font-semibold shadow-lg shadow-green-600/30"
                      disabled={loading || selectedPurposes.length === 0}
                    >
                      {loading ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Generating Report...
                        </>
                      ) : (
                        'Generate My Report'
                      )}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </main>

        {/* Generating Dialog - Mobile Optimized */}
        <Dialog open={showGeneratingDialog} onOpenChange={setShowGeneratingDialog}>
          <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto" hideCloseButton>
            <DialogTitle className="sr-only">Generating Credit Report</DialogTitle>
            <DialogDescription className="sr-only">
              Please wait while your credit report is being generated.
            </DialogDescription>

            <div className="py-6 text-center space-y-6">
              {!isComplete ? (
                <>
                  <div className="flex justify-center">
                    <div className="relative">
                      <div className="absolute inset-0 bg-green-500/20 rounded-full blur-xl animate-pulse" />
                      <Loader2 className="h-14 w-14 text-green-600 animate-spin relative" />
                    </div>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Generating Your CRB Report</h2>
                    <p className="text-muted-foreground mt-1 text-sm">This usually takes just a few seconds...</p>
                  </div>

                  <div className="space-y-4 px-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-bold text-green-600">{Math.round(progress)}%</span>
                    </div>
                    <Progress value={progress} className="h-2.5" />
                  </div>

                  <div className="min-h-[160px] text-left space-y-3 px-1 text-sm">
                    {loadingSteps.map((step, i) => (
                      <div key={i} className={`flex items-start gap-3 ${i > currentStep ? 'opacity-40' : ''}`}>
                        {i < currentStep ? (
                          <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        ) : i === currentStep ? (
                          <Loader2 className="h-5 w-5 text-green-600 animate-spin mt-0.5 flex-shrink-0" />
                        ) : (
                          <div className="h-5 w-5 flex-shrink-0" />
                        )}
                        <span>{step}</span>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="py-8 px-4">
                  <CheckCircle2 className="h-20 w-20 text-green-600 mx-auto" />
                  <h2 className="text-2xl font-bold mt-6 text-green-600">Your Report Is Ready!</h2>
                  <p className="text-muted-foreground mt-3 leading-relaxed">
                    We found information in your report.<br />
                    Unlock your full results on the next page.
                  </p>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </ProtectedRoute>
  );
}