import { BadgeCheck, BookUser, ClipboardPlus, GraduationCap, House, Users } from "lucide-react"

import { NavMain } from "@/components/sidebar/nav-main"
import { Sidebar, SidebarContent, SidebarHeader, SidebarRail } from "@/components/ui/sidebar"

const data = {
  navMain: [
    {
      title: "Thống kê",
      url: "/dashboard",
      icon: House,
      isActive: true,
    },
    {
      title: "Quản lý bệnh nhân ",
      url: "/dashboard/patients",
      icon: BookUser,
    },
    {
      title: "Quản lý bác sĩ",
      url: "/dashboard/doctors",
      icon: Users,
    },
    {
      title: "Quản lý lịch khám",
      url: "/dashboard/appointments",
      icon: ClipboardPlus,
    },
    {
      title: "Quyền truy cập",
      url: "/dashboard/access",
      icon: BadgeCheck,
    },
    {
      title: "Duyệt chứng chỉ",
      url: "/dashboard/certifications",
      icon: GraduationCap,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="border-b min-h-14">
        <div className="flex items-center gap-2 mt-1">
          <img src="./public/logoNimbus.svg" alt="logo" className="size-8.5" />
          <span className="font-semibold group-data-[collapsible=icon]:hidden">Nimbus</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
