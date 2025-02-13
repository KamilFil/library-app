import { useAuthStore } from '../store/useAuthStore.ts';
import { redirect } from '@tanstack/react-router';

export const redirectIfLoggedIn = () => {
  const { isAuthenticated } = useAuthStore.getState();

  if (isAuthenticated) {
    throw redirect({ to: '/books', search: { page: 1, size: 5 } });
  }
};
