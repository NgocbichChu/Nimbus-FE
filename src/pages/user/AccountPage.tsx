import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useForm } from "react-hook-form"
import { useState, useEffect } from "react"
import { doiMatKhau, layThongTinTaiKhoan, capNhatThongTin } from "../../api/accountApi"
import { yupResolver } from "@hookform/resolvers/yup"
import { taiKhoanSchema, passwordChangeSchema } from "../../validation/user-valid"
import type { TaiKhoan, PasswordChange } from "../../validation/user-valid"
import { Eye, EyeOff } from "lucide-react"

type User = {
  name: string
  soDienThoai: string
  gioiTinh: string
  email: string
}

const AccountPage = () => {
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [messageType, setMessageType] = useState<"success" | "error" | null>(null)
  const [updateMessage, setUpdateMessage] = useState("")
  const [updateType, setUpdateType] = useState<"success" | "error" | null>(null)
  const [user, setUser] = useState<User>({
    name: "",
    soDienThoai: "",
    gioiTinh: "",
    email: "",
  })
  const [showOld, setShowOld] = useState(false)
  const [showNew, setShowNew] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const handleDoiMatKhau = async (data: PasswordChange) => {
    setMessage("")
    setMessageType(null)
    setLoading(true)
    try {
      const response = await doiMatKhau({
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
      })
      if (response?.success) {
        setMessage("Đổi mật khẩu thành công")
        setMessageType("success")
        resetPwd()
      } else {
        setMessage(response?.message || "Đổi mật khẩu thất bại")
        setMessageType("error")
      }
    } catch (error) {
      setMessage("Đổi mật khẩu thất bại")
      setMessageType("error")
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TaiKhoan>({
    resolver: yupResolver(taiKhoanSchema),
    defaultValues: { soDienThoai: "" },
  })

  const {
    register: registerPwd,
    handleSubmit: handleSubmitPwd,
    reset: resetPwd,
    formState: { errors: pwdErrors, isSubmitting: pwdSubmitting },
  } = useForm<PasswordChange>({
    resolver: yupResolver(passwordChangeSchema),
    defaultValues: { oldPassword: "", newPassword: "", confirmNewPassword: "" },
  })

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await layThongTinTaiKhoan()
        const user = {
          name: res.data.hoTen,
          soDienThoai: res.data.soDienThoai,
          gioiTinh: res.data.gioiTinh,
          email: res.data.email,
        }
        setUser(user)
        reset({ soDienThoai: res.data.soDienThoai ?? "" })
      } catch (error) {
        console.log("Lỗi : ", error)
      }
    }
    fetchUser()
  }, [reset])

  const onSubmit = async (data: TaiKhoan) => {
    setUpdateMessage("")
    setUpdateType(null)
    try {
      await capNhatThongTin({
        hoTen: user.name,
        gioiTinh: user.gioiTinh,
        email: user.email,
        soDienThoai: data.soDienThoai,
      })
      setUser((prev) => ({
        ...prev,
        soDienThoai: data.soDienThoai,
      }))
      reset({ soDienThoai: data.soDienThoai })
      setIsEditing(false)
      setUpdateMessage("Cập nhật thông tin thành công")
      setUpdateType("success")
    } catch (error) {
      console.log("Lỗi : ", error)
      setUpdateMessage("Cập nhật thông tin thất bại")
      setUpdateType("error")
    }
  }

  return (
    <div className="bg-white dark:bg-black px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6">Tài khoản</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 justify-items-center items-start">
          <Card className="w-full max-w-2xl">
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
                  <div className="grid grid-cols-2 gap-1">
                    <Label className="text-base">Giới tính:</Label>
                    <p>{user.gioiTinh}</p>
                  </div>
                  <div className="grid grid-cols-2">
                    <Label className="text-base">Email:</Label>
                    <p>{user.email || "------------"}</p>
                  </div>
                  {updateMessage && (
                    <p
                      className={`text-sm mt-2 text-center ${
                        updateType === "success"
                          ? "text-green-600 dark:text-green-400"
                          : "text-red-500 dark:text-red-400"
                      }`}
                      aria-live="polite"
                    >
                      {updateMessage}
                    </p>
                  )}
                </div>
              </CardContent>
              <CardFooter className="justify-end mt-4">
                {isEditing ? (
                  <div className="flex gap-3">
                    <Button type="submit" className="w-fit px-6">
                      Lưu
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        reset({ soDienThoai: user.soDienThoai })
                        setIsEditing(false)
                        setUpdateMessage("")
                        setUpdateType(null)
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

          <Card className="w-full max-w-2xl">
            <form onSubmit={handleSubmitPwd(handleDoiMatKhau)}>
              <CardContent>
                <h3 className="font-semibold text-lg mb-4">Thay đổi mật khẩu</h3>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1">
                    <Label className="text-sm font-medium">
                      Mật khẩu hiện tại <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <Input
                        type={showOld ? "text" : "password"}
                        placeholder="Nhập mật khẩu hiện tại"
                        {...registerPwd("oldPassword")}
                      />
                      <button
                        type="button"
                        onClick={() => setShowOld((v) => !v)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                        aria-label={showOld ? "Ẩn mật khẩu" : "Hiển thị mật khẩu"}
                      >
                        {showOld ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                      </button>
                    </div>
                    {pwdErrors.oldPassword && (
                      <p className="text-sm text-red-500 mt-1">{pwdErrors.oldPassword.message}</p>
                    )}
                  </div>

                  <div className="flex flex-col gap-1">
                    <Label className="text-sm font-medium">
                      Mật khẩu mới <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <Input
                        type={showNew ? "text" : "password"}
                        placeholder="Nhập mật khẩu mới"
                        {...registerPwd("newPassword")}
                      />
                      <button
                        type="button"
                        onClick={() => setShowNew((v) => !v)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                        aria-label={showNew ? "Ẩn mật khẩu" : "Hiển thị mật khẩu"}
                      >
                        {showNew ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                      </button>
                    </div>
                    {pwdErrors.newPassword && (
                      <p className="text-sm text-red-500 mt-1">{pwdErrors.newPassword.message}</p>
                    )}
                  </div>

                  <div className="flex flex-col gap-1">
                    <Label className="text-sm font-medium">
                      Xác nhận mật khẩu mới <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <Input
                        type={showConfirm ? "text" : "password"}
                        placeholder="Xác nhận mật khẩu mới"
                        {...registerPwd("confirmNewPassword")}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirm((v) => !v)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                        aria-label={showConfirm ? "Ẩn mật khẩu" : "Hiển thị mật khẩu"}
                      >
                        {showConfirm ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                      </button>
                    </div>
                    {pwdErrors.confirmNewPassword && (
                      <p className="text-sm text-red-500 mt-1">
                        {pwdErrors.confirmNewPassword.message}
                      </p>
                    )}
                  </div>

                  {message && (
                    <p
                      className={`text-sm mt-2 text-center ${
                        messageType === "success"
                          ? "text-green-600 dark:text-green-400"
                          : "text-red-500 dark:text-red-400"
                      }`}
                      aria-live="polite"
                    >
                      {message}
                    </p>
                  )}
                </div>
              </CardContent>
              <CardFooter className="justify-end mt-4">
                <Button type="submit" className="px-6" disabled={loading || pwdSubmitting}>
                  {loading || pwdSubmitting ? "Đang xử lý..." : "Thay đổi mật khẩu"}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default AccountPage
