import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import dayjs from "dayjs"
import "dayjs/locale/vi"
import { useEffect, useState } from "react"
import { lichSuKham } from "@/api/lichKham"

type LichKhamItem = {
  lichkhamId: number
  bacSiId: number
  benhNhanId: number
  thoiGianTu: string
  thoiGianDen: string
  loaiHinhKham: string
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

  const load = async () => {
    setLoading(true)
    setError("")
    try {
      const res = await lichSuKham()
      const payload: any = res?.data ?? res
      const arr: LichKhamItem[] = Array.isArray(payload?.data)
        ? payload.data
        : Array.isArray(payload)
          ? payload
          : []
      setItems(arr)
      setSelectedIndex(0)
    } catch (error) {
      console.log("Lỗi : ", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    dayjs.locale("vi")
    load()
  }, [])

  const current = items[selectedIndex]

  return (
    <div className="px-4 py-8 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6">
      <div className="space-y-4">
        <Input placeholder="Mã giao dịch, tên dịch vụ, tên bệnh nhân,..." className="w-full" />
        {loading && <Card className="p-4 text-sm text-muted-foreground">Đang tải...</Card>}
        {error && !loading && <Card className="p-4 text-sm text-red-500">{error}</Card>}
        {!loading && !error && items.length === 0 && (
          <Card className="p-4 text-sm text-muted-foreground">Chưa có lịch khám nào</Card>
        )}
        {!loading &&
          !error &&
          items.map((ls, index) => (
            <Card
              key={ls.lichkhamId}
              className={`p-4 cursor-pointer transition-colors ${selectedIndex === index ? "bg-muted" : ""}`}
              onClick={() => setSelectedIndex(index)}
            >
              <div className="text-base font-medium">
                Lịch #{ls.lichkhamId} • Bác sĩ ID: {ls.bacSiId}
              </div>
              <div className="text-sm text-gray-500">
                {`${ls.thoiGianTu}-${ls.thoiGianDen} (${ls.caKham})`} •{" "}
                {dayjs(ls.ngayKham).format("DD/MM/YYYY")}
              </div>
              <div className="text-sm">{ls.loaiHinhKham}</div>
              <div className="text-xs text-muted-foreground">{ls.trangThai}</div>
            </Card>
          ))}
      </div>

      <Card className="p-6">
        {!current ? (
          <div className="text-sm text-muted-foreground">Chọn một lịch khám để xem chi tiết</div>
        ) : (
          <>
            <div className="flex justify-between items-start">
              <div>
                <div className="text-green-600 font-semibold">Lịch #{current.lichkhamId}</div>
                <div className="mt-2">
                  <div className="font-semibold">Bác sĩ ID: {current.bacSiId}</div>
                  <div className="text-sm text-muted-foreground">
                    Bệnh nhân ID: {current.benhNhanId}
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className="text-sm text-gray-500">{current.trangThai}</span>
              </div>
            </div>

            <Separator className="my-4" />

            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Thông tin đặt khám</h4>
                <div className="text-sm">
                  Ngày khám: {dayjs(current.ngayKham).format("DD/MM/YYYY")}
                </div>
                <div className="text-sm">
                  Giờ khám:{" "}
                  <span className="text-green-600">
                    {current.thoiGianTu}-{current.thoiGianDen} ({current.caKham})
                  </span>
                </div>
                <div className="text-sm">Loại hình: {current.loaiHinhKham}</div>
                {current.ghiChu && <div className="text-sm">Ghi chú: {current.ghiChu}</div>}
              </div>
              <div>
                <h4 className="font-semibold mb-2">Thông tin bệnh nhân</h4>
                <div className="text-sm">
                  Mã bệnh nhân:{" "}
                  <span className="text-blue-600 font-medium">{current.benhNhanId}</span>
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
