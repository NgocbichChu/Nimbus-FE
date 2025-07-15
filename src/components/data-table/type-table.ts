import type { ColumnDef } from "@tanstack/react-table"

export interface DataTableProps<TData, TValue> {
  data: TData[]
  columns: ColumnDef<TData, TValue>[]
  onEdit?: (row: TData) => void
  onDelete?: (row: TData) => void
  filterColumn?: keyof TData
}