import type { ColumnDef } from "@tanstack/react-table"
import {  MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import type { Patient } from "./type-table"
// import { PatientStatusCell } from "./status-cell" // tạo giống DoctorStatusCell

export const patientColumns: ColumnDef<Patient>[] = [
  {
    id: "index",
    header: "STT",
    cell: ({ row, table }) => {
      const pageIndex = table.getState().pagination.pageIndex
      const pageSize = table.getState().pagination.pageSize
      const rowIndex = row.index + 1 + pageIndex * pageSize
      return <div className="text-center">{rowIndex}</div>
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "hoTen",
    header: "Họ tên",
    cell: ({ row }) => <span className="capitalize">{row.getValue("hoTen")}</span>,
  },
  {
    accessorKey: "gioiTinh",
    header: "Giới tính",
    cell: ({ row }) => {
      const value = row.getValue("gioiTinh")
      const gender = value === "F" ? "Nữ" : value === "M" ? "Nam" : String(value)
      return <span>{gender}</span>
    },
  },
  {
    accessorKey: "ngaySinh",
    header: "Ngày sinh",
    cell: ({ row }) => {
      const date = new Date(row.getValue("ngaySinh"))
      return <div className="text-right">{date.toLocaleDateString()}</div>
    },
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => <span className="lowercase">{row.getValue("email")}</span>,
  },
  {
    accessorKey: "soDienThoai",
    header: "Số điện thoại",
    cell: ({ row }) => <span>{row.getValue("soDienThoai")}</span>,
  },
  {
    accessorKey: "cccd",
    header: "CCCD",
    cell: ({ row }) => <span>{row.getValue("cccd")}</span>,
  },
  {
    accessorKey: "diaChi",
    header: "Địa chỉ",
    cell: ({ row }) => <span className="capitalize">{row.getValue("diaChi")}</span>,
  },
  {
    accessorKey: "nhomMau",
    header: "Nhóm máu",
    cell: ({ row }) => <span>{row.getValue("nhomMau")}</span>,
  },
  // {
  //   accessorKey: "trangThaiHoatDong",
  //   header: "Trạng thái",
  //   cell: ({ getValue }) => {
  //     const value = getValue() as boolean
  //     return <PatientStatusCell value={value} />
  //   },
  // },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const patient = row.original
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Thao tác</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(patient.benhnhan_id)}>
              Sao chép ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Xem chi tiết</DropdownMenuItem>
            <DropdownMenuItem>Chỉnh sửa</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
