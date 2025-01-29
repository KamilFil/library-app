import { create } from 'zustand';
import { UserAuth } from '../types/user/user.ts';
import { persist } from 'zustand/middleware';

interface UseAuthStore {
  user: UserAuth | null;
  setUser: (user: UserAuth | null) => void;
}

export const useAuthStore = create<UseAuthStore>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
    }),
    {
      name: 'auth',
    },
  ),
);
