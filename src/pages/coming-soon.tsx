import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

export default function ComingSoon() {
  const navigate = useNavigate()

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-tr from-indigo-100 to-purple-200 dark:from-purple-900 dark:to-indigo-900 px-6 text-center">
      <h1 className="text-7xl font-extrabold text-indigo-700 dark:text-indigo-300 mb-6 animate-pulse">
        🚧
      </h1>

      <h2 className="text-5xl font-bold text-indigo-900 dark:text-indigo-200 mb-4 drop-shadow-lg animate-fadeInUp">
        Coming Soon!
      </h2>

      <p className="max-w-xl text-lg text-indigo-800 dark:text-indigo-300 mb-10 opacity-80 animate-fadeInUp delay-200">
        Tính năng đang được xây dựng bởi đội ngũ phát triển. Hãy quay lại sau để trải nghiệm những điều tuyệt vời nhé!
      </p>

      <Button
        variant="outline"
       onClick={() => navigate("/dashboard")}
        className="px-10 animate-bounce"
      >
        Về Dashboard
      </Button>

      <style>{`
        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease forwards;
        }
        .animate-fadeInUp.delay-200 {
          animation-delay: 0.2s;
        }
      `}</style>
    </div>
  )
}
