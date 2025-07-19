import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link, useNavigate } from "react-router-dom"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useState } from "react"
import { toastError } from "@/helper/toast"
import { useAppDispatch } from "@/helper"
import { confirmOTP, registerUser } from "@/api/authApi"
import { authActions } from "@/redux/authSlice"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"

export function SignUpForm({ className, ...props }: React.ComponentProps<"form">) {
  const [state, setState] = useState({
    hoTen: "",
    gioiTinh: "",
    email: "",
    soDienThoai: "",
    matKhau: "",
    baoHiem: "",
    lienHeKhanCap: "",
  })
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const dispatch = useAppDispatch()
  const [showOTP, setShowOTP] = useState(false)
  const navigate = useNavigate()
  const [otp, setOtp] = useState("")

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!state.hoTen || !state.email || !state.matKhau || !confirmPassword) {
      toastError("Vui lòng nhập đầy đủ thông tin!")
      return
    }

    if (state.matKhau !== confirmPassword) {
      toastError("Mật khẩu xác nhận không khớp!")
      return
    }

    setIsLoading(true)

    try {
      const response = await registerUser({
        hoTen: state.hoTen,
        gioiTinh: state.gioiTinh,
        email: state.email,
        soDienThoai: state.soDienThoai,
        matKhau: state.matKhau,
        baoHiem: state.baoHiem,
        lienHeKhanCap: state.lienHeKhanCap,
      })

      if (response.success === true) {
        setShowOTP(true)
        dispatch(authActions.register(response.data || response))
        setState({
          hoTen: "",
          gioiTinh: "male",
          email: "",
          soDienThoai: "",
          matKhau: "",
          baoHiem: "",
          lienHeKhanCap: "",
        })
        setConfirmPassword("")
      }
    } catch (error) {
      console.error("Register error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword)
  }

  const handleConfirmOTP = async () => {
    if (!otp) {
      toastError("Vui lòng nhập OTP!")
      return
    }

    try {
      const response = await confirmOTP({ otp })
      if (response.success === true) {
        setTimeout(() => {
          navigate("/login")
        }, 1200)
      }
    } catch (error) {
      console.error("OTP confirmation error:", error)
    }
  }

  return (
    <>
      <form className={cn("flex flex-col gap-6", className)} onSubmit={handleRegister} {...props}>
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">{!showOTP ? "Đăng ký" : "Vui lòng nhập OTP!"}</h1>
        </div>
        {!showOTP ? (
          <>
            <div className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="name">Họ và tên *</Label>
                <Input
                  id="name"
                  type="text"
                  value={state.hoTen}
                  onChange={(e) => setState({ ...state, hoTen: e.target.value })}
                />
              </div>
              <div className="flex items-center gap-4">
                <Label className="min-w-[80px]">Giới tính:</Label>
                <RadioGroup
                  value={state.gioiTinh}
                  onValueChange={(value) => setState({ ...state, gioiTinh: value })}
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
                <Input
                  id="email"
                  type="email"
                  value={state.email}
                  onChange={(e) => setState({ ...state, email: e.target.value })}
                />
              </div>
              <div className="flex">
                <div className="grid gap-3">
                  <Label htmlFor="phone">Số điện thoại</Label>
                  <Input
                    id="phone"
                    type="text"
                    value={state.soDienThoai}
                    onChange={(e) => setState({ ...state, soDienThoai: e.target.value })}
                    className="w-38 "
                  />
                </div>
                <div className="grid gap-3 ml-auto">
                  <Label htmlFor="phone2">Liên hệ khẩn cấp</Label>
                  <Input
                    id="phone2"
                    type="text"
                    value={state.lienHeKhanCap}
                    onChange={(e) => setState({ ...state, lienHeKhanCap: e.target.value })}
                    className="w-38"
                  />
                </div>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="password">Mật khẩu *</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={state.matKhau}
                    onChange={(e) => setState({ ...state, matKhau: e.target.value })}
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
              </div>
              <div className="grid gap-3">
                <Label htmlFor="confirmPassword">Xác nhận mật khẩu *</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={toggleConfirmPasswordVisibility}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                    tabIndex={0}
                    aria-label={showConfirmPassword ? "Ẩn mật khẩu" : "Hiển thị mật khẩu"}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="size-4" />
                    ) : (
                      <Eye className="size-4" />
                    )}
                  </button>
                </div>
              </div>
              <Button className="w-full" type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Đăng ký
              </Button>
            </div>
            <div className="text-center text-sm">
              Bạn đã có tài khoản?{" "}
              <Link to="/login" className="underline underline-offset-4">
                Đăng nhập
              </Link>
            </div>
          </>
        ) : (
          <div className="w-full flex flex-col gap-2">
            <InputOTP
              value={otp}
              onChange={(e) => setOtp(e)}
              maxLength={6}
              pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
            <Button className="mt-2" onClick={handleConfirmOTP}>
              Xác nhận
            </Button>
          </div>
        )}
      </form>
    </>
  )
}
