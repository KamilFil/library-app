import { createFileRoute } from '@tanstack/react-router';
import { BooksView } from '../../views/Books/BooksView.tsx';

export type BooksSearch = {
  page: number;
  size: number;
};

export const Route = createFileRoute('/books/')({
  validateSearch: (search: Record<string, unknown>): BooksSearch => ({
    page: Number(search?.page ?? 1),
    size: Number(search?.size ?? 5),
  }),
  component: BooksView,
});
