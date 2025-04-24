/**
 * Utility functions for the app
 */

/**
 * Format a number as currency
 * @param amount The amount to format
 * @param currency The currency code (default: USD)
 * @param options Additional options for the formatter
 * @returns Formatted currency string
 */
export const formatCurrency = (
  amount: number,
  currency: string = 'USD',
  options?: Intl.NumberFormatOptions
): string => {
  const defaultOptions: Intl.NumberFormatOptions = {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  };

  return new Intl.NumberFormat('en-US', { ...defaultOptions, ...options }).format(
    amount
  );
};

/**
 * Format a date
 * @param date The date to format
 * @param includeTime Whether to include the time
 * @returns Formatted date string
 */
export const formatDate = (
  date: Date | string | number,
  includeTime: boolean = false
): string => {
  const dateObj = new Date(date);
  
  if (includeTime) {
    return dateObj.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  }
  
  return dateObj.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

/**
 * Get relative time (e.g., "2 hours ago", "Yesterday", etc.)
 * @param date The date to calculate relative time for
 * @returns Relative time string
 */
export const getRelativeTime = (date: Date | string | number): string => {
  const dateObj = new Date(date);
  const now = new Date();
  
  const diffMs = now.getTime() - dateObj.getTime();
  const diffSecs = Math.floor(diffMs / 1000);
  const diffMins = Math.floor(diffSecs / 60);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);
  
  if (diffSecs < 60) {
    return 'Just now';
  } else if (diffMins < 60) {
    return `${diffMins} ${diffMins === 1 ? 'minute' : 'minutes'} ago`;
  } else if (diffHours < 24) {
    return `${diffHours} ${diffHours === 1 ? 'hour' : 'hours'} ago`;
  } else if (diffDays < 7) {
    if (diffDays === 1) {
      return 'Yesterday';
    }
    return `${diffDays} days ago`;
  } else {
    return formatDate(date);
  }
};

/**
 * Mask a sensitive string (e.g., credit card number, email)
 * @param str The string to mask
 * @param visibleStart Number of characters to show at the start
 * @param visibleEnd Number of characters to show at the end
 * @param maskChar Character to use for masking
 * @returns Masked string
 */
export const maskString = (
  str: string,
  visibleStart: number = 4,
  visibleEnd: number = 4,
  maskChar: string = '*'
): string => {
  if (!str) return '';
  
  const start = str.substring(0, visibleStart);
  const end = str.substring(str.length - visibleEnd);
  const mask = maskChar.repeat(
    Math.max(0, str.length - visibleStart - visibleEnd)
  );
  
  return `${start}${mask}${end}`;
};

/**
 * Truncate a string if it's longer than maxLength
 * @param str The string to truncate
 * @param maxLength Maximum length before truncation
 * @param suffix Suffix to add after truncation (default: "...")
 * @returns Truncated string
 */
export const truncateString = (
  str: string,
  maxLength: number,
  suffix: string = '...'
): string => {
  if (!str) return '';
  if (str.length <= maxLength) return str;
  
  return `${str.substring(0, maxLength)}${suffix}`;
};

/**
 * Generate a random ID
 * @param length Length of the ID
 * @returns Random ID string
 */
export const generateId = (length: number = 10): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  
  return result;
};

/**
 * Deep clone an object
 * @param obj Object to clone
 * @returns Cloned object
 */
export const deepClone = <T>(obj: T): T => {
  return JSON.parse(JSON.stringify(obj));
};

/**
 * Debounce a function
 * @param func Function to debounce
 * @param wait Wait time in milliseconds
 * @returns Debounced function
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  
  return function(...args: Parameters<T>) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

/**
 * Converts a value to a percentage string
 * @param value Value to convert
 * @param decimals Number of decimal places
 * @returns Percentage string
 */
export const toPercentage = (value: number, decimals: number = 2): string => {
  return `${(value * 100).toFixed(decimals)}%`;
};
