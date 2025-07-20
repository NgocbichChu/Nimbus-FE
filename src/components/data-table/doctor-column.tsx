import type { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import type { Doctor } from "./type-table"
import { DoctorStatusCell } from "./status-cell"

export const doctorColumns: ColumnDef<Doctor>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "hoTen",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        Họ tên <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
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
    // header: "Kinh nghiệm (năm)",
    // cell: ({ row }) => <span>{row.getValue("kinhNghiem")}</span>,
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
  // {
  //   accessorKey: "ghiChu",
  //   header: "Ghi chú",
  // },
  {
    accessorKey: "trangThaiHoatDong",
    header: "Trạng thái",
    // cell: ({ row }) => (
    //   <span>{row.getValue("trangThaiHoatDong") ? "Đang hoạt động" : "Ngưng hoạt động"}</span>
    // ),
    // cell: ({ getValue }) => {
    //   const value = getValue() as boolean
    //   const [status, setStatus] = useState<boolean>(value)

    //   const handleChange = (val: string) => {
    //     const newVal = val === "true"
    //     setStatus(newVal)

    //     // TODO: Gọi API update nếu cần
    //     console.log("Trạng thái mới:", newVal)
    //     toastSuccess(`Trạng thái đã được cập nhật`)
    //   }

    //   return (
    //     <Select defaultValue={String(status)} onValueChange={handleChange}>
    //       <SelectTrigger className="w-[140px]">
    //         <SelectValue />
    //       </SelectTrigger>
    //       <SelectContent>
    //         <SelectItem value="true">Hoạt động</SelectItem>
    //         <SelectItem value="false">Ngưng hoạt động</SelectItem>
    //       </SelectContent>
    //     </Select>
    //   )
    // },
    // filterFn: (row, id, value) => {
    //   return String(row.getValue(id)) === value
    // },
    // enableColumnFilter: true,
    cell: ({ getValue }) => {
      const value = getValue() as boolean
      return <DoctorStatusCell value={value} />
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const doctor = row.original
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Thao tác</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(doctor.bacsi_id)}>
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
