import { useAuthStore } from '../store/useAuthStore.ts';
import { redirect } from '@tanstack/react-router';

export const authGuard = (requiredRole?: string) => {
  const { isAuthenticated, user } = useAuthStore.getState();

  if (!isAuthenticated) {
    throw redirect({ to: '/' });
  }

  if (requiredRole && user?.role !== requiredRole) {
    return false;
  }
};
