import { useApi } from '../../api/useApi.ts';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { BookEntity } from '../../types/book.ts';
import { useNotificationStore } from '../../store/useNotificationStore.ts';
import { useLogger } from '../../hooks/useLogger.ts';
import { useAuthStore } from '../../store/useAuthStore.ts';

export const useDeleteBookMutation = () => {
  const { apiDelete } = useApi();
  const queryClient = useQueryClient();
  const { user } = useAuthStore();
  const { showNotification } = useNotificationStore();
  const { logInfo, logError } = useLogger();

  const { mutate, isPending } = useMutation({
    mutationKey: ['books', 'update'],
    mutationFn: async (bookId: string) => {
      return apiDelete<BookEntity>(`books/${bookId}`);
    },
    onSuccess: () => {
      showNotification('Usunięto książkę!', 'success');
      logInfo(user!.email, 'Usunięto książkę');
      queryClient.invalidateQueries({
        queryKey: ['books'],
      });
    },
    onError: (error: Error) => {
      showNotification('Nie udało się usunąć książki', 'error');
      logError(user!.email, 'Nie udało się usunąć książki', error.message);
    },
  });

  return {
    mutate,
    isPending,
  };
};
