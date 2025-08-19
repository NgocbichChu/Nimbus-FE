import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import type { Manager } from "@/components/data-table/type-table"
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Eye, EyeOff } from "lucide-react"
import { useAppDispatch } from "@/helper"
import { fetchManager, updateManager } from "@/api/manager"
import { Switch } from "@/components/ui/switch"

interface ManagerFormProps {
  manager?: Manager
  onClose?: () => void
}

export const ManagerForm = ({ manager, onClose }: ManagerFormProps) => {
  const [showPassword, setShowPassword] = useState(false)
  const dispatch = useAppDispatch()

  const {
    control,
    register,
    handleSubmit,

    formState: { errors },
  } = useForm({
    defaultValues: {
      quanLyId: manager?.quanLyId ?? "",
      hoTen: manager?.hoTen ?? "",
      gioiTinh: manager?.gioiTinh ?? "Nam",
      email: manager?.email ?? "",
      chucVu: manager?.chucVu ?? "",
      soDienThoai: manager?.soDienThoai ?? "",
      matKhau: manager?.matKhau ?? "",
      ngayTuyenDung: manager?.ngayTuyenDung ?? "",
      ghiChu: manager?.ghiChu ?? "",
      trangThaiHoatDong: manager?.trangThaiHoatDong ?? true,
    },
  })

  const handleEdit = async (data: any) => {
    if (!manager?.quanLyId) {
      console.error("Không có ID Quản lý để cập nhật.")
      return
    }
    const dataWithId = { ...data, id: manager.quanLyId }
    try {
      await dispatch(updateManager(dataWithId)).unwrap()
      dispatch(fetchManager())

      onClose?.()
    } catch (error) {
      console.log("Update thất bại:", error)
    }
  }

  return (
    <form className="w-full" onSubmit={handleSubmit(handleEdit)} >
      {/* Grid form */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {/* Họ tên */}
        <div className="flex flex-col gap-2">
          <Label>Họ tên *</Label>
          <Input {...register("hoTen")} placeholder="Nhập họ tên" className="w-full" />
        </div>

        {/* Giới tính */}
        <div className="flex flex-col gap-2">
          <Label>Giới tính *</Label>
          <Controller
            control={control}
            name="gioiTinh"
            render={({ field }) => (
              <RadioGroup
                value={field.value}
                onValueChange={field.onChange}
                className="flex gap-6"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Nam" id="male" />
                  <Label htmlFor="male">Nam</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Nữ" id="female" />
                  <Label htmlFor="female">Nữ</Label>
                </div>
              </RadioGroup>
            )}
          />
        </div>

        {/* Email */}
        <div className="flex flex-col gap-2">
          <Label>Email *</Label>
          <Input {...register("email")} placeholder="Nhập email" className="w-full" />
        </div>

        {/* Số điện thoại */}
        <div className="flex flex-col gap-2">
          <Label>Số điện thoại *</Label>
          <Input {...register("soDienThoai")} placeholder="Nhập số điện thoại" className="w-full" />
        </div>

        {/* Mật khẩu */}
        <div className="flex flex-col gap-2">
          <Label>Mật khẩu *</Label>
          <div className="relative">
            <Input
              {...register("matKhau")}
              type={showPassword ? "text" : "password"}
              placeholder="Nhập mật khẩu"
              className="w-full"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-1/2 -translate-y-1/2"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </Button>
          </div>
          {errors.matKhau && (
            <p className="text-red-500 text-sm">{errors.matKhau.message}</p>
          )}
        </div>

        {/* Ngày tuyển */}
        <div className="flex flex-col gap-2">
          <Label>Ngày tuyển *</Label>
          <Input
            {...register("ngayTuyenDung")}
            type="date"
            placeholder="Chọn ngày tuyển"
            className="w-full"
          />
        </div>

        {/* Trạng thái hoạt động */}
        <div className="flex flex-col gap-2">
          <Label>Trạng thái hoạt động</Label>
          <Controller
            control={control}
            name="trangThaiHoatDong"
            render={({ field }) => (
              <div className="flex items-center gap-4">
                <Switch
                  id="trangThaiHoatDong"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
                <span>{field.value ? "Hoạt động" : "Nghỉ"}</span>
              </div>
            )}
          />
        </div>
        {/* Chức vụ  */}
        <div className="flex flex-col gap-2">
          <Label>Chức vụ *</Label>
          <Input
            {...register("chucVu")}
            type="text"
            placeholder="chức vụ "
            className="w-full"
          />
        </div>
        {/* Ghi chú */}
        <div className="lg:col-span-3 flex flex-col gap-2">
          <Label>Ghi chú</Label>
          <Textarea
            {...register("ghiChu")}
            placeholder="Thêm ghi chú..."
            rows={3}
            className="w-full"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="mt-8 flex justify-end gap-4 border-t pt-4">
        <Button variant="outline" type="button" onClick={() => onClose?.()}>
          Huỷ
        </Button>
        <Button type="submit">Lưu thông tin</Button>
      </div>
    </form>

  )
}
