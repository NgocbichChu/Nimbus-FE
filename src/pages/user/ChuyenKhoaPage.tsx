import banner from "../../assets/banner.png"
import { useEffect, useState } from "react"
import { getDanhSachChuyenKhoa } from "../../api/chuyenKhoaApi"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

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

  return (
    <div className="container mx-auto px-4 py-8">
      <img src={banner} alt="" />
      <div>
        <p className="text-4xl text-center text-red-500 dark:text-blue-300 mt-4">
          Danh sách các chuyên khoa
        </p>
      </div>

      <form className="flex gap-2 w-full sm:w-auto mt-4" onSubmit={(e) => e.preventDefault()}>
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Tìm kiếm chuyên khoa theo tên..."
          className="w-full sm:w-64 dark:border-white dark:placeholder-white placeholder-black"
        />
      </form>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4">
        {filteredChuyenKhoa.map((item, index) => (
          <div
            key={item.id || index}
            className="bg-white h-[80px] font-bold text-center rounded-xl shadow-sm hover:bg-sky-50 transition-colors dark:bg-blue-900 dark:hover:bg-gray-800 dark:text-white"
          >
            <div className="grid grid-cols-3 items-stretch h-full">
              <div className="col-span-1 flex items-center justify-center bg-blue-400 h-full text-white rounded-l-xl dark:bg-blue-900">
                {}
              </div>
              <div className="col-span-2 flex items-center text-left px-4 h-full dark:bg-black dark:hover:bg-gray-600">
                {item.tenKhoa}
              </div>
            </div>
          </div>
        ))}

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
