import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useApi } from '../../api/useApi.ts';
import { BookDto, BookEntity } from '../../types/book.ts';
import { useNotificationStore } from '../../store/useNotificationStore.ts';
import { useLogger } from '../../hooks/useLogger.ts';
import { LogActionError, LogActionInfo } from '../../types/log.ts';
import { useAuthStore } from '../../store/useAuthStore.ts';

export const usePutBookMutation = (bookId?: string) => {
  const { apiPatch } = useApi();
  const queryClient = useQueryClient();
  const { showNotification } = useNotificationStore();
  const { logInfo, logError } = useLogger();
  const { user } = useAuthStore();

  const { mutate, isPending } = useMutation({
    mutationKey: ['books', 'update', bookId],
    mutationFn: async (payload: BookDto) => {
      return apiPatch<BookEntity, BookDto>(
        `books/${bookId ? bookId : payload.id}`,
        {
          ...payload,
          year: Number(payload.year),
          quantity: Number(payload.quantity),
        },
      );
    },
    onSuccess: async () => {
      showNotification('Zaktualizowano książkę!', 'success');
      await logInfo(user!.email, LogActionInfo.EditBook);
      await queryClient.invalidateQueries({
        queryKey: ['books'],
      });
    },
    onError: async (error: Error) => {
      showNotification(
        error.message ?? 'Nie udało się usunać książki',
        'error',
      );
      await logError(LogActionError.EditBook, error.message);
    },
  });

  return {
    mutate,
    isPending,
  };
};
