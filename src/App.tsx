import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { ThemeProvider } from "./components/theme/theme-provider"
import { SidebarProvider } from "./components/ui/sidebar"
import UserLayout from "./layouts/UserLayout"
import AdminLayout from "./layouts/AdminLayout"
import HomePage from "./pages/user/HomePage"
import AboutPage from "./pages/user/AboutPage"
import DashboardPage from "./pages/admin/DashboardPage"
import UsersPage from "./pages/admin/UsersPage"
import LoginPage from "./pages/auth/LoginPage"
import SignUpPage from "./pages/auth/SignUpPage"
import { useEffect } from "react"
import { decodeAndStoreUserFromToken } from "./redux/decode"
import { useAppDispatch } from "./helper"
import DoctorsPage from "./pages/admin/DoctorsPage"
import AppointmentPage from "./pages/user/AppointmentPage"
import LienHePage from "./pages/user/LienHe"
import ChuyenKhoaPage from "./pages/user/ChuyenKhoaPage"
import ChuyenGiaPage from "./pages/user/ChuyenGiaPage"
import ProfilePage from "./pages/user/ProfilePage"
import ForgotPassword from "./pages/auth/ForgotPasswordPage"

function App() {
  const dispatch = useAppDispatch()
  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      decodeAndStoreUserFromToken(token, dispatch)
    }
  }, [dispatch])
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Router>
        <Routes>
          {/* Login Route - No Layout */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* User Routes - With Navbar */}
          <Route path="/" element={<UserLayout />}>
            <Route index element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/chuyen-khoa" element={<ChuyenKhoaPage />} />
            <Route path="/chuyen-gia" element={<ChuyenGiaPage />} />
            <Route path="/dat-lich" element={<AppointmentPage />} />
            <Route path="/lien-he" element={<LienHePage />} />
            <Route path="/ho-so" element={<ProfilePage />} />
            <Route path="/tai-khoan" element={<ProfilePage />} />
            <Route path="/ho-so-benh-an" element={<ProfilePage />} />
            <Route path="/lich-su-kham" element={<ProfilePage />} />
          </Route>

          {/* Admin Routes - With Sidebar */}
          <Route
            path="/dashboard"
            element={
              <SidebarProvider>
                <AdminLayout />
              </SidebarProvider>
            }
          >
            <Route index element={<DashboardPage />} />
            <Route path="users" element={<UsersPage />} />
            <Route path="doctors" element={<DoctorsPage />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App
