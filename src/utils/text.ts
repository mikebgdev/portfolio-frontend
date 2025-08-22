/**
 * Text processing utility functions
 */

/**
 * Processes text content that may contain HTML breaks and formatting
 * @param text - Raw text content
 * @returns Array of processed text paragraphs
 */
export const processTextContent = (text: string): string[] => {
  return text
    .replace(/<br\s*\/?>/gi, '\n') // Convert <br> tags to line breaks
    .replace(/\\n/g, '\n') // Convert escaped \n to actual line breaks
    .split(/\n\s*\n/) // Split on double line breaks (paragraph breaks)
    .map(p => p.replace(/\n/g, ' ').trim()) // Replace single line breaks with spaces within paragraphs
    .filter(p => p.length > 0);
};

/**
 * Processes description text into sentence array
 * @param description - Raw description text
 * @returns Array of processed sentences
 */
export const processDescription = (description: string): string[] => {
  if (!description || !description.trim()) {
    return [];
  }
  
  return description
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/\\n/g, '\n')
    .split(/[.\n]/)
    .map(sentence => sentence.trim())
    .filter(sentence => sentence.length > 0);
};

/**
 * Processes tags that can be either array or comma-separated string
 * @param tags - Tags as array or comma-separated string
 * @returns Array of processed tag strings
 */
export const processTags = (tags: string[] | string): string[] => {
  if (Array.isArray(tags)) {
    return tags;
  }
  
  if (typeof tags === 'string' && tags.trim()) {
    return tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);
  }
  
  return [];
};

/**
 * Converts a string to PascalCase for icon names
 * @param str - String to convert
 * @returns PascalCase string
 */
export const toPascalCase = (str: string): string => {
  return str
    .trim()
    .split(/[-_\s]+/) // Split on hyphens, underscores, or spaces
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('');
};