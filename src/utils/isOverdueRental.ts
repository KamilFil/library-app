import { RentalEntity } from '../types/rental.ts';
import { convertToDate } from './convertToDate.ts';

export const isOverdueRental = (data: RentalEntity) => {
  const rentedAt = convertToDate(data.rentedAt);
  const compareDate = data.returnedAt
    ? convertToDate(data.returnedAt)
    : new Date();

  const diffInTime = compareDate.getTime() - rentedAt.getTime();
  const diffInDays = Math.floor(diffInTime / (1000 * 60 * 60 * 24));

  return {
    daysDifference: diffInDays > 14 ? diffInDays - 14 : null,
    isOverdue: diffInDays > 14,
  };
};
