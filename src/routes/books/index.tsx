import { createFileRoute } from '@tanstack/react-router';
import { BookTable } from '../../components/BookTable/BookTable';
import { booksLoader } from './-loaders';
import { BookPagination } from '../../components/BookPagination/BookPagination';
import { QueryClient } from '@tanstack/react-query';
import { authGuard } from '../../auth/authGuard.ts';

const BookList = () => {
  const { data, prev, next } = Route.useLoaderData();

  if (!data) return <p>No books.</p>;

  return (
    <>
      <BookTable books={data} />
      <BookPagination prev={prev} next={next} />
    </>
  );
};

export type BooksSearch = {
  page: number;
  size: number;
};

export interface RouteContextInterface {
  queryClient: QueryClient;
}

export const Route = createFileRoute('/books/')({
  validateSearch: (search: Record<string, unknown>): BooksSearch => ({
    page: Number(search?.page ?? 1),
    size: Number(search?.size ?? 5),
  }),
  beforeLoad: () => authGuard(),
  loaderDeps: ({ search }) => ({ page: search.page, size: search.size }),
  loader: ({ deps: { page, size } }) => booksLoader(page, size),
  component: BookList,
});
