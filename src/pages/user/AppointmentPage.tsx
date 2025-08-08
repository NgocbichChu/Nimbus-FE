import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select"
import { parseDate } from "chrono-node"
import { CalendarIcon } from "lucide-react"
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
import { Check, ChevronsUpDown } from "lucide-react"
import { getDanhSachChuyenGia } from "@/api/chuyenGiaApi"
import { getLoaiDichVu } from "@/api/appointmentApi"
import { getDanhSachChuyenKhoa } from "../../api/chuyenKhoaApi"
import { layThongTinTaiKhoan } from "../../api/accountApi"
import { getBacSiByChuyenKhoa } from "../../api/appointmentApi"
import { getNgayKhamByChuyenGia } from "../../api/appointmentApi"
import { getGioTheoNgay } from "../../api/appointmentApi"
import { postTaoLichKham } from "../../api/appointmentApi"
import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
import timezone from "dayjs/plugin/timezone"
import isSameOrAfter from "dayjs/plugin/isSameOrAfter"

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

  const [user, setUser] = useState<User>({
    name: "",
  })

  type User = {
    name: string
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
        const res = await layThongTinTaiKhoan()
        const user = {
          name: res.data.hoTen,
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
        console.error("Lỗi : ", error)
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
          .filter((item) => item.caTruc && dayjs(item.ngay).isSameOrAfter(today)) // chỉ lọc từ hôm nay trở đi, không lọc lyDoNghi
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

  useEffect(() => {
    setFormValue("serviceType", serviceType)
    setFormValue("specialty", specialty)
    setFormValue("doctor", doctor)
    setFormValue("selectedDate", value)
    setFormValue("selectedTime", selectedTime?.label || "")
    setFormValue("note", note)
  }, [serviceType, specialty, doctor, value, selectedTime, note, setFormValue])

  const onSubmit = async () => {
    const isValid = await trigger()
    if (!isValid) return

    if (!showPaymentMethod) {
      setShowPaymentMethod(true)
      return
    }

    if (!paymentMethod) {
      alert("Vui lòng chọn phương thức thanh toán")
      return
    }

    console.log("Dữ liệu đặt lịch:", {
      serviceType,
      specialty,
      doctor,
      selectedDate: value,
      selectedTime,
      note,
      // paymentMethod,
    })

    const ngayKham = dayjs(date).format("YYYY-MM-DD")
    const gioHen = selectedTime?.start
    const gioDen = selectedTime?.end
    // const thoiGianHen = dayjs(`${gioHen}:00`).toISOString()
    // const thoiGianDen = dayjs(`${gioDen}:00`).toISOString()
    const resNgay = await getNgayKhamByChuyenGia(Number(doctor))
    const list: NgayLamViecItem[] = resNgay.data || []
    const info = list.find((item) => item.ngay === ngayKham)
    const caKham = info?.caTruc || ""

    const payload = {
      bacSiId: Number(doctor),
      benhNhanId: 1,
      thoiGianHen: gioHen || "",
      thoiGianDen: gioDen || "",
      kieuLichKham: serviceType,
      trangThai: "Chờ duyệt",
      ghiChu: note || "",
      ngayKham,
      ngayCapNhat: new Date().toISOString(),
      caKham,
    }
    try {
      await postTaoLichKham(payload)
      alert(`Đặt lịch thành công với phương thức: ${paymentMethod}`)
    } catch (error) {
      console.error("Lỗi : ", error)
      alert("Đặt lịch thất bại")
    }
    console.log("Ca trực thực tế:", caKham)
    console.log("Giờ hẹn:", gioHen)
    console.log("Giờ đến:", gioDen)
    console.log("Ngày khám : ", ngayKham)
  }

  const paymentOptions = [
    { value: "cash", label: "Trực tiếp tại quầy" },
    { value: "momo", label: "Momo" },
  ]
  function formatDate(date: Date | undefined): string {
    if (!date) return ""
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "2-digit",
      timeZone: "Asia/Ho_Chi_Minh",
    } as const

    return new Intl.DateTimeFormat("vi-VN", options).format(date)
  }

  const selectedService = listDichVu.find((opt) => opt.tenLoai === serviceType)
  const selectedSpecialty = listChuyenKhoa.find((opt) => opt.chuyenKhoaId === specialty)
  const selectedPayment = paymentOptions.find((opt) => opt.value === paymentMethod)

  const selectDoctor = listChuyenGia.find((opt) => String(opt.bacSiId) === doctor)

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl ">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-20 items-start ">
        <div className="flex flex-col gap-5 w-full">
          <div className="font-bold text-center text-xl mb-5 mt-3">Đặt lịch khám</div>
          <div className="flex flex-col gap-2 w-full max-w-md ">
            <Label className="font-bold">1. Loại hình khám</Label>
            <Select value={serviceType} onValueChange={setServiceType}>
              <SelectTrigger className="w-full border rounded-md px-3 py-2 bg-white">
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
                  className="w-full flex justify-between items-center"
                >
                  <span className={cn("truncate", !specialty && "text-muted-foreground")}>
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

          <div className="flex flex-col gap-2 w-full max-w-md">
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

          <div className="flex flex-col gap-2 w-full max-w-md">
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

          <div className="flex flex-col gap-2 w-full max-w-md">
            <Label className="font-bold">5. Thời gian khám</Label>
            <div
              className={`grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 border rounded-xl dark:bg-zinc-800 shadow-sm ${
                errors.selectedTime ? "border-red-500 " : "border-gray-200"
              } bg-white `}
            >
              {availableTimes.map((time) => (
                <Button
                  key={time.label}
                  variant={selectedTime?.label === time.label ? "default" : "outline"}
                  onClick={() => setSelectedTime(time)}
                  className={`w-full p-2 rounded-lg text-sm transition-colors ${
                    selectedTime?.label === time.label
                      ? "bg-primary text-white"
                      : "bg-white hover:bg-gray-100"
                  }`}
                >
                  {time.label}
                </Button>
              ))}
            </div>
            {errors.selectedTime && (
              <span className="text-sm text-red-500">{errors.selectedTime.message}</span>
            )}
          </div>

          <div className="flex flex-col gap-2 w-full max-w-md ">
            <Label className="font-bold">6. Ghi chú bệnh</Label>
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
                7. Phương thức thanh toán
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

        <Card className="w-full max-w-md p-5 dark:border-white ">
          <CardHeader>
            <div className="font-bold text-center text-xl mt-3 dark:bg-zinc-800 ">
              Thông tin lịch khám
            </div>
          </CardHeader>
          <div className="w-full h-[1px] bg-gray-300 dark:bg-white/30 " />
          <CardTitle>
            <p className=" text-center font-bold">Tên bệnh nhân : {user.name}</p>
          </CardTitle>
          <CardContent className="flex flex-col gap-1 px-0">
            <div className="flex flex-col gap-2">
              <div className="flex justify-between gap-4">
                <span className="font-bold">Loại dịch vụ:</span>
                <span>{selectedService?.tenLoai}</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="font-bold">Chuyên khoa:</span>
                <span>{selectedSpecialty?.tenKhoa}</span>
              </div>
              <div className="flex justify-between gap-4 items-start">
                <span className="font-bold whitespace-nowrap">Bác sĩ khám:</span>
                <span className="text-right break-words max-w-[60%]">
                  {selectDoctor?.hoTen ? `${selectDoctor.trinhDo} - ${selectDoctor.hoTen}` : ""}
                </span>
              </div>

              <div className="flex justify-between gap-4">
                <span className="font-bold">Ngày khám:</span>
                <span>{formatDate(date)}</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="font-bold">Giờ khám:</span>
                <span>{selectedTime?.label}</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="font-bold">Ghi chú:</span>
                <span className="max-w-[60%] text-right break-words">{note}</span>
              </div>
            </div>
          </CardContent>
          <div className="w-full h-[1px] bg-gray-300 dark:bg-white/30 " />
          <CardFooter className="flex flex-col gap-4 items-start justify-start px-0">
            {showPaymentMethod && (
              <div className="flex flex-col gap-2">
                <p>
                  <span className="font-bold">Tổng tiền : {selectedService?.gia} VNĐ</span> {}
                </p>
                <p>
                  <span className="font-bold">Phương thức thanh toán :</span>{" "}
                  {selectedPayment?.label}
                </p>
              </div>
            )}
            <Button
              className="h-11 w-full max-w-md text-base"
              onClick={onSubmit}
              disabled={isSubmitting}
            >
              {showPaymentMethod ? "Xác nhận đặt lịch" : "Đặt lịch khám"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

export default AppointmentPage
