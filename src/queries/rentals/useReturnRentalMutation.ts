import { useMutation, useQueryClient } from '@tanstack/react-query';
import { RentalDto, RentalEntity } from '../../types/rental.ts';
import { useApi } from '../../api/useApi.ts';
import { useNotificationStore } from '../../store/useNotificationStore.ts';
import { useAuthStore } from '../../store/useAuthStore.ts';
import { useLogger } from '../../hooks/useLogger.ts';
import { LogActionError, LogActionInfo } from '../../types/log.ts';

export const useReturnRentalMutation = (rentalId?: string) => {
  const { apiPatch } = useApi();
  const { showNotification } = useNotificationStore();
  const { user } = useAuthStore();
  const { logInfo, logError } = useLogger();

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationKey: ['rentals', 'update', rentalId],
    mutationFn: async (payload: RentalDto) => {
      return apiPatch<RentalEntity, RentalDto>(
        `rentals/${rentalId ? rentalId : payload.id}`,
        payload,
      );
    },
    onSuccess: () => {
      showNotification('Zwrócono książkę!', 'success');
      logInfo(user!.email, LogActionInfo.ReturnBook);
      queryClient.invalidateQueries({
        queryKey: ['rentals'],
      });
    },
    onError: (error: Error) => {
      showNotification('Nie udało się zwrócić książki', 'error');
      logError(user!.email, LogActionError.ReturnBook, error.message);
    },
  });

  return {
    mutate,
    isPending,
  };
};
