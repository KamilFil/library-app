import { createFileRoute } from '@tanstack/react-router';
import { BooksSearch } from '../../books';
import { useAuthStore } from '../../../store/useAuthStore';
import { Pagination } from '../../../components/Pagination/Pagination';
import { authGuard } from '../../../auth/authGuard';
import { useGetPaginatedUserRentalsWithBooksQuery } from '../../../queries/rentals/useGetPaginatedUserRentalsWithBooksQuery';
import { UserBookTable } from '../../../components/User/UserBookTable/UserBookTable';

const UserBookList = () => {
  const { user } = useAuthStore();
  const { page, size } = Route.useLoaderData();
  const { data: rentals, isFetching } =
    useGetPaginatedUserRentalsWithBooksQuery(page, size, user!.id);

  if (!user) return <p>User error</p>;

  if (!rentals) return <p>No data...</p>;

  if (isFetching) return <p>Loading</p>;

  return (
    <>
      <UserBookTable
        data={rentals.data.filter((rental) => rental.userId !== null)}
      />
      <Pagination prev={rentals.prev} next={rentals.next} />
    </>
  );
};

export const Route = createFileRoute('/user/my_books/')({
  validateSearch: (search: Record<string, unknown>): BooksSearch => ({
    page: Number(search?.page ?? 1),
    size: Number(search?.size ?? 5),
  }),
  loaderDeps: ({ search }) => ({ page: search.page, size: search.size }),
  loader: async ({ deps: { page, size } }) => {
    return { page, size };
  },
  component: UserBookList,
  beforeLoad: async () => authGuard(),
});
