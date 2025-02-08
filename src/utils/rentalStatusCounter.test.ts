import { describe, it, expect } from 'vitest';
import { convertToDate } from './convertToDate';
import { rentalStatusCounter } from './rentalStatusCounter';
import { RentalWithBookEntity } from '../types/rental';

describe('convertToDate', () => {
  it('should correctly convert a valid date string to a Date object', () => {
    const dateStr = '15.08.2023';
    const result = convertToDate(dateStr);
    expect(result).toBeInstanceOf(Date);
    expect(result.getFullYear()).toBe(2023);
    expect(result.getMonth()).toBe(7);
    expect(result.getDate()).toBe(15);
  });

  it('should return an Invalid Date for empty strings', () => {
    const result = convertToDate('');
    expect(result.getTime()).toBeNaN();
  });

  it('should handle single-digit days and months correctly', () => {
    const dateStr = '5.7.2022';
    const result = convertToDate(dateStr);
    expect(result.getFullYear()).toBe(2022);
    expect(result.getMonth()).toBe(6);
    expect(result.getDate()).toBe(5);
  });
});

describe('rentalStatusCounter', () => {
  const rentals: RentalWithBookEntity[] = [
    {
      rentedAt: '01.01.2023',
      returnedAt: '10.01.2023',
      book: {
        id: '',
        title: '',
        author: '',
        quantity: 1,
        description: '',
        year: 2001,
      },
      id: '',
      userId: '',
      bookId: '',
    },
    {
      rentedAt: '01.01.2023',
      returnedAt: '20.01.2023',
      book: {
        id: '',
        title: '',
        author: '',
        quantity: 2,
        description: '',
        year: 2002,
      },
      id: '',
      userId: '',
      bookId: '',
    },
    {
      rentedAt: '05.02.2023',
      returnedAt: '10.02.2023',
      book: {
        id: '',
        title: '',
        author: '',
        quantity: 3,
        description: '',
        year: 2003,
      },
      id: '',
      userId: '',
      bookId: '',
    },
    {
      rentedAt: '05.02.2023',
      returnedAt: '25.02.2023',
      book: {
        id: '',
        title: '',
        author: '',
        quantity: 4,
        description: '',
        year: 2004,
      },
      id: '',
      userId: '',
      bookId: '',
    },
  ];

  it('should count only delayed rentals when delayed is true', () => {
    const result = rentalStatusCounter(rentals, true);
    expect(result).toBe(2);
  });

  it('should count only on-time rentals when delayed is false', () => {
    const result = rentalStatusCounter(rentals, false);
    expect(result).toBe(2);
  });

  it('should return 0 when there are no matching rentals', () => {
    const emptyRentals: RentalWithBookEntity[] = [];
    const result = rentalStatusCounter(emptyRentals, true);
    expect(result).toBe(0);
  });
});
