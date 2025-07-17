import { Link, Outlet } from "react-router-dom"
import { Logo } from "../components/navbar/logo"
import { NavMenu } from "../components/navbar/nav-menu"
import { NavigationSheet } from "../components/navbar/navigation-sheet"
import { ModeToggle } from "../components/theme/mode-toggle"
import { Button } from "@/components/ui/button"
import { useAppSelector } from "@/helper"
import Footer from "../components/footer/footer"

const UserLayout = () => {
  const user = useAppSelector((state) => state.auth.user as any)
  return (
    <div className="min-h-screen bg-muted">
      <nav className="h-16 bg-blue-200 dark:bg-black dark:text-white border-b z-50 w-full fixed">
        <div className="h-full flex items-center justify-between max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-8">
            <Logo />

            {/* Desktop Menu */}
            <NavMenu className="hidden md:block" />
          </div>

          <div className="flex items-center gap-3">
            {!user ? (
              <>
                <Button variant="outline" asChild>
                  <Link to="/login">Đăng nhập</Link>
                </Button>
                <Button variant="default" asChild>
                  <Link to="/sign-up">Đăng ký</Link>
                </Button>
              </>
            ) : (
              <span>{user?.hoten}</span>
            )}

            <ModeToggle />

            {/* Mobile Menu */}
            <div className="md:hidden">
              <NavigationSheet />
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 pt-16 mb-10">
        <Outlet />
        {/* <div className="h-300"></div> */}
      </main>
      <Footer />
    </div>
  )
}

export default UserLayout
