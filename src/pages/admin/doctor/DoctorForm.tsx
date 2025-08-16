import { useEffect, useState } from "react"
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
import type { Doctor, Specialty } from "@/components/data-table/type-table"
import { Switch } from "@/components/ui/switch"
import { DoctorEditSchema, DoctorSchema } from "@/validation/user-valid"
import { yupResolver } from "@hookform/resolvers/yup"
import { Controller, useForm } from "react-hook-form"
import { useAppDispatch } from "@/helper"
import { addDoctor, fetchDoctors, updateDoctor } from "@/api/apiDoctor"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { getChuyenKhoaAdmin } from "@/api/chuyenKhoaApi"
interface DoctorFormProps {
  doctor?: Doctor
  mode?: "add" | "edit"
  onClose?: () => void
}

const DoctorForm = ({ doctor, mode = "add", onClose }: DoctorFormProps) => {
  const disInput = mode === "edit"
  const dispatch = useAppDispatch()
  const [showPassword, setShowPassword] = useState(false)
  const schema = mode === "add" ? DoctorSchema : DoctorEditSchema
  const [danhSachChuyenKhoa, setDanhSachChuyenKhoa] = useState<Specialty[]>([])

  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      hoTen: doctor?.hoTen ?? "",
      gioiTinh: doctor?.gioiTinh ?? "Nam",
      email: doctor?.email ?? "",
      soDienThoai: doctor?.soDienThoai ?? "",
      matKhau: "",
      tenKhoa: "",
      chungChi: doctor?.chungChi ?? "",
      trinhDo: doctor?.trinhDo ?? "",
      kinhNghiem: doctor?.kinhNghiem ?? 0,
      ngayTuyenDung: doctor?.ngayTuyenDung ?? "",
      ghiChu: doctor?.ghiChu ?? "",
      trangThaiHoatDong: doctor?.trangThaiHoatDong ?? true,
    },
  })

  const handleAdd = async (data: any) => {
    try {
      await dispatch(addDoctor(data)).unwrap()
      // console.log("")
      dispatch(fetchDoctors())
      console.log("gọi lại danh sách form")
      onClose?.()
    } catch (error) {
      console.error("Thêm bác sĩ thất bại:", error)
    }
  }

  const handleEdit = async (data: any) => {
    if (!doctor?.bacsi_id) {
      console.error("Không có ID bác sĩ để cập nhật.")
      return
    }
    const dataWithId = { ...data, id: doctor.bacsi_id } // ✅ thêm id ở đây
    try {
      await dispatch(updateDoctor(dataWithId)).unwrap()
      dispatch(fetchDoctors())
      onClose?.()
    } catch (error) {
      console.log("Update thất bại:", error)
    }
  }

  useEffect(() => {
    const fetchChuyenKhoa = async () => {
      try {
        const res = await getChuyenKhoaAdmin()
        setDanhSachChuyenKhoa(res.data)
      } catch (error) {
        console.error("Lỗi khi lấy danh sách chuyên khoa:", error)
      }
    }

    fetchChuyenKhoa()
  }, [])

  useEffect(() => {
    if (mode === "edit" && doctor && danhSachChuyenKhoa.length > 0) {
      // Find the specialty by name and set the ID
      const selectedKhoa = danhSachChuyenKhoa.find((khoa) => khoa.tenKhoa === doctor.tenKhoa)
      if (selectedKhoa) {
        setValue("tenKhoa", selectedKhoa.tenKhoa)
      }
    }
  }, [mode, doctor, danhSachChuyenKhoa, setValue])

  return (
    <form
      className="grid grid-cols-2 gap-4"
      key={mode}
      onSubmit={mode === "add" ? handleSubmit(handleAdd) : handleSubmit(handleEdit)}
    >
      <div className="grid gap-2">
        <Label>Họ tên *</Label>
        <Input {...register("hoTen")} placeholder="Nhập họ tên" disabled={disInput} />
        {errors.hoTen && <p className="text-red-500 text-sm">{errors.hoTen.message}</p>}
      </div>

      <div className="grid gap-2">
        <Label>Giới tính *</Label>
        <Controller
          control={control}
          name="gioiTinh"
          render={({ field }) => (
            <RadioGroup value={field.value} onValueChange={field.onChange} className="flex gap-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Nam" id="Nam" />
                <Label htmlFor="Nam">Nam</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Nữ" id="Nu" />
                <Label htmlFor="Nu">Nữ</Label>
              </div>
            </RadioGroup>
          )}
        />
      </div>

      <div className="grid gap-2">
        <Label>Email *</Label>
        <Input {...register("email")} placeholder="Nhập email" type="email" disabled={disInput} />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
      </div>

      <div className="grid gap-2">
        <Label>Số điện thoại *</Label>
        <Input {...register("soDienThoai")} placeholder="Nhập số điện thoại" />
        {errors.soDienThoai && <p className="text-red-500 text-sm">{errors.soDienThoai.message}</p>}
      </div>

      <div className="grid gap-2">
        <Label>Mật khẩu *</Label>
        <div className="relative">
          <Input
            {...register("matKhau")}
            type={showPassword ? "text" : "password"}
            placeholder="Nhập mật khẩu"
            disabled={disInput}
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
        {errors.matKhau && <p className="text-red-500 text-sm">{errors.matKhau.message}</p>}
      </div>

      <div className="grid gap-2">
        <Label>Ngày tuyển *</Label>
        <Controller
          control={control}
          name="ngayTuyenDung"
          render={({ field }) => (
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "justify-start text-left font-normal",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {field.value ? format(new Date(field.value), "dd/MM/yyyy") : "Chọn ngày"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={field.value ? new Date(field.value) : undefined}
                  onSelect={(date) => field.onChange(date?.toISOString() ?? "")}
                />
              </PopoverContent>
            </Popover>
          )}
        />
        {errors.ngayTuyenDung && (
          <p className="text-red-500 text-sm">{errors.ngayTuyenDung.message}</p>
        )}
      </div>

      <div className="grid gap-2 w-full">
        <Label>Chuyên khoa *</Label>
        <Controller
          control={control}
          name="tenKhoa"
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger className="w-full min-w-[300px]">
                <SelectValue placeholder="Chọn chuyên khoa" />
              </SelectTrigger>
              <SelectContent className="w-full min-w-[300px]">
                {danhSachChuyenKhoa?.map((khoa) => (
                  <SelectItem key={khoa.chuyenKhoaId} value={khoa.tenKhoa}>
                    {khoa.tenKhoa}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />

        {errors.tenKhoa && <p className="text-red-500 text-sm">{errors.tenKhoa.message}</p>}
      </div>

      <div className="grid gap-2">
        <Label>Chứng chỉ</Label>
        <Input {...register("chungChi")} placeholder="Nhập chứng chỉ" />
        {errors.chungChi && <p className="text-red-500 text-sm">{errors.chungChi.message}</p>}
      </div>

      <div className="grid gap-2">
        <Label>Trình độ</Label>
        <Input {...register("trinhDo")} placeholder="Nhập trình độ" />
        {errors.trinhDo && <p className="text-red-500 text-sm">{errors.trinhDo.message}</p>}
      </div>

      <div className="grid gap-2">
        <Label>Kinh nghiệm (năm)</Label>
        <Controller
          control={control}
          name="kinhNghiem"
          render={({ field }) => (
            <Input
              {...field}
              type="number"
              min={0}
              placeholder="Nhập số năm"
              onChange={(e) => {
                const value = Number(e.target.value)
                field.onChange(value < 0 ? 0 : value) // chặn số âm
              }}
            />
          )}
        />
        {errors.kinhNghiem && <p className="text-red-500 text-sm">{errors.kinhNghiem.message}</p>}
      </div>

      <div className="grid gap-2 h-fit">
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

      <div className="grid gap-2">
        <Label>Ghi chú</Label>
        <Textarea {...register("ghiChu")} placeholder="Thêm ghi chú..." />

        <div className="mt-4 flex justify-end gap-2">
          <Button variant="outline" type="button" onClick={() => onClose?.()}>
            Huỷ
          </Button>

          {mode === "add" ? (
            <Button type="submit">Thêm Bác sĩ</Button>
          ) : (
            <Button type="submit">Lưu thông tin</Button>
          )}
        </div>
      </div>
    </form>
  )
}

export default DoctorForm
