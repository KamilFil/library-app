import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useApi } from '../../api/useApi';
import { useNotificationStore } from '../../store/useNotificationStore';
import { useAuthStore } from '../../store/useAuthStore';
import { useLogger } from '../../hooks/useLogger';
import { LogActionError, LogActionInfo } from '../../types/log';
import { User, UserArchiveDto } from '../../types/user/user';

export const useArchiveUserMutation = (userId: string) => {
  const { apiPatch } = useApi();
  const queryClient = useQueryClient();
  const { showNotification } = useNotificationStore();
  const { user } = useAuthStore();
  const { logInfo, logError } = useLogger();

  const { mutate, isPending } = useMutation({
    mutationKey: ['users', 'archive'],
    mutationFn: async (payload: UserArchiveDto) => {
      return apiPatch<User, UserArchiveDto>(`users/${userId}`, payload);
    },
    onSuccess: (deleteUser) => {
      showNotification('Użytkownik został usunięty!', 'success');
      logInfo(user!.email, LogActionInfo.UserDeletion);
      queryClient.invalidateQueries({
        queryKey: ['users'],
      });
      return deleteUser;
    },
    onError: (error: Error) => {
      showNotification('Nie udało się usunąć użytkownika', 'error');
      logError(user!.email, LogActionError.UserDeletion, error.message);
    },
  });

  return {
    mutate,
    isPending,
  };
};
