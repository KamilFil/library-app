import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useApi } from '../api/useApi.ts';
import { LogType } from '../types/log.ts';

interface Log {
  email: string;
  typeAction: string;
  type: string;
  actionDate: string;
  message?: string;
}

export const useLogger = () => {
  const { apiPost } = useApi();
  const queryClient = useQueryClient();

  const addLogMutation = useMutation({
    mutationFn: async (log: Log) => {
      await apiPost('logs', log);
      await queryClient.invalidateQueries({ queryKey: ['logs'] });
    },
  });

  const logInfo = async (email: string, typeAction: string) => {
    addLogMutation.mutate({
      email,
      type: LogType.Info,
      typeAction: typeAction,
      actionDate: new Date().toISOString(),
    });
    await queryClient.invalidateQueries({ queryKey: ['logs'] });
  };

  const logError = async (
    email: string,
    typeAction: string,
    message?: string,
  ) => {
    addLogMutation.mutate({
      email,
      type: LogType.Error,
      typeAction,
      message,
      actionDate: new Date().toISOString(),
    });
    await queryClient.invalidateQueries({ queryKey: ['logs'] });
  };

  return { logInfo, logError };
};
