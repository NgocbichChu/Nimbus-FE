import { fetchManager } from "@/api/manager"
import { addAdmin } from "@/api/quanlyApi"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { useAppDispatch } from "@/helper"
import { Eye, EyeOff } from "lucide-react"
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { AdminSchema } from "@/validation/user-valid"
import { yupResolver } from "@hookform/resolvers/yup"

const AdminForm = () => {
  const dispatch = useAppDispatch()
  const [showPassword, setShowPassword] = useState(false)

  const {
    control,
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(AdminSchema),
    defaultValues: {
      hoTen: "",
      gioiTinh: "Nam",
      email: "",
      soDienThoai: "",
      matKhau: "",
      chucVu: "",
      ghiChu: "",
      trangThaiHoatDong: true,
    },
  })

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const handleAdd = async (data: any) => {
    try {
      await dispatch(addAdmin(data)).unwrap()
      dispatch(fetchManager())
      reset()
    } catch (error) {
      console.error("Thêm bác sĩ thất bại:", error)
    }
  }
  return (
    <>
      <form onSubmit={handleSubmit(handleAdd)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="grid gap-3">
            <Label className="font-bold" htmlFor="fullName">
              Họ tên *
            </Label>
            <Input
              id="fullName"
              type="text"
              placeholder="Nhập họ tên đầy đủ"
              {...register("hoTen")}
            />
            {errors.hoTen && <p className="text-red-500 text-sm">{errors.hoTen.message}</p>}
          </div>
          <div className="grid gap-3">
            <Label className="font-bold" htmlFor="gioiTinh">
              Giới tính *
            </Label>
            <Controller
              name="gioiTinh"
              control={control}
              render={({ field }) => (
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value}
                  className="flex gap-6"
                >
                  <div className="flex items-center gap-2">
                    <RadioGroupItem id="male" value="Nam" />
                    <Label className="cursor-pointer" htmlFor="male">
                      Nam
                    </Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem id="female" value="Nữ" />
                    <Label className="cursor-pointer" htmlFor="female">
                      Nữ
                    </Label>
                  </div>
                </RadioGroup>
              )}
            />
            {errors.gioiTinh && <p className="text-red-500 text-sm">{errors.gioiTinh.message}</p>}
          </div>

          <div className="grid gap-3">
            <Label className="font-bold" htmlFor="email">
              Email *
            </Label>
            <Input id="email" type="email" placeholder="m@gmail.com" {...register("email")} />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>
          <div className="grid gap-3">
            <Label className="font-bold" htmlFor="sdt">
              Số điện thoại *
            </Label>
            <Input
              id="sdt"
              type="text"
              placeholder="Nhập số điện thoại"
              {...register("soDienThoai")}
            />
            {errors.soDienThoai && (
              <p className="text-red-500 text-sm">{errors.soDienThoai.message}</p>
            )}
          </div>
          <div className="grid gap-3">
            <Label className="font-bold" htmlFor="chucVu">
              Chức vụ *
            </Label>
            <Input
              id="chucVu"
              type="text"
              placeholder="Ví dụ: Quản lý cấp cao"
              {...register("chucVu")}
            />
            {errors.chucVu && <p className="text-red-500 text-sm">{errors.chucVu.message}</p>}
          </div>
          <div className="grid gap-3 ">
            <Label className="font-bold" htmlFor="password">
              Mật khẩu *
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Nhập mật khẩu"
                {...register("matKhau")}
              />
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
            {errors.matKhau && <p className="text-red-500 text-sm">{errors.matKhau.message}</p>}
          </div>
        </div>
        <div className="grid gap-3 pt-4">
          <Label className="font-bold">Ghi chú</Label>
          <Textarea placeholder="Thêm thông tin bổ sung (nếu có)" {...register("ghiChu")} />
          <div className="flex justify-end pt-4">
            <Button type="submit">Tạo tài khoản quản lý</Button>
          </div>
        </div>
      </form>
    </>
  )
}

export default AdminForm
