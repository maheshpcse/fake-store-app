import type { ReactNode } from 'react'

export interface Column<T> {
  key: string
  header: string
  render: (row: T) => ReactNode
}

export function DataTable<T>({ columns, rows, rowKey }: { columns: Column<T>[]; rows: T[]; rowKey: (row: T) => string | number }) {
  return (
    <div className="table-wrap">
      <table className="data-table">
        <thead><tr>{columns.map((column) => <th key={column.key}>{column.header}</th>)}</tr></thead>
        <tbody>
          {rows.map((row) => <tr key={rowKey(row)}>{columns.map((column) => <td key={column.key}>{column.render(row)}</td>)}</tr>)}
        </tbody>
      </table>
    </div>
  )
}
