import { createFileRoute } from '@tanstack/react-router';
import { BookTable } from '../../components/BookTable/BookTable';
import { booksLoader } from './-loaders';
import { Pagination } from '../../components/Pagination/Pagination.tsx';
import { authGuard } from '../../auth/authGuard.ts';

const BookList = () => {
  const { data, prev, next } = Route.useLoaderData();

  if (!data) return <p>No books.</p>;

  return (
    <>
      <BookTable books={data} />
      <Pagination prev={prev} next={next} />
    </>
  );
};

export type BooksSearch = {
  page: number;
  size: number;
};

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
