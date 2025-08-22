import { describe, it, expect } from 'vitest';
import { processTextContent, processDescription, processTags, toPascalCase } from '../text';

describe('Text Utils', () => {
  describe('processTextContent', () => {
    it('should convert HTML breaks to paragraphs', () => {
      const input = 'First paragraph.<br><br>Second paragraph.';
      const result = processTextContent(input);
      expect(result).toEqual(['First paragraph.', 'Second paragraph.']);
    });

    it('should handle escaped newlines', () => {
      const input = 'First paragraph.\\n\\nSecond paragraph.';
      const result = processTextContent(input);
      expect(result).toEqual(['First paragraph.', 'Second paragraph.']);
    });

    it('should handle mixed formats', () => {
      const input = 'First paragraph.<br/>\\nSome text\\n\\nSecond paragraph.';
      const result = processTextContent(input);
      expect(result).toEqual(['First paragraph. Some text', 'Second paragraph.']);
    });

    it('should filter empty paragraphs', () => {
      const input = 'Text 1.\\n\\n\\n\\nText 2.';
      const result = processTextContent(input);
      expect(result).toEqual(['Text 1.', 'Text 2.']);
    });
  });

  describe('processDescription', () => {
    it('should split description by sentences and lines', () => {
      const input = 'First sentence. Second sentence.\\nThird sentence.';
      const result = processDescription(input);
      expect(result).toEqual(['First sentence', 'Second sentence', 'Third sentence']);
    });

    it('should handle empty or null descriptions', () => {
      expect(processDescription('')).toEqual([]);
      expect(processDescription('   ')).toEqual([]);
    });

    it('should handle HTML breaks', () => {
      const input = 'First sentence.<br>Second sentence.';
      const result = processDescription(input);
      expect(result).toEqual(['First sentence', 'Second sentence']);
    });
  });

  describe('processTags', () => {
    it('should return array as-is when input is array', () => {
      const input = ['React', 'TypeScript', 'Vite'];
      const result = processTags(input);
      expect(result).toEqual(input);
    });

    it('should split comma-separated string', () => {
      const input = 'React, TypeScript, Vite';
      const result = processTags(input);
      expect(result).toEqual(['React', 'TypeScript', 'Vite']);
    });

    it('should trim whitespace from tags', () => {
      const input = ' React , TypeScript,  Vite  ';
      const result = processTags(input);
      expect(result).toEqual(['React', 'TypeScript', 'Vite']);
    });

    it('should filter empty tags', () => {
      const input = 'React, , TypeScript,  , Vite';
      const result = processTags(input);
      expect(result).toEqual(['React', 'TypeScript', 'Vite']);
    });

    it('should return empty array for empty string', () => {
      expect(processTags('')).toEqual([]);
      expect(processTags('   ')).toEqual([]);
    });
  });

  describe('toPascalCase', () => {
    it('should convert kebab-case to PascalCase', () => {
      expect(toPascalCase('book-open')).toBe('BookOpen');
      expect(toPascalCase('user-circle')).toBe('UserCircle');
    });

    it('should convert snake_case to PascalCase', () => {
      expect(toPascalCase('book_open')).toBe('BookOpen');
      expect(toPascalCase('user_circle')).toBe('UserCircle');
    });

    it('should convert space-separated to PascalCase', () => {
      expect(toPascalCase('book open')).toBe('BookOpen');
      expect(toPascalCase('user circle')).toBe('UserCircle');
    });

    it('should handle mixed separators', () => {
      expect(toPascalCase('book-open_icon test')).toBe('BookOpenIconTest');
    });

    it('should handle already PascalCase strings', () => {
      expect(toPascalCase('BookOpen')).toBe('Bookopen');
    });

    it('should handle single words', () => {
      expect(toPascalCase('book')).toBe('Book');
      expect(toPascalCase('BOOK')).toBe('Book');
    });

    it('should handle empty strings', () => {
      expect(toPascalCase('')).toBe('');
      expect(toPascalCase('   ')).toBe('');
    });
  });
});