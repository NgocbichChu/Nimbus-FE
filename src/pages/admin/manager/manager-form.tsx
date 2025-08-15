import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import type { Manager } from "@/components/data-table/type-table"
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Eye, EyeOff } from "lucide-react"
import { Switch } from "@radix-ui/react-switch"




interface ManagerFormProps {
    manager?: Manager
    onClose?: () => void
}

export const ManagerForm = ({ manager, onClose }: ManagerFormProps) => {
    const [showPassword, setShowPassword] = useState(false)

    const {
        control,
        register,
        handleSubmit,

        formState: { errors },
    } = useForm({
        defaultValues: {
            hoTen: manager?.hoTen ?? "",
            gioiTinh: manager?.gioiTinh ?? "Nam",
            email: manager?.email ?? "",
            soDienThoai: manager?.soDienThoai ?? "",
            matKhau: "",
            tenKhoa: "",
            ngayTuyenDung: manager?.ngayTuyenDung ?? "",
            ghiChu: manager?.ghiChu ?? "",
            trangThaiHoatDong: manager?.trangThaiHoatDong ?? true,
        },
    })



    const handleEdit = async () => {

    }

    return (
        <form
            className="bg-white rounded-lg shadow-lg w-full"
            onSubmit={handleSubmit(handleEdit)}
        >
            <div className="grid grid-cols-2 gap-8 p-8">
                {/* Họ tên + Giới tính */}
                <div>
                    <Label>Họ tên *</Label>
                    <Input {...register("hoTen")} placeholder="Nhập họ tên" />
                </div>

                <div>
                    <Label>Giới tính *</Label>
                    <Controller
                        control={control}
                        name="gioiTinh"
                        render={({ field }) => (
                            <RadioGroup
                                value={field.value}
                                onValueChange={field.onChange}
                                className="flex gap-4"
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

                {/* Email + Số điện thoại */}
                <div>
                    <Label>Email *</Label>
                    <Input {...register("email")} placeholder="Nhập email" />
                </div>

                <div>
                    <Label>Số điện thoại *</Label>
                    <Input {...register("soDienThoai")} placeholder="Nhập số điện thoại" />
                </div>

                {/* Mật khẩu + Ngày tuyển */}
                <div>
                    <Label>Mật khẩu *</Label>
                    <div className="relative">
                        <Input
                            {...register("matKhau")}
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
                            {showPassword ? (
                                <EyeOff className="w-4 h-4" />
                            ) : (
                                <Eye className="w-4 h-4" />
                            )}
                        </Button>
                    </div>
                    {errors.matKhau && (
                        <p className="text-red-500 text-sm">{errors.matKhau.message}</p>
                    )}
                </div>

                <div>
                    <Label>Ngày tuyển *</Label>
                    <Input {...register("ngayTuyenDung")} placeholder="Chọn ngày tuyển" />
                </div>

                {/* Trạng thái hoạt động + Ghi chú */}
                <div>
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

                <div>
                    <Label>Ghi chú</Label>
                    <Textarea {...register("ghiChu")} placeholder="Thêm ghi chú..." />
                </div>
            </div>

            {/* Nút hành động */}
            <div className="px-8 py-4 flex justify-end gap-3 border-t">
                <Button variant="outline" type="button" onClick={() => onClose?.()}>
                    Huỷ
                </Button>
                <Button type="submit">Lưu thông tin</Button>
            </div>
        </form>


    )
}

