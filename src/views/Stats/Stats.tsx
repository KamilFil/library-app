import { useAuthStore } from '../../store/useAuthStore.ts';
import { useGetUserRentalsWithBooksQuery } from '../../queries/rentals/useGetUserRentalsWithBooksQuery.ts';
import { UserStats } from '../../components/User/UserStats/UserStats.tsx';

export const StatsView = () => {
  const { user } = useAuthStore();

  const { data: rentals, isFetching } = useGetUserRentalsWithBooksQuery(
    user?.id,
  );

  if (!user) return <p>User error</p>;

  if (!rentals) return <p>No data...</p>;

  if (isFetching) return <p>Loading</p>;

  return <UserStats data={rentals} />;
};
