import type { ColumnDef } from "@tanstack/react-table"
// import { Button } from "@/components/ui/button"
import type { Patient } from "../../../components/data-table/type-table"
// import { Link } from "react-router-dom"

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
      const gender = value === "Nữ" ? "Nữ" : value === "Nam" ? "Nam" : String(value)
      return <span>{gender}</span>
    },
  },
  {
    accessorKey: "danToc",
    header: "Dân tộc",
    cell: ({ row }) => <span>{row.getValue("danToc")}</span>,
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
    accessorKey: "lienHeKhanCap",
    header: "Liên hệ khẩn cấp",
    cell: ({ row }) => <span>{row.getValue("lienHeKhanCap")}</span>,
  },
  {
    accessorKey: "canCuocCongDan",
    header: "CCCD",
    cell: ({ row }) => <span>{row.getValue("canCuocCongDan")}</span>,
  },
   
  {
    accessorKey: "diaChi",
    header: "Địa chỉ",
    cell: ({ row }) => <span className="capitalize">{row.getValue("diaChi")}</span>,
  },
  // {
  //   id: "actions",
  //   enableHiding: false,
  //   cell: ({ row }) => {
  //     // const patient = row.original
  //     return (
  //       // <Link to={`/dashboard/patients/${patient.benhNhanId}`}>
  //         <Button variant="outline" size="sm" onClick={() => {
  //         }}>
  //           Xem chi tiết
  //         </Button>
  //       // </Link>
  //     )
  //   },
  // },
]
