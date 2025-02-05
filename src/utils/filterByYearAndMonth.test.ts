import { describe, it, expect } from 'vitest';
import { filterByYearAndMonth } from './filterByYearAndMonth';
import { RentalWithBookEntity } from '../types/rental';

describe('filterByYearAndMonth', () => {
  const rentals: RentalWithBookEntity[] = [
    {
      rentedAt: '15.08.2023',
      book: {
        id: '',
        title: '',
        author: '',
        quantity: 1,
        description: '',
        year: 1999,
      },
      id: '',
      userId: '',
      bookId: '',
      returnedAt: null,
    },
    {
      rentedAt: '05.07.2022',
      book: {
        id: '',
        title: '',
        author: '',
        quantity: 2,
        description: '',
        year: 2000,
      },
      id: '',
      userId: '',
      bookId: '',
      returnedAt: null,
    },
    {
      rentedAt: '20.01.2023',
      book: {
        id: '',
        title: '',
        author: '',
        quantity: 3,
        description: '',
        year: 2001,
      },
      id: '',
      userId: '',
      bookId: '',
      returnedAt: null,
    },
  ];

  it('should filter rentals by year', () => {
    const result = filterByYearAndMonth(rentals, '2023', 'All');
    expect(result).toHaveLength(2);
  });

  it('should filter rentals by month', () => {
    const result = filterByYearAndMonth(rentals, 'All', '07');
    expect(result).toHaveLength(1);
    expect(result[0].rentedAt).toBe('05.07.2022');
  });

  it('should filter rentals by year and month', () => {
    const result = filterByYearAndMonth(rentals, '2023', '08');
    expect(result).toHaveLength(1);
    expect(result[0].rentedAt).toBe('15.08.2023');
  });

  it('should return all rentals when filtering by "All"', () => {
    const result = filterByYearAndMonth(rentals, 'All', 'All');
    expect(result).toHaveLength(3);
  });

  it('should return an empty array when no rentals match', () => {
    const result = filterByYearAndMonth(rentals, '2025', '12');
    expect(result).toHaveLength(0);
  });
});
