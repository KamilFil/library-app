import { RentalWithBookEntity } from '../types/rental';
import { convertToDate } from './convertToDate';

export const rentalStatusCounter = (
  data: RentalWithBookEntity[],
  delayed: boolean,
) => {
  return data.filter((rental) => {
    const rentedAt = convertToDate(rental.rentedAt);
    const returnedAt = rental.returnedAt
      ? convertToDate(rental.returnedAt)
      : null;

    if (returnedAt) {
      const diffInTime = returnedAt.getTime() - rentedAt.getTime();
      const diffInDays = diffInTime / (1000 * 60 * 60 * 24);

      if (delayed) {
        return diffInDays > 14;
      }
      return diffInDays <= 14;
    }
    return false;
  }).length;
};
