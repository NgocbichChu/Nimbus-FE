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
import { NavAdmin } from "@/components/sidebar/nav-admin"
import { useAppDispatch, useAppSelector } from "@/helper"
import { logoutUser } from "@/api/authApi"
import { logout } from "@/redux"

const AdminLayout = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const user = useAppSelector((state) => state.auth.user)
  const handleLogout = async () => {
    await logoutUser()
    dispatch(logout())
    navigate("/login")
  }
  if (!user || !(user.roles.includes("ROLE_ADMIN") || user.roles.includes("ROLE_QUANLY"))) {
    return <Navigate to="/login" replace />
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
              <NavAdmin
                user={{
                  name: user.hoten,
                  email: user.sub,
                  avatar: "/avatars/admin.jpg",
                }}
                handleLogout={handleLogout}
              />
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
