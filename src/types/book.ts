export interface BookEntity {
  id: string;
  title: string;
  author: string;
  quantity: number;
}

export type BookDto = Omit<BookEntity, 'id'>;

export interface PaginatedBooksEntity {
  first: number;
  prev: number | null;
  next: number | null;
  last: number;
  pages: number;
  items: number;
  data: BookEntity[];
}
