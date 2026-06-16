'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ProtectedRoute } from '@/components/auth/protected-route';
import { Footer } from '@/components/layout/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import { useAuthStore } from '@/store/useAuthStore';
import { fetchReport, type FetchReportResult } from '@/services/report.service';
import type { CRBReport } from '@/types';
import { 
  AlertCircle, Download, Calendar, Printer, AlertTriangle, RefreshCw 
} from 'lucide-react';
import { toast } from 'sonner';
import { Progress } from '@/components/ui/progress';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Activity,
  Banknote,
  CheckCircle2,
  Shield,
  TrendingUp,
} from 'lucide-react';

export default function ReportPage() {
  const router = useRouter();
  const { user } = useAuthStore();

  const [reportResult, setReportResult] = useState<FetchReportResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    if (!user) return;

    const loadReport = async () => {
      setLoading(true);
      try {
        const result = await fetchReport();
        setReportResult(result);
      } catch (err) {
        console.error(err);
        toast.error('Failed to load report. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    loadReport();
  }, [user]);

  const handleGenerateReport = () => {
    router.push('/dashboard'); // Adjust if you have a dedicated generate page
  };

  const handleDownloadPDF = async () => {
    if (!reportResult?.success) return;
    const report = reportResult.report;

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
      const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

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

      pdf.save(`CRB-Report-${report.reportId}.pdf`);
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

  // Error / No Report / Payment Required State
  if (!reportResult?.success) {
    const { error = 'Unknown error', requiresGeneration, requiresPayment } = reportResult || {};

    return (
      <ProtectedRoute>
        <div className="flex min-h-screen flex-col bg-gradient-to-b from-green-50 dark:from-green-950/20 to-transparent">
          <main className="flex-1 flex items-center justify-center py-12 px-4">
            <div className="text-center max-w-md space-y-6">
              <div className="mx-auto w-20 h-20 rounded-full bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center">
                <AlertTriangle className="h-10 w-10 text-amber-600" />
              </div>

              <div>
                <h2 className="text-3xl font-bold mb-2">
                  {requiresGeneration 
                    ? "No Report Found" 
                    : requiresPayment 
                    ? "Payment Required" 
                    : "Report Not Available"}
                </h2>
                <p className="text-muted-foreground text-lg">{error}</p>
              </div>

              {requiresGeneration && (
                <Button 
                  onClick={handleGenerateReport}
                  size="lg"
                  className="bg-green-600 hover:bg-green-700"
                >
                  <RefreshCw className="mr-2 h-5 w-5" />
                  Generate New Report
                </Button>
              )}

              {requiresPayment && (
                <Button 
                  onClick={() => router.push('/payment')}
                  size="lg"
                  className="bg-green-600 hover:bg-green-700"
                >
                  Complete Payment
                </Button>
              )}

              <Button variant="outline" onClick={() => router.push('/dashboard')}>
                Back to Dashboard
              </Button>
            </div>
          </main>
          <Footer />
        </div>
      </ProtectedRoute>
    );
  }

  // Success State - report is guaranteed to exist here
  const report: CRBReport = reportResult.report;

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
                <div>
                  <h2 className="text-2xl font-bold">Official Credit Report</h2>
                  <p className="text-muted-foreground">{report.country}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">Report ID</p>
                  <p className="font-mono text-sm">{report.reportId}</p>
                </div>
              </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-6">
                  <TrendingUp className="h-6 w-6 text-green-600 mb-2" />
                  <p className="text-muted-foreground text-sm">Credit Score</p>
                  <p className="text-3xl font-bold">{report.score}</p>
                  <Badge className="mt-2">{report.scoreCategory}</Badge>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <Shield className="h-6 w-6 text-green-600 mb-2" />
                  <p className="text-muted-foreground text-sm">Credit Status</p>
                  <p className="text-3xl font-bold">{report.reportData.reportStatus.creditStatus}</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <Activity className="h-6 w-6 text-green-600 mb-2" />
                  <p className="text-muted-foreground text-sm">Active Loans</p>
                  <p className="text-3xl font-bold">{report.reportData.creditSummary.activeLoans}</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <Banknote className="h-6 w-6 text-green-600 mb-2" />
                  <p className="text-muted-foreground text-sm">Outstanding Debt</p>
                  <p className="text-2xl font-bold">
                    {report.currency} {report.reportData.creditSummary.totalOutstandingDebt.toLocaleString()}
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Hero Score */}
            <Card className="overflow-hidden">
              <CardContent className="bg-gradient-to-r from-green-600 to-emerald-700 text-white p-10">
                <div className="text-center">
                  <p className="text-green-100">Credit Score</p>
                  <h2 className="text-7xl font-bold mt-2">{report.score}</h2>
                  <Badge className="mt-4 bg-white text-green-700 hover:bg-white">
                    {report.scoreCategory}
                  </Badge>
                  <div className="flex justify-center flex-wrap gap-2 mt-6">
                    <Badge variant="secondary">Grade {report.reportData.creditScoreDetails.grade}</Badge>
                    <Badge variant="secondary">{report.reportData.creditScoreDetails.riskLevel}</Badge>
                    <Badge variant="secondary">{report.reportData.reportStatus.creditStatus}</Badge>
                  </div>
                  <p className="max-w-2xl mx-auto mt-6 text-green-100">{report.summary}</p>
                </div>
              </CardContent>
            </Card>

            {/* Summary + Utilization */}
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader><CardTitle>Credit Summary</CardTitle></CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm text-muted-foreground">Active Loans</p>
                      <p className="text-2xl font-bold">{report.reportData.creditSummary.activeLoans}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Closed Loans</p>
                      <p className="text-2xl font-bold">{report.reportData.creditSummary.closedLoans}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Negative Records</p>
                      <p className="text-2xl font-bold">{report.reportData.creditSummary.negativeRecords}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Debt</p>
                      <p className="text-2xl font-bold">
                        {report.currency} {report.reportData.creditSummary.totalOutstandingDebt.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader><CardTitle>Credit Utilization</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  <Progress value={report.reportData.creditUtilization.utilizationPercentage} />
                  <div className="flex justify-between">
                    <span>Used Credit</span>
                    <span>{report.reportData.creditUtilization.utilizationPercentage}%</span>
                  </div>
                  <Separator />
                  <div>
                    <p className="text-sm text-muted-foreground">Used</p>
                    <p className="font-semibold">
                      {report.currency} {report.reportData.creditUtilization.usedCredit.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Limit</p>
                    <p className="font-semibold">
                      {report.currency} {report.reportData.creditUtilization.totalLimit.toLocaleString()}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Active Loans Table */}
            <Card>
              <CardHeader><CardTitle>Active Loans</CardTitle></CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Lender</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Original</TableHead>
                      <TableHead>Balance</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {report.reportData.activeLoans.map((loan) => (
                      <TableRow key={loan.loanId}>
                        <TableCell>{loan.lender}</TableCell>
                        <TableCell>{loan.loanType}</TableCell>
                        <TableCell>{loan.originalAmount.toLocaleString()}</TableCell>
                        <TableCell>{loan.outstandingBalance.toLocaleString()}</TableCell>
                        <TableCell><Badge>{loan.repaymentStatus}</Badge></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Closed Loans Table */}
            <Card>
              <CardHeader><CardTitle>Closed Loans</CardTitle></CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Lender</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {report.reportData.closedLoans.map((loan) => (
                      <TableRow key={loan.loanId}>
                        <TableCell>{loan.lender}</TableCell>
                        <TableCell>{loan.amount.toLocaleString()}</TableCell>
                        <TableCell>{new Date(loan.closedDate).toLocaleDateString()}</TableCell>
                        <TableCell><Badge variant="secondary">{loan.repaymentStatus}</Badge></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Credit Inquiries */}
            <Card>
              <CardHeader><CardTitle>Credit Inquiries</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                {report.reportData.creditInquiries.map((inquiry) => (
                  <div key={inquiry.inquiryId} className="border-l-2 border-green-600 pl-4">
                    <p className="font-semibold">{inquiry.institution}</p>
                    <p className="text-sm text-muted-foreground">{inquiry.purpose}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(inquiry.inquiryDate).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Recommendations */}
            <Card>
              <CardHeader><CardTitle>Recommendations</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                {report.reportData.recommendations.map((tip, index) => (
                  <div key={index} className="flex gap-3 p-4 rounded-lg border bg-green-50 dark:bg-green-950/20">
                    <div className="h-6 w-6 rounded-full bg-green-600 text-white flex items-center justify-center text-xs">
                      {index + 1}
                    </div>
                    <p>{tip}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Negative Records */}
            <Card>
              <CardHeader><CardTitle>Negative Records</CardTitle></CardHeader>
              <CardContent>
                {report.reportData.negativeRecords.length === 0 ? (
                  <div className="flex items-center gap-3 text-green-600">
                    <CheckCircle2 className="h-5 w-5" />
                    No negative records found
                  </div>
                ) : (
                  <pre>{JSON.stringify(report.reportData.negativeRecords, null, 2)}</pre>
                )}
              </CardContent>
            </Card>

            {/* Disclaimer */}
            <div className="bg-muted/50 rounded-lg p-6 border">
              <p className="font-semibold mb-3">Disclaimer</p>
              <p className="text-sm text-muted-foreground">{report.disclaimer}</p>
              <Separator className="my-4" />
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>Credit Bureau: {report.creditBureau}</div>
                <div>Payment Ref: {report.paymentReference || 'N/A'}</div>
                <div>Generated: {new Date(report.generatedAt).toLocaleDateString()}</div>
                <div>Expires: {new Date(report.expiresAt).toLocaleDateString()}</div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </ProtectedRoute>
  );
}