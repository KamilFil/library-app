import { useApi } from '../../api/useApi.ts';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { BookEntity } from '../../types/book.ts';
import { useNotificationStore } from '../../store/useNotificationStore.ts';
import { useLogger } from '../../hooks/useLogger.ts';
import { useAuthStore } from '../../store/useAuthStore.ts';
import { RentalEntity } from '../../types/rental.ts';
import { LogActionError } from '../../types/log.ts';

export const useDeleteBookMutation = () => {
  const { apiDelete } = useApi();
  const queryClient = useQueryClient();
  const { user } = useAuthStore();
  const { showNotification } = useNotificationStore();
  const { logInfo, logError } = useLogger();
  const { apiGet } = useApi();

  const { mutate, isPending } = useMutation({
    mutationKey: ['books', 'deleted'],
    mutationFn: async (bookId: string) => {
      const getRentedBooks = await apiGet<RentalEntity[]>(`rentals`);
      const findRentalsBook = getRentedBooks.filter(
        (rental) => rental.bookId === bookId,
      );
      const isRentBook = findRentalsBook.filter(
        (rental) => rental.returnedAt === null,
      );

      if (isRentBook.length > 0) {
        throw new Error(
          'Nie można usunąć książki, ponieważ jest ona wypożyczona',
        );
      }

      return apiDelete<BookEntity>(`books/${bookId}`);
    },
    onSuccess: async () => {
      showNotification('Usunięto książkę!', 'success');
      await logInfo(user!.email, 'Usunięto książkę');
      await queryClient.invalidateQueries({
        queryKey: ['books'],
      });
    },
    onError: async (error: Error) => {
      showNotification(
        error.message ?? 'Nie udało się usunać książki',
        'error',
      );
      await logError(user!.email, LogActionError.DeleteBook, error.message);
    },
  });

  return {
    mutate,
    isPending,
  };
};
