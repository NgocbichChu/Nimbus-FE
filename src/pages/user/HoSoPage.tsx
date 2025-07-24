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
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"
import { vi } from "date-fns/locale"
import { format, parse } from "date-fns"

type User = {
  name: string
  email: string
  soDT: string
  ngaySinh: string
  gioiTinh: string
  diaChi: string
  maBN: string
  img: string
  maBHYT: string
  CCCD: string
  danToc: string
  ngheNghiep: string
}

const HoSoPage = () => {
  const [isEditing, setIsEditing] = useState(false)
  const [user, setUser] = useState<User>({
    name: "Nguyễn Tuấn Anh",
    email: "",
    soDT: "0898123123",
    ngaySinh: "21/01/2005",
    gioiTinh: "Nam",
    diaChi: "Quận Tân Phú, TPHCM",
    maBN: "9999",
    img: "",
    maBHYT: "",
    CCCD: "",
    danToc: "",
    ngheNghiep: "",
  })

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(() => {
    try {
      return parse(user.ngaySinh, "dd/MM/yyyy", new Date())
    } catch {
      return undefined
    }
  })

  const [open, setOpen] = useState(false)

  const { register, handleSubmit, reset } = useForm<User>({
    defaultValues: user,
  })

  const onSubmit = (data: User) => {
    if (selectedDate) {
      data.ngaySinh = format(selectedDate, "dd/MM/yyyy")
    }
    setUser(data)
    setIsEditing(false)
  }

  useEffect(() => {
    if (isEditing) {
      reset(user)
      try {
        const parsed = parse(user.ngaySinh, "dd/MM/yyyy", new Date())
        if (!isNaN(parsed.getTime())) {
          setSelectedDate(parsed)
        }
      } catch {
        setSelectedDate(undefined)
      }
    }
  }, [isEditing, user, reset])

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
                <Label className="text-base">Ngày sinh:</Label>
                {isEditing ? (
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="justify-start text-left font-normal w-full"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {selectedDate ? format(selectedDate, "dd/MM/yyyy") : "Chọn ngày"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        locale={vi}
                        mode="single"
                        selected={selectedDate}
                        onSelect={(date) => {
                          if (date) setSelectedDate(date)
                          setOpen(false)
                        }}
                        captionLayout="dropdown"
                        fromYear={1900}
                        toYear={2025}
                        disabled={(date) => date > new Date()}
                      />
                    </PopoverContent>
                  </Popover>
                ) : (
                  <p>{user.ngaySinh}</p>
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
                  <p>{user.diaChi}</p>
                )}
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
                <Label className="text-base">Nghề nghiệp:</Label>
                {isEditing ? (
                  <Input {...register("ngheNghiep")} defaultValue={user.ngheNghiep} />
                ) : (
                  <p>{user.ngheNghiep || "------------"}</p>
                )}
              </div>
              <div className="grid grid-cols-2">
                <Label className="text-base">Email:</Label>
                {isEditing ? (
                  <Input {...register("email")} defaultValue={user.email} />
                ) : (
                  <p>{user.email || "------------"}</p>
                )}
              </div>
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
    </div>
  )
}

export default HoSoPage
