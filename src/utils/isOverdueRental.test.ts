import { describe, it, expect } from 'vitest';
import { RentalEntity } from '../types/rental';
import { isOverdueRental } from './isOverdueRental';

describe('isOverdueRental', () => {
  it('should return not overdue when rental is returned within 14 days', () => {
    const rental: RentalEntity = {
      rentedAt: '1.10.2023',
      returnedAt: '10.10.2023',
      userId: '1',
      bookId: '1',
    };

    const result = isOverdueRental(rental);

    expect(result.isOverdue).toBe(false);
    expect(result.daysDifference).toBeNull();
  });

  it('should return overdue when rental is returned after 14 days', () => {
    const rental: RentalEntity = {
      rentedAt: '1.10.2023',
      returnedAt: '20.10.2023',
      userId: '1',
      bookId: '1',
    };

    const result = isOverdueRental(rental);

    expect(result.isOverdue).toBe(true);
    expect(result.daysDifference).toBe(5);
  });

  it('should return not overdue when rental is not returned and current date is within 14 days', () => {
    const rental: RentalEntity = {
      rentedAt: '1.10.2023',
      returnedAt: null,
      userId: '1',
      bookId: '1',
    };

    const originalDate = Date;
    global.Date = class extends originalDate {
      constructor() {
        super('10.10.2023');
      }
    } as typeof Date;

    const result = isOverdueRental(rental);

    expect(result.isOverdue).toBe(false);
    expect(result.daysDifference).toBeNull();

    global.Date = originalDate;
  });

  it('should handle edge case where rental is returned exactly on the 14th day', () => {
    const rental: RentalEntity = {
      rentedAt: '1.10.2023',
      returnedAt: '15.10.2023',
      userId: '1',
      bookId: '1',
    };

    const result = isOverdueRental(rental);

    expect(result.isOverdue).toBe(false);
    expect(result.daysDifference).toBeNull();
  });
});
