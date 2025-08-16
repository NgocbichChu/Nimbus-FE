import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select"
import { parseDate } from "chrono-node"
import { CalendarIcon, Check, ChevronsUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { vi } from "date-fns/locale"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { appointmentSchema } from "@/validation/auth-valid"
import * as yup from "yup"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../../components/ui/command"
import { cn } from "@/lib/utils"
import { getDanhSachChuyenGia } from "@/api/chuyenGiaApi"
import {
  getLoaiDichVu,
  getBacSiByChuyenKhoa,
  getNgayKhamByChuyenGia,
  getGioTheoNgay,
  postTaoLichKham,
  getLichTrongChuyenKhoa,
  getGioTrongChuyenKhoa,
} from "@/api/appointmentApi"
import { getDanhSachChuyenKhoa } from "@/api/chuyenKhoaApi"
import { getThongTinBenhNhan } from "@/api/accountApi"
import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
import timezone from "dayjs/plugin/timezone"
import isSameOrAfter from "dayjs/plugin/isSameOrAfter"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

type AppointmentFormType = yup.InferType<typeof appointmentSchema>

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(isSameOrAfter)

const inputErrorClass = "border-red-500 focus:ring-red-500 focus:border-red-500 dark:border-red-500"

const AppointmentPage = () => {
  const [serviceType, setServiceType] = useState("")
  const [specialty, setSpecialty] = useState("")
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("")
  const [date, setDate] = useState<Date | undefined>(parseDate(value) || undefined)
  const [month, setMonth] = useState<Date | undefined>(date)
  const [doctor, setDoctor] = useState<string>("")
  const [note, setNote] = useState("")
  const [selectedTime, setSelectedTime] = useState<{
    label: string
    start: string
    end: string
  } | null>(null)
  const [showPaymentMethod, setShowPaymentMethod] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("")
  const [openSpecialty, setOpenSpecialty] = useState(false)
  const [openDoctor, setOpenDoctor] = useState(false)
  const [listChuyenGia, setListChuyenGia] = useState<any[]>([])
  const [listDichVu, setListDichVu] = useState<any[]>([])
  const [listChuyenKhoa, setListChuyenKhoa] = useState<any[]>([])
  const [ngayLamViec, setNgayLamViec] = useState<string[]>([])
  const [availableTimes, setAvailableTimes] = useState<
    { label: string; start: string; end: string }[]
  >([])

  const [open2, setOpen2] = useState(false)
  const [value2, setValue2] = useState("")
  const [date2, setDate2] = useState<Date | undefined>(parseDate(value2) || undefined)
  const [month2, setMonth2] = useState<Date | undefined>(date2)
  const [availableTimes2, setAvailableTimes2] = useState<
    { label: string; start: string; end: string }[]
  >([])
  const [selectedTime2, setSelectedTime2] = useState<{
    label: string
    start: string
    end: string
  } | null>(null)

  const [activeTab, setActiveTab] = useState<"tab1" | "tab2">("tab1")

  const [user, setUser] = useState<User>({
    name: "",
    maBN: "",
  })

  type User = {
    name: string
    maBN: string
  }

  type NgayLamViecItem = {
    caTruc: string | null
    lyDoNghi: string | null
    ngay: string
  }

  type GioTrongItem = {
    gioKhamId: number
    lichLamViecId: number
    thoiGian: string
    trangThai: boolean
  }
  const {
    setValue: setFormValue,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm<AppointmentFormType>({
    resolver: yupResolver(appointmentSchema) as any,
  })

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getThongTinBenhNhan()
        const user = {
          name: res.data.hoTen,
          maBN: res.data.benhNhanId,
        }
        setUser(user)
      } catch (error) {
        console.log("Lỗi : ", error)
      }
    }
    fetchUser()
  }, [])

  useEffect(() => {
    const fetchChuyenChuyenGia = async () => {
      try {
        const res = await getDanhSachChuyenGia()
        setListChuyenGia(res.data || [])
      } catch (error) {
        console.log("Lỗi : ", error)
      }
    }
    fetchChuyenChuyenGia()
  }, [])

  useEffect(() => {
    const fetchChuyenGiaByChuyenKhoa = async () => {
      setDoctor("")
      try {
        if (!specialty) return
        const selected = listChuyenKhoa.find((item) => item.chuyenKhoaId === specialty)
        if (!selected?.tenKhoa) return

        const res = await getBacSiByChuyenKhoa(selected.tenKhoa)
        setListChuyenGia(res.data || [])
      } catch (error) {
        console.log("Lỗi : ", error)
      }
    }
    fetchChuyenGiaByChuyenKhoa()
  }, [specialty, listChuyenKhoa])

  useEffect(() => {
    const fetchLoaiDichVu = async () => {
      try {
        const res = await getLoaiDichVu()
        setListDichVu(res.data || [])
      } catch (error) {
        console.log("Lỗi : ", error)
      }
    }
    fetchLoaiDichVu()
  }, [])

  useEffect(() => {
    const fetchChuyenKhoa = async () => {
      try {
        const res = await getDanhSachChuyenKhoa()
        setListChuyenKhoa(res.data || [])
      } catch (error) {
        console.log("Lỗi : ", error)
      }
    }
    fetchChuyenKhoa()
  }, [])

  useEffect(() => {
    const fetchNgayLamViec = async () => {
      try {
        if (!doctor) return
        const res = await getNgayKhamByChuyenGia(Number(doctor))
        const list: NgayLamViecItem[] = res.data || []

        const today = dayjs().startOf("day")

        const ngayCoTruc = list
          .filter((item) => item.caTruc && dayjs(item.ngay).isSameOrAfter(today))
          .map((item) => dayjs.utc(item.ngay).tz("Asia/Ho_Chi_Minh").format("YYYY-MM-DD"))

        setNgayLamViec(ngayCoTruc)
      } catch (error) {
        console.log("Lỗi : ", error)
      }
    }
    fetchNgayLamViec()
  }, [doctor])

  useEffect(() => {
    const fetchGioTheoNgay = async () => {
      if (!doctor || !date) {
        setAvailableTimes([])
        return
      }

      const ngayStr = dayjs(date).tz("Asia/Ho_Chi_Minh").format("YYYY-MM-DD")

      try {
        const resNgay = await getNgayKhamByChuyenGia(Number(doctor))
        const list: NgayLamViecItem[] = resNgay.data || []
        const info = list.find((item) => item.ngay === ngayStr)
        const caTruc = info?.caTruc

        if (!caTruc) {
          setAvailableTimes([])
          return
        }

        const resGio = await getGioTheoNgay(Number(doctor), ngayStr, caTruc)
        const data: GioTrongItem[] = resGio.data || []

        const sorted = [...data].sort((a, b) => a.thoiGian.localeCompare(b.thoiGian))

        const formatted: { label: string; start: string; end: string }[] = []

        for (let i = 0; i < sorted.length - 1; i++) {
          const current = sorted[i]
          const next = sorted[i + 1]

          if (current.trangThai && next.trangThai) {
            const label = `${current.thoiGian.slice(0, 5)} - ${next.thoiGian.slice(0, 5)}`
            formatted.push({
              label,
              start: current.thoiGian,
              end: next.thoiGian,
            })
          }
        }

        setAvailableTimes(formatted)
      } catch (error) {
        console.error("Lỗi khi lấy giờ theo ngày:", error)
        setAvailableTimes([])
      }
    }

    fetchGioTheoNgay()
  }, [date, doctor])

  const [ngayTrongChuyenKhoa, setNgayTrongChuyenKhoa] = useState<string[]>([])
  const [lichTrongMap, setLichTrongMap] = useState<
    Record<string, { label: string; start: string; end: string }[]>
  >({})

  // FLOW 2 chuyên khoa -> ngày -> giờ
  useEffect(() => {
    const fetchLichTrong = async () => {
      setNgayTrongChuyenKhoa([])
      setLichTrongMap({})
      setAvailableTimes2([])
      setSelectedTime2(null)
      if (!specialty) return
      const selected = listChuyenKhoa.find((i) => i.chuyenKhoaId === specialty)
      if (!selected?.tenKhoa) return
      try {
        const res = await getLichTrongChuyenKhoa(selected.tenKhoa)
        const data = Array.isArray(res?.data) ? res.data : []
        const pairConsecutive = (times: string[]) => {
          const t = [...times]
            .filter(Boolean)
            .map((s) => s.slice(0, 5))
            .sort()
          const out: { label: string; start: string; end: string }[] = []
          for (let i = 0; i < t.length - 1; i++)
            out.push({ label: `${t[i]} - ${t[i + 1]}`, start: `${t[i]}:00`, end: `${t[i + 1]}:00` })
          return out
        }
        const map: Record<string, { label: string; start: string; end: string }[]> = {}
        const days: string[] = []
        for (const item of data) {
          const ngay = String(item?.ngay || item?.date || "").slice(0, 10)
          const slots: string[] =
            (Array.isArray(item?.gioTrong) && item.gioTrong) ||
            (Array.isArray(item?.khungGio) && item.khungGio) ||
            (Array.isArray(item?.slots) && item.slots) ||
            []
          if (slots.length) {
            const ranges = pairConsecutive(slots)
            if (ranges.length) {
              if (!map[ngay]) map[ngay] = []
              map[ngay].push(...ranges)
            }
          } else {
            const so = Number(item?.soGioTrong ?? 0)
            if (ngay && so > 0) days.push(ngay)
          }
        }
        Object.keys(map).forEach((k) => {
          const seen = new Set<string>()
          map[k] = map[k]
            .filter((r) => (seen.has(r.label) ? false : (seen.add(r.label), true)))
            .sort((a, b) => a.start.localeCompare(b.start))
        })
        const todayKey = dayjs().tz("Asia/Ho_Chi_Minh").format("YYYY-MM-DD")
        if (map[todayKey]) {
          const hhmm = dayjs().tz("Asia/Ho_Chi_Minh").format("HH:mm")
          map[todayKey] = map[todayKey].filter((r) => r.start.slice(0, 5) > hhmm)
          if (map[todayKey].length === 0) delete map[todayKey]
        }
        if (Object.keys(map).length > 0) {
          setLichTrongMap(map)
          setNgayTrongChuyenKhoa(Object.keys(map).sort((a, b) => a.localeCompare(b)))
        } else {
          const uniqueSortedDays = Array.from(new Set(days)).sort((a, b) => a.localeCompare(b))
          setNgayTrongChuyenKhoa(uniqueSortedDays)
          setLichTrongMap({})
        }
      } catch {
        setNgayTrongChuyenKhoa([])
        setLichTrongMap({})
      }
    }
    fetchLichTrong()
  }, [specialty, listChuyenKhoa])

  useEffect(() => {
    if (!date2) {
      setAvailableTimes2([])
      return
    }
    const key = dayjs(date2).tz("Asia/Ho_Chi_Minh").format("YYYY-MM-DD")
    let ranges = [...(lichTrongMap[key] || [])]
    const now = dayjs().tz("Asia/Ho_Chi_Minh")
    if (now.format("YYYY-MM-DD") === key) {
      const hhmm = now.format("HH:mm")
      ranges = ranges.filter((r) => r.start.slice(0, 5) > hhmm)
    }
    setAvailableTimes2(ranges)
    if (ranges.length === 0) setSelectedTime2(null)
  }, [date2, lichTrongMap])

  useEffect(() => {
    const fetchGioTrongTheoNgayChuyenKhoa = async () => {
      if (!specialty || !date2) {
        setAvailableTimes2([])
        setSelectedTime2(null)
        return
      }

      const sel = listChuyenKhoa.find((i) => i.chuyenKhoaId === specialty)
      if (!sel?.tenKhoa) {
        setAvailableTimes2([])
        setSelectedTime2(null)
        return
      }

      const ngay = dayjs(date2).tz("Asia/Ho_Chi_Minh").format("YYYY-MM-DD")

      try {
        const resNgay = await getLichTrongChuyenKhoa(sel.tenKhoa)
        const arrNgay = Array.isArray(resNgay?.data) ? resNgay.data : []
        const caList: string[] = arrNgay
          .filter((it: any) => String(it?.ngay || it?.date || "").slice(0, 10) === ngay)
          .map((it: any) => it?.caTruc)
          .filter((x: any) => typeof x === "string" && x.trim().length > 0)

        if (caList.length === 0) {
          setAvailableTimes2([])
          setSelectedTime2(null)
          return
        }

        const results = await Promise.allSettled(
          caList.map((caTruc) => getGioTrongChuyenKhoa(sel.tenKhoa, ngay, caTruc))
        )

        const rawTimes: string[] = []
        for (const r of results) {
          if (r.status !== "fulfilled") continue
          const arr = Array.isArray(r.value?.data) ? r.value.data : []
          for (const x of arr) {
            const isFree = typeof x === "object" && x !== null ? (x.trangThai ?? true) : true
            if (!isFree) continue
            const t =
              typeof x === "string"
                ? x
                : x?.thoiGian
                  ? String(x.thoiGian)
                  : x?.time
                    ? String(x.time)
                    : null
            if (t) rawTimes.push(t.slice(0, 5))
          }
        }

        const uniq = Array.from(new Set(rawTimes)).sort((a, b) => a.localeCompare(b))

        const ranges: { label: string; start: string; end: string }[] = []
        for (let i = 0; i < uniq.length - 1; i++) {
          const s = uniq[i]
          const e = uniq[i + 1]
          ranges.push({ label: `${s} - ${e}`, start: `${s}:00`, end: `${e}:00` })
        }

        const todayKey = dayjs().tz("Asia/Ho_Chi_Minh").format("YYYY-MM-DD")
        let finalRanges = ranges
        if (ngay === todayKey) {
          const nowHHmm = dayjs().tz("Asia/Ho_Chi_Minh").format("HH:mm")
          finalRanges = ranges.filter((r) => r.start.slice(0, 5) > nowHHmm)
        }

        setAvailableTimes2(finalRanges)
        if (finalRanges.length === 0) setSelectedTime2(null)
      } catch {
        setAvailableTimes2([])
        setSelectedTime2(null)
      }
    }

    fetchGioTrongTheoNgayChuyenKhoa()
  }, [specialty, listChuyenKhoa, date2])

  useEffect(() => {
    setFormValue("serviceType", serviceType)
    setFormValue("specialty", specialty)
    setFormValue("doctor", doctor)
    setFormValue("selectedDate", value)
    setFormValue("selectedTime", selectedTime?.label || "")
    setFormValue("selectedDate2", value2)
    setFormValue("selectedTime2", selectedTime2?.label || "")
    setFormValue("note", note)
  }, [
    serviceType,
    specialty,
    doctor,
    value,
    selectedTime,
    value2,
    selectedTime2,
    note,
    setFormValue,
  ])

  const onSubmit = async () => {
    const fieldsToValidate =
      activeTab === "tab1"
        ? (["serviceType", "specialty", "doctor", "selectedDate", "selectedTime", "note"] as const)
        : (["serviceType", "specialty", "selectedDate2", "selectedTime2", "note"] as const)

    const isValid = await trigger(fieldsToValidate as any, { shouldFocus: true })
    if (!isValid) return

    if (!showPaymentMethod) {
      setShowPaymentMethod(true)
      return
    }

    if (!paymentMethod) {
      alert("Vui lòng chọn phương thức thanh toán")
      return
    }

    const ngayKham =
      activeTab === "tab1" ? dayjs(date).format("YYYY-MM-DD") : dayjs(date2).format("YYYY-MM-DD")

    const gioHen =
      activeTab === "tab1" ? selectedTime?.start.slice(0, 5) : selectedTime2?.start.slice(0, 5)

    const gioDen =
      activeTab === "tab1" ? selectedTime?.end.slice(0, 5) : selectedTime2?.end.slice(0, 5)

    let caKham = ""
    if (activeTab === "tab1") {
      const resNgay = await getNgayKhamByChuyenGia(Number(doctor))
      const list: { ngay: string; caTruc: string | null }[] = resNgay.data || []
      caKham = list.find((i) => i.ngay === ngayKham)?.caTruc || ""
    } else if (gioHen) {
      const h = parseInt(gioHen.slice(0, 2), 10)
      caKham = h < 12 ? "SANG" : h < 18 ? "CHIEU" : "TOI"
    }

    const payload = {
      bacSiId: activeTab === "tab1" ? Number(doctor) : undefined,
      benhNhanId: Number(user.maBN),
      thoiGianTu: gioHen || "",
      thoiGianDen: gioDen || "",
      loaiHinhKham: serviceType,
      trangThai: "Chờ duyệt",
      ghiChu: note || "",
      ngayKham,
      caKham,
    }
    try {
      await postTaoLichKham(payload)
      alert(`Đặt lịch thành công với phương thức: ${paymentMethod}`)
    } catch (error) {
      console.error("Lỗi : ", error)
      alert("Đặt lịch thất bại")
    }
  }

  const paymentOptions = [
    { value: "cash", label: "Trực tiếp tại quầy" },
    { value: "momo", label: "Momo" },
  ]

  function formatDate(d?: Date): string {
    if (!d) return ""
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "2-digit",
      timeZone: "Asia/Ho_Chi_Minh",
    } as const

    return new Intl.DateTimeFormat("vi-VN", options).format(d)
  }

  const selectedService = listDichVu.find((opt) => opt.tenLoai === serviceType)
  const selectedSpecialty = listChuyenKhoa.find((opt) => opt.chuyenKhoaId === specialty)
  const selectedPayment = paymentOptions.find((opt) => opt.value === paymentMethod)
  const selectDoctor = listChuyenGia.find((opt) => String(opt.bacSiId) === doctor)

  const summaryItems =
    activeTab === "tab1"
      ? [
          { label: "Loại dịch vụ", value: selectedService?.tenLoai },
          { label: "Chuyên khoa", value: selectedSpecialty?.tenKhoa },
          {
            label: "Bác sĩ khám",
            value: selectDoctor?.hoTen
              ? `${selectDoctor.trinhDo} - ${selectDoctor.hoTen}`
              : undefined,
          },
          { label: "Ngày khám", value: formatDate(date) },
          { label: "Giờ khám", value: selectedTime?.label },
          { label: "Ghi chú", value: note },
        ]
      : [
          { label: "Loại dịch vụ", value: selectedService?.tenLoai },
          { label: "Chuyên khoa", value: selectedSpecialty?.tenKhoa },
          { label: "Ngày khám", value: formatDate(date2) },
          { label: "Giờ khám", value: selectedTime2?.label },
          { label: "Ghi chú", value: note },
        ]

  return (
    <>
      <div className="w-full px-4 md:px-8 py-8 ">
        <h1 className="text-2xl md:text-3xl font-bold text-center text-blue-600 animate-fade-in">
          ĐĂNG KÝ KHÁM BỆNH
        </h1>
        <div
          className="h-1 bg-gray-400 mx-auto my-3 rounded animate-line-grow"
          style={{ width: "80px" }}
        ></div>
        <p
          className="text-center text-gray-700 mb-6 animate-fade-in"
          style={{ animationDelay: "0.3s" }}
        >
          Quý khách hàng có nhu cầu đặt hẹn khám tại{" "}
          <span className="font-semibold">Hệ thống Bệnh viện Đa khoa Nimbus</span>, xin vui lòng
          thực hiện theo hướng dẫn:
        </p>
        <ul className="space-y-3 max-w-3xl mx-auto">
          <li
            className="flex items-start gap-2 text-gray-800 animate-slide-in"
            style={{ animationDelay: "0.4s" }}
          >
            <span className="mt-1 text-blue-500">•</span>
            <span>
              {" "}
              Đặt hẹn bằng cách gọi tổng đài Chăm sóc khách hàng tại số{" "}
              <span className="font-semibold text-blue-600">
                {" "}
                091-234-5678 – 098-765-4321{" "}
              </span>{" "}
              (Bệnh viện Đa khoa Nimbus) hoặc{" "}
              <span className="font-semibold text-blue-600">098-765-4321 – 091-234-5678</span> (Bệnh
              viện Đa khoa Nimbus)
            </span>
          </li>
          <li
            className="flex items-start gap-2 text-gray-800 animate-slide-in"
            style={{ animationDelay: "0.55s" }}
          >
            <span className="mt-1 text-blue-500">•</span>
            <span>Đặt hẹn trực tuyến bằng cách điền thông tin vào mẫu bên dưới.</span>
          </li>
          <li
            className="flex items-start gap-2 text-gray-800 animate-slide-in"
            style={{ animationDelay: "0.7s" }}
          >
            <span className="mt-1 text-blue-500">•</span>
            <span>
              Xin lưu ý, trong các trường hợp khẩn cấp, quý khách vui lòng đến ngay cơ sở y tế gần
              nhất hoặc đến trực tiếp Hệ thống bệnh viện Đa khoa Nimbus.
            </span>
          </li>
        </ul>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-4xl ">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-20 items-start ">
          <div className="flex flex-col gap-5 w-full">
            <div className="font-bold text-center text-xl mb-5 mt-3">Đặt lịch khám</div>

            <div className="flex flex-col gap-2 w-full max-w-md ">
              <Label className="font-bold">1. Loại hình khám</Label>
              <Select value={serviceType} onValueChange={setServiceType}>
                <SelectTrigger
                  className={cn(
                    "w-full border rounded-md px-3 py-2 bg-white",
                    errors.serviceType &&
                      "border-red-500 focus:ring-red-500 focus-visible:ring-red-500" 
                  )}
                >
                  <div className="flex w-full justify-between items-center">
                    {selectedService ? (
                      <>
                        <span>{selectedService.tenLoai}</span>
                        <span className="text-sm text-gray-500">{selectedService.gia} VND</span>
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {listDichVu.map((option) => (
                      <SelectItem key={option.tenLoai} value={option.tenLoai}>
                        <>
                          <span className="flex-1">{option.tenLoai}</span>
                          <span className="text-sm text-muted-foreground">{option.gia} VND</span>
                        </>
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {errors.serviceType && (
                <span className="text-sm text-red-500">{errors.serviceType.message}</span>
              )}
            </div>

            <div className="flex flex-col gap-2 w-full max-w-md">
              <Label className="font-bold">2. Chuyên khoa</Label>
              <Popover open={openSpecialty} onOpenChange={setOpenSpecialty}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={openSpecialty}
                    className={cn(
                      "w-full flex justify-between items-center",
                      errors.specialty && "border-red-500"
                    )}
                  >
                    <span className={cn("truncate", !specialty && "text-muted-foreground ")}>
                      {specialty
                        ? listChuyenKhoa.find((item) => item.chuyenKhoaId === specialty)?.tenKhoa
                        : ""}
                    </span>
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
                  <Command>
                    <CommandInput placeholder="Tìm chuyên khoa..." />
                    <CommandList>
                      <CommandEmpty>Không tìm thấy chuyên khoa.</CommandEmpty>
                      <CommandGroup>
                        {listChuyenKhoa.map((item) => (
                          <CommandItem
                            key={item.chuyenKhoaId}
                            value={item.tenKhoa.toString()}
                            onSelect={() => {
                              setSpecialty(item.chuyenKhoaId)
                              setOpenSpecialty(false)
                            }}
                          >
                            {item.tenKhoa}
                            <Check
                              className={cn(
                                "ml-auto h-4 w-4",
                                specialty === item.tenKhoa ? "opacity-100" : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              {errors.specialty && (
                <span className="text-sm text-red-500">{errors.specialty.message}</span>
              )}
            </div>

            <Tabs
              value={activeTab}
              onValueChange={(v) => setActiveTab(v as "tab1" | "tab2")}
              className="w-full max-w-md"
            >
              <TabsList className="w-full bg-blue-400 rounded-lg overflow-hidden">
                <TabsTrigger
                  value="tab1"
                  className="w-1/2 text-white data-[state=active]:bg-blue-600"
                >
                  Chọn bác sĩ
                </TabsTrigger>
                <TabsTrigger
                  value="tab2"
                  className="w-1/2 text-white data-[state=active]:bg-blue-600"
                >
                  Chọn ngày/giờ
                </TabsTrigger>
              </TabsList>

              <TabsContent value="tab1" className="mt-4 space-y-5">
                <div className="flex flex-col gap-2 w-full">
                  <Label className="font-bold">3. Bác sĩ khám</Label>
                  <Popover open={openDoctor} onOpenChange={setOpenDoctor}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={openDoctor}
                        disabled={!specialty}
                        className={cn(
                          "w-full flex justify-between items-center",
                          errors?.doctor && "border-red-500 focus:ring-red-500"
                        )}
                      >
                        <span className={cn("truncate", !doctor && "text-muted-foreground")}>
                          {doctor
                            ? `${listChuyenGia.find((item) => String(item.bacSiId) === doctor)?.trinhDo} - ${listChuyenGia.find((item) => String(item.bacSiId) === doctor)?.hoTen}`
                            : ""}
                        </span>
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[var(--radix-popover-trigger-width)] max-h-[200px] p-0">
                      <Command>
                        <CommandInput placeholder="Tìm bác sĩ..." />
                        <CommandList>
                          <CommandEmpty>Không tìm thấy bác sĩ.</CommandEmpty>
                          <CommandGroup>
                            {listChuyenGia.map((item) => (
                              <CommandItem
                                key={item.bacSiId}
                                value={String(item.bacSiId)}
                                onSelect={() => {
                                  setDoctor(String(item.bacSiId))
                                  setOpenDoctor(false)
                                }}
                              >
                                {item.trinhDo} - {item.hoTen}
                                <Check
                                  className={cn(
                                    "ml-auto h-4 w-4",
                                    doctor === String(item.bacSiId) ? "opacity-100" : "opacity-0"
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  {errors?.doctor && (
                    <span className="text-sm text-red-500">{errors.doctor.message}</span>
                  )}
                </div>

                <div className="flex flex-col gap-2 w-full">
                  <Label className="font-bold">4. Ngày khám</Label>
                  <div className="relative flex gap-2">
                    <Input
                      id="date"
                      value={value}
                      className={`w-full bg-background pr-10 dark:border-white ${errors.selectedDate ? inputErrorClass : ""}`}
                      readOnly
                    />
                    <Popover open={open} onOpenChange={setOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          id="date-picker"
                          variant="ghost"
                          className="absolute top-1/2 right-2 size-6 -translate-y-1/2"
                          disabled={!doctor}
                        >
                          <CalendarIcon className="size-3.5" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto overflow-hidden p-0" align="end">
                        <Calendar
                          locale={vi}
                          mode="single"
                          selected={date}
                          captionLayout="dropdown"
                          month={month}
                          fromYear={2025}
                          toYear={2027}
                          onMonthChange={setMonth}
                          onSelect={(date: any) => {
                            setDate(date)
                            setValue(formatDate(date))
                            setOpen(false)
                          }}
                          disabled={(date: Date) => {
                            const today = dayjs().startOf("day")
                            const selected = dayjs(date).tz("Asia/Ho_Chi_Minh").format("YYYY-MM-DD")
                            return dayjs(date).isBefore(today) || !ngayLamViec.includes(selected)
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  {errors.selectedDate && (
                    <span className="text-sm text-red-500">{errors.selectedDate.message}</span>
                  )}
                </div>

                <div className="flex flex-col gap-2 w-full">
                  <Label className="font-bold">5. Thời gian khám</Label>
                  <div
                    className={`grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 border rounded-xl dark:bg-zinc-800 shadow-sm ${errors.selectedTime ? "border-red-500 " : "border-gray-200"} bg-white `}
                  >
                    {availableTimes.map((time) => (
                      <Button
                        key={time.label}
                        variant={selectedTime?.label === time.label ? "default" : "outline"}
                        onClick={() => setSelectedTime(time)}
                        className={`w-full p-2 rounded-lg text-sm transition-colors ${selectedTime?.label === time.label ? "bg-primary text-white" : "bg-white hover:bg-gray-100"}`}
                      >
                        {time.label}
                      </Button>
                    ))}
                  </div>
                  {errors.selectedTime && (
                    <span className="text-sm text-red-500">{errors.selectedTime.message}</span>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="tab2" className="mt-4 space-y-5">
                <div className="flex flex-col gap-2 w-full">
                  <Label className="font-bold">3. Ngày khám</Label>
                  <div className="relative flex gap-2">
                    <Input
                      id="date-2"
                      value={value2}
                      className={`w-full bg-background pr-10 dark:border-white ${errors.selectedDate2 ? inputErrorClass : ""}`}
                      readOnly
                    />
                    <Popover open={open2} onOpenChange={setOpen2}>
                      <PopoverTrigger asChild>
                        <Button
                          id="date-picker-2"
                          variant="ghost"
                          className="absolute top-1/2 right-2 size-6 -translate-y-1/2"
                        >
                          <CalendarIcon className="size-3.5" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto overflow-hidden p-0" align="end">
                        <Calendar
                          locale={vi}
                          mode="single"
                          selected={date2}
                          captionLayout="dropdown"
                          month={month2}
                          fromYear={2025}
                          toYear={2027}
                          onMonthChange={setMonth2}
                          onSelect={(d: any) => {
                            setDate2(d)
                            setValue2(formatDate(d))
                            setOpen2(false)
                          }}
                          disabled={(d: Date) => {
                            const today = dayjs().startOf("day")
                            const key = dayjs(d).tz("Asia/Ho_Chi_Minh").format("YYYY-MM-DD")
                            return dayjs(d).isBefore(today) || !ngayTrongChuyenKhoa.includes(key)
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  {errors.selectedDate2 && (
                    <span className="text-sm text-red-500">{errors.selectedDate2.message}</span>
                  )}
                </div>

                <div className="flex flex-col gap-2 w-full">
                  <Label className="font-bold">4. Thời gian khám</Label>
                  <div
                    className={`grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 border rounded-xl dark:bg-zinc-800 shadow-sm ${errors.selectedTime2 ? "border-red-500 " : "border-gray-200"} bg-white `}
                  >
                    {availableTimes2.map((time) => (
                      <Button
                        key={time.label}
                        variant={selectedTime2?.label === time.label ? "default" : "outline"}
                        onClick={() => setSelectedTime2(time)}
                        className={`w-full p-2 rounded-lg text-sm transition-colors ${selectedTime2?.label === time.label ? "bg-primary text-white" : "bg-white hover:bg-gray-100"}`}
                      >
                        {time.label}
                      </Button>
                    ))}
                  </div>
                  {errors.selectedTime2 && (
                    <span className="text-sm text-red-500">{errors.selectedTime2.message}</span>
                  )}
                </div>
              </TabsContent>
            </Tabs>

            <div className="flex flex-col gap-2 w-full max-w-md ">
              <Label className="font-bold">Ghi chú bệnh</Label>
              <Textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="w-full dark:border-white bg-white"
              />
              {errors.note && <span className="text-sm text-red-500">{errors.note.message}</span>}
            </div>

            {showPaymentMethod && (
              <div className="w-full max-w-md mb-5">
                <Label className="block text-base font-medium mb-2 ml-1">
                  Phương thức thanh toán
                </Label>
                <div className="grid grid-cols-2 gap-4">
                  {paymentOptions.map((option) => (
                    <Button
                      key={option.value}
                      variant={paymentMethod === option.value ? "default" : "outline"}
                      onClick={() => setPaymentMethod(option.value)}
                      className={`w-full dark:border-white py-2 rounded-lg text-sm transition-colors ${
                        paymentMethod === option.value
                          ? "bg-primary text-white"
                          : "bg-white hover:bg-gray-100"
                      }`}
                    >
                      {option.label}
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Card className="w-full max-w-md p-6 rounded-2xl shadow-lg bg-white dark:bg-zinc-900 dark:border-white/20 animate-fadeIn">
            <CardHeader>
              <h2 className="font-bold text-center text-2xl  text-blue-600 dark:text-blue-400">
                Thông tin lịch khám
              </h2>
              <p className="text-center text-gray-500 dark:text-gray-400 text-sm">
                Vui lòng kiểm tra thông tin trước khi xác nhận
              </p>
            </CardHeader>

            <div className="w-full h-[1px] bg-gray-300 dark:bg-white/20 " />

            <CardTitle>
              <p className="text-center font-bold text-lg text-gray-800 dark:text-gray-200">
                Bệnh nhân: {user.name}
              </p>
            </CardTitle>

            <CardContent className="flex flex-col gap-3 px-0 py-4">
              {summaryItems.filter(Boolean).map((item, idx) => (
                <div key={idx} className="flex gap-2">
                  <span className="font-semibold">{item.label}:</span>
                  <span>{item.value || "—"}</span>
                </div>
              ))}
            </CardContent>

            <div className="w-full h-[1px] bg-gray-300 dark:bg-white/20 my-2" />

            <CardFooter className="flex flex-col gap-4 px-0">
              {showPaymentMethod && (
                <div className="flex flex-col gap-1 text-gray-800 dark:text-gray-200">
                  <p className="font-bold text-lg">
                    Tổng tiền:{" "}
                    <span className="text-green-600 dark:text-green-400">
                      {selectedService?.gia} VNĐ
                    </span>
                  </p>
                  <p>
                    <span className="font-bold">Phương thức thanh toán: </span>
                    {selectedPayment?.label}
                  </p>
                </div>
              )}
              <Button
                className="h-11 w-full text-base rounded-xl transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
                onClick={onSubmit}
                disabled={isSubmitting}
              >
                {showPaymentMethod ? "Xác nhận đặt lịch" : "Đặt lịch khám"}
              </Button>
            </CardFooter>
          </Card>
        </div>
        <style>
          {`  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-5px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateX(-10px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes lineGrow {
    from {
      width: 0;
    }
    to {
      width: 80px;
    }
  }

  .animate-fade-in {
    animation: fadeIn 0.6s ease forwards;
  }

  .animate-slide-in {
    animation: slideIn 0.5s ease forwards;
  }

  .animate-line-grow {
    animation: lineGrow 0.5s ease forwards;
  }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate-fadeIn {
      animation: fadeIn 0.5s ease-out;
    }
  `}
        </style>
      </div>
    </>
  )
}

export default AppointmentPage
