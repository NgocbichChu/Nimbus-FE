import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { ThemeProvider } from "./components/theme/theme-provider"
import { SidebarProvider } from "./components/ui/sidebar"
import UserLayout from "./layouts/UserLayout"
import AdminLayout from "./layouts/AdminLayout"
import HomePage from "./pages/user/HomePage"
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
import AppointmentAdmin from "./pages/admin/AppointmentAdmin"
import NotFoundPage from "./pages/not-found"
import AccountPage from "./pages/user/AccountPage"
import ForgotPassword from "./pages/auth/ForgotPasswordPage"
import HoSoPage from "./pages/user/HoSoPage"
import Certifications from "./pages/admin/Certification"
import AccessPage from "./pages/admin/AccessPage"
import UnsupportedScreen from "./pages/un-support-screen"
import LichKhamPage from "./pages/user/LichKhamPage"
import PatientDetail from "./pages/admin/patient/patient-detail"
import ChuyenKhoaDetail from "./pages/user/chuyenKhoa-detail"

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
            <Route path="/chuyen-khoa" element={<ChuyenKhoaPage />} />
            <Route path="/chuyen-gia" element={<ChuyenGiaPage />} />
            <Route path="/dat-lich" element={<AppointmentPage />} />
            <Route path="/lien-he" element={<LienHePage />} />
            <Route path="/tai-khoan" element={<AccountPage />} />
            <Route path="/ho-so" element={<HoSoPage />} />
            <Route path="/lich-kham" element={<LichKhamPage />} />
            <Route path="/chuyen-khoa/:chuyenKhoaId" element={<ChuyenKhoaDetail/>}/>
          </Route>

          {/* Admin Routes - With Sidebar */}
          <Route
            path="/dashboard"
            element={
              <UnsupportedScreen>
                <SidebarProvider>
                  <AdminLayout />
                </SidebarProvider>
              </UnsupportedScreen>
            }
          >
            <Route index element={<DashboardPage />} />
            <Route path="patients" element={<UsersPage />} />
            <Route path="patients/:benhnhan_id" element={<PatientDetail />} />
            <Route path="doctors" element={<DoctorsPage />} />
            <Route path="appointments" element={<AppointmentAdmin />} />
            <Route path="access" element={<AccessPage />} />

            <Route path="certifications" element={<Certifications />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App
