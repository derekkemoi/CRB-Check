'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/store/useAuthStore';

// Listens for cross-tab login/logout events and re-syncs auth state
export const useAuthListener = () => {
  const initializeAuth = useAuthStore((state) => state.initializeAuth);

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === 'access_token') {
        initializeAuth();
      }
    };

    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, [initializeAuth]);
};
