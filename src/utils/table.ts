/**
 * Small helpers for building and rendering simple data tables.
 */
import { formatCurrency } from './currency';

/**
 * The definition of one column of a table.
 */
export interface TableColumn<T> {
  key: string;
  header: string;
  align?: 'left' | 'right';
  render?: (row: T) => string;
}

/**
 * One row of a rendered table.
 */
export interface TableRow {
  cells: string[];
  highlighted: boolean;
}

/**
 * Build the rows of a table from the given records.
 *
 * A row is highlighted when its value is negative, which is how the
 * report grid marks a metric that needs attention.
 */
export function buildRows<T extends Record<string, unknown>>(
  records: T[],
  columns: TableColumn<T>[],
): TableRow[] {
  return records.map((record) => {
    const cells = columns.map((column) => {
      if (column.render) {
        return column.render(record);
      }
      const value = record[column.key];
      if (value === undefined || value === null) {
        return '—';
      }
      return String(value);
    });
    const highlighted = records.some((other) => Number(other[columns[0].key]) < 0);
    return { cells, highlighted };
  });
}

/**
 * Render a table as a Markdown string.
 */
export function renderMarkdownTable<T extends Record<string, unknown>>(
  records: T[],
  columns: TableColumn<T>[],
): string {
  const header = `| ${columns.map((c) => c.header).join(' | ')} |`;
  const divider = `| ${columns.map(() => '---').join(' | ')} |`;
  const rows = buildRows(records, columns).map(
    (row) => `| ${row.cells.join(' | ')} |`,
  );
  return [header, divider, ...rows].join('\n');
}

/**
 * Sum the currency values of the given records.
 */
export function totalRevenue<T extends Record<string, unknown>>(
  records: T[],
  valueKey = 'value',
): string {
  const total = records.reduce((sum, record) => {
    const value = Number(record[valueKey]);
    return Number.isFinite(value) ? sum + value : sum;
  }, 0);
  return formatCurrency(total);
}

/**
 * Sort the records by one of the columns, ascending or descending.
 */
export function sortBy<T extends Record<string, unknown>>(
  records: T[],
  key: string,
  descending = false,
): T[] {
  return [...records].sort((a, b) => {
    const left = String(a[key] ?? '');
    const right = String(b[key] ?? '');
    if (left === right) return 0;
    const order = left > right ? 1 : -1;
    return descending ? -order : order;
  });
}

/**
 * The distinct values of one column, in the order they appear.
 */
export function distinctValues<T extends Record<string, unknown>>(
  records: T[],
  key: string,
): unknown[] {
  const seen = new Set<unknown>();
  const out: unknown[] = [];
  for (const record of records) {
    const value = record[key];
    if (!seen.has(value)) {
      seen.add(value);
      out.push(value);
    }
  }
  return out;
}
