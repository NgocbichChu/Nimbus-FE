import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { ForgetPasswordSchema } from "@/validation/auth-valid"

const inputErrorClass = "border-red-500 focus:ring-red-500 focus:border-red-500 dark:border-red-500"

const ForgotPasswordForm = () => {
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

  const onSubmit = (data: ForgetPasswordSchema) => {
    console.log("Email : ", data.email)
  }

  return (
    <div className="max-w-md mx-auto p-6 ">
      <h2 className="text-center text-2xl font-bold mb-6 text-gray-800 dark:text-white">
        Quên mật khẩu
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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
    </div>
  )
}

export default ForgotPasswordForm
