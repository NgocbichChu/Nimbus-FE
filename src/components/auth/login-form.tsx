import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { useAppDispatch } from "../../helper/index"
import { authActions } from "@/redux/authSlice"
import { loginUser } from "@/api/authApi"
import { Eye, EyeOff, Loader } from "lucide-react"
import { decodeAndStoreUserFromToken } from "@/redux/decode"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { loginSchema, type LoginSchemaType } from "@/validation/auth-valid"


export function LoginForm({ className, ...props }: React.ComponentProps<"form">) {
  const [showPassword, setShowPassword] = useState(false)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginSchemaType>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: "",
      matKhau: "",
    },
  })

  const onSubmit = async (data: LoginSchemaType) => {
    try {
      const response = await loginUser({
        email: data.email,
        matKhau: data.matKhau,
      })

      if (response.success === true) {
        dispatch(authActions.login(response.data || response))
        const token = localStorage.getItem("token")
        if (token) {
          const payload = decodeAndStoreUserFromToken(token, dispatch)
          if (payload) {
            const roles = payload.roles
            if (roles.includes("ROLE_QUANLY")) {
              navigate("/dashboard")
            } else if (roles.includes("ROLE_BENHNHAN")) {
              navigate("/")
            }
          }
        }
      }
    } catch (error) {
      console.error("Login error:", error)
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      onSubmit={handleSubmit(onSubmit)}
      {...props}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Đăng nhập</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Nhập email bên dưới để đăng nhập vào tài khoản của bạn
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            placeholder="m@gmail.com"
            {...register("email")}
          />
          {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
        </div>
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="password">Mật khẩu *</Label>
            <Link
              to={"/forgot-password"}
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Quên mật khẩu?
            </Link>
          </div>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              {...register("matKhau")}
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
          {errors.matKhau && (
            <span className="text-sm text-red-500  block">{errors.matKhau.message}</span>
          )}
        </div>
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting && <Loader className="mr-2 h-4 w-4 animate-spin" />}
          Đăng nhập
        </Button>
      </div>
      <div className="text-center text-sm">
        Bạn chưa có tài khoản?{" "}
        <Link to="/sign-up" className="underline underline-offset-4">
          Đăng ký
        </Link>
      </div>
    </form>
  )
}
