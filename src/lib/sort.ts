import { SortableContent, SortDirection } from "@/types/sort";

/**
 * Enterprise Sorting Utility
 * Fokus pada: Imutabilitas, Error Handling, dan Internasionalisasi.
 */

// 1. Internal Helper: Validasi Tanggal
const getTime = (date: string | Date): number => {
  const parsedDate = new Date(date).getTime();
  return isNaN(parsedDate) ? 0 : parsedDate;
};

// 2. Internal Helper: String Collator (Lebih cepat daripada localeCompare untuk array besar)
const collator = new Intl.Collator('id', { numeric: true, sensitivity: 'base' });

/**
 * Mengurutkan konten berdasarkan tanggal
 */
export function sortByDate<T extends SortableContent>(
  contents: T[],
  direction: SortDirection = 'desc'
): T[] {
  if (!Array.isArray(contents)) return [];

  return [...contents].sort((a, b) => {
    const timeA = getTime(a.publishedAt);
    const timeB = getTime(b.publishedAt);

    return direction === 'desc' ? timeB - timeA : timeA - timeB;
  });
}

/**
 * Mengurutkan konten berdasarkan judul (Alfabet)
 */
export function sortByTitle<T extends SortableContent>(
  contents: T[],
  direction: SortDirection = 'asc'
): T[] {
  if (!Array.isArray(contents)) return [];

  return [...contents].sort((a, b) => {
    const result = collator.compare(a.title, b.title);
    return direction === 'asc' ? result : -result;
  });
}

/**
 * Generic Sorter Factory (Enterprise Level)
 * Memungkinkan pengurutan berdasarkan key apapun secara dinamis
 */
export function sortContent<T>(
  items: T[],
  key: keyof T,
  direction: SortDirection = 'asc'
): T[] {
  return [...items].sort((a, b) => {
    const valA = a[key];
    const valB = b[key];

    if (valA instanceof Date && valB instanceof Date) {
      return direction === 'asc' 
        ? valA.getTime() - valB.getTime() 
        : valB.getTime() - valA.getTime();
    }

    if (typeof valA === 'string' && typeof valB === 'string') {
      const res = collator.compare(valA, valB);
      return direction === 'asc' ? res : -res;
    }

    return 0;
  });
}