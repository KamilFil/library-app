import { useQuery } from '@tanstack/react-query';
import { PaginatedBooksEntity } from '../../types/book.ts';
import { fetchBooks } from '../../api/bookApi.ts';

export const useGetBooksQuery = (page: number = 1, size: number = 10) => {
  const { data, isFetching, error } = useQuery<PaginatedBooksEntity, Error>({
    queryKey: ['books', page, size],
    queryFn: async () => {
      return await fetchBooks(page, size);
    },
  });

  return {
    data,
    isFetching,
    error,
  };
};
