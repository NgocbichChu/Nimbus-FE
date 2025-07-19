import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
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

type AppointmentFormType = yup.InferType<typeof appointmentSchema>

function formatDate(date: Date | undefined): string {
  return date
    ? date.toLocaleDateString("vi-VN", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "2-digit",
      })
    : ""
}

const inputErrorClass = "border-red-500 focus:ring-red-500 focus:border-red-500 dark:border-red-500"

const AppointmentPage = () => {
  const [serviceType, setServiceType] = useState("")
  const [specialty, setSpecialty] = useState("")
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("")
  const [date, setDate] = useState<Date | undefined>(parseDate(value) || undefined)
  const [month, setMonth] = useState<Date | undefined>(date)
  const [doctor, setDoctor] = useState("")
  const [note, setNote] = useState("")
  const [selectedTime, setSelectedTime] = useState("")
  const [showPaymentMethod, setShowPaymentMethod] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("")

  const {
    setValue: setFormValue,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm<AppointmentFormType>({
    resolver: yupResolver(appointmentSchema) as any,
  })

  useEffect(() => {
    setFormValue("serviceType", serviceType)
    setFormValue("specialty", specialty)
    setFormValue("doctor", doctor)
    setFormValue("selectedDate", value)
    setFormValue("selectedTime", selectedTime)
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
      paymentMethod,
    })

    alert(`Đặt lịch thành công với phương thức: ${paymentMethod}`)
  }

  const serviceTypeOptions = [
    { value: "kt", label: "Khám thường" },
    { value: "kdv", label: "Khám dịch vụ" },
  ]

  const specialtyOptions = [
    { value: "khoaTamThan", label: "Khoa tâm thần" },
    { value: "khoaTaiMuiHong", label: "Khoa tai mũi họng" },
    { value: "khoaMat", label: "Khoa mắt" },
    { value: "khoaRangHamMat", label: "Khoa răng hàm mặt" },
  ]

  const doctorOptions = [
    { value: "BS1", label: "Nguyễn Văn A" },
    { value: "BS2", label: "Nguyễn Văn B" },
  ]

  const timeSlots = [
    "06:00-7:00",
    "07:00-8:00",
    "08:00-9:00",
    "09:00-10:00",
    "10:00-11:00",
    "12:30-13:30",
    "13:30-14:30",
    "14:30-15:30",
    "15:30-16:30",
    "16:30-17:30",
  ]

  const paymentOptions = [
    { value: "cash", label: "Trực tiếp tại quầy" },
    { value: "momo", label: "Momo" },
  ]

  const selectedService = serviceTypeOptions.find((opt) => opt.value === serviceType)
  const selectedSpecialty = specialtyOptions.find((opt) => opt.value === specialty)
  const selectDoctor = doctorOptions.find((opt) => opt.value === doctor)
  const selectedPayment = paymentOptions.find((opt) => opt.value === paymentMethod)

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl ">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-20 items-start ">
        <div className="flex flex-col gap-5 w-full">
          <div className="font-bold text-center text-xl mb-5 mt-3">Đặt lịch khám</div>
          <div className="flex flex-col gap-2 w-full max-w-md ">
            <Label className="font-bold">1. Loại hình khám</Label>
            <Select value={serviceType} onValueChange={setServiceType}>
              <SelectTrigger
                className={`w-full dark:border-white ${errors.serviceType ? inputErrorClass : ""}`}
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="dark:border-white">
                <SelectGroup>
                  <SelectLabel>Loại hình khám</SelectLabel>
                  {serviceTypeOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
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
            <Select value={specialty} onValueChange={setSpecialty}>
              <SelectTrigger
                className={`w-full dark:border-white ${errors.specialty ? inputErrorClass : ""}`}
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Chuyên khoa</SelectLabel>
                  {specialtyOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            {errors.specialty && (
              <span className="text-sm text-red-500">{errors.specialty.message}</span>
            )}
          </div>

          <div className="flex flex-col gap-2 w-full max-w-md ">
            <Label className="font-bold">3. Bác sĩ khám</Label>
            <Select value={doctor} onValueChange={setDoctor}>
              <SelectTrigger
                className={`w-full dark:border-white ${errors.doctor ? inputErrorClass : ""}`}
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Bác sĩ khám</SelectLabel>
                  {doctorOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            {errors.doctor && <span className="text-sm text-red-500">{errors.doctor.message}</span>}
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
                    disabled={{
                      before: new Date(
                        Math.max(new Date().getTime(), new Date(2025, 0, 1).getTime())
                      ),
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
              {timeSlots.map((time) => (
                <Button
                  key={time}
                  variant={selectedTime === time ? "default" : "outline"}
                  onClick={() => setSelectedTime(time)}
                  className={`w-full p-2 rounded-lg text-sm transition-colors ${
                    selectedTime === time ? "bg-primary text-white" : "bg-white hover:bg-gray-100"
                  }`}
                >
                  {time}
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
              className="w-full dark:border-white"
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
            <div className="font-bold text-center text-xl mb-5 mt-3 dark:bg-zinc-800 ">
              Thông tin lịch khám
            </div>
          </CardHeader>
          <CardTitle>
            <p className="mb-2">Tên bệnh nhân :</p>
          </CardTitle>
          <CardContent className="flex flex-col gap-1 px-0">
            <p>Loại dịch vụ : {selectedService?.label}</p>
            <p>Chuyên khoa : {selectedSpecialty?.label}</p>
            <p>Bác sĩ khám : {selectDoctor?.label}</p>
            <p>Ngày khám : {formatDate(date)}</p>
            <p>Giờ khám : {selectedTime}</p>
            <p>Ghi chú : {note}</p>
          </CardContent>
          <CardFooter className="flex flex-col gap-4 items-start justify-start px-0">
            {showPaymentMethod && (
              <div className="flex flex-col gap-2">
                <p>Phương thức thanh toán : {selectedPayment?.label}</p>
                <p>Tổng tiền : {}</p>
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
