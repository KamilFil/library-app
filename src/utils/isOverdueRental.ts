import { RentalEntity } from '../types/rental.ts';
import { convertToDate } from './convertToDate.ts';

export const isOverdueRental = (data: RentalEntity) => {
  const rentedAt = convertToDate(data.rentedAt);
  const compareDate = data.returnedAt
    ? convertToDate(data.returnedAt)
    : new Date();

  const diffInTime = compareDate.getTime() - rentedAt.getTime();
  const diffInDays = diffInTime / (1000 * 60 * 60 * 24);

  return {
    daysDifference: diffInDays,
    isOverdue: diffInDays > 14,
  };
};
