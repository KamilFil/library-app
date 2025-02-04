import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: RouteComponent,
  beforeLoad: () => {
    throw redirect({ to: '/books', search: { page: 1, size: 5 } });
  },
});

function RouteComponent() {
  return <p>Main page</p>;
}
