import { describe, it, expect } from 'vitest';
import { convertToDate } from './convertToDate';

describe('convertToDate', () => {
  it('should correctly convert a valid date string to a Date object', () => {
    const dateStr = '15.08.2023';
    const result = convertToDate(dateStr);
    expect(result).toBeInstanceOf(Date);
    expect(result.getFullYear()).toBe(2023);
    expect(result.getMonth()).toBe(7);
    expect(result.getDate()).toBe(15);
  });

  it('should handle single-digit days and months correctly', () => {
    const dateStr = '5.7.2022';
    const result = convertToDate(dateStr);
    expect(result.getFullYear()).toBe(2022);
    expect(result.getMonth()).toBe(6);
    expect(result.getDate()).toBe(5);
  });
});
