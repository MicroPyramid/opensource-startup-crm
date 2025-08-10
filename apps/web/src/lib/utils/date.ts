export function formatDate(
  date: string | Date | null | undefined,
  locale: string = 'en-US',
  options?: Intl.DateTimeFormatOptions,
  fallback: string = '-'
): string {
  if (!date) return fallback;
  const formatOptions: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric', ...(options ?? {}) };
  try {
    return new Date(date).toLocaleDateString(locale, formatOptions);
  } catch {
    return fallback;
  }
}

export function formatCurrency(value: number | null | undefined, fallback: string = '-') {
  if (!value) return fallback;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0
  }).format(value);
}

