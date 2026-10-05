export function isValidName(value: string): boolean {
  return /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/.test(value.trim());
}

export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export function isValidRegistration(value: string): boolean {
  return /^\d+$/.test(value);
}

export function isValidPassword(value: string): boolean {
  return /^[A-Za-z0-9]{6}$/.test(value);
}