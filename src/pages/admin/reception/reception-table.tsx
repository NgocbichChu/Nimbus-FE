import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Combobox } from "@/components/ui/combobox"
import type {
  ColumnDef,
  SortingState,
  ColumnFiltersState,
  VisibilityState,
} from "@tanstack/react-table"
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
} from "@tanstack/react-table"

// Props
interface DataTableProps<TData> {
  columns: ColumnDef<TData, any>[]
  data: TData[]
  filterColumn?: keyof TData
  filterPlaceholder?: string
  pageSize?: number
}

// Component AdminTable
export function ReceptionTable<TData extends Record<string, any>>({
  columns,
  data,
  filterColumn,
  filterPlaceholder = "Tìm kiếm theo tên...",
  pageSize = 5,
}: DataTableProps<TData>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})

  const table = useReactTable({
    data,
    columns,
    state: { sorting, columnFilters, columnVisibility, rowSelection },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    pageCount: Math.ceil(data.length / pageSize),
  })

  return (
    <div className="w-full overflow-auto space-y-4">
      {/* Filter */}
      <div className="flex items-center gap-2 p-1">
        {filterColumn && (
          <Input
            placeholder={filterPlaceholder}
            value={(table.getColumn(filterColumn as string)?.getFilterValue() as string) ?? ""}
            onChange={(e) =>
              table.getColumn(filterColumn as string)?.setFilterValue(e.target.value)
            }
            className="max-w-sm"
          />
        )}
        {table.getColumn("trangThaiHoatDong" as string) && (
          <Combobox
            options={[
              { value: "", label: "Tất cả trạng thái" },
              { value: "true", label: "Hoạt động" },
              { value: "false", label: "Nghỉ" },
            ]}
            value={(table.getColumn("trangThaiHoatDong")?.getFilterValue() as string) ?? ""}
            onValueChange={(value) => table.getColumn("trangThaiHoatDong")?.setFilterValue(value)}
            placeholder="Lọc trạng thái"
            searchPlaceholder="Tìm trạng thái..."
            className="w-[200px]"
          />
        )}
      </div>

      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((col) => (
                <TableCell key={String(col.header)}>{col.header as string}</TableCell>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className="max-w-[150px] truncate"
                      title={String(cell.getValue() ?? "")}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Trang trước
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Trang tiếp theo
          </Button>
        </div>
      </div>
    </div>
  )
}
