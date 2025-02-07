import { createFileRoute } from '@tanstack/react-router';
import { authGuard } from '../../../auth/authGuard.ts';
import { Logs } from '../../../views/Logs/Logs.tsx';

export type PaginationSearch = {
  page: number;
  size: number;
};

export const Route = createFileRoute('/admin/logs/')({
  component: Logs,
  validateSearch: (search: Record<string, unknown>): PaginationSearch => ({
    page: Number(search?.page ?? 1),
    size: Number(search?.size ?? 5),
  }),
  beforeLoad: async () => authGuard('admin'),
});
