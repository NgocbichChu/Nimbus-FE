import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useForm } from "react-hook-form"
import { useState, useEffect } from "react"
import { doiMatKhau, layThongTinTaiKhoan, capNhatThongTin } from "../../api/accountApi"

type User = {
  name: string
  soDT: string
  gioiTinh: string
  email: string
}

const AccountPage = () => {
  const [isEditing, setIsEditing] = useState(false)
  const [oldPassword, setOldPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [updateMessage, setUpdateMessage] = useState("")
  const [user, setUser] = useState<User>({
    name: "",
    soDT: "",
    gioiTinh: "",
    email: "",
  })

  const handleDoiMatKhau = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage("")
    setLoading(true)
    try {
      const response = await doiMatKhau({
        oldPassword: oldPassword,
        newPassword: newPassword,
      })
      if (response?.success) {
        setMessage("Đổi mật khẩu thành công")
        setOldPassword("")
        setNewPassword("")
      } else {
        setMessage(response?.message || "Đổi mật khẩu thất bại")
      }
    } catch (error) {
      setMessage("Đổi mật khâu thất bại")
      console.log(error)
    }
  }
  const { register, handleSubmit, reset } = useForm<User>({
    defaultValues: user,
  })
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await layThongTinTaiKhoan()
        const user = {
          name: res.data.hoTen,
          soDT: res.data.soDienThoai,
          gioiTinh: res.data.gioiTinh === "M" ? "Nam" : "Nữ",
          email: res.data.email,
        }
        setUser(user)
        reset(user)
      } catch (error) {
        console.log("Lỗi : ", error)
      }
    }
    fetchUser()
  }, [reset])

  const onSubmit = async (data: User) => {
    setUpdateMessage("")
    try {
      await capNhatThongTin({
        hoTen: data.name,
        gioiTinh: data.gioiTinh === "Nam" ? "M" : "F",
        email: data.email,
        soDienThoai: data.soDT,
      })
      setUser((prev) => ({
        ...prev,
        hoTen: data.name,
        gioiTinh: data.gioiTinh === "Nam" ? "M" : "F",
        email: data.email,
        soDT: data.soDT,
      }))
      setIsEditing(false)
      setUpdateMessage("Cập nhật thông tin thành công")
    } catch (error) {
      console.log("Lỗi : ", error)
      setUpdateMessage("Cập nhật thông tin thất bại")
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-white dark:bg-black">
      <h2 className="text-2xl font-semibold mb-6">Tài khoản</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="w-full">
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent>
              <h3 className="font-semibold text-lg mb-4">Thông tin tài khoản</h3>
              <div className="flex flex-col gap-2">
                <div className="grid grid-cols-2 gap-1">
                  <Label className="text-base">Họ và tên:</Label>
                  <p>{user.name}</p>
                </div>
                <div className="grid grid-cols-2">
                  <Label className="text-base">Số điện thoại:</Label>
                  {isEditing ? <Input {...register("soDT")} /> : <p>{user.soDT}</p>}
                </div>
                <div className="grid grid-cols-2 gap-1">
                  <Label className="text-base">Giới tính:</Label>
                  <p>{user.gioiTinh}</p>
                </div>
                <div className="grid grid-cols-2">
                  <Label className="text-base">Email:</Label>
                  {isEditing ? (
                    <Input {...register("email")} />
                  ) : (
                    <p>{user.email || "------------"}</p>
                  )}
                </div>
                {updateMessage && (
                  <p className="text-sm mt-2 text-center text-green-600 dark:text-green-400">
                    {updateMessage}
                  </p>
                )}
              </div>
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

        <Card className="w-full shadow-lg border">
          <form onSubmit={handleDoiMatKhau}>
            <CardContent>
              <h3 className="font-semibold text-lg mb-4">Thay đổi mật khẩu</h3>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <Label className="text-sm font-medium">
                    Mật khẩu hiện tại <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    type="password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    placeholder="Nhập mật khẩu hiện tại"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <Label className="text-sm font-medium">
                    Mật khẩu mới <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Nhập mật khẩu mới"
                  />
                </div>
                {message && (
                  <p className="text-sm mt-2 text-center text-red-500 dark:text-red-400">
                    {message}
                  </p>
                )}
              </div>
            </CardContent>
            <CardFooter className="justify-end mt-4">
              <Button type="submit" className="px-6" disabled={loading}>
                {loading ? "Đang xử lý..." : "Thay đổi mật khẩu"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  )
}

export default AccountPage
