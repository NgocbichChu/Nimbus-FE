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

type User = {
  name: string
  email: string
  soDT: string
  gioiTinh: string
  diaChi: string
  maBN: string
  img: string
  maBHYT: string
  CCCD: string
  danToc: string
  lienHeKhanCap: string
}

const HoSoPage = () => {
  const [isEditing, setIsEditing] = useState(false)
  const [updateMessage, setUpdateMessage] = useState("")
  const [user, setUser] = useState<User>({
    name: "",
    email: "",
    soDT: "",
    gioiTinh: "",
    diaChi: "",
    maBN: "",
    img: "",
    maBHYT: "",
    CCCD: "",
    danToc: "",
    lienHeKhanCap: "",
  })

  const { register, handleSubmit, reset } = useForm<User>({
    defaultValues: user,
  })

  const onSubmit = async (data: User) => {
    setUpdateMessage("")
    try {
      const payload = {
        benhNhanId: user.maBN,
        hoTen: user.name,
        gioiTinh: data.gioiTinh === "M" ? "Nam" : "Nữ",
        email: user.email,
        soDienThoai: data.soDT,
        diaChi: data.diaChi,
        baoHiem: data.maBHYT,
        canCuocCongDan: data.CCCD,
        danToc: data.danToc,
        lienHeKhanCap: data.lienHeKhanCap,
      }
      await capNhatBenhNhan(payload)
      setUser((prev) => ({
        ...prev,
        name: prev.name,
        gioiTinh: data.gioiTinh === "M" ? "Nam" : "Nữ",
        email: prev.email,
        soDT: data.soDT,
        diaChi: data.diaChi,
        maBHYT: data.maBHYT,
        CCCD: data.CCCD,
        danToc: data.danToc,
        lienHeKhanCap: data.lienHeKhanCap,
      }))
      setIsEditing(false)
      setUpdateMessage("Cập nhật thông tin thành công")
    } catch (error) {
      console.log("Lỗi : ", error)
      setUpdateMessage("Cập nhật thông tin thất bại")
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
          soDT: res.data.soDienThoai || "",
          gioiTinh: res.data.gioiTinh === "M" ? "Nam" : "Nữ",
          email: res.data.email || "",
          diaChi: res.data.diaChi || "",
          maBN: res.data.benhNhanId || "",
          img: "",
          maBHYT: res.data.baoHiem || "",
          CCCD: res.data.canCuocCongDan || "",
          danToc: res.data.danToc || "",
          lienHeKhanCap: res.data.lienHeKhanCap || "",
        }
        setUser(user)
        reset(user)
      } catch (error) {}
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
            <img
              src={user.img ? user.img : "https://ui.shadcn.com/placeholder.svg"}
              alt="Ảnh bệnh nhân"
              className="w-16 h-16 rounded-full object-cover border"
            />
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
                  <Input {...register("soDT")} defaultValue={user.soDT} />
                ) : (
                  <p>{user.soDT}</p>
                )}
              </div>
              <div className="grid grid-cols-2">
                <Label className="text-base">Giới tính:</Label>
                <p>{user.gioiTinh}</p>
              </div>
              <div className="grid grid-cols-2">
                <Label className="text-base">Địa chỉ:</Label>
                {isEditing ? (
                  <Input {...register("diaChi")} defaultValue={user.diaChi} />
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
                  <Input {...register("maBHYT")} defaultValue={user.maBHYT} />
                ) : (
                  <p>{user.maBHYT || "------------"}</p>
                )}
              </div>
              <div className="grid grid-cols-2">
                <Label className="text-base">Số CMND/CCCD:</Label>
                {isEditing ? (
                  <Input {...register("CCCD")} defaultValue={user.CCCD} />
                ) : (
                  <p>{user.CCCD || "------------"}</p>
                )}
              </div>
              <div className="grid grid-cols-2">
                <Label className="text-base">Dân tộc:</Label>
                {isEditing ? (
                  <Input {...register("danToc")} defaultValue={user.danToc} />
                ) : (
                  <p>{user.danToc || "------------"}</p>
                )}
              </div>
              <div className="grid grid-cols-2">
                <Label className="text-base">Số liên hệ khẩn cấp:</Label>
                {isEditing ? (
                  <Input {...register("lienHeKhanCap")} defaultValue={user.lienHeKhanCap} />
                ) : (
                  <p>{user.lienHeKhanCap || "------------"}</p>
                )}
              </div>
            </div>
            {updateMessage && (
              <p className="text-sm mt-2 text-center text-green-600 dark:text-green-400">
                {updateMessage}
              </p>
            )}
          </CardContent>
          <CardFooter className="justify-end max-w-[700px] mt-4">
            {isEditing ? (
              <div className="flex gap-3">
                <Button type="submit" className="w-fit px-6">
                  Lưu
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
