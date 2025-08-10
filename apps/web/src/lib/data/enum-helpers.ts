function normalizeInput(input: unknown): string {
  return typeof input === 'string' ? input.trim() : '';
}

export function validateEnumOrDefault<T extends readonly string[]>(
  input: unknown,
  allowed: T,
  fallback: T[number]
): T[number] {
  const value = normalizeInput(input);
  return (allowed as readonly string[]).includes(value) ? (value as T[number]) : fallback;
}

export function validateEnumOrNull<T extends readonly string[]>(
  input: unknown,
  allowed: T
): T[number] | null {
  const value = normalizeInput(input);
  return (allowed as readonly string[]).includes(value) ? (value as T[number]) : null;
}

export type ValueLabel = { value: string; label: string };

export function toLabel(
  value: string | null | undefined,
  options: readonly ValueLabel[],
  fallback = 'N/A'
): string {
  if (!value) return fallback;
  const match = options.find((o) => o.value === value);
  return match?.label ?? fallback;
}

