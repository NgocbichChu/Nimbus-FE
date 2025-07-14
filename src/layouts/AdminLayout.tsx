import { Navigate, Outlet, useNavigate } from "react-router-dom"
import { AppSidebar } from "@/components/sidebar/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { ModeToggle } from "@/components/theme/mode-toggle"
import { NavUser } from "@/components/sidebar/nav-user"
import { useAppSelector } from "@/helper"

const data = {
  user: {
    name: "Bich Chu",
    email: "bichchu@gmail.com",
    avatar: "/avatars/admin.jpg",
  },
}

const AdminLayout = () => {
  const navigate = useNavigate()
  const user = useAppSelector((state) => state.auth.user)
  const handleLogout = () => {
    navigate("/login")
  }
if (!user || !(user.roles.includes("ROLE_ADMIN") || user.roles.includes("ROLE_QUANLY"))) {
  return <Navigate to="/" replace />
}
  return (
    <>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-14 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-14 border-b">
          <div className="flex items-center justify-between px-4 w-full">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="#">Admin Dashboard</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Dashboard</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            <div className="flex items-center gap-2">
              <ModeToggle />
              <NavUser user={data.user} handleLogout={handleLogout} />
            </div>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <Outlet />
        </div>
      </SidebarInset>
    </>
  )
}

export default AdminLayout
