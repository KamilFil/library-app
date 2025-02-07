import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/admin/')({
  beforeLoad: () => {
    throw redirect({ to: '/books', search: { page: 1, size: 5 } });
  },
});
