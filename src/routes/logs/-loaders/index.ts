import { QueryClient } from '@tanstack/react-query';
import { fetchLogs } from './fetchLogs.ts';

export const logsLoader = async (page: number, size: number) => {
  const queryClient = new QueryClient();

  return queryClient.fetchQuery({
    queryKey: ['logs', page, size],
    queryFn: () => fetchLogs(page, size),
  });
};
