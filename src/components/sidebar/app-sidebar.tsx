import { House, Users } from "lucide-react"

import { NavMain } from "@/components/sidebar/nav-main"
import { Sidebar, SidebarContent, SidebarHeader, SidebarRail } from "@/components/ui/sidebar"

const data = {
  navMain: [
    {
      title: "Trang chủ",
      url: "/dashboard",
      icon: House,
      isActive: true,
    },
    {
      title: "Quản lý bệnh nhân ",
      url: "/dashboard/users",
      icon: Users,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="border-b min-h-14">
        <div className="flex items-center gap-2">
          <img src="/vite.svg" alt="logo" className="size-8" />
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
