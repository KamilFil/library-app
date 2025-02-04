import { createFileRoute, redirect } from '@tanstack/react-router';

const RouteComponent = () => {
  return <p>Main user page</p>;
};

export const Route = createFileRoute('/user/')({
  component: RouteComponent,
  beforeLoad: () => {
    throw redirect({ to: '/user/my_stats' });
  },
});
