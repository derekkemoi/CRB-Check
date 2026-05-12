// app/layout.tsx
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { Toaster } from 'sonner';
import { Header } from '@/components/layout/header';
import LimitedOfferBanner from '@/components/LimitedOfferBanner';
import { AuthInitializer } from '@/components/providers/auth-initializer'; // ← New component

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
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {/* Initialize Authentication */}
          <AuthInitializer />

          <div className="flex min-h-screen flex-col">
            <Header />
            <LimitedOfferBanner />
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