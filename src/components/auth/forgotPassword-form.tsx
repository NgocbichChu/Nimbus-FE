import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { ForgetPasswordSchema, OtpSchema, ResetPasswordSchema } from "@/validation/auth-valid"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { forgotPassword, resetPassword, resetOtp } from "../../api/forgotPasswordApi"
import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import { toastSuccess } from "@/helper/toast"
import { useNavigate } from "react-router-dom"

const inputErrorClass = "border-red-500 focus:ring-red-500 focus:border-red-500 dark:border-red-500"

const ForgotPasswordForm = () => {
  const navigate = useNavigate()
  const [step, setStep] = useState<"email" | "otp" | "password">("email")
  const [email, setEmail] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const emailForm = useForm({
    resolver: yupResolver(ForgetPasswordSchema),
    defaultValues: { email: "" },
  })

  const otpForm = useForm({
    resolver: yupResolver(OtpSchema),
    defaultValues: { otp: "" },
  })

  const pwForm = useForm({
    resolver: yupResolver(ResetPasswordSchema),
    defaultValues: { matKhau: "" },
  })

  const sendEmail = async (data: any) => {
    try {
      const res = await forgotPassword(data.email)
      if (res.success) {
        toastSuccess("Gửi email thành công")
        setEmail(data.email)
        setStep("otp")
      } else {
        emailForm.setError("email", { message: res.message || "Email không tồn tại" })
      }
    } catch {
      emailForm.setError("email", { message: "Email không tồn tại" })
    }
  }

  const sendOtp = async (data: any) => {
    try {
      const res = await resetOtp({ email, otp: data.otp })
      if (res.success) {
        toastSuccess("OTP hợp lệ")
        setStep("password")
      } else {
        otpForm.setError("otp", { message: "Sai OTP" })
      }
    } catch {
      otpForm.setError("otp", { message: "Sai OTP" })
    }
  }

  const setNewPw = async (data: any) => {
    try {
      const res = await resetPassword({ email, newPassword: data.matKhau })
      if (res.success) {
        toastSuccess("Đặt mật khẩu thành công")
        navigate("/login")
      } else {
        pwForm.setError("matKhau", { message: res.message || "Đặt mật khẩu thất bại" })
      }
    } catch {
      pwForm.setError("matKhau", { message: "Đặt mật khẩu thất bại" })
    }
  }

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-center text-2xl font-bold mb-6">Quên mật khẩu</h2>

      {step === "email" && (
        <form onSubmit={emailForm.handleSubmit(sendEmail)} className="space-y-5">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-left">Email *</label>
            <input
              type="email"
              placeholder="Nhập email"
              className={`w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none ${
                emailForm.formState.errors.email ? inputErrorClass : ""
              }`}
              {...emailForm.register("email")}
            />
            {emailForm.formState.errors.email && (
              <p className="text-sm text-red-500">
                {emailForm.formState.errors.email.message as string}
              </p>
            )}
          </div>
          <Button type="submit" className="w-full bg-blue-600 text-white">
            Gửi
          </Button>
        </form>
      )}

      {step === "otp" && (
        <form onSubmit={otpForm.handleSubmit(sendOtp)} className="space-y-5">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-left">Mã OTP *</label>
            <InputOTP
              value={otpForm.watch("otp")}
              onChange={(val) => otpForm.setValue("otp", val, { shouldValidate: true })}
              maxLength={6}
            >
              <InputOTPGroup className="grid grid-cols-6 gap-2 w-full">
                {Array.from({ length: 6 }).map((_, i) => (
                  <InputOTPSlot
                    key={i}
                    index={i}
                    className={`h-14 w-full text-center border rounded ${
                      otpForm.formState.errors.otp ? "border-red-500" : ""
                    }`}
                  />
                ))}
              </InputOTPGroup>
            </InputOTP>
            {otpForm.formState.errors.otp && (
              <p className="text-sm text-red-500">
                {otpForm.formState.errors.otp.message as string}
              </p>
            )}
          </div>
          <Button type="submit" className="w-full bg-blue-600 text-white">
            Gửi
          </Button>
        </form>
      )}

      {step === "password" && (
        <form onSubmit={pwForm.handleSubmit(setNewPw)} className="space-y-5">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-left">Mật khẩu mới *</label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Nhập mật khẩu mới"
                className={`w-full pr-10 ${pwForm.formState.errors.matKhau ? inputErrorClass : ""}`}
                {...pwForm.register("matKhau")}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                aria-label={showPassword ? "Ẩn mật khẩu" : "Hiển thị mật khẩu"}
              >
                {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>
            {pwForm.formState.errors.matKhau && (
              <p className="text-sm text-red-500">
                {pwForm.formState.errors.matKhau.message as string}
              </p>
            )}
          </div>
          <Button type="submit" className="w-full bg-blue-600 text-white">
            Đặt lại mật khẩu
          </Button>
        </form>
      )}
    </div>
  )
}

export default ForgotPasswordForm
