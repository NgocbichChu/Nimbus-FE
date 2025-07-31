import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Eye, EyeOff, CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import type { Doctor } from "@/components/data-table/type-table"

interface DoctorFormProps {
  doctor?: Doctor
  mode?: "add" | "edit"
}

const DoctorForm = ({ doctor, mode = "add" }: DoctorFormProps) => {
  const [showPassword, setShowPassword] = useState(false)
  const [ngayTuyenBacSi, setNgayTuyenBacSi] = useState<Date | undefined>(
    doctor?.ngayTuyenDung ? new Date(doctor.ngayTuyenDung) : undefined
  )

  return (
    <div>
      <div className="grid gap-4">
        {/* Họ tên */}
        <div className="grid gap-2">
          <Label htmlFor="fullName">Họ tên *</Label>
          <Input
            id="fullName"
            type="text"
            defaultValue={doctor?.hoTen ?? ""}
            placeholder="Nhập họ tên"
          />
        </div>

        {/* Giới tính */}
        <div className="grid gap-2">
          <Label>Giới tính *</Label>
          <RadioGroup defaultValue={doctor?.gioiTinh ?? "M"} className="flex gap-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="M" id="male" />
              <Label htmlFor="male">Nam</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="F" id="female" />
              <Label htmlFor="female">Nữ</Label>
            </div>
          </RadioGroup>
        </div>

        {/* Email */}
        <div className="grid gap-2">
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            defaultValue={doctor?.email ?? ""}
            placeholder="Nhập email"
          />
        </div>

        {/* Số điện thoại */}
        <div className="grid gap-2">
          <Label htmlFor="phone">Số điện thoại *</Label>
          <Input
            id="phone"
            type="tel"
            defaultValue={doctor?.soDienThoai ?? ""}
            placeholder="Nhập số điện thoại"
          />
        </div>

        {/* Ngày tuyển bác sĩ */}
        <div className="grid gap-2">
          <Label>Ngày tuyển *</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "justify-start text-left font-normal",
                  !ngayTuyenBacSi && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {ngayTuyenBacSi ? format(ngayTuyenBacSi, "dd/MM/yyyy") : <span>Chọn ngày</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar mode="single" selected={ngayTuyenBacSi} onSelect={setNgayTuyenBacSi} />
            </PopoverContent>
          </Popover>
        </div>

        {/* Mật khẩu */}
        {mode === "add" && (
          <div className="grid gap-2">
            <Label htmlFor="password">Mật khẩu *</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Nhập mật khẩu"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-1 top-1/2 -translate-y-1/2"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </Button>
            </div>
          </div>
        )}

        {/* Chuyên khoa */}
        <div className="grid gap-2">
          <Label htmlFor="chuyenKhoa">Chuyên khoa *</Label>
          <Input
            id="chuyenKhoa"
            type="text"
            defaultValue={doctor?.chuyenKhoaId ?? ""}
            placeholder="Nhập chuyên khoa"
          />
        </div>

        {/* Chứng chỉ */}
        <div className="grid gap-2">
          <Label htmlFor="chungChi">Chứng chỉ</Label>
          <Input
            id="chungChi"
            type="text"
            defaultValue={doctor?.chungChi ?? ""}
            placeholder="Nhập chứng chỉ"
          />
        </div>

        {/* Trình độ */}
        <div className="grid gap-2">
          <Label htmlFor="trinhDo">Trình độ</Label>
          <Input
            id="trinhDo"
            type="text"
            defaultValue={doctor?.trinhDo ?? ""}
            placeholder="Nhập trình độ"
          />
        </div>

        {/* Kinh nghiệm */}
        <div className="grid gap-2">
          <Label htmlFor="kinhNghiem">Kinh nghiệm (năm)</Label>
          <Input
            id="kinhNghiem"
            type="number"
            defaultValue={doctor?.kinhNghiem?.toString() ?? ""}
            placeholder="Nhập số năm kinh nghiệm"
          />
        </div>
      </div>

      {/* Ghi chú */}
      <div className="grid gap-2 mt-4">
        <Label htmlFor="ghiChu">Ghi chú</Label>
        <Textarea id="ghiChu" defaultValue={doctor?.ghiChu ?? ""} placeholder="Thêm ghi chú..." />
      </div>
    </div>
  )
}

export default DoctorForm
