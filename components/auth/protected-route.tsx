'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { Skeleton } from '@/components/ui/skeleton';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading, _hasHydrated, initializeAuth } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (_hasHydrated) {
      initializeAuth();
    }
  }, [_hasHydrated, initializeAuth]);

  const ready = _hasHydrated && !loading;

  useEffect(() => {
    if (ready && !user) {
      router.push('/login');
    }
  }, [ready, user, router]);

  if (!ready) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Skeleton className="h-80 w-full max-w-4xl" />
      </div>
    );
  }

  if (!user) return null;

  return <>{children}</>;
}