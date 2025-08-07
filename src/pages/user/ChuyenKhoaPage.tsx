import banner from "../../assets/banner.png"
import { useEffect, useState } from "react"
import { getDanhSachChuyenKhoa } from "../../api/chuyenKhoaApi"
import { Input } from "@/components/ui/input"
import { Icon } from "@iconify/react"

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
    { chuyenKhoaId: 1, icon: "mdi:stethoscope" },
    { chuyenKhoaId: 2, icon: "mdi:hospital-building" },
    { chuyenKhoaId: 3, icon: "mdi:heart-pulse" },
    { chuyenKhoaId: 4, icon: "mdi:baby-face-outline" },
    { chuyenKhoaId: 5, icon: "mdi:human-pregnant" },
    { chuyenKhoaId: 6, icon: "mdi:face-woman-outline" },
    { chuyenKhoaId: 7, icon: "mdi:ear-hearing" },
    { chuyenKhoaId: 8, icon: "mdi:tooth-outline" },
    { chuyenKhoaId: 9, icon: "mdi:eye-outline" },
    { chuyenKhoaId: 10, icon: "mdi:brain" },
    { chuyenKhoaId: 11, icon: "mdi:lungs" },
    { chuyenKhoaId: 12, icon: "mdi:food-variant" },
    { chuyenKhoaId: 13, icon: "mdi:alert-octagon-outline" },
    { chuyenKhoaId: 14, icon: "mdi:bone" },
    { chuyenKhoaId: 15, icon: "mdi:leaf" },
    { chuyenKhoaId: 16, icon: "mdi:dna" },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <img src={banner} alt="" className="rounded-xl shadow-md" />
      <p className="text-4xl text-center text-red-500 dark:text-blue-300 mt-6 font-bold">
        Danh sách các chuyên khoa
      </p>

      <form className="flex gap-2 w-full sm:w-auto mt-6" onSubmit={(e) => e.preventDefault()}>
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Tìm kiếm chuyên khoa theo tên..."
          className="w-full sm:w-64 dark:border-white dark:placeholder-white placeholder-black"
        />
      </form>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
        {filteredChuyenKhoa.map((item, index) => {
          const iconData = chuyenKhoaWithIcon.find((i) => i.chuyenKhoaId === item.chuyenKhoaId)
          const iconName = iconData?.icon || "mdi:help-circle-outline"

          return (
            <div
              key={item.chuyenKhoaId || index}
              className="bg-white h-[80px] font-bold text-center rounded-xl shadow-sm 
                         hover:bg-sky-50 transition-colors dark:bg-blue-900 
                         dark:hover:bg-gray-800 dark:text-white"
            >
              <div className="grid grid-cols-3 items-stretch h-full">
                <div
                  className="col-span-1 flex items-center justify-center bg-blue-400 h-full text-white 
                                rounded-l-xl dark:bg-blue-900 text-3xl"
                >
                  <Icon
                    icon={iconName}
                    className="transition-transform duration-300 hover:scale-110"
                  />
                </div>
                <div
                  className="col-span-2 flex items-center text-left px-4 h-full 
                                dark:bg-black dark:hover:bg-gray-600"
                >
                  {item.tenKhoa}
                </div>
              </div>
            </div>
          )
        })}

        {filteredChuyenKhoa.length === 0 && (
          <div className="col-span-full text-center text-gray-500 dark:text-gray-300 mt-4">
            Không tìm thấy chuyên khoa phù hợp
          </div>
        )}
      </div>
    </div>
  )
}

export default ChuyenKhoaPage
