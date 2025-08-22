import { describe, it, expect } from 'vitest';
import { normalizeDate, formatDate, formatPeriod } from '../date';

describe('Date Utils', () => {
  describe('normalizeDate', () => {
    it('should convert YYYY/MM/DD to YYYY-MM-DD', () => {
      expect(normalizeDate('2024/07/01')).toBe('2024-07-01');
      expect(normalizeDate('2023/12/25')).toBe('2023-12-25');
    });

    it('should handle already normalized dates', () => {
      expect(normalizeDate('2024-07-01')).toBe('2024-07-01');
    });
  });

  describe('formatDate', () => {
    it('should format dates correctly for English locale', () => {
      const result = formatDate('2024/07/01', 'en-US');
      expect(result).toMatch(/July 2024/);
    });

    it('should format dates correctly for Spanish locale', () => {
      const result = formatDate('2024/07/01', 'es-ES');
      expect(result).toMatch(/julio.*2024/i);
    });

    it('should handle invalid dates gracefully', () => {
      expect(formatDate('invalid-date')).toBe('invalid-date');
      expect(formatDate('')).toBe('');
    });

    it('should handle YYYY/MM/DD format', () => {
      const result = formatDate('2024/07/01');
      expect(result).not.toBe('2024/07/01');
      expect(result).toContain('2024');
    });
  });

  describe('formatPeriod', () => {
    it('should format period with end date', () => {
      const result = formatPeriod('2022/01/01', '2024/07/01', 'en-US');
      expect(result).toMatch(/January 2022.*July 2024/);
    });

    it('should format period without end date (present)', () => {
      const result = formatPeriod('2022/01/01', null, 'en-US');
      expect(result).toMatch(/January 2022.*Present/);
    });

    it('should format period in Spanish', () => {
      const result = formatPeriod('2022/01/01', null, 'es');
      expect(result).toMatch(/enero.*2022.*Presente/i);
    });

    it('should handle invalid dates', () => {
      const result = formatPeriod('invalid', null, 'en-US');
      expect(result).toContain('invalid');
      expect(result).toContain('Present');
    });
  });
});