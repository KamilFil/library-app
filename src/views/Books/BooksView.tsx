import { useSearch } from '@tanstack/react-router';
import { useGetBooksQuery } from '../../queries/books/useGetBooksQuery';
import { BookTable } from '../../components/BookTable/BookTable.tsx';
import { Pagination } from '../../components/Pagination/Pagination.tsx';

export const BooksView = () => {
  const search = useSearch({ from: '/books/' });
  const page = Number(search.page ?? 1);
  const size = Number(search.size ?? 5);

  const { data, isFetching, error } = useGetBooksQuery(page, size);
  if (isFetching) return <p>Loading books...</p>;
  if (error) return <p>Error loading books: {error.message}</p>;
  if (!data || data.length === 0) return <p>No books found.</p>;

  return (
    <>
      <BookTable books={data} />
      <Pagination
        prev={page > 1 ? page - 1 : null}
        next={data.length === size ? page + 1 : null}
      />
    </>
  );
};
