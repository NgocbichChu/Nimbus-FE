import type { ColumnDef } from "@tanstack/react-table"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import type { Certification } from "../type-table"

export const CertColumns: ColumnDef<Certification>[] = [
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
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => <span className="lowercase">{row.getValue("email")}</span>,
  },
  {
    accessorKey: "ngayNop",
    header: "Ngày Nộp",
    cell: ({ row }) => <span>{row.getValue("ngayNop")}</span>,
  },
  {
    accessorKey: "trangThai",
    header: "Trạng thái",
    cell: ({ row }) => <span>{row.getValue("trangThai")}</span>,
  },

  {
    id: "actions",
    enableHiding: false,
    cell: () => {
      return (
        <Dialog>
          <DialogTrigger className="px-4 py-2 border border-gray-400 rounded hover:border-blue-600 hover:text-blue-600 transition duration-200">
            Xem chi tiết
          </DialogTrigger>
          <DialogContent className="w-full max-w-xl h-auto">
            <DialogHeader className="space-y-4">
              <DialogTitle className="text-lg font-semibold">📄 Thông tin chứng chỉ</DialogTitle>
              <img
                src="https://lambanguytin.com/wp-content/uploads/2020/08/Hình-ảnh-của-chứng-chỉ-tin-học-cơ-bản-1024x701.png"
                alt="Ảnh chứng chỉ"
                className="w-full h-auto rounded border"/>
              <div className="space-y-2 text-sm text-gray-700">
                <p>
                  <strong>Tên chứng chỉ:</strong> Bằng chuyên môn Nội khoa
                </p>
                <p>
                  <strong>Ngày cấp:</strong> 01/01/2020
                </p>
                <p>
                  <strong>Ghi chú:</strong> …
                </p>
              </div>

              {/* Nút hành động */}
              <div className="flex justify-end gap-2 pt-4">
                <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition">
                  Duyệt
                </button>
                <button className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition">
                  Từ chối
                </button>
              </div>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      )
    },
  },
]
