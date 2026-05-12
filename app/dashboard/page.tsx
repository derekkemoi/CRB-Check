'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ProtectedRoute } from '@/components/auth/protected-route';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { useAuthStore } from '@/store/useAuthStore';
import { getLatestReport } from '@/services/payment.service';
import type { CRBReport } from '@/types';
import { FileText, CreditCard, TrendingUp, ArrowRight, ShieldCheck, Calendar, RefreshCw, MapPin, User, BadgeCheck, Clock, ChartBar as BarChart3 } from 'lucide-react';
import { toast } from 'sonner';

export default function DashboardPage() {
  const { user, initializeAuth } = useAuthStore();
  const [report, setReport] = useState<CRBReport | null>(null);
  const [reportLoading, setReportLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (!user?.paymentMade) return;
    setReportLoading(true);
    getLatestReport()
      .then(setReport)
      .catch(() => {})
      .finally(() => setReportLoading(false));
  }, [user?.paymentMade]);

const handleRefresh = async () => {
  setRefreshing(true);
  try {
    await initializeAuth();
    const freshUser = useAuthStore.getState().user;
    console.log('Refreshed user:', freshUser);
    if (freshUser?.paymentMade) {
      const r = await getLatestReport().catch(() => null);
      if (r) setReport(r);
    }
    toast.success('Dashboard refreshed');
  } catch {
    toast.error('Failed to refresh');
  } finally {
    setRefreshing(false);
  }
};

  const getInitials = () =>
    `${user?.firstName?.charAt(0) ?? ''}${user?.secondName?.charAt(0) ?? ''}`.toUpperCase() || 'U';

  const getScoreColor = (score: number) => {
    if (score >= 700) return { text: 'text-green-600', bg: 'bg-green-600', ring: 'ring-green-200' };
    if (score >= 600) return { text: 'text-yellow-600', bg: 'bg-yellow-500', ring: 'ring-yellow-200' };
    if (score >= 500) return { text: 'text-orange-600', bg: 'bg-orange-500', ring: 'ring-orange-200' };
    return { text: 'text-red-600', bg: 'bg-red-500', ring: 'ring-red-200' };
  };

  const scoreColors = report ? getScoreColor(report.score) : null;
  const scorePercentage = report ? Math.round((report.score / 850) * 100) : 0;

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen flex-col bg-gray-50 dark:bg-gray-950">
        <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-5xl">

          {/* Top bar */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <Avatar className="h-11 w-11 ring-2 ring-green-200 ring-offset-2">
                <AvatarFallback className="bg-green-600 text-white font-bold text-base">
                  {getInitials()}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-xs text-muted-foreground font-medium">Welcome back</p>
                <h1 className="text-lg font-bold leading-tight">{user?.firstName} {user?.secondName}</h1>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleRefresh}
              disabled={refreshing}
              className="gap-2 text-muted-foreground hover:text-foreground"
            >
              <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Refresh</span>
            </Button>
          </div>

          {/* Hero card — report score OR payment CTA */}
          {user?.paymentMade ? (
            reportLoading ? (
              <div className="rounded-2xl bg-white dark:bg-gray-900 border shadow-sm p-8 mb-6 animate-pulse">
                <div className="h-6 w-48 bg-gray-200 dark:bg-gray-800 rounded mb-4" />
                <div className="h-32 bg-gray-100 dark:bg-gray-800 rounded-xl" />
              </div>
            ) : report ? (
              <div className="rounded-2xl bg-white dark:bg-gray-900 border shadow-sm overflow-hidden mb-6">
                <div className="bg-gradient-to-br from-green-600 to-emerald-700 p-6 sm:p-8 text-white">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                    <div className="flex items-center gap-5">
                      <div className={`relative flex-shrink-0 w-24 h-24`}>
                        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                          <circle cx="50" cy="50" r="42" strokeWidth="10" fill="none" className="stroke-white/20" />
                          <circle
                            cx="50" cy="50" r="42" strokeWidth="10" fill="none"
                            stroke="white"
                            strokeLinecap="round"
                            strokeDasharray={`${2 * Math.PI * 42}`}
                            strokeDashoffset={`${2 * Math.PI * 42 * (1 - scorePercentage / 100)}`}
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-2xl font-bold text-white">{report.score}</span>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <BadgeCheck className="h-4 w-4 text-green-200" />
                          <span className="text-green-100 text-sm font-medium">Credit Score</span>
                        </div>
                        <p className="text-3xl font-bold">{report.scoreCategory}</p>
                        <p className="text-green-200 text-sm mt-1">out of 850 points</p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 text-sm text-green-100 min-w-0 sm:text-right">
                      <div className="flex items-center gap-2 sm:justify-end">
                        <Calendar className="h-3.5 w-3.5 flex-shrink-0" />
                        <span>Generated {new Date(report.generatedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      </div>
                      <div className="flex items-center gap-2 sm:justify-end">
                        <ShieldCheck className="h-3.5 w-3.5 flex-shrink-0" />
                        <span>{report.creditBureau}</span>
                      </div>
                      <div className="flex items-center gap-2 sm:justify-end">
                        <BarChart3 className="h-3.5 w-3.5 flex-shrink-0" />
                        <span>{report.banks?.length ?? 0} banks reporting</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-4 sm:p-5 bg-white dark:bg-gray-900">
                  <Button asChild className="w-full bg-green-600 hover:bg-green-700 h-11 font-semibold gap-2" size="lg">
                    <Link href="/report">
                      <FileText className="h-4 w-4" />
                      View Full Report
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            ) : (
              <div className="rounded-2xl bg-white dark:bg-gray-900 border shadow-sm p-8 mb-6 text-center space-y-4">
                <div className="h-14 w-14 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto">
                  <FileText className="h-7 w-7 text-green-600" />
                </div>
                <div>
                  <p className="font-semibold text-lg">Preparing your report</p>
                  <p className="text-muted-foreground text-sm mt-1">Your report will appear here shortly.</p>
                </div>
                <Button variant="outline" size="sm" onClick={handleRefresh} disabled={refreshing}>
                  <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
                  Check again
                </Button>
              </div>
            )
          ) : (
            <div className="rounded-2xl bg-white dark:bg-gray-900 border shadow-sm overflow-hidden mb-6">
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 dark:from-gray-800 dark:to-gray-900 p-6 sm:p-8 text-white">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center">
                    <CreditCard className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Next step</p>
                    <p className="font-semibold">Unlock your credit report</p>
                  </div>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">
                  One secure payment gives you instant access to your full CRB credit report — score, history, and personalised recommendations.
                </p>
              </div>
              <div className="p-4 sm:p-5 bg-white dark:bg-gray-900">
                <Button asChild className="w-full bg-green-600 hover:bg-green-700 h-11 font-semibold gap-2" size="lg">
                  <Link href="/payment">
                    <CreditCard className="h-4 w-4" />
                    Make Payment & Get Report
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          )}

          {/* Info strip */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
            {[
              {
                icon: <MapPin className="h-4 w-4 text-green-600" />,
                label: 'Country',
                value: user?.country || '—',
              },
              {
                icon: <CreditCard className="h-4 w-4 text-blue-600" />,
                label: 'Payment',
                value: user?.paymentMade ? (
                  <span className="flex items-center gap-1 text-green-600 font-semibold text-sm">
                    <BadgeCheck className="h-4 w-4" /> Paid
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-orange-600 font-medium text-sm">
                    <Clock className="h-4 w-4" /> Pending
                  </span>
                ),
              },
              {
                icon: <FileText className="h-4 w-4 text-orange-600" />,
                label: 'Report',
                value: report ? (
                  <span className="flex items-center gap-1 text-green-600 font-semibold text-sm">
                    <BadgeCheck className="h-4 w-4" /> Ready
                  </span>
                ) : (
                  <span className="text-muted-foreground text-sm font-medium">
                    {user?.paymentMade ? 'Preparing...' : 'Not available'}
                  </span>
                ),
              },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 bg-white dark:bg-gray-900 rounded-xl border p-4">
                <div className="h-8 w-8 rounded-lg bg-gray-50 dark:bg-gray-800 flex items-center justify-center flex-shrink-0">
                  {item.icon}
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground font-medium">{item.label}</p>
                  {typeof item.value === 'string'
                    ? <p className="font-semibold text-sm truncate">{item.value}</p>
                    : <div className="mt-0.5">{item.value}</div>
                  }
                </div>
              </div>
            ))}
          </div>

          {/* Quick actions */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl border shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b">
              <p className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">Quick Actions</p>
            </div>
            <div className="divide-y">
              {[
                {
                  icon: <User className="h-5 w-5 text-gray-500" />,
                  label: 'My Profile',
                  desc: 'View and update your details',
                  href: '/profile',
                  show: true,
                },
                {
                  icon: <FileText className="h-5 w-5 text-gray-500" />,
                  label: 'Full Report',
                  desc: 'View, print or download as PDF',
                  href: '/report',
                  show: !!report,
                },
                {
                  icon: <ShieldCheck className="h-5 w-5 text-gray-500" />,
                  label: 'Make Payment',
                  desc: 'Complete payment to unlock your report',
                  href: '/payment',
                  show: !user?.paymentMade,
                },
              ]
                .filter((a) => a.show)
                .map((action, i) => (
                  <Link
                    key={i}
                    href={action.href}
                    className="flex items-center gap-4 px-5 py-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group"
                  >
                    <div className="h-9 w-9 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center flex-shrink-0 group-hover:bg-green-100 dark:group-hover:bg-green-900/30 transition-colors">
                      {action.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm">{action.label}</p>
                      <p className="text-xs text-muted-foreground">{action.desc}</p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-green-600 group-hover:translate-x-0.5 transition-all" />
                  </Link>
                ))}
            </div>
          </div>

        </main>
        <Footer />
      </div>
    </ProtectedRoute>
  );
}
