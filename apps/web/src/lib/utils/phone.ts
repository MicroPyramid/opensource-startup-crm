import { parsePhoneNumber, parsePhoneNumberWithError, type CountryCode } from 'libphonenumber-js';

export function validatePhoneNumber(phoneNumber: string, defaultCountry: CountryCode = 'US') {
  if (!phoneNumber || phoneNumber.trim() === '') return { isValid: true } as const;
  try {
    const parsed = parsePhoneNumber(phoneNumber, defaultCountry);
    if (parsed && parsed.isValid()) {
      return { isValid: true, formatted: parsed.formatInternational() } as const;
    }
    return { isValid: false, error: 'Please enter a valid phone number' } as const;
  } catch {
    return { isValid: false, error: 'Please enter a valid phone number' } as const;
  }
}

export function formatPhoneNumber(phoneNumber: string, defaultCountry: CountryCode = 'US') {
  if (!phoneNumber) return '';
  const parsed = parsePhoneNumberWithError(phoneNumber, defaultCountry);
  return parsed.formatInternational();
}

export function formatPhoneForStorage(phoneNumber: string, defaultCountry: CountryCode = 'US') {
  if (!phoneNumber) return '';
  try {
    const parsed = parsePhoneNumberWithError(phoneNumber, defaultCountry);
    return parsed.format('E.164');
  } catch (e) {
    console.error(e);
    return phoneNumber;
  }
}


