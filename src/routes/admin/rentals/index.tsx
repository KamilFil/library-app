import { authGuard } from '../../../auth/authGuard.ts';
import { createFileRoute } from '@tanstack/react-router';
import { PaginationSearch } from '../logs';
import { RentalsBookAdminView } from '../../../views/RenstalsBookAdminView/RentalsBookAdminView.tsx';

export const Route = createFileRoute('/admin/rentals/')({
  validateSearch: (search: Record<string, unknown>): PaginationSearch => ({
    page: Number(search?.page ?? 1),
    size: Number(search?.size ?? 5),
  }),
  loaderDeps: ({ search }) => ({ page: search.page, size: search.size }),
  component: RentalsBookAdminView,
  beforeLoad: () => authGuard('admin'),
});
