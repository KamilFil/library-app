import { useMutation } from '@tanstack/react-query';
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

  const addLogMutation = useMutation({
    mutationFn: async (log: Log) => {
      await apiPost('logs', log);
    },
  });

  const logInfo = (email: string, typeAction: string) => {
    addLogMutation.mutate({
      email,
      type: LogType.Info,
      typeAction: typeAction,
      actionDate: new Date().toISOString(),
    });
  };

  const logError = (email: string, typeAction: string, message?: string) => {
    addLogMutation.mutate({
      email,
      type: LogType.Error,
      typeAction,
      message,
      actionDate: new Date().toISOString(),
    });
  };

  return { logInfo, logError };
};
