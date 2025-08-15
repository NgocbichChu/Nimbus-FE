import banner from "../../assets/banner.png"
import { useEffect, useState } from "react"
import { getDanhSachChuyenKhoa } from "../../api/chuyenKhoaApi"
import { Input } from "@/components/ui/input"
import { Icon } from "@iconify/react"
import BackToTopButton from "@/components/back-to-top/back-to-top"
import { Link } from "react-router-dom"

const ChuyenKhoaPage = () => {
  const [listChuyenKhoa, setListChuyenKhoa] = useState<any[]>([])
  const [search, setSearch] = useState("")

  useEffect(() => {
    const fetchChuyenKhoa = async () => {
      try {
        const res = await getDanhSachChuyenKhoa()
        setListChuyenKhoa(res.data || [])
      } catch (error) {
        console.error("Lỗi : ", error)
      }
    }
    fetchChuyenKhoa()
  }, [])

  const filteredChuyenKhoa = listChuyenKhoa.filter((item) =>
    item.tenKhoa.toLowerCase().includes(search.toLowerCase())
  )

  const chuyenKhoaWithIcon = [
    { chuyenKhoaId: 1, icon: "solar:stethoscope-line-duotone" },
    { chuyenKhoaId: 2, icon: "lucide:baby" },
    { chuyenKhoaId: 3, icon: "mdi:heart-pulse" },
    { chuyenKhoaId: 4, icon: "streamline-ultimate:pregnancy-pregnant" },
    { chuyenKhoaId: 5, icon: "healthicons:ear-outline" },
    { chuyenKhoaId: 6, icon: "mdi:tooth-outline" },
    { chuyenKhoaId: 7, icon: "icon-park-outline:heart" },
    { chuyenKhoaId: 8, icon: "healthicons:thyroid-outline-24px" },
    { chuyenKhoaId: 9, icon: "flowbite:brain-outline" },
    { chuyenKhoaId: 10, icon: "lucide:bone" },
    { chuyenKhoaId: 11, icon: "solar:eye-outline" },
    { chuyenKhoaId: 12, icon: "mdi:allergy" },
    { chuyenKhoaId: 13, icon: "bi:lungs" },
    { chuyenKhoaId: 14, icon: "healthicons:stomach-outline" },
    { chuyenKhoaId: 15, icon: "mdi:leaf" },
    { chuyenKhoaId: 16, icon: "mdi:dna" },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Banner */}
      <div className="relative rounded-2xl overflow-hidden shadow-lg">
        <img src={banner} alt="Banner" className="w-full h-56 sm:h-72 object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        <h1 className="absolute bottom-4 left-6 text-white text-3xl sm:text-4xl font-bold drop-shadow-lg">
          Danh sách các chuyên khoa
        </h1>
      </div>

      {/* Search */}
      <form className="flex gap-2 w-full sm:w-auto mt-8" onSubmit={(e) => e.preventDefault()}>
        <div className="relative w-full sm:w-72">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm kiếm chuyên khoa..."
            className="w-full pl-10 rounded-xl border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-400 dark:border-gray-600 dark:bg-gray-800 dark:placeholder-gray-400"
          />
        </div>
      </form>

      {/* List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
        {filteredChuyenKhoa.map((item, index) => {
          const iconData = chuyenKhoaWithIcon.find((i) => i.chuyenKhoaId === item.chuyenKhoaId)
          const iconName = iconData?.icon || "mdi:help-circle-outline"

          return (
            <div
              key={item.chuyenKhoaId || index}
              className="group bg-white rounded-2xl shadow-md overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl dark:bg-gray-900 animate-fadeUp"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <Link
                to={`/chuyen-khoa/${item.chuyenKhoaId}`} // thay id thật thay vì :chuyenKhoaId
                className="flex items-center p-4 gap-4 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors group"
              >
                <div className="flex items-center justify-center w-14 h-14 rounded-full bg-blue-500 text-white text-3xl group-hover:bg-blue-600 transition-colors dark:bg-blue-800 dark:group-hover:bg-blue-700">
                  <Icon
                    icon={iconName}
                    className="transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <span className="font-semibold text-lg text-gray-800 dark:text-gray-100">
                  {item.tenKhoa}
                </span>
              </Link>
            </div>
          )
        })}

        {filteredChuyenKhoa.length === 0 && (
          <div className="col-span-full text-center text-gray-500 dark:text-gray-300 mt-4">
            Không tìm thấy chuyên khoa phù hợp
          </div>
        )}
      </div>
      <BackToTopButton />
      <style>
        {`
    @keyframes fadeUp {
      0% {
        opacity: 0;
        transform: translateY(20px);
      }
      100% {
        opacity: 1;
        transform: translateY(0);
      }
    }
    .animate-fadeUp {
      animation: fadeUp 0.6s ease forwards;
    }
  `}
      </style>
    </div>
  )
}

export default ChuyenKhoaPage
