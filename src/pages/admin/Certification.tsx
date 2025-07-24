import { CertColumns } from "@/components/data-table/certification/cert-column"
import { DataTable } from "@/components/data-table/table"
import type { Certification } from "@/components/data-table/type-table"

const mockCert: Certification[] = [
  {
    benhnhan_id: "BN002",
    hoTen: "Trần Thị B",
    email: "b.tran@example.com",
    ngayNop: "20/07/25",
    trangThai: "Chờ duyệt",
  },
  {
    benhnhan_id: "BN002",
    hoTen: "Trần Thị B",
    email: "b.tran@example.com",
    ngayNop: "20/07/25",
    trangThai: "Chờ duyệt",
  },
  {
    benhnhan_id: "BN002",
    hoTen: "Trần Thị B",
    email: "b.tran@example.com",
    ngayNop: "20/07/25",
    trangThai: "Chờ duyệt",
  },
]

export default function CertPage() {
  return (
    <div>
      <DataTable columns={CertColumns} data={mockCert} filterColumn="benhnhan_id" />
    </div>
  )
}
