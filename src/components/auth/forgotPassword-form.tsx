import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { ForgetPasswordSchema } from "@/validation/auth-valid"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { forgotPassword, resetPassword } from "../../api/forgotPasswordApi"
import { useState } from "react"
import { toastSuccess, toastError } from "@/helper/toast"
import { useNavigate } from "react-router-dom"

const inputErrorClass = "border-red-500 focus:ring-red-500 focus:border-red-500 dark:border-red-500"

const ForgotPasswordForm = () => {
  const navigate = useNavigate()
  const [otp, setOtp] = useState("")
  const [email, setEmail] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [step, setStep] = useState<"email" | "otp">("email")

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgetPasswordSchema>({
    resolver: yupResolver(ForgetPasswordSchema),
    defaultValues: {
      email: "",
    },
  })

  const handleForgotPassword = async (data: ForgetPasswordSchema) => {
    try {
      const res = await forgotPassword(data.email)
      if (res.success) {
        toastSuccess("Gửi email thành công!")
        setEmail(data.email)
        setStep("otp")
      } else toastError("Gửi email thất bại!")
    } catch (error) {
      console.log("Lỗi : ", error)
    }
  }

  const handleSetNewPassword = async () => {
    if (!otp || !newPassword) {
      toastError("Vui lòng nhập OTP va mật khẩu mới")
      return
    }
    try {
      const res = await resetPassword({
        email,
        otp,
        newPassword,
      })
      if (res.success) {
        toastSuccess("Đặt lại mật khẩu thành công!")
        navigate("/login")
      } else {
        toastError("Mã OTP không đúng hoặc đã hết hạn")
      }
    } catch (error) {
      console.log("Lỗi : ", error)
      toastError("Lỗi đặt lại mật khẩu")
    }
  }

  return (
    <div className="max-w-md mx-auto p-6 ">
      <h2 className="text-center text-2xl font-bold mb-6 text-gray-800 dark:text-white">
        Quên mật khẩu
      </h2>
      {step == "email" && (
        <form onSubmit={handleSubmit(handleForgotPassword)} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="block mb-2 font-medium text-gray-700 dark:text-gray-200"
            >
              Email *
            </label>
            <input
              id="email"
              type="email"
              placeholder="Nhập email của bạn"
              className={`w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none   ${
                errors.email ? inputErrorClass : ""
              }`}
              {...register("email")}
            />
            {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md shadow transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Đang gửi..." : "Gửi yêu cầu"}
          </button>
        </form>
      )}
      {step == "otp" && (
        <div className="w-full max-w-sm mx-auto flex flex-col gap-6 items-center">
          <div className="w-full flex flex-col gap-2">
            <label className="text-sm font-medium text-left text-dark">Nhập mã OTP</label>
            <InputOTP value={otp} onChange={setOtp} maxLength={6}>
              <InputOTPGroup className="grid grid-cols-6 gap-2 w-full">
                {Array.from({ length: 6 }).map((_, index) => (
                  <InputOTPSlot
                    key={index}
                    index={index}
                    className="h-14 w-full text-center text-lg bg-zinc-800 text-dark bg-whited border border-gray-600 rounded"
                  />
                ))}
              </InputOTPGroup>
            </InputOTP>
          </div>

          <div className="w-full flex flex-col gap-2">
            <label className="text-sm font-medium text-left text-dark">Mật khẩu mới</label>
            <Input
              type="password"
              placeholder="Nhập mật khẩu mới"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <Button
              className="w-40 mt-2 self-center bg-blue-600 hover:bg-blue-700 transition rounded-md"
              onClick={handleSetNewPassword}
            >
              Đặt lại mật khẩu
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default ForgotPasswordForm
