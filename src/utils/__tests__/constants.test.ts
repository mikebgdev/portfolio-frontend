import { describe, it, expect } from 'vitest';
import { SKILL_COLORS, SOCIAL_PLATFORMS, NAVIGATION_SECTIONS, ANIMATION_DELAYS } from '../constants';

describe('Constants', () => {
  describe('SKILL_COLORS', () => {
    it('should have predefined colors for common skills', () => {
      expect(SKILL_COLORS.JavaScript).toBe('text-yellow-500');
      expect(SKILL_COLORS.Python).toBe('text-blue-600');
      expect(SKILL_COLORS.Docker).toBe('text-blue-600');
    });

    it('should be a readonly object', () => {
      expect(() => {
        // @ts-expect-error - Testing readonly constraint
        SKILL_COLORS.NewSkill = 'text-red-500';
      }).toThrow();
    });
  });

  describe('SOCIAL_PLATFORMS', () => {
    it('should have GitHub platform configuration', () => {
      expect(SOCIAL_PLATFORMS.github).toEqual({
        name: 'GitHub',
        icon: 'Github',
        description: {
          es: 'Ver repositorios',
          en: 'View repositories'
        }
      });
    });

    it('should have LinkedIn platform configuration', () => {
      expect(SOCIAL_PLATFORMS.linkedin).toEqual({
        name: 'LinkedIn',
        icon: 'Linkedin',
        description: {
          es: 'Conectar profesionalmente',
          en: 'Connect professionally'
        }
      });
    });

    it('should have all required platforms', () => {
      const expectedPlatforms = ['github', 'linkedin', 'twitter', 'instagram'];
      const actualPlatforms = Object.keys(SOCIAL_PLATFORMS);
      expect(actualPlatforms).toEqual(expectedPlatforms);
    });

    it('should have bilingual descriptions', () => {
      Object.values(SOCIAL_PLATFORMS).forEach(platform => {
        expect(platform.description).toHaveProperty('es');
        expect(platform.description).toHaveProperty('en');
        expect(typeof platform.description.es).toBe('string');
        expect(typeof platform.description.en).toBe('string');
      });
    });
  });

  describe('NAVIGATION_SECTIONS', () => {
    it('should have all required navigation sections', () => {
      const expectedSections = [
        'home',
        'about',
        'skills',
        'projects',
        'experience',
        'education',
        'contact'
      ];
      expect(NAVIGATION_SECTIONS).toEqual(expectedSections);
    });

    it('should be a readonly array', () => {
      expect(() => {
        // @ts-expect-error - Testing readonly constraint
        NAVIGATION_SECTIONS.push('new-section');
      }).toThrow();
    });
  });

  describe('ANIMATION_DELAYS', () => {
    it('should have predefined delay values', () => {
      expect(ANIMATION_DELAYS.FAST).toBe(0.1);
      expect(ANIMATION_DELAYS.NORMAL).toBe(0.2);
      expect(ANIMATION_DELAYS.SLOW).toBe(0.3);
      expect(ANIMATION_DELAYS.SLOWER).toBe(0.4);
    });

    it('should have increasing delay values', () => {
      expect(ANIMATION_DELAYS.FAST).toBeLessThan(ANIMATION_DELAYS.NORMAL);
      expect(ANIMATION_DELAYS.NORMAL).toBeLessThan(ANIMATION_DELAYS.SLOW);
      expect(ANIMATION_DELAYS.SLOW).toBeLessThan(ANIMATION_DELAYS.SLOWER);
    });
  });
});