import { PaginatedLogsEntity } from '../types/log.ts';

const API_URL = import.meta.env.VITE_API_URL;

export const fetchLogs = async (
  page: number,
  size: number,
): Promise<PaginatedLogsEntity> => {
  const response = await fetch(
    `${API_URL}logs?_page=${page}&_per_page=${size}`,
  );
  if (!response.ok) throw new Error('Failed to fetch logs');
  return response.json();
};
