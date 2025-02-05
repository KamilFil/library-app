import { BookEntity } from './book';

export interface RentalEntity {
  id: string;
  userId: string;
  bookId: string;
  rentedAt: string;
  returnedAt: string | null;
}

export type RentalDto = Omit<RentalEntity, 'id'>;

export interface RentalWithBookEntity extends RentalEntity {
  book: BookEntity;
}

export interface PaginatedUserRentalsEntity {
  first: number;
  prev: number | null;
  next: number | null;
  last: number;
  pages: number;
  items: number;
  data: RentalWithBookEntity[];
  userId: string;
}

export interface RentalReturnBookDto {
  returnedAt: string;
}
