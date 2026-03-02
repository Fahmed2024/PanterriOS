import { create } from 'zustand';
import { persist } from 'zustand/middleware';
// import { logout } from '@/service/authApi'

import { deleteTokens, setTokens } from '@/services/axios';
import { Tokens } from '@/types';
import { UserProfileRes } from '@/interface';

interface AuthState {
  user: UserProfileRes | null;
  avatarUrl?: string | null;
  tokens: Tokens | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  hasHydrated: boolean;
  // Actions

  setAuth: (user: UserProfileRes, tokens: Tokens) => Promise<void>;
  updateUser: (userData: Partial<UserProfileRes>) => Promise<UserProfileRes>;
  updateToken: (tokens: Partial<Tokens>) => Promise<Tokens>;
  updateUserAvatar: (avatarUrl: string) => void;
  clearAuth: () => Promise<void>;
  loadAuth: () => Promise<void>;
  setHasHydrated: (state: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      tokens: null,
      isAuthenticated: false,
      isLoading: false,
      hasHydrated: false,
      avatarUrl: null,

      setHasHydrated: (state) => set({ hasHydrated: state }),

      setAuth: async (user, tokens) => {
        try {
          set({ isLoading: true });

          await setTokens(tokens.accessToken, tokens.refreshToken);

          set({
            user: user,
            tokens: tokens,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error) {
          console.error('Failed to set authentication:', error);
          set({ isLoading: false });
        }
      },

      updateUser: async (userData) => {
        const currentUser = get().user;
        if (!currentUser) throw new Error('No user to update');

        const updatedUser = { ...currentUser, ...userData };
        set({ user: updatedUser });
        return updatedUser;
      },

      updateToken: async (tokens) => {
        const currentTokens = get().tokens;
        if (!currentTokens) throw new Error('No tokens to update');

        const updatedTokens = { ...currentTokens, ...tokens };
        await setTokens(updatedTokens.accessToken, updatedTokens.refreshToken);

        set({ tokens: updatedTokens });
        return updatedTokens;
      },

      clearAuth: async () => {
        try {
          set({ isLoading: true });
          // await logout()
          deleteTokens();
          set({
            user: null,
            tokens: null,
            isAuthenticated: false,
            isLoading: false,
          });
          localStorage.removeItem('user');
        } catch (error) {
          console.error('Failed to clear authentication:', error);
          set({ isLoading: false });
        }
      },
      updateUserAvatar: (avatarUrl: string) => {
        const currentUser = get().user;
        if (!currentUser) return;

        set({ avatarUrl: avatarUrl });
      },
      loadAuth: async () => {
        try {
          set({ isLoading: true });
          const userData = localStorage.getItem('user');
          const tokens = localStorage.getItem('tokens');
          if (!userData && !tokens) {
            set({ isLoading: false });
            return;
          }

          const user = JSON.parse(userData!) as UserProfileRes;
          const token = JSON.parse(tokens!) as Tokens;
          set({
            user,
            tokens: token,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error) {
          console.error('Failed to load authentication:', error);
          set({ isLoading: false });
        }
      },
    }),
    {
      name: 'auth-store',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        avatarUrl: state.avatarUrl,
      }),
      onRehydrateStorage: () => (state) => {
        // This runs when Zustand finishes loading from storage
        state?.setHasHydrated(true);
      },
    },
  ),
);
