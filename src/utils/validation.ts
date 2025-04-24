/**
 * Validation utility functions
 */

/**
 * Check if a value is empty (undefined, null, empty string, or empty array/object)
 */
export const isEmpty = (value: any): boolean => {
  if (value === undefined || value === null) {
    return true;
  }
  
  if (typeof value === 'string') {
    return value.trim() === '';
  }
  
  if (Array.isArray(value)) {
    return value.length === 0;
  }
  
  if (typeof value === 'object') {
    return Object.keys(value).length === 0;
  }
  
  return false;
};

/**
 * Validate email format
 */
export const isValidEmail = (email: string): boolean => {
  if (isEmpty(email)) return false;
  
  // Simple email regex - can be replaced with more comprehensive ones if needed
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate password strength
 * Requires at least 6 characters, 1 uppercase letter, 1 lowercase letter, and 1 number
 */
export const isStrongPassword = (password: string): boolean => {
  if (isEmpty(password) || password.length < 6) return false;
  
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  
  return hasUpperCase && hasLowerCase && hasNumber;
};

/**
 * Validate password strength and return detailed feedback
 */
export const validatePasswordStrength = (password: string): {
  isValid: boolean;
  feedback: string[];
} => {
  const feedback: string[] = [];
  
  if (isEmpty(password)) {
    feedback.push('Password is required');
    return { isValid: false, feedback };
  }
  
  if (password.length < 6) {
    feedback.push('Password must be at least 6 characters long');
  }
  
  if (!/[A-Z]/.test(password)) {
    feedback.push('Password must contain at least one uppercase letter');
  }
  
  if (!/[a-z]/.test(password)) {
    feedback.push('Password must contain at least one lowercase letter');
  }
  
  if (!/\d/.test(password)) {
    feedback.push('Password must contain at least one number');
  }
  
  return {
    isValid: feedback.length === 0,
    feedback,
  };
};

/**
 * Validate phone number format
 */
export const isValidPhoneNumber = (phone: string): boolean => {
  if (isEmpty(phone)) return false;
  
  // Basic phone number validation - allows various formats
  const phoneRegex = /^\+?[0-9\s\-()]{8,}$/;
  return phoneRegex.test(phone);
};

/**
 * Validate name format (no numbers or special characters)
 */
export const isValidName = (name: string): boolean => {
  if (isEmpty(name)) return false;
  
  // Allow letters, spaces, and hyphens
  const nameRegex = /^[A-Za-z\s\-']+$/;
  return nameRegex.test(name);
};

/**
 * Validate URL format
 */
export const isValidUrl = (url: string): boolean => {
  if (isEmpty(url)) return false;
  
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
};

/**
 * Validate a numeric value is within range
 */
export const isWithinRange = (
  value: number,
  min: number,
  max: number
): boolean => {
  return value >= min && value <= max;
};

/**
 * Validate credit card number (using Luhn algorithm)
 */
export const isValidCreditCard = (cardNumber: string): boolean => {
  if (isEmpty(cardNumber)) return false;
  
  // Remove spaces and non-digit characters
  const digits = cardNumber.replace(/\D/g, '');
  
  if (digits.length < 13 || digits.length > 19) return false;
  
  // Luhn algorithm
  let sum = 0;
  let shouldDouble = false;
  
  for (let i = digits.length - 1; i >= 0; i--) {
    let digit = parseInt(digits.charAt(i));
    
    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    
    sum += digit;
    shouldDouble = !shouldDouble;
  }
  
  return sum % 10 === 0;
};

/**
 * Validate date format (YYYY-MM-DD)
 */
export const isValidDateFormat = (date: string): boolean => {
  if (isEmpty(date)) return false;
  
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(date)) return false;
  
  // Check if it's a valid date
  const parsedDate = new Date(date);
  return !isNaN(parsedDate.getTime());
};

/**
 * Validates form data against a validation schema
 */
export const validateForm = <T extends Record<string, any>>(
  data: T,
  validationSchema: Record<keyof T, (value: any) => string>
): Record<keyof T, string> => {
  const errors: Partial<Record<keyof T, string>> = {};
  
  for (const key in validationSchema) {
    if (validationSchema.hasOwnProperty(key)) {
      const error = validationSchema[key](data[key]);
      if (error) {
        errors[key] = error;
      }
    }
  }
  
  return errors as Record<keyof T, string>;
};
