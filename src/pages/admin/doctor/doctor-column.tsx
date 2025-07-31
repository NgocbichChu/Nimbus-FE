import type { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { ArrowUpDown } from "lucide-react"
import type { Doctor } from "../../../components/data-table/type-table"
import { DoctorStatusCell } from "./status-cell"
import DoctorDialog from "./doctor-dialog"

export const doctorColumns: ColumnDef<Doctor>[] = [
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
    accessorKey: "chungChi",
    header: "Chứng chỉ",
    cell: ({ row }) => <span>{row.getValue("chungChi")}</span>,
  },
  {
    accessorKey: "trinhDo",
    header: "Trình độ",
    cell: ({ row }) => <span>{row.getValue("trinhDo")}</span>,
  },
  {
    accessorKey: "kinhNghiem",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        Kinh nghiệm (Năm) <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div className="text-right me-12">{row.getValue("kinhNghiem")}</div>,
  },
  {
    accessorKey: "ngayTuyenDung",
    header: "Ngày tuyển dụng",
    cell: ({ row }) => {
      const date = new Date(row.getValue("ngayTuyenDung"))
      return <div className="text-right">{date.toLocaleDateString()}</div>
    },
  },
  {
    accessorKey: "trangThaiHoatDong",
    header: "Trạng thái",
    cell: ({ getValue }) => {
      const value = getValue() as boolean
      return <DoctorStatusCell value={value} />
    },
  },
  {
  id: "actions",
  header: "Trạng thái",
  cell: ({ row }) => {
    const doctor = row.original as Doctor

    return <DoctorDialog mode="edit" doctor={doctor} />
  },
}
]
