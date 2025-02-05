import { BookEntity } from './book';
import { User } from './user/user.ts';

export interface RentalEntity {
  id: string;
  userId: string;
  bookId: string;
  rentedAt: string;
  returnedAt: string | null;
  user?: User;
  book?: BookEntity;
}

export type RentalDto = Omit<RentalEntity, 'id'>;

export interface RentalWithBookEntity extends RentalEntity {
  book: BookEntity;
}

export interface PaginatedRentalsEntity {
  first: number;
  prev: number | null;
  next: number | null;
  last: number;
  pages: number;
  items: number;
  data: RentalEntity[];
  userId: string;
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
