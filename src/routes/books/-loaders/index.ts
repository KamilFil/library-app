import { QueryClient } from '@tanstack/react-query';
import { fetchBooks } from './fetchBooks';

export const booksLoader = async (page: number, size: number) => {
  const queryClient = new QueryClient();

  return queryClient.fetchQuery({
    queryKey: ['books', page, size],
    queryFn: () => fetchBooks(page, size),
  });
};
