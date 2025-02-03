export interface RentalEntity {
  id: string;
  userId: string;
  bookId: string;
  rentedAt: string;
  returnedAt?: string | null;
}

export type RentalDto = Omit<RentalEntity, 'id'>;
