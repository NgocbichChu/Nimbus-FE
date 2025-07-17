// import { Input } from "../../components/ui/input"
import * as React from "react"
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

const AppointmentPage = () => {
  const [serviceType, setServiceType] = React.useState("")
  const [specialty, setSpecialty] = React.useState("")
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")
  const [date, setDate] = React.useState<Date | undefined>(parseDate(value) || undefined)
  const [month, setMonth] = React.useState<Date | undefined>(date)
  const [doctor, setDoctor] = React.useState("")
  const [note, setNote] = React.useState("")
  const [selectedTime, setSelectedTime] = React.useState("")
  const [showPaymentMethod, setShowPaymentMethod] = React.useState(false)
  const [paymentMethod, setPaymentMethod] = React.useState("")

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
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row items-start justify-center gap-20">
        <div>
          <div className="font-bold text-center text-xl mb-5 mt-3">Đặt lịch khám </div>

          <div className="mb-5">
            <Select value={serviceType} onValueChange={setServiceType}>
              <SelectTrigger className="w-[400px] text-base">
                <SelectValue placeholder="1. Loại hình khám" />
              </SelectTrigger>
              <SelectContent>
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
          </div>

          <div className="mb-5">
            <Select value={specialty} onValueChange={setSpecialty}>
              <SelectTrigger className="w-[400px] text-base">
                <SelectValue placeholder="2. Chuyên khoa" />
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
          </div>

          <div className="mb-5">
            <Select value={doctor} onValueChange={setDoctor}>
              <SelectTrigger className="w-[400px] text-base">
                <SelectValue placeholder="3. Bác sĩ khám" />
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
          </div>

          <div className="mb-5">
            {" "}
            <div className="flex flex-col gap-3">
              <div className="relative flex gap-2">
                <Input
                  id="date"
                  value={value}
                  placeholder="4. Ngày khám"
                  className="bg-background pr-10"
                  onChange={(e) => {
                    setValue(e.target.value)
                    const date = parseDate(e.target.value)
                    if (date) {
                      setDate(date)
                      setMonth(date)
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "ArrowDown") {
                      e.preventDefault()
                      setOpen(true)
                    }
                  }}
                />
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      id="date-picker"
                      variant="ghost"
                      className="absolute top-1/2 right-2 size-6 -translate-y-1/2"
                    >
                      <CalendarIcon className="size-3.5" />
                      <span className="sr-only">Select date</span>
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
                      onSelect={(date) => {
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
            </div>
          </div>

          <div className="mb-5 w-[400px]">
            <Label className="block text-left text-base font-medium mb-2 ml-3">
              5. Thời gian khám
            </Label>
            <div className="grid grid-cols-4 gap-3 p-4 border rounded-xl bg-white shadow-sm">
              {timeSlots.map((time) => (
                <Button
                  key={time}
                  variant={selectedTime === time ? "default" : "outline"}
                  onClick={() => setSelectedTime(time)}
                  className={`w-full py-2 rounded-lg text-sm transition-colors ${
                    selectedTime === time ? "bg-primary text-white" : "bg-white hover:bg-gray-100"
                  }`}
                >
                  {time}
                </Button>
              ))}
            </div>
          </div>

          <div className="mb-5">
            <Textarea
              placeholder="6. Ghi chú bệnh"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>

          {showPaymentMethod && (
            <div className="w-[400px] mb-5 text-left">
              <Label className="block text-left text-base font-medium mb-2 ml-3">
                7. Phương thức thanh toán
              </Label>
              <div className="grid grid-cols-2 gap-4 px-3">
                {paymentOptions.map((option) => (
                  <Button
                    key={option.value}
                    variant={paymentMethod === option.value ? "default" : "outline"}
                    onClick={() => setPaymentMethod(option.value)}
                    className={`w-full py-2 rounded-lg text-sm transition-colors ${
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
        <div className="rounded-2xl border-black bg-gray-200 ">
          <div className="font-bold text-center text-xl mb-5 mt-3">Thông tin lịch khám</div>
          <hr className="my-4 border-t-2 border-gray-300 w-full" />
          <div className="text-left w-[400px] ml-5">
            <p className="mb-2">Tên bệnh nhân :</p>
          </div>
          <hr className="my-4 border-t-2 border-gray-300 w-full" />
          <div className="text-left w-[400px] m-5">
            <p className="mb-2">Loại dịch vụ : {selectedService?.label}</p>
            <p className="mb-2">Chuyên khoa : {selectedSpecialty?.label}</p>
            <p className="mb-2">Bác sĩ khám : {selectDoctor?.label}</p>
            <p className="mb-2">Ngày khám : {formatDate(date)}</p>
            <p className="mb-2">Giờ khám : {selectedTime}</p>
            <p className="mb-2">Ghi chú : {note}</p>
          </div>
          <hr className="my-4 border-t-2 border-gray-300 w-full" />
          {showPaymentMethod && (
            <div className="text-left w-[400px] m-5">
              <p className="mb-2">Phương thức thanh toán : {selectedPayment?.label}</p>
              <p className="mb-2">Tổng tiền : {}</p>
            </div>
          )}

          <div className="mt-6 flex justify-center">
            <Button
              className="h-11 w-[400px] mb-5 text-xl"
              onClick={() => {
                if (!showPaymentMethod) {
                  setShowPaymentMethod(true)
                  return
                }

                if (!paymentMethod) {
                  alert("Vui lòng chọn phương thức thanh toán")
                  return
                }

                alert(`Đặt lịch thành công với phương thức: ${paymentMethod}`)
              }}
            >
              {showPaymentMethod ? "Xác nhận đặt lịch" : "Đặt lịch khám"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AppointmentPage
