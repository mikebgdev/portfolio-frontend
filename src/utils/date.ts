/**
 * Date utility functions for consistent date formatting across the application
 */

/**
 * Converts YYYY/MM/DD format to YYYY-MM-DD format for proper Date parsing
 * @param dateString - Date string in YYYY/MM/DD format
 * @returns Date string in YYYY-MM-DD format
 */
export const normalizeDate = (dateString: string): string => {
  return dateString.replace(/\//g, '-');
};

/**
 * Formats a date for display according to locale
 * @param dateString - Date string to format
 * @param locale - Locale for formatting (default: 'en-US')
 * @param options - Intl.DateTimeFormatOptions
 * @returns Formatted date string or fallback string if invalid
 */
export const formatDate = (
  dateString: string,
  locale: string = 'en-US',
  options: Intl.DateTimeFormatOptions = { month: 'long', year: 'numeric' }
): string => {
  try {
    const normalizedDate = normalizeDate(dateString);
    const date = new Date(normalizedDate + 'T00:00:00');
    
    if (isNaN(date.getTime())) {
      return dateString; // Return original if invalid
    }
    
    return date.toLocaleDateString(locale, options);
  } catch {
    return dateString; // Return original if formatting fails
  }
};

/**
 * Creates a period string from start and end dates
 * @param startDate - Start date string
 * @param endDate - End date string (null for present)
 * @param locale - Locale for formatting
 * @returns Formatted period string
 */
export const formatPeriod = (
  startDate: string,
  endDate: string | null,
  locale: string = 'en-US'
): string => {
  const presentText = locale === 'es' ? 'Presente' : 'Present';
  const formattedStart = formatDate(startDate, locale);
  
  if (!endDate) {
    return `${formattedStart} - ${presentText}`;
  }
  
  const formattedEnd = formatDate(endDate, locale);
  return `${formattedStart} - ${formattedEnd}`;
};