import { Link } from "react-router-dom"
import { AlertTriangle } from "lucide-react"

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-6 py-12">
      <div className="max-w-md text-center">
        <div className="flex justify-center mb-6">
          <div className="bg-red-100 text-red-600 p-4 rounded-full shadow-lg animate-bounce">
            <AlertTriangle className="w-12 h-12" />
          </div>
        </div>
        <h1 className="text-5xl font-bold text-foreground mb-2">404</h1>
        <p className="text-xl text-muted-foreground mb-4">Oops! Không tìm thấy trang.</p>
        <p className="text-sm text-muted-foreground mb-6">
          Có vẻ như đường dẫn bạn nhập không tồn tại hoặc đã bị xoá.
        </p>
        <Link
          to="/"
          className="inline-block bg-primary text-white px-6 py-3 rounded-lg shadow hover:bg-primary/90 transition"
        >
          Quay về trang chủ
        </Link>
      </div>
    </div>
  )
}
