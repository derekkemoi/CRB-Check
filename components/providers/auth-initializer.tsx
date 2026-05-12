'use client';
import { useEffect, useRef } from 'react';
import { useAuthStore } from '@/store/useAuthStore';

export function AuthInitializer() {
  const { initializeAuth, _hasHydrated } = useAuthStore();
  const initialized = useRef(false);

  useEffect(() => {
    // Wait for localStorage hydration before hitting the API
    if (!_hasHydrated || initialized.current) return;
    initialized.current = true;
    initializeAuth();
  }, [_hasHydrated, initializeAuth]);

  return null;
}
