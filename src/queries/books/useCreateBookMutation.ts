import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useApi } from '../../api/useApi.ts';
import { useNotificationStore } from '../../store/useNotificationStore.ts';
import { useAuthStore } from '../../store/useAuthStore.ts';
import { useLogger } from '../../hooks/useLogger.ts';
import { LogActionError, LogActionInfo } from '../../types/log.ts';
import { BookDto, BookEntity } from '../../types/book.ts';

export const useCreateBookMutation = () => {
  const { apiPost } = useApi();
  const { showNotification } = useNotificationStore();
  const { user } = useAuthStore();
  const { logInfo, logError } = useLogger();

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationKey: ['books', 'create'],
    mutationFn: async (payload: BookDto) => {
      return apiPost<BookEntity, BookDto>('books', {
        ...payload,
        year: Number(payload.year),
        quantity: Number(payload.quantity),
      });
    },
    onSuccess: async () => {
      showNotification('Book added!', 'success');
      await logInfo(user!.email, LogActionInfo.AddBook);
      await queryClient.invalidateQueries({
        queryKey: ['books'],
      });
    },
    onError: async (error: Error) => {
      showNotification('Failed to add the book', 'error');
      await logError(user!.email, LogActionError.AddBook, error.message);
    },
  });

  return {
    mutate,
    isPending,
  };
};
