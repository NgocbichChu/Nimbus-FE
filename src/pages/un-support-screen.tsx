// components/UnsupportedScreen.tsx
import { Monitor } from "lucide-react"
import { useEffect, useState } from "react"

const UnsupportedScreen = ({ children }: { children: React.ReactNode }) => {
  const [isDesktop, setIsDesktop] = useState(true)

  const checkScreenSize = () => {
    const width = window.innerWidth
    setIsDesktop(width >= 1024)
  }

  useEffect(() => {
    checkScreenSize()
    window.addEventListener("resize", checkScreenSize)
    return () => {
      window.removeEventListener("resize", checkScreenSize)
    }
  }, [])

  if (!isDesktop) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="mb-6">
            <div className="text-red-500 text-6xl mb-4">⚠️</div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              Thiết bị không được hỗ trợ
            </h1>
            <p className="text-gray-600 mb-6">
              Ứng dụng này chỉ được thiết kế để sử dụng trên máy tính desktop hoặc laptop.
            </p>
          </div>

          <div className="bg-blue-50 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-center mb-2">
              <Monitor className="h-6 w-6 text-blue-600 mr-2" />
              <span className="font-semibold text-blue-800">Yêu cầu hệ thống</span>
            </div>
            <p className="text-blue-700 text-sm">
              Vui lòng truy cập từ máy tính desktop hoặc laptop với độ phân giải tối thiểu 1024px
            </p>
          </div>

          <div className="text-sm text-gray-500 text-left">
            <p>Nếu bạn đang sử dụng máy tính, vui lòng:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Phóng to cửa sổ trình duyệt</li>
              <li>Kiểm tra độ phân giải màn hình</li>
              <li>Tải lại trang sau khi điều chỉnh</li>
            </ul>
          </div>
        </div>
      </div>
    )
  }

  return <>{children}</>
}

export default UnsupportedScreen
