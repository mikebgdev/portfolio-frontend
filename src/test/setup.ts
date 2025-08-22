import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';

// Extend Vitest's expect with testing-library matchers
expect.extend(matchers);

// Clean up after each test case
afterEach(() => {
  cleanup();
});

// Mock IntersectionObserver for animations
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  observe() {}
  unobserve() {}
  disconnect() {}
} as any;

// Mock ResizeObserver for layout components
global.ResizeObserver = class ResizeObserver {
  constructor() {}
  observe() {}
  unobserve() {}
  disconnect() {}
} as any;

// Mock matchMedia for responsive components
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => {},
  }),
});

// Mock scrollTo for smooth scrolling
Object.defineProperty(window, 'scrollTo', {
  writable: true,
  value: ({ top, behavior }: { top: number; behavior: string }) => {
    if (behavior === 'smooth') {
      // Mock smooth scrolling
      window.scrollY = top;
    }
  },
});