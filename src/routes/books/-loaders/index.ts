import { PaginatedBooksEntity } from '../../../types/book';

const API_URL = import.meta.env.VITE_API_URL;

export const booksLoader = async (page: number, size: number) => {
  const response = await fetch(
    `${API_URL}books?_page=${page}&_per_page=${size}`,
  );
  return response.json() as Promise<PaginatedBooksEntity>;
};
