import { create } from 'zustand';
import { UserAuth } from '../types/user/user.ts';
import { persist } from 'zustand/middleware';

interface UseAuthStore {
  user: UserAuth | null;
  isAuthenticated: boolean;
  setUser: (user: UserAuth | null) => void;
}

export const useAuthStore = create<UseAuthStore>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      setUser: (user) =>
        set({
          user,
          isAuthenticated: !!user,
        }),
    }),
    {
      name: 'auth',
    },
  ),
);
