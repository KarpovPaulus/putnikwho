// Русские формы множественного числа: 1 точка, 2 точки, 5 точек, 11 точек, 21 точка
export function plural(
  n: number,
  forms: [one: string, few: string, many: string],
): string {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return forms[0];
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return forms[1];
  return forms[2];
}

// 1160 → «19 мин», 4800 → «1 ч 20 мин». null — если длительность неизвестна
export function formatDuration(totalSec: number): string | null {
  if (totalSec <= 0) return null;
  const minutes = Math.max(1, Math.round(totalSec / 60));
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h === 0) return `${m} мин`;
  return m === 0 ? `${h} ч` : `${h} ч ${m} мин`;
}

export function formatPoints(n: number): string {
  return `${n} ${plural(n, ["точка", "точки", "точек"])}`;
}
