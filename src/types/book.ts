export interface BookEntity {
  id: string;
  title: string;
  author: string;
  quantity: number;
  description: string;
  year: number;
}

export type BookDto = {
  id: string;
  title: string;
  author: string;
  quantity: number;
  description: string;
  year: number;
};

export interface PaginatedBooksEntity {
  first: number;
  prev: number | null;
  next: number | null;
  last: number;
  pages: number;
  items: number;
  data: BookEntity[];
}
