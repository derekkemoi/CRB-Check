'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ProtectedRoute } from '@/components/auth/protected-route';
import { Footer } from '@/components/layout/footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import { useAuthStore } from '@/store/useAuthStore';
import { fetchLatestReport } from '@/services/report.service';
import type { CRBReport } from '@/types';
import { FileText, TrendingUp, AlertCircle, Download, Building2, Calendar, CreditCard, ShieldCheck, Printer } from 'lucide-react';
import { toast } from 'sonner';

export default function ReportPage() {
  const router = useRouter();
  const { user } = useAuthStore();
  const [report, setReport] = useState<CRBReport | null>(null);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    if (!user) return;

    if (!user.paymentMade) {
      router.push('/dashboard');
      return;
    }

    fetchLatestReport()
      .then(setReport)
      .catch((err) => {
        console.error(err);
        toast.error('Failed to load report. Please try again.');
      })
      .finally(() => setLoading(false));
  }, [user, router]);

  const handleDownloadPDF = async () => {
    if (!report) return;
    setDownloading(true);
    try {
      const jsPDF = (await import('jspdf')).default;
      const html2canvas = (await import('html2canvas')).default;
      const element = document.getElementById('report-content');
      if (!element) return;

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
      });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });
      const imgWidth = 210;
      const pageHeight = 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`CRB-Report-${report.advice || 'unknown'}.pdf`);
      toast.success('Report downloaded successfully');
    } catch (error) {
      toast.error('Failed to download PDF. Please try again.');
    } finally {
      setDownloading(false);
    }
  };

  const handlePrint = () => window.print();

  if (loading) {
    return (
      <ProtectedRoute>
        <div className="flex min-h-screen flex-col">
          <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
            <Skeleton className="h-12 w-64 mb-8" />
            <Skeleton className="h-96 rounded-xl" />
          </main>
        </div>
      </ProtectedRoute>
    );
  }

  if (!report) {
    return (
      <ProtectedRoute>
        <div className="flex min-h-screen flex-col">
          <main className="flex-1 flex items-center justify-center py-12 px-4">
            <div className="text-center space-y-4">
              <AlertCircle className="h-16 w-16 text-muted-foreground mx-auto" />
              <h2 className="text-2xl font-bold">Report Not Available</h2>
              <p className="text-muted-foreground">Your report could not be loaded. Please try again.</p>
              <Button onClick={() => router.push('/dashboard')} className="bg-green-600 hover:bg-green-700">
                Back to Dashboard
              </Button>
            </div>
          </main>
        </div>
      </ProtectedRoute>
    );
  }

  const scorePercentage = (report.score / 850) * 100;

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen flex-col bg-gradient-to-b from-green-50 dark:from-green-950/20 to-transparent">
        <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 max-w-6xl">
          {/* Actions bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 print:hidden">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold mb-2">Credit Bureau Report</h1>
              <p className="text-muted-foreground flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Generated on {new Date(report.generatedAt).toLocaleDateString('en-US', {
                  year: 'numeric', month: 'long', day: 'numeric',
                })}
              </p>
            </div>
            <div className="flex gap-3 w-full sm:w-auto">
              <Button onClick={handlePrint} variant="outline" className="flex-1 sm:flex-none">
                <Printer className="mr-2 h-4 w-4" /> Print
              </Button>
              <Button
                onClick={handleDownloadPDF}
                disabled={downloading}
                className="flex-1 sm:flex-none bg-green-600 hover:bg-green-700"
              >
                <Download className="mr-2 h-4 w-4" />
                {downloading ? 'Generating...' : 'Download PDF'}
              </Button>
            </div>
          </div>

          <div id="report-content" className="bg-white dark:bg-gray-900 rounded-xl shadow-xl p-6 sm:p-8 space-y-8">
            {/* Header */}
            <div className="border-b pb-6">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                    <ShieldCheck className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">Official Credit Report</h2>
                    <p className="text-sm text-muted-foreground">{report.country}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">Report ID</p>
                  <p className="text-sm font-mono font-semibold">{report.reportId?.slice(0, 12)}</p>
                </div>
              </div>
            </div>

            {/* Score + Personal + Bureau */}
            <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
              {/* Modern Credit Score Card */}
<Card className="border-2 shadow-xl overflow-hidden bg-white dark:bg-gray-900">
  <CardHeader className="bg-gradient-to-br from-green-600 to-emerald-700 text-white py-8 text-center">
    <div className="flex items-center justify-center gap-2 mb-2">
      <TrendingUp className="h-6 w-6" />
      <CardTitle className="text-xl font-semibold tracking-tight">Your Credit Score</CardTitle>
    </div>
    <p className="text-green-100 text-sm">Updated today • Valid for 30 days</p>
  </CardHeader>

  <CardContent className="flex flex-col items-center pt-8 pb-10">
    <div className="relative w-48 h-48 mb-8">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 180 180">
        {/* Background Circle */}
        <circle
          cx="90"
          cy="90"
          r="78"
          fill="none"
          stroke="#e5e7eb"
          strokeWidth="14"
          className="dark:stroke-gray-700"
        />
        {/* Progress Circle */}
        <circle
          cx="90"
          cy="90"
          r="78"
          fill="none"
          stroke="#10b981"
          strokeWidth="14"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={Math.PI * 2 * 78}
          strokeDashoffset={Math.PI * 2 * 78 * (1 - scorePercentage / 100)}
        />
      </svg>

      {/* Center Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-6xl font-bold text-green-600 dark:text-green-400 tracking-tighter">
          {report.score}
        </span>
        <span className="text-sm font-medium text-green-600/70 dark:text-green-400/70 -mt-1">/ 850</span>
      </div>
    </div>

    <Badge 
      className="bg-green-600 hover:bg-green-700 text-white px-6 py-1.5 text-base font-semibold mb-4 shadow-sm"
    >
      {report.scoreCategory}
    </Badge>

    <p className="text-center text-muted-foreground max-w-[280px] leading-relaxed px-4">
      {report.summary}
    </p>
  </CardContent>
</Card>

              <Card className="border-2 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <FileText className="h-5 w-5 text-green-600" /> Personal Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Full Name</p>
                    <p className="font-semibold text-base">{report.personalInfo?.fullName}</p>
                  </div>
                  <Separator />
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">ID Number</p>
                    <p className="font-semibold">{report.personalInfo?.idNumber}</p>
                  </div>
                  <Separator />
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Address</p>
                    <p className="font-semibold">{report.personalInfo?.address}</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Building2 className="h-5 w-5 text-green-600" /> Credit Bureau Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Reporting Agency</p>
                    <p className="font-semibold text-sm">{report.creditBureau}</p>
                  </div>
                  <Separator />
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Valid Until</p>
                    <p className="font-semibold">
                      {new Date(report.expiresAt).toLocaleDateString('en-US', {
                        year: 'numeric', month: 'long', day: 'numeric',
                      })}
                    </p>
                  </div>
                  <Separator />
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Currency</p>
                    <p className="font-semibold">{report.currency}</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Banks */}
            <Card className="border-2 shadow-lg">
              <CardHeader className="bg-muted/30">
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-green-600" /> Reporting Banks & Financial Institutions
                </CardTitle>
                <CardDescription>Institutions that contributed to this credit report</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {report.banks?.map((bank, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 border">
                      <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                        <Building2 className="h-5 w-5 text-green-600" />
                      </div>
                      <p className="font-semibold">{bank}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Advice */}
            <Card className="border-2 shadow-lg border-green-200">
              <CardHeader className="bg-green-50 dark:bg-green-950/50">
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-green-600" /> Credit Improvement Recommendations
                </CardTitle>
                <CardDescription>Personalized advice to improve your credit score</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-3">
                  {report.advice?.map((tip, i) => (
                    <div key={i} className="flex items-start gap-3 p-4 rounded-lg bg-green-50 dark:bg-green-950/30 border border-green-200">
                      <div className="h-6 w-6 rounded-full bg-green-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-white text-xs font-bold">{i + 1}</span>
                      </div>
                      <p className="text-sm leading-relaxed">{tip}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Disclaimer */}
            <div className="bg-muted/50 rounded-lg p-6 border-2">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold mb-2">Important Disclaimer</p>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                    {report.disclaimer}
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    This credit report is generated from data provided by licensed Credit Reference Bureaus. The information is accurate as of the generation date. For any disputes or corrections, please contact the respective financial institution or credit bureau directly.
                  </p>
                  <div className="mt-4 pt-4 border-t">
                    <p className="text-xs text-muted-foreground">
                      Payment Reference: <span className="font-mono font-semibold">{report.paymentReference}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </ProtectedRoute>
  );
}