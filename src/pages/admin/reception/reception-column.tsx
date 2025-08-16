import type { Receptionist } from "@/components/data-table/type-table"
import type { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { ReceptionActionsCell } from "./reception-dialog"

export const ReceptionColumns: ColumnDef<Receptionist>[] = [
  {
    id: "index",
    header: "STT",
    cell: ({ row, table }) => {
      const pageIndex = table.getState().pagination.pageIndex
      const pageSize = table.getState().pagination.pageSize
      return row.index + 1 + pageIndex * pageSize
    },
    enableSorting: false,
  },
  {
    accessorKey: "hoTen",
    header: "Họ Tên",
    cell: ({ row }) => <span className="capitalize">{row.getValue("hoTen")}</span>,
  },
  {
    accessorKey: "gioiTinh",
    header: "Giới tính",
    cell: ({ row }) => {
      const value = row.getValue("gioiTinh")
      const gender = value === "Nữ" ? "Nữ" : value === "Nam" ? "Nam" : String(value)
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
    header: "Số Điện Thoại",
    cell: ({ row }) => <span className="capitalize">{row.getValue("soDienThoai")}</span>,
  },
  {
    accessorKey: "ngayTuyenDung",
    header: "Ngày Tuyển Dụng",
    cell: ({ row }) => <span className="capitalize">{row.getValue("ngayTuyenDung")}</span>,
  },
  {
    accessorKey: "chucVu",
    header: "Chức Vụ",
    cell: ({ row }) => <span className="capitalize">{row.getValue("chucVu")}</span>,
  },
  {
    accessorKey: "ghiChu",
    header: "Ghi Chú",
    cell: ({ row }) => <span className="capitalize">{row.getValue("ghiChu")}</span>,
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
  }, // Trong columns
  {
    id: "actions",
    header: "...",
    cell: ({ row }) => {
      return <ReceptionActionsCell reception={row.original} />
    },
  },
]
