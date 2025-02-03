import { createFileRoute } from '@tanstack/react-router';
import { authGuard } from '../../auth/authGuard.ts';
import { Logs } from '../../components/Logs/Logs.tsx';
import { logsLoader } from './-loaders';

export type PaginationSearch = {
  page: number;
  size: number;
};

export const Route = createFileRoute('/logs/')({
  component: Logs,
  validateSearch: (search: Record<string, unknown>): PaginationSearch => ({
    page: Number(search?.page ?? 1),
    size: Number(search?.size ?? 5),
  }),
  loaderDeps: ({ search }) => ({ page: search.page, size: search.size }),
  loader: ({ deps: { page, size } }) => logsLoader(page, size),
  beforeLoad: async () => authGuard('admin'),
});
