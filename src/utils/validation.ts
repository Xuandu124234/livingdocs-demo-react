/**
 * Utilities for validating and normalising user input.
 */

export interface ValidationResult {
  valid: boolean;
  errors: string[];
}

/**
 * Validate an email address.
 */
export function validateEmail(email: string): ValidationResult {
  const errors: string[] = [];
  if (!email || email.trim().length === 0) {
    errors.push('Email must not be empty');
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push('Email is not a valid address');
  }
  return { valid: errors.length === 0, errors };
}

/**
 * Validate a password against the minimum policy.
 */
export function validatePassword(password: string): ValidationResult {
  const errors: string[] = [];
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain an uppercase letter');
  }
  if (!/[0-9]/.test(password)) {
    errors.push('Password must contain a digit');
  }
  return { valid: errors.length === 0, errors };
}

/**
 * Trim and collapse whitespace in a free-text field.
 */
export function normaliseText(input: string): string {
  return input.trim().replace(/\s+/g, ' ');
}

/**
 * Truncate a string to the given maximum length.
 */
export function truncate(input: string, maxLength: number): string {
  if (input.length <= maxLength) {
    return input;
  }
  return `${input.slice(0, Math.max(0, maxLength - 1))}…`;
}
