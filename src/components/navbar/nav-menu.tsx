import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import type { NavigationMenuProps } from "@radix-ui/react-navigation-menu"
import { Link } from "react-router-dom"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export const NavMenu = (props: NavigationMenuProps) => (
  <NavigationMenu {...props}>
    <NavigationMenuList className="gap-6 space-x-0 data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-start ">
      <NavigationMenuItem>
        <NavigationMenuLink asChild>
          <Link to="/">Trang chủ</Link>
        </NavigationMenuLink>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationMenuLink asChild>
          <Link to="/chuyen-gia">Chuyên gia</Link>
        </NavigationMenuLink>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationMenuLink asChild>
          <Link to="/chuyen-khoa">Chuyên khoa</Link>
        </NavigationMenuLink>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationMenuLink asChild>
          <Link to="/dat-lich">Đặt lịch</Link>
        </NavigationMenuLink>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationMenuLink asChild>
          <Link to="/lien-he">Liên hệ</Link>
        </NavigationMenuLink>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <NavigationMenuLink className="cursor-pointer">Thông tin cá nhân</NavigationMenuLink>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="start">
            <DropdownMenuItem asChild>
              <Link to="/tai-khoan">Tài khoản</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/ho-so">Hồ sơ</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/lich-su-kham">Lịch sử khám</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </NavigationMenuItem>
    </NavigationMenuList>
  </NavigationMenu>
)
