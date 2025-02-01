import { useQuery } from '@tanstack/react-query';
import { BookEntity } from '../../types/book.ts';
import { useApi } from '../../api/useApi.ts';

export const useGetBooksQuery = () => {
  const { apiGet } = useApi();

  const { data, isFetching } = useQuery<BookEntity[]>({
    queryKey: ['books'],
    queryFn: async () => {
      return apiGet<BookEntity[]>(`books`);
    },
  });

  return {
    data,
    isFetching,
  };
};
