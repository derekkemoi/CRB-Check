'use client';

import { useEffect } from 'react';
import { initializeExchangeRates } from '@/services/currency.service';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    initializeExchangeRates();
  }, []);

  return <>{children}</>;
}
