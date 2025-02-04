import { createFileRoute } from '@tanstack/react-router';
import { authGuard } from '../../../auth/authGuard';
import { UserStats } from '../../../components/User/UserStats/UserStats';
import { useAuthStore } from '../../../store/useAuthStore';
import { useGetUserRentalsWithBooksQuery } from '../../../queries/rentals/useGetUserRentalsWithBooksQuery';

const RouteComponent = () => {
  const { user } = useAuthStore();

  const { data: rentals, isFetching } = useGetUserRentalsWithBooksQuery(
    user!.id,
  );

  if (!user) return <p>User error</p>;

  if (!rentals) return <p>No data...</p>;

  if (isFetching) return <p>Loading</p>;

  return <UserStats data={rentals} />;
};

export const Route = createFileRoute('/user/my_stats/')({
  component: RouteComponent,
  beforeLoad: async () => authGuard(),
});
