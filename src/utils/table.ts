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
