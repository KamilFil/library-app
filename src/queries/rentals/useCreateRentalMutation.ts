import { useMutation, useQueryClient } from '@tanstack/react-query';
import { RentalDto, RentalEntity } from '../../types/rental.ts';
import { useApi } from '../../api/useApi.ts';
import { useNotificationStore } from '../../store/useNotificationStore.ts';
import { useAuthStore } from '../../store/useAuthStore.ts';
import { useLogger } from '../../hooks/useLogger.ts';
import { LogActionError, LogActionInfo } from '../../types/log.ts';

export const useCreateRentalMutation = () => {
  const { apiPost } = useApi();
  const { showNotification } = useNotificationStore();
  const { user } = useAuthStore();
  const { logInfo, logError } = useLogger();

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationKey: ['rentals', 'create'],
    mutationFn: async (payload: RentalDto) => {
      return apiPost<RentalEntity, RentalDto>('rentals', payload);
    },
    onSuccess: () => {
      showNotification('Wypożyczono książkę!', 'success');
      logInfo(user!.email, LogActionInfo.RentBook);
      queryClient.invalidateQueries({
        queryKey: ['rentals'],
      });
    },
    onError: (error: Error) => {
      showNotification('Nie udało się wypożyczyć książki', 'error');
      logError(user!.email, LogActionError.RentBook, error.message);
    },
  });

  return {
    mutate,
    isPending,
  };
};
