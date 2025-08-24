import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@radix-ui/react-separator"
import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { getThongTinBenhNhan } from "../../api/accountApi"
import { capNhatBenhNhan } from "../../api/accountApi"
import { yupResolver } from "@hookform/resolvers/yup"
import { hoSoSchema } from "../../validation/user-valid"
import type { HoSo } from "../../validation/user-valid"
import { toastError, toastSuccess } from "@/helper/toast"

type User = {
  name: string
  email: string
  soDienThoai: string
  gioiTinh: string
  diaChi: string
  maBN: string
  baoHiem: string
  canCuocCongDan: string
  danToc: string
  lienHeKhanCap: string
}

const HoSoPage = () => {
  const [isEditing, setIsEditing] = useState(false)
  const [user, setUser] = useState<User>({
    name: "",
    email: "",
    soDienThoai: "",
    gioiTinh: "",
    diaChi: "",
    maBN: "",
    baoHiem: "",
    canCuocCongDan: "",
    danToc: "",
    lienHeKhanCap: "",
  })

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<HoSo>({
    resolver: yupResolver(hoSoSchema) as any,
    defaultValues: {
      soDienThoai: "",
      diaChi: "",
      baoHiem: "",
      canCuocCongDan: "",
      danToc: "",
      lienHeKhanCap: "",
    },
  })

  const onSubmit = async (data: HoSo) => {
    try {
      await capNhatBenhNhan({
        benhNhanId: user.maBN,
        hoTen: user.name,
        gioiTinh: user.gioiTinh,
        email: user.email,
        soDienThoai: data.soDienThoai,
        diaChi: data.diaChi,
        baoHiem: data.baoHiem,
        canCuocCongDan: data.canCuocCongDan,
        danToc: data.danToc,
        lienHeKhanCap: data.lienHeKhanCap,
      })
      setUser((prev) => ({
        ...prev,
        soDienThoai: data.soDienThoai ?? "",
        diaChi: data.diaChi ?? "",
        baoHiem: data.baoHiem ?? "",
        canCuocCongDan: data.canCuocCongDan ?? "",
        danToc: data.danToc ?? prev.danToc,
        lienHeKhanCap: data.lienHeKhanCap ?? "",
      }))
      reset({
        soDienThoai: data.soDienThoai,
        diaChi: data.diaChi,
        baoHiem: data.baoHiem,
        canCuocCongDan: data.canCuocCongDan,
        danToc: data.danToc,
        lienHeKhanCap: data.lienHeKhanCap,
      })
      setIsEditing(false)
      toastSuccess("Cập nhật thông tin thành công")
    } catch (error) {
      console.log("Lỗi : ", error)
      toastError("Cập nhật thông tin thất bại")
    }
  }

  useEffect(() => {
    if (isEditing) {
      reset(user)
    }
  }, [isEditing, user, reset])

  useEffect(() => {
    const fetchBenhNhan = async () => {
      try {
        const res = await getThongTinBenhNhan()
        const user = {
          name: res.data.hoTen || "",
          soDienThoai: res.data.soDienThoai || "",
          gioiTinh: res.data.gioiTinh || "",
          email: res.data.email || "",
          diaChi: res.data.diaChi || "",
          maBN: res.data.benhNhanId || "",
          baoHiem: res.data.baoHiem || "",
          canCuocCongDan: res.data.canCuocCongDan || "",
          danToc: res.data.danToc || "",
          lienHeKhanCap: res.data.lienHeKhanCap || "",
        }
        setUser(user)
        reset(user)
      } catch (error) {
        console.log("Lỗi : ", error)
      }
    }
    fetchBenhNhan()
  }, [reset])

  return (
    <div className="container mx-auto px-4 py-8 bg-white justify-items-center dark:bg-black ">
      <div className="mb-4 max-w-[700px] w-full">
        <h2 className="text-2xl font-semibold text-left">Hồ sơ</h2>
      </div>

      <Card className="w-full max-w-[700px]">
        <CardHeader>
          <div className="flex items-center justify-between gap-4">
            <div>
              <CardTitle className="text-xl">{user.name}</CardTitle>
              <CardDescription>Mã bệnh nhân: {user.maBN}</CardDescription>
            </div>
          </div>
        </CardHeader>

        <Separator className="bg-gray-300 h-[1px]" />
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent>
            <h3 className="font-semibold text-lg mb-1">Thông tin cơ bản</h3>
            <div className="flex flex-col gap-2 mt-2">
              <div className="grid grid-cols-2">
                <Label className="text-base">Họ và tên:</Label>
                <p>{user.name}</p>
              </div>
              <div className="grid grid-cols-2">
                <Label className="text-base">Số điện thoại:</Label>
                {isEditing ? (
                  <div>
                    <Input {...register("soDienThoai")} />
                    {errors.soDienThoai && (
                      <p className="text-sm text-red-500 mt-1">{errors.soDienThoai.message}</p>
                    )}
                  </div>
                ) : (
                  <p>{user.soDienThoai}</p>
                )}
              </div>
              <div className="grid grid-cols-2">
                <Label className="text-base">Giới tính:</Label>
                <p>{user.gioiTinh}</p>
              </div>
              <div className="grid grid-cols-2">
                <Label className="text-base">Địa chỉ:</Label>
                {isEditing ? (
                  <div>
                    <Input {...register("diaChi")} />
                    {errors.diaChi && (
                      <p className="text-sm text-red-500 mt-1">{errors.diaChi.message}</p>
                    )}
                  </div>
                ) : (
                  <p>{user.diaChi || "------------"}</p>
                )}
              </div>
              <div className="grid grid-cols-2">
                <Label className="text-base">Email:</Label>
                <p>{user.email || "------------"}</p>
              </div>
            </div>

            <h3 className="font-semibold text-lg mb-1 mt-4">Thông tin bổ sung</h3>
            <div className="flex flex-col gap-2">
              <div className="grid grid-cols-2">
                <Label className="text-base">Mã BHYT:</Label>
                {isEditing ? (
                  <div>
                    <Input {...register("baoHiem")} />
                    {errors.baoHiem && (
                      <p className="text-sm text-red-500 mt-1">{errors.baoHiem.message}</p>
                    )}
                  </div>
                ) : (
                  <p>{user.baoHiem || "------------"}</p>
                )}
              </div>
              <div className="grid grid-cols-2">
                <Label className="text-base">Số CMND/CCCD:</Label>
                {isEditing ? (
                  <div>
                    <Input {...register("canCuocCongDan")} />
                    {errors.canCuocCongDan && (
                      <p className="text-sm text-red-500 mt-1">{errors.canCuocCongDan.message}</p>
                    )}
                  </div>
                ) : (
                  <p>{user.canCuocCongDan || "------------"}</p>
                )}
              </div>
              <div className="grid grid-cols-2">
                <Label className="text-base">Dân tộc:</Label>
                {isEditing ? (
                  <div>
                    <Input {...register("danToc")} />
                    {errors.danToc && (
                      <p className="text-sm text-red-500 mt-1">{errors.danToc.message}</p>
                    )}
                  </div>
                ) : (
                  <p>{user.danToc || "------------"}</p>
                )}
              </div>
              <div className="grid grid-cols-2">
                <Label className="text-base">Số liên hệ khẩn cấp:</Label>
                {isEditing ? (
                  <div>
                    <Input {...register("lienHeKhanCap")} />
                    {errors.lienHeKhanCap && (
                      <p className="text-sm text-red-500 mt-1">{errors.lienHeKhanCap.message}</p>
                    )}
                  </div>
                ) : (
                  <p>{user.lienHeKhanCap || "------------"}</p>
                )}
              </div>
            </div>
          
          </CardContent>
          <CardFooter className="justify-end max-w-[700px] mt-4">
            {isEditing ? (
              <div className="flex gap-3">
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Đang lưu…" : "Lưu"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    reset(user)
                    setIsEditing(false)
                  }}
                  className="w-fit px-6"
                >
                  Hủy
                </Button>
              </div>
            ) : (
              <Button className="w-fit px-6" onClick={() => setIsEditing(true)}>
                Thay đổi thông tin
              </Button>
            )}
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

export default HoSoPage
