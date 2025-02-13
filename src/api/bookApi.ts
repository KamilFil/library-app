import { PaginatedBooksEntity } from '../types/book.ts';

const API_URL = import.meta.env.VITE_API_URL;

export const fetchBooks = async (
  page: number,
  size: number,
): Promise<PaginatedBooksEntity> => {
  const response = await fetch(
    `${API_URL}books?_page=${page}&_per_page=${size}`,
  );
  if (!response.ok) throw new Error('Failed to fetch books');
  return response.json();
};
