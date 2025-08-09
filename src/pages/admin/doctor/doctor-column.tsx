import type { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { ArrowUpDown } from "lucide-react"
import type { Doctor } from "../../../components/data-table/type-table"
import DoctorDialog from "./doctor-dialog"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"

export const doctorColumns: ColumnDef<Doctor>[] = [
  {
    id: "index",
    header: "STT",
    cell: ({ row, table }) => {
      const allRows = table.getSortedRowModel().rows
      const indexInAllRows = allRows.findIndex((r) => r.id === row.id)
      return <div className="text-center">{indexInAllRows + 1}</div>
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
    accessorKey: "tenKhoa",
    header: "Khoa",
    cell: ({ row }) => <span>{row.getValue("tenKhoa")}</span>,
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
        Kinh nghiệm
        <br /> (Năm) <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div className="text-right me-12">{row.getValue("kinhNghiem")}</div>,
  },
  {
    accessorKey: "ngayTuyenDung",
    header: "Ngày tuyển dụng",
    cell: ({ row }) => {
      const rawDate = row.getValue("ngayTuyenDung") as string | number | Date | null

      if (!rawDate) {
        return <div className="text-right">-</div>
      }

      const dateObj = new Date(rawDate)
      if (isNaN(dateObj.getTime())) {
        return <div className="text-right">-</div>
      }

      const formattedDate = format(dateObj, "dd/MM/yyyy")
      return <div className="text-right">{formattedDate}</div>
    },
  },
  {
    accessorKey: "trangThaiHoatDong",
    header: "Trạng thái",
    cell: ({ row }) => {
      const isActive = row.getValue("trangThaiHoatDong") === true
      return (
        <div className="text-right">
          {isActive ? (
            <Badge className="bg-green-500 text-white hover:bg-green-600">Hoạt động</Badge>
          ) : (
            <Badge className="bg-secondary text-black">Nghỉ</Badge>
          )}
        </div>
      )
    },
    filterFn: (row, columnId, filterValue) => {
      if (filterValue === "") return true
      const value = row.getValue(columnId)
      return String(value) === filterValue
    },
  },
  {
    id: "actions",
    header: "...",
    cell: ({ row }) => {
      const doctor = row.original as Doctor
      return <DoctorDialog mode="edit" doctor={doctor} />
    },
  },
]
