// app/layout.tsx
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { MetaPixelRouteTracker } from '@/components/meta-pixel-route-tracker';
import { Toaster } from 'sonner';
import { Header } from '@/components/layout/header';
import { AuthInitializer } from '@/components/providers/auth-initializer';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'CRB Checker - Get Your Credit Report Instantly',
  description: 'Access your Credit Bureau Report instantly.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
    console.log("PIXEL ID:", process.env.NEXT_PUBLIC_META_PIXEL_ID)
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Meta Pixel Base Code */}
        <Script
        id="facebook-pixel"
        strategy="afterInteractive"
        >
        {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}
            (window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');

            fbq('init', '1327502505651672');
            fbq('track', 'PageView');
        `}
        </Script>

        {/* Google Ads Tag */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=AW-18206079257"
        />
        <Script id="google-ads-tag" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'AW-18206079257');
          `}
        </Script>
      </head>

      <body className={inter.className}>
    
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
            <MetaPixelRouteTracker />
          <AuthInitializer />

          <div className="flex min-h-screen flex-col">
            <Header />
            <div className="flex-1 pt-[0px] sm:pt-[0px]">
              {children}
            </div>
          </div>

          <Toaster richColors position="top-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}