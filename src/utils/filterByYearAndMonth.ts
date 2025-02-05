import { RentalWithBookEntity } from '../types/rental';
import { convertToDate } from './convertToDate';

export const filterByYearAndMonth = (
  data: RentalWithBookEntity[],
  selectedYear: string,
  selectedMonth: string,
) => {
  return data.filter((rental) => {
    const rented = convertToDate(rental.rentedAt);
    if (!rented) return false;

    const rentalYear = rented.getFullYear();
    const rentalMonth = rented.getMonth() + 1;

    let validationYear = selectedYear;
    let validationMonth = selectedMonth;

    if (selectedYear === 'All') validationYear = '';
    if (selectedMonth === 'All') validationMonth = '';

    return (
      (validationYear ? rentalYear === Number(validationYear) : true) &&
      (validationMonth ? rentalMonth === Number(validationMonth) : true)
    );
  });
};
