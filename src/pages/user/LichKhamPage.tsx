import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { useState } from "react"

const HoSoPage = () => {
  const [selectedIndex, setSelectedIndex] = useState(0)

  const lichSuKham = [
    {
      maPhieu: "YMA2504291361",
      ngayKham: "05/05/2025",
      gioKham: "18:30-18:45 (Buổi chiều)",
      chuyenKhoa: "Tiêu hoá",
      stt: "25",
      trangThai: "Đã huỷ",
      maBN: "YMP252179981",
      name: "Tuấn Anh",
      ngaySinh: "21/06/2005",
      soDT: "0898235534",
      bacSi: {
        name: "Lâm Việt Trung",
        diaChi: "53 Phạm Hữu Chí, P.12, Q.5, TP.HCM",
        avatar: "https://i.imgur.com/OB0y6MR.png",
      },
      qr: "https://i.imgur.com/lJcIQkm.png",
    },
    {
      maPhieu: "YMA2504291362",
      ngayKham: "19/04/2025",
      gioKham: "17:50",
      chuyenKhoa: "Da liễu",
      stt: "3",
      trangThai: "Đã huỷ",
      maBN: "YMP252179981",
      name: "Tuấn Anh",
      ngaySinh: "21/06/2005",
      soDT: "0898235534",
      bacSi: {
        name: "BS.CK2 Dương Thị Thanh Mai",
        diaChi: "123 Đường ABC, TP.HCM",
        avatar: "https://i.imgur.com/HQZIt2t.png",
      },
      qr: "https://i.imgur.com/lJcIQkm.png",
    },
  ]

  const current = lichSuKham[selectedIndex]

  return (
    <div className="px-4 py-8 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6 ">
      <div className="space-y-4">
        <Input placeholder="Mã giao dịch, tên dịch vụ, tên bệnh nhân,..." className="w-full" />
        {lichSuKham.map((ls, index) => (
          <Card
            key={ls.maPhieu}
            className={`p-4 cursor-pointer ${selectedIndex === index ? "bg-muted" : ""}`}
            onClick={() => setSelectedIndex(index)}
          >
            <div className="text-base font-medium">{ls.bacSi.name}</div>
            <div className="text-sm text-gray-500">
              {ls.gioKham} - {ls.ngayKham}
            </div>
            <div className="text-sm">{ls.name}</div>
            <div className="text-xs text-muted-foreground">{ls.trangThai}</div>
          </Card>
        ))}
      </div>

      {/* Chi tiết lịch khám */}
      <Card className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <div className="text-green-600 line-through font-semibold">STT: {current.stt}</div>
            <div className="flex gap-3 items-center mt-2">
              <img
                src={current.bacSi.avatar}
                className="w-12 h-12 rounded-full object-cover border"
              />
              <div>
                <div className="font-semibold">{current.bacSi.name}</div>
                <div className="text-sm text-muted-foreground">{current.bacSi.diaChi}</div>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="text-sm text-gray-500">{current.trangThai}</span>
            <img src={current.qr} className="w-16 h-16" alt="QR Code" />
          </div>
        </div>

        <Separator className="my-4" />

        <div className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">Thông tin đặt khám</h4>
            <div className="text-sm">
              Mã phiếu khám: <strong>{current.maPhieu}</strong>
            </div>
            <div className="text-sm">Ngày khám: {current.ngayKham}</div>
            <div className="text-sm">
              Giờ khám: <span className="text-green-600">{current.gioKham}</span>
            </div>
            <div className="text-sm">Chuyên khoa: {current.chuyenKhoa}</div>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Thông tin bệnh nhân</h4>
            <div className="text-sm">
              Mã bệnh nhân: <span className="text-blue-600 font-medium">{current.maBN}</span>
            </div>
            <div className="text-sm">Họ và tên: {current.name}</div>
            <div className="text-sm">Năm sinh: {current.ngaySinh}</div>
            <div className="text-sm">Số điện thoại: {current.soDT}</div>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default HoSoPage
