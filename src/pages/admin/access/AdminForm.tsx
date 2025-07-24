import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { Eye, EyeOff } from "lucide-react"
import { useState } from "react"

const AdminForm = () => {
  const [showPassword, setShowPassword] = useState(false)
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="grid gap-3">
          <Label htmlFor="fullName">Họ tên *</Label>
          <Input id="fullName" type="text" placeholder="Nhập họ tên đầy đủ" />
        </div>
        <div className="grid gap-3">
          <Label className="min-w-[80px]">Giới tính:</Label>
          <RadioGroup
            // value={state.gioiTinh}
            // onValueChange={(value) => setState({ ...state, gioiTinh: value })}
            className="flex gap-6"
          >
            <div className="flex items-center gap-2">
              <RadioGroupItem id="male" value="M" />
              <Label htmlFor="male" className="cursor-pointer">
                Nam
              </Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem id="female" value="F" />
              <Label htmlFor="female" className="cursor-pointer">
                Nữ
              </Label>
            </div>
          </RadioGroup>
        </div>
        <div className="grid gap-3">
          <Label htmlFor="email">Email *</Label>
          <Input id="email" type="email" placeholder="m@gmail.com" />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="sdt">Số điện thoại *</Label>
          <Input id="sdt" type="text" />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="chucVu">Chức vụ *</Label>
          <Input id="chucVu" type="text" placeholder="Ví dụ: Quản lý cấp cao" />
        </div>
        <div className="grid gap-3 ">
          <Label htmlFor="password">Mật khẩu *</Label>
          {/* <Input id="password" type="password" /> */}
          <div className="relative">
            <Input id="password" type={showPassword ? "text" : "password"} />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none cursor-pointer"
              tabIndex={0}
              aria-label={showPassword ? "Ẩn mật khẩu" : "Hiển thị mật khẩu"}
            >
              {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
          </div>
        </div>
      </div>
      <div className="grid gap-3 pt-4">
        <Label>Ghi chú</Label>
        <Textarea placeholder="Thêm thông tin bổ sung (nếu có)" />
        <div className="flex justify-end pt-4">
          <Button className="bg-sky-600 hover:bg-sky-700">Tạo tài khoản quản lý</Button>
        </div>
      </div>
    </>
  )
}

export default AdminForm
