import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link } from "react-router-dom"
import { useState, useEffect } from "react"

type User = {
  name: string
  soDT: string
  ngaySinh: string
  diaChi: string
  maBHYT: string
  CCCD: string
}

const AccountPage = () => {
  const [user, setUser] = useState<User>({
    name: "Nguyễn Tuấn Anh",
    soDT: "0898123123",
    ngaySinh: "21/01/2005",
    diaChi: "Quận Tân Phú, TPHCM",
    maBHYT: "",
    CCCD: "",
  })

  return (
    <div className="container mx-auto px-4 py-8 bg-white dark:bg-black">
      <h2 className="text-2xl font-semibold mb-6">Tài khoản</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="w-full">
          <form>
            <CardContent>
              <h3 className="font-semibold text-lg mb-4">Thông tin tài khoản</h3>
              <div className="flex flex-col gap-2">
                <div className="grid grid-cols-2 gap-1">
                  <Label className="text-base">Họ và tên:</Label>
                  <p>{user.name}</p>
                </div>
                <div className="grid grid-cols-2 gap-1">
                  <Label className="text-base">Số điện thoại:</Label>
                  <p>{user.soDT}</p>
                </div>
                <div className="grid grid-cols-2 gap-1">
                  <Label className="text-base">Ngày sinh:</Label>
                  <p>{user.ngaySinh}</p>
                </div>
                <div className="grid grid-cols-2 gap-1">
                  <Label className="text-base">Địa chỉ:</Label>
                  <p>{user.diaChi}</p>
                </div>
                <div className="grid grid-cols-2 gap-1">
                  <Label className="text-base">Mã BHYT:</Label>
                  <p>{user.maBHYT || "------------"}</p>
                </div>
                <div className="grid grid-cols-2 gap-1">
                  <Label className="text-base">Số CMND/CCCD:</Label>
                  <p>{user.CCCD || "------------"}</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="justify-end mt-4">
              <Link to="/ho-so">
                <Button type="submit" className="px-6">
                  Thay đổi thông tin
                </Button>
              </Link>
            </CardFooter>
          </form>
        </Card>

        <Card className="w-full shadow-lg border">
          <form>
            <CardContent>
              <h3 className="font-semibold text-lg mb-4">Thay đổi mật khẩu</h3>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <Label className="text-sm font-medium">
                    Mật khẩu hiện tại <span className="text-red-500">*</span>
                  </Label>
                  <Input type="password" placeholder="Nhập mật khẩu hiện tại" />
                </div>
                <div className="flex flex-col gap-1">
                  <Label className="text-sm font-medium">
                    Mật khẩu mới <span className="text-red-500">*</span>
                  </Label>
                  <Input type="password" placeholder="Nhập mật khẩu mới" />
                </div>
              </div>
            </CardContent>
            <CardFooter className="justify-end mt-4">
              <Button type="submit" className="px-6">
                Thay đổi mật khẩu
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  )
}

export default AccountPage
