import { useQuery } from '@tanstack/react-query';
import { BookEntity } from '../../types/book.ts';
import { fetchBooks } from '../../api/bookApi.ts';

export const useGetBooksQuery = (page: number = 1, size: number = 10) => {
  const { data, isFetching, error } = useQuery<BookEntity[], Error>({
    queryKey: ['books', page, size],
    queryFn: async () => {
      const resp = await fetchBooks(page, size);
      return resp.data;
    },
  });

  return {
    data,
    isFetching,
    error,
  };
};
