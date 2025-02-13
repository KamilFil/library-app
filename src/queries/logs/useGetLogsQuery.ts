import { useQuery } from '@tanstack/react-query';
import { fetchLogs } from '../../api/logsApi.ts';
import { PaginatedLogsEntity } from '../../types/log.ts';

export const useGetLogsQuery = (page: number = 1, size: number = 10) => {
  const { data, isFetching, error } = useQuery<PaginatedLogsEntity, Error>({
    queryKey: ['logs', page, size],
    queryFn: async (): Promise<PaginatedLogsEntity> => {
      return fetchLogs(page, size);
    },
  });

  return {
    data,
    isFetching,
    error,
  };
};
