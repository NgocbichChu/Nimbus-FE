import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import dayjs from "dayjs"
import "dayjs/locale/vi"
import { useEffect, useState } from "react"
import { lichSuKham, huyLichKham } from "@/api/lichKhamApi"
import { Button } from "@/components/ui/button"
import { toastSuccess, toastError, toastConfirm } from "../../helper/toast"

type LichKhamItem = {
  lichKhamId: number
  tenBacSi: string
  tenBenhNhan: string
  tenChuyenKhoa: string
  thoiGianTu: string
  thoiGianDen: string
  loaiId: number
  tenLoai: string
  moTa: string
  gia: number
  trangThai: string
  ghiChu: string
  ngayKham: string
  caKham: string
}

const LichKhamPage = () => {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [items, setItems] = useState<LichKhamItem[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [q, setQ] = useState("")

  const load = async () => {
    setLoading(true)
    setError("")
    try {
      const res = await lichSuKham()
      const payload: any = res?.data ?? res
      const arr: any[] = Array.isArray(payload?.data)
        ? payload.data
        : Array.isArray(payload)
          ? payload
          : []
      const adapted: LichKhamItem[] = arr.map((it: any) => ({
        lichKhamId: it.lichKhamId,
        tenBacSi: it.tenBacSi,
        tenBenhNhan: it.tenBenhNhan,
        tenChuyenKhoa: it.tenChuyenKhoa,
        thoiGianTu: it.thoiGianTu,
        thoiGianDen: it.thoiGianDen,
        trangThai: it.trangThai,
        ghiChu: it.ghiChu ?? "",
        ngayKham: it.ngayKham,
        caKham: it.caKham,
        loaiId: it.loaiHinhKham?.loaiId ?? 0,
        tenLoai: it.loaiHinhKham?.tenLoai ?? "",
        moTa: it.loaiHinhKham?.moTa ?? "",
        gia: it.loaiHinhKham?.gia ?? 0,
      }))
      setItems(adapted)
      setSelectedIndex(0)
    } catch (error: any) {
      setError(error?.message || "Không thể tải lịch khám")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    dayjs.locale("vi")
    load()
  }, [])

  useEffect(() => {
    setSelectedIndex(0)
  }, [q])

  const normalizeText = (s: string) =>
    (s || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .trim()

  const queryText = normalizeText(q)
  const queryDigits = q.replace(/\D/g, "")

  const filtered = items.filter((it) => {
    if (!q) return true
    const nameMatch = normalizeText(it.tenBacSi).includes(queryText)
    const dateStr = dayjs(it.ngayKham).format("DDMMYYYY")
    const dateMatch = queryDigits.length >= 2 && dateStr.includes(queryDigits)
    return nameMatch || dateMatch
  })

  const lichKham = filtered[selectedIndex]

  const handleCancel = async () => {
    if (!lichKham) return

    const ok = await toastConfirm(
      `Bạn có chắc muốn hủy lịch #${lichKham.lichKhamId}- bác sĩ ${lichKham.tenBacSi} không?`
    )
    if (!ok) return

    try {
      await huyLichKham(lichKham.lichKhamId)
      await load()
      toastSuccess("Hủy lịch khám thành công!")
    } catch (error) {
      console.error(error)
      toastError("Có lỗi xảy ra khi hủy lịch khám")
    }
  }
  return (
    <div className="px-4 py-8 max-w-6xl mx-auto grid md:items-start grid-cols-1 md:grid-cols-[300px_1fr] gap-6">
      <div className="space-y-4">
        <Input
          placeholder="Tìm ngày khám,tên bác sĩ"
          className="w-full"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />

        <div className="overflow-y-auto max-h-[430px] pr-1">
          <div className="space-y-4">
            {loading && <Card className="p-4 text-sm text-muted-foreground">Đang tải...</Card>}
            {error && !loading && <Card className="p-4 text-sm text-red-500">{error}</Card>}
            {!loading && !error && filtered.length === 0 && (
              <Card className="p-4 text-sm text-muted-foreground">Không có kết quả phù hợp</Card>
            )}
            {!loading &&
              !error &&
              filtered.map((ls, index) => (
                <Card
                  key={ls.lichKhamId}
                  className={`p-4 cursor-pointer transition-colors ${selectedIndex === index ? "bg-muted" : ""}`}
                  onClick={() => setSelectedIndex(index)}
                >
                  <div className="text-base font-semibold">
                    Lịch #{ls.lichKhamId} • Bác sĩ: {ls.tenBacSi}
                  </div>
                  <div className="text-sm">
                    {`${ls.thoiGianTu}-${ls.thoiGianDen} (${ls.caKham})`} •{" "}
                    {dayjs(ls.ngayKham).format("DD/MM/YYYY")}
                  </div>
                  <div className="text-sm">{ls.tenLoai}</div>
                  <div className="text-xs text-muted-foreground">{ls.trangThai}</div>
                </Card>
              ))}
          </div>
        </div>
      </div>

      <Card className="p-6 self-start w-full">
        {!lichKham ? (
          <div className="text-base text-muted-foreground">Chọn một lịch khám để xem chi tiết</div>
        ) : (
          <>
            <div className="flex justify-between items-start">
              <div>
                <div className="text-green-600 font-semibold text-lg">
                  Lịch #{lichKham.lichKhamId}
                </div>
                <div className="mt-1">
                  <div className="font-semibold text-base">Bác sĩ: {lichKham.tenBacSi}</div>
                  <div className="text-base ">Chuyên khoa: {lichKham.tenChuyenKhoa}</div>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className="text-base text-gray-500">{lichKham.trangThai}</span>
              </div>
            </div>
            <Separator />
            <div className="space-y-2">
              <div>
                <h4 className="font-semibold mb-1 text-base">Thông tin đặt khám</h4>
                <div className="text-base ">Bệnh nhân: {lichKham.tenBenhNhan}</div>
                <div className="text-base">
                  Ngày khám: {dayjs(lichKham.ngayKham).format("DD/MM/YYYY")}
                </div>
                <div className="text-base">
                  Giờ khám:{" "}
                  <span className="text-green-600 font-medium">
                    {lichKham.thoiGianTu}-{lichKham.thoiGianDen} ({lichKham.caKham})
                  </span>
                </div>
                <div className="text-base">Loại hình: {lichKham.tenLoai}</div>
                <div className="text-base">Mô tả: {lichKham.moTa}</div>
                <div className="text-base">
                  Giá:{" "}
                  <span className="text-green-600 font-semibold">
                    {lichKham.gia?.toLocaleString?.() ?? lichKham.gia}đ
                  </span>
                </div>
                {lichKham.ghiChu && <div className="text-base">Ghi chú: {lichKham.ghiChu}</div>}
                <div className="mt-4 flex justify-end">
                  <Button
                    onClick={handleCancel}
                    disabled={lichKham.trangThai === "Đã hủy"}
                    className={`w-fit whitespace-nowrap ${
                      lichKham.trangThai === "Đã hủy"
                        ? "bg-gray-400 hover:bg-gray-400 cursor-not-allowed"
                        : "bg-blue-500 hover:bg-blue-700"
                    }`}
                  >
                    {lichKham.trangThai === "Đã hủy" ? "Đã hủy" : "Hủy lịch khám"}
                  </Button>
                </div>
              </div>
            </div>
          </>
        )}
      </Card>
    </div>
  )
}

export default LichKhamPage
