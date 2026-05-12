'use client';
import { useState, useEffect, useMemo } from 'react';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Sparkles, X } from 'lucide-react';
import Link from 'next/link';
import { useAuthStore } from '@/store/useAuthStore';
import { BASE_PRICE_USD, CURRENCY_SYMBOLS } from '@/lib/constants';

export default function LimitedOfferBanner() {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [mounted, setMounted] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const { user, loading } = useAuthStore();
  const pathname = usePathname();

  const offerPrice = `${CURRENCY_SYMBOLS.USD}${BASE_PRICE_USD.toFixed(2)}`;

  const hiddenPaths = ['/report', '/dashboard', '/profile'];
  const shouldHideBanner = hiddenPaths.includes(pathname);

  const ctaRoute = useMemo(() => {
    if (loading) return '/register';
    if (!user) return '/register';
    if (!user.purposes || user.purposes.length === 0) return '/purpose';
    if (!user.paymentMade) return '/payment';
    return '/dashboard';
  }, [user, loading]);

  useEffect(() => {
    setMounted(true);
    const calculateTimeLeft = () => {
      const now = new Date();
      // Changed to End of May 2026
      const endOfMay = new Date(now.getFullYear(), 4, 31, 23, 59, 59);

      if (now > endOfMay) {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const difference = endOfMay.getTime() - now.getTime();
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));

      setTimeLeft({ hours: hours, minutes, seconds: 0 });
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 60000);
    return () => clearInterval(timer);
  }, []);

  if (!mounted || shouldHideBanner || dismissed) {
    return null;
  }

  return (
    <div className="fixed top-16 left-0 right-0 z-40 overflow-hidden bg-gradient-to-r from-blue-50 via-white to-purple-50 border-b-2 border-blue-200 shadow-md">
      <button
        onClick={() => setDismissed(true)}
        className="absolute top-1 right-1 sm:top-2 sm:right-2 z-50 p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors"
        aria-label="Close banner"
      >
        <X className="w-4 h-4 text-gray-600 dark:text-gray-400" />
      </button>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-2 left-[10%] w-3 h-3 bg-blue-400 rounded-full animate-twinkle opacity-60" style={{ animationDelay: '0s' }}></div>
        <div className="absolute top-4 left-[25%] w-2 h-2 bg-purple-400 rounded-full animate-twinkle opacity-70" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute top-1 left-[45%] w-3 h-3 bg-blue-400 rounded-full animate-twinkle opacity-60" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-5 left-[60%] w-2 h-2 bg-purple-400 rounded-full animate-twinkle opacity-70" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute top-2 left-[80%] w-3 h-3 bg-blue-400 rounded-full animate-twinkle opacity-60" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative py-2 sm:py-3 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-3">
          <div className="flex items-center gap-2 flex-shrink-0">
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 animate-pulse" />
            <span className="text-xs sm:text-sm font-bold text-blue-600 uppercase tracking-wide">MAY DEAL</span>
          </div>

          <div className="flex-1 overflow-hidden">
            <div className="animate-marquee whitespace-nowrap">
              <span className="inline-block text-sm sm:text-base md:text-lg font-semibold text-gray-800 mx-4 sm:mx-8">
                May Special: Get Your Full CRB Report for Only <span className="text-blue-600 font-bold">{offerPrice}</span> – Save 60%!
              </span>
              <span className="inline-block text-sm sm:text-base md:text-lg font-semibold text-gray-800 mx-4 sm:mx-8">
                End of Q2 Deal: Complete Credit Report Just <span className="text-purple-600 font-bold">{offerPrice}</span> – Limited Time Only!
              </span>
              <span className="inline-block text-sm sm:text-base md:text-lg font-semibold text-gray-800 mx-4 sm:mx-8">
                Spring into Success: Full CRB Status Check for Only <span className="text-blue-600 font-bold">{offerPrice}</span> – Don&apos;t Miss Out!
              </span>
              <span className="inline-block text-sm sm:text-base md:text-lg font-semibold text-gray-800 mx-4 sm:mx-8">
                May Special: Get Your Full CRB Report for Only <span className="text-blue-600 font-bold">{offerPrice}</span> – Save 60%!
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
            <div className="hidden md:flex items-center gap-2 bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-blue-200 shadow-sm">
              <Sparkles className="w-4 h-4 text-blue-500 animate-pulse" />
              <div className="text-sm">
                <span className="font-medium text-gray-700">Ends:</span>
                <div className="flex items-center gap-1 font-bold text-blue-600 tabular-nums">
                  <span className="bg-blue-100 px-2 py-0.5 rounded text-xs">{String(timeLeft.hours).padStart(2, '0')}h</span>
                  <span className="bg-blue-100 px-2 py-0.5 rounded text-xs">{String(timeLeft.minutes).padStart(2, '0')}m</span>
                </div>
              </div>
            </div>

            <Link href={ctaRoute}>
              <Button
                size="sm"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-3 py-1.5 sm:px-6 sm:py-2 text-xs sm:text-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                Claim Offer
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        .animate-marquee {
          display: inline-block;
          animation: marquee 30s linear infinite;
        }
        .animate-twinkle {
          animation: twinkle 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}