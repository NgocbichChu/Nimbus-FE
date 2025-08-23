import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState,
  type ColumnFiltersState,
  type VisibilityState,
} from "@tanstack/react-table"

import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu"
import { ChevronDown } from "lucide-react"
import { useState } from "react"
import DoctorDialog from "./doctor-dialog"
import { AdvancedFilters } from "@/components/ui/advanced-filters"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  filterColumn?: keyof TData
  filterPlaceholder?: string
}

export function DataTable<TData, TValue>({
  columns,
  data,
  filterColumn,
  filterPlaceholder = "Tìm theo tên bác sĩ...",
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  })

  const handleKhoaChange = (value: string) => {
    table.getColumn("tenKhoa")?.setFilterValue(value)
  }

  const handleTrangThaiChange = (value: string) => {
    table.getColumn("trangThaiHoatDong")?.setFilterValue(value)
  }

  const khoaValue = table.getColumn("tenKhoa")?.getFilterValue() as string
  const trangThaiValue = table.getColumn("trangThaiHoatDong")?.getFilterValue() as string

  return (
    <div className="w-full overflow-auto">
      <div className="space-y-4 py-4">
        {/* Search + Filters + Actions Row */}
        <div className="flex items-center justify-between gap-4">
          {/* Left side: Search, Filters, Add Doctor */}
          <div className="flex items-center gap-4 ps-1">
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

            {(table.getColumn("tenKhoa") || table.getColumn("trangThaiHoatDong")) && (
              <AdvancedFilters
                data={data}
                onKhoaChange={handleKhoaChange}
                onTrangThaiChange={handleTrangThaiChange}
                khoaValue={khoaValue}
                trangThaiValue={trangThaiValue}
              />
            )}

            <DoctorDialog mode="add" />
          </div>

          {/* Right side: Column toggle */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                Columns <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((col) => col.getCanHide())
                .map((column) => (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) => column.toggleVisibility(!!value)}
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
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
        <div className="text-sm text-muted-foreground flex-1">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
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
