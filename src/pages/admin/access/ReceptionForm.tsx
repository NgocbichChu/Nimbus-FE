import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import { DateInput } from "@/components/dateInput/dateInput"
import { Eye, EyeOff } from "lucide-react"
import { Controller, useForm } from "react-hook-form"
import { addReception } from "@/api/quanlyApi"
import { useAppDispatch } from "@/helper"
import { fetchReceptions } from "@/api/letanApi"
import { ReceptionAccessSchema } from "@/validation/user-valid"
import { yupResolver } from "@hookform/resolvers/yup"

const ReceptionForm = () => {
  const [showPassword, setShowPassword] = useState(false)
  const dispatch = useAppDispatch()
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(ReceptionAccessSchema),
    defaultValues: {
      hoTen: "",
      gioiTinh: "Nam",
      email: "",
      soDienThoai: "",
      matKhau: "",
      ngayTuyenDung: "",
      chucVu: "Lễ Tân",
      ghiChu: "",
      trangThaiHoatDong: true,
    },
  })

  const handleAdd = async (data: any) => {
    try {
      await dispatch(addReception(data)).unwrap()
      reset({
        hoTen: "",
        gioiTinh: "Nam",
        email: "",
        soDienThoai: "",
        matKhau: "",
        ngayTuyenDung: "",
        chucVu: "Lễ Tân",
        ghiChu: "",
        trangThaiHoatDong: true,
      })
      dispatch(fetchReceptions())
    } catch (error) {
      console.error("Thêm bác sĩ thất bại:", error)
    }
  }

  return (
    <div className="space-y-6">
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
                    <Label htmlFor="male" className="cursor-pointer">
                      Nam
                    </Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem id="female" value="Nữ" />
                    <Label htmlFor="female" className="cursor-pointer">
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
          <div className="space-y-2">
            <Label className="font-bold">Ngày tuyển dụng *</Label>
            <Controller
              name="ngayTuyenDung"
              control={control}
              render={({ field }) => (
                <DateInput
                  date={field.value ? new Date(field.value) : undefined}
                  setDate={(date) => {
                    if (date) {
                      // Sử dụng local timezone để tránh lệch ngày
                      const year = date.getFullYear()
                      const month = String(date.getMonth() + 1).padStart(2, "0")
                      const day = String(date.getDate()).padStart(2, "0")
                      field.onChange(`${year}-${month}-${day}`)
                    }
                  }}
                  disableFuture={true}
                />
              )}
            />
            {errors.ngayTuyenDung && (
              <p className="text-red-500 text-sm">{errors.ngayTuyenDung.message}</p>
            )}
          </div>
        </div>
        <div className="grid gap-3 pt-3">
          <Label className="font-bold">Ghi chú</Label>
          <Textarea placeholder="Thêm thông tin bổ sung (nếu có)" {...register("ghiChu")} />
          <div className="flex justify-end pt-4">
            <Button>Tạo tài khoản lễ tân</Button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default ReceptionForm
