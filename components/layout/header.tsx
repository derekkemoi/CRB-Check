'use client';

import Link from 'next/link';
import { useAuthStore } from '@/store/useAuthStore';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { Shield, LogOut } from 'lucide-react';

export function Header() {
  const { user, logout } = useAuthStore();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <Shield className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
            <span className="font-bold text-lg sm:text-xl">CRB Checker</span>
          </Link>

          <nav className="flex items-center gap-2 sm:gap-4">
            <ThemeToggle />

            {user ? (
              <>
                <Button variant="ghost" size="sm" asChild className="hidden sm:flex">
                  <Link href="/dashboard">Dashboard</Link>
                </Button>
                <Button variant="ghost" size="sm" asChild className="hidden md:flex">
                  <Link href="/profile">Profile</Link>
                </Button>
                <Button variant="outline" size="sm" onClick={logout}>
                  <LogOut className="mr-0 sm:mr-2 h-4 w-4" />
                  <span className="hidden sm:inline">Logout</span>
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" size="sm" asChild className="hidden sm:flex">
                  <Link href="/login">Login</Link>
                </Button>
                <Button size="sm" asChild>
                  <Link href="/register">
                    <span className="hidden sm:inline">Get Started</span>
                    <span className="sm:hidden">Start</span>
                  </Link>
                </Button>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
