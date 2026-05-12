// src/store/useAuthStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '@/types';
import { getCurrentUser, logoutUser } from '@/services/auth.service';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  _hasHydrated: boolean;

  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  setHasHydrated: (v: boolean) => void;
  initializeAuth: () => Promise<void>;
  logout: () => Promise<void>;
  clearUser: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      loading: true,
      _hasHydrated: false,

      setUser: (user) =>
        set({ user, isAuthenticated: !!user, loading: false }),

      setLoading: (loading) => set({ loading }),

      setHasHydrated: (v) => set({ _hasHydrated: v }),

      initializeAuth: async () => {
        set({ loading: true });
        try {
          const user = await getCurrentUser();
        
          set({ user, isAuthenticated: !!user, loading: false });
        } catch {
          set({ user: null, isAuthenticated: false, loading: false });
        }
      },

      logout: async () => {
        logoutUser();
        set({ user: null, isAuthenticated: false });
      },

      clearUser: () => set({ user: null, isAuthenticated: false }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
