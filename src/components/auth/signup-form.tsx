import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link, useNavigate } from "react-router-dom"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import { useEffect, useState } from "react"
import { useAppDispatch } from "@/helper"
import { confirmOTP, registerUser, resendOTP } from "@/api/authApi"
import { authActions } from "@/redux/authSlice"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp"
import { toastError } from "@/helper/toast"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { signUpSchema, type SignUpSchemaType } from "@/validation/auth-valid"

export function SignUpForm({ className, ...props }: React.ComponentProps<"form">) {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [showOTP, setShowOTP] = useState(false)
  const [otp, setOtp] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const [countdown, setCountdown] = useState(10)

  const startCountdown = () => {
    setCountdown(10)
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval)
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return interval
  }

  useEffect(() => {
    if (!showOTP) return
    const interval = startCountdown()
    return () => clearInterval(interval)
  }, [showOTP])

  const handleResendOTP = async () => {
    try {
      await resendOTP()
      startCountdown()
      // Gọi lại API nếu có, ví dụ:
      // await resendOTP({ soDienThoai: watch("soDienThoai") })
    } catch (error) {
      console.log(error)
      toastError("Không thể gửi lại OTP. Vui lòng thử lại.")
    }
  }
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<SignUpSchemaType>({
    resolver: yupResolver(signUpSchema),
    defaultValues: {
      hoTen: "",
      gioiTinh: "M",
      email: "",
      soDienThoai: "",
      matKhau: "",
      confirmPassword: "",
    },
  })

  const onSubmit = async (data: SignUpSchemaType) => {
    setIsLoading(true)
    try {
      const response = await registerUser(data)

      if (response.success === true) {
        setShowOTP(true)
        dispatch(authActions.register(response.data || response))
        reset()
      }
    } catch (error) {
      console.error("Register error:", error)
    } finally {
      setIsLoading(false)
    }
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
    <form
      className={cn("flex flex-col gap-6", className)}
      onSubmit={handleSubmit(onSubmit)}
      {...props}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">{!showOTP ? "Đăng ký" : "Vui lòng nhập OTP!"}</h1>
      </div>

      {!showOTP ? (
        <>
          <div className="grid gap-6">
            {/* Họ tên */}
            <div className="grid gap-3">
              <Label htmlFor="name">Họ và tên *</Label>
              <Input id="name" type="text" {...register("hoTen")} />
              {errors.hoTen && <p className="text-sm text-red-500">{errors.hoTen.message}</p>}
            </div>

            {/* Giới tính */}
            <div className="flex items-center gap-4">
              <Label className="min-w-[80px]">Giới tính:</Label>
              <RadioGroup
                value={watch("gioiTinh")}
                onValueChange={(value) => {
                  // workaround vì RadioGroup không hỗ trợ trực tiếp register
                  const event = { target: { name: "gioiTinh", value } }
                  register("gioiTinh").onChange(event)
                }}
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
              {errors.gioiTinh && <p className="text-sm text-red-500">{errors.gioiTinh.message}</p>}
            </div>

            {/* Email */}
            <div className="grid gap-3">
              <Label htmlFor="email">Email *</Label>
              <Input id="email" type="email" {...register("email")} />
              {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
            </div>

            {/* SĐT và liên hệ khẩn cấp */}
            <div className="grid gap-3 w-full">
              <Label htmlFor="phone">Số điện thoại</Label>
              <Input id="phone" type="text" {...register("soDienThoai")} />
              {errors.soDienThoai && (
                <p className="text-sm text-red-500">{errors.soDienThoai.message}</p>
              )}
            </div>

            {/* Mật khẩu */}
            <div className="grid gap-3">
              <Label htmlFor="password">Mật khẩu *</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  {...register("matKhau")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                  aria-label="Toggle Password"
                >
                  {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
              {errors.matKhau && <p className="text-sm text-red-500">{errors.matKhau.message}</p>}
            </div>

            {/* Xác nhận mật khẩu */}
            <div className="grid gap-3">
              <Label htmlFor="confirmPassword">Xác nhận mật khẩu *</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  {...register("confirmPassword")}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                  aria-label="Toggle Confirm Password"
                >
                  {showConfirmPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>
              )}
            </div>

            {/* Submit */}
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
        // OTP UI
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
          <p className="text-center text-sm text-muted-foreground">
            OTP sẽ hết hạn sau: <span className="font-semibold text-primary">{countdown}s</span>
          </p>
          <Button className="mt-1" onClick={handleConfirmOTP} disabled={countdown === 0}>
            Xác nhận
          </Button>
          {countdown === 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleResendOTP}
              className="text-sm text-blue-600"
            >
              Gửi lại mã OTP
            </Button>
          )}
        </div>
      )}
    </form>
  )
}
