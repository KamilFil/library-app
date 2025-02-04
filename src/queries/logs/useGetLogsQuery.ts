import { useQuery } from '@tanstack/react-query';
import { fetchLogs } from '../../api/logsApi.ts';
import { LogsEntity } from '../../types/log.ts';

export const useGetLogsQuery = (page: number = 1, size: number = 10) => {
  const { data, isFetching, error } = useQuery<LogsEntity[], Error>({
    queryKey: ['logs', page, size],
    queryFn: async () => {
      const resp = await fetchLogs(page, size);
      return resp.data;
    },
  });

  return {
    data,
    isFetching,
    error,
  };
};
