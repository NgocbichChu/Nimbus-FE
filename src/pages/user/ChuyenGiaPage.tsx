import { getDanhSachChuyenGia } from "../../api/chuyenGiaApi"
import BackToTopButton from "@/components/back-to-top/back-to-top"
import { Input } from "@/components/ui/input"
import { useEffect, useMemo, useState } from "react"

const ChuyenGiaPage = () => {
  const [listChuyenGia, setListChuyenGia] = useState<any[]>([])
  const [search, setSearch] = useState("")

  useEffect(() => {
    const fetchChuyenGia = async () => {
      try {
        const res = await getDanhSachChuyenGia()
        setListChuyenGia(res.data || [])
      } catch (error) {
        console.log("Lỗi : ", error)
      }
    }
    fetchChuyenGia()
  }, [])

  const normalize = (str: any) =>
    (str ?? "")
      .toString()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim()

  const filteredChuyenGia = useMemo(() => {
    const q = normalize(search)
    if (!q) return listChuyenGia

    return listChuyenGia.filter((item: any) => {
      const tenKhoa = normalize(item.tenKhoa || item.chuyenKhoa?.tenKhoa || item.chuyenKhoa)
      const hoTen = normalize(item.hoTen)
      const trinhDo = normalize(item.trinhDo)
      return tenKhoa.includes(q) || hoTen.includes(q) || trinhDo.includes(q)
    })
  }, [listChuyenGia, search])

  const chuyenGiaImg = [
    { bacsi_id: 1, img: "https://bvtn.org.vn/wp-content/uploads/2024/05/Le-Van-Quang.jpg.webp" },
    {
      bacsi_id: 2,
      img: "https://bvtn.org.vn/wp-content/uploads/2024/05/Bui-Thi-Huong-Quynh-1.jpg.webp",
    },
    { bacsi_id: 3, img: "https://bvtn.org.vn/wp-content/uploads/2023/12/nguyen-van-tan.jpg.webp" },
    {
      bacsi_id: 4,
      img: "https://bvtn.org.vn/wp-content/uploads/2024/05/Tran-Thi-huong-Mai-Duoc.jpg.webp",
    },
    {
      bacsi_id: 5,
      img: "https://bvtn.org.vn/wp-content/uploads/2024/05/Pham-Thi-My-Dung.jpg.webp",
    },
    {
      bacsi_id: 6,
      img: "https://bvtn.org.vn/wp-content/uploads/2024/05/Nguyen-Thi-Mai-Huong.jpg.webp",
    },
    { bacsi_id: 7, img: "https://bvtn.org.vn/wp-content/uploads/2024/05/Pham-Cong-Nhan.jpg.webp" },
    {
      bacsi_id: 8,
      img: "https://bvtn.org.vn/wp-content/uploads/2024/06/Nguyen-Pham-Bao-Ngoc.jpg.webp",
    },
    { bacsi_id: 9, img: "https://bvtn.org.vn/wp-content/uploads/2024/05/bs-do-duy-dat.jpg.webp" },
  ]

  const getImage = (id: any) =>
    chuyenGiaImg.find((i) => i.bacsi_id?.toString() === id?.toString())?.img

  const getInitials = (fullName = "") => {
    const parts = fullName.trim().split(/\s+/)
    const lastTwo = parts.slice(-2)
    return lastTwo.map((p) => p[0]?.toUpperCase() || "").join("")
  }

  return (
    <div className="container mx-auto px-4 py-10">
      {/* Header */}
      <div className="relative bg-gradient-to-r from-sky-700 via-sky-600 to-sky-500 dark:from-blue-900 dark:via-blue-800 dark:to-blue-700 rounded-xl shadow-lg overflow-hidden p-6 sm:p-8">
        <div className="absolute inset-0 bg-black/20"></div>

        {/* Content */}
        <div className="relative flex flex-col sm:flex-row items-center sm:justify-between gap-6">
          {/* Left text */}
          <div className="text-center sm:text-left">
            <h2 className="text-3xl font-extrabold text-white flex items-center gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8 text-yellow-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 14l9-5-9-5-9 5 9 5z"
                />
              </svg>
              Đội Ngũ Chuyên Gia
            </h2>
            <p className="mt-2 text-blue-100 text-sm sm:text-base">
              Chúng tôi quy tụ những chuyên gia hàng đầu trong lĩnh vực y tế
            </p>
          </div>

          {/* Search form */}
          <form className="flex gap-2 w-full sm:w-auto mt-8" onSubmit={(e) => e.preventDefault()}>
            <div className="relative w-full sm:w-72">
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-white/70">
                🔍
              </span>
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Tìm kiếm chuyên gia,trình độ..."
                className="w-full pl-10 rounded-xl bg-transparent !text-white placeholder:!text-white border !border-white/80 focus-visible:!ring-2 focus-visible:!ring-white focus-visible:!border-white focus:ring-offset-0"
              />
            </div>
          </form>
        </div>
      </div>

      {/* Danh sách chuyên gia */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-10">
        {filteredChuyenGia.slice(0, 9).map((item: any, index: number) => {
          const imgSrc = getImage(item.bacsi_id)
          return (
            <div
              key={item.bacsi_id ?? index}
              className="bg-white dark:bg-blue-600 text-gray-800 dark:text-white text-center py-6 px-4 rounded-2xl shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl animate-fadeIn"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative w-28 h-28 mx-auto mb-4">
                {imgSrc ? (
                  <img
                    src={imgSrc}
                    alt={item.hoTen}
                    className="w-28 h-28 object-cover rounded-full border-4 border-yellow-400 shadow-md"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-28 h-28 rounded-full border-4 border-yellow-400 shadow-md flex items-center justify-center bg-gradient-to-br from-sky-200 to-sky-400 text-sky-900 font-bold">
                    {getInitials(item.hoTen)}
                  </div>
                )}
              </div>

              <div className="text-xl font-semibold">{item.hoTen}</div>
              <div className="text-sm text-yellow-600 dark:text-yellow-300 mt-1">
                {item.trinhDo}
                {item?.tenKhoa || item?.chuyenKhoa?.tenKhoa || item?.chuyenKhoa ? (
                  <>
                    {" • "}
                    <span className="opacity-90">
                      {item.tenKhoa || item.chuyenKhoa?.tenKhoa || item.chuyenKhoa}
                    </span>
                  </>
                ) : null}
              </div>
            </div>
          )
        })}

        {filteredChuyenGia.length === 0 && (
          <div className="col-span-full text-center text-gray-500 dark:text-gray-300">
            Không tìm thấy chuyên gia phù hợp
          </div>
        )}
      </div>
      <BackToTopButton />

      {/* CSS animation */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.6s ease-out forwards; }
      `}</style>
    </div>
  )
}

export default ChuyenGiaPage
