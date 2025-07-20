import { doctorColumns } from "@/components/data-table/doctor-column"
import { DataTable } from "@/components/data-table/table"
import type { Doctor } from "@/components/data-table/type-table"

const mockDoctors: Doctor[] = [
  {
    bacsi_id: "BS001",
    hoTen: "Nguyễn Văn A",
    gioiTinh: "M",
    email: "vana.nguyen@example.com",
    soDienThoai: "0909123456",
    chuyenKhoaId: 1,
    chungChi: "Chứng chỉ Nội tổng quát",
    trinhDo: "Bác sĩ chuyên khoa I",
    kinhNghiem: 5,
    ngayTuyenDung: "2020-06-15",
    ghiChu: "",
    trangThaiHoatDong: true,
  },
  {
    bacsi_id: "BS002",
    hoTen: "Trần Thị B",
    gioiTinh: "F",
    email: "thib.tran@example.com",
    soDienThoai: "0912233445",
    chuyenKhoaId: 2,
    chungChi: "Chứng chỉ Sản phụ khoa",
    trinhDo: "Thạc sĩ Y học",
    kinhNghiem: 7,
    ngayTuyenDung: "2018-03-10",
    ghiChu: "Chuyên tư vấn sản",
    trangThaiHoatDong: true,
  },
  {
    bacsi_id: "BS003",
    hoTen: "Lê Quốc C",
    gioiTinh: "M",
    email: "quoc.le@example.com",
    soDienThoai: "0988991122",
    chuyenKhoaId: 3,
    chungChi: "Chứng chỉ Tai - Mũi - Họng",
    trinhDo: "Tiến sĩ Y khoa",
    kinhNghiem: 10,
    ngayTuyenDung: "2015-11-20",
    ghiChu: "Từng công tác ở Nhật",
    trangThaiHoatDong: false,
  },
  {
    bacsi_id: "BS004",
    hoTen: "Phạm Ngọc D",
    gioiTinh: "F",
    email: "ngocd.pham@example.com",
    soDienThoai: "0977332211",
    chuyenKhoaId: 4,
    chungChi: "Chứng chỉ Da liễu",
    trinhDo: "Bác sĩ đa khoa",
    kinhNghiem: 3,
    ngayTuyenDung: "2022-01-05",
    ghiChu: "",
    trangThaiHoatDong: true,
  },
]

export default function DoctorPage() {
  return (
    <div>
      <DataTable columns={doctorColumns} data={mockDoctors} filterColumn="hoTen" />
    </div>
  )
}
