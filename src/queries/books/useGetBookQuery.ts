import { useQuery } from '@tanstack/react-query';
import { BookEntity } from '../../types/book.ts';
import { useApi } from '../../api/useApi.ts';

export const useGetBookQuery = (bookId: string | null) => {
  const { apiGet } = useApi();

  const { data, isFetching } = useQuery<BookEntity>({
    queryKey: ['books', bookId],
    queryFn: async () => {
      return apiGet<BookEntity>(`books/${bookId}`);
    },
    enabled: !!bookId,
  });

  return {
    data,
    isFetching,
  };
};
