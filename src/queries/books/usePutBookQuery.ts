import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useApi } from '../../api/useApi.ts';
import { BookDto, BookEntity } from '../../types/book.ts';

export const usePutBookMutation = (bookId: string) => {
  const { apiPut } = useApi();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationKey: ['books', 'update', bookId],
    mutationFn: async (payload: BookDto) => {
      return apiPut<BookEntity, BookDto>(`books/${bookId}`, payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['books'],
      });
    },
  });

  return {
    mutate,
    isPending,
  };
};
