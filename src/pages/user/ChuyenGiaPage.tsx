import bsImage from "../../assets/bs.png"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { getDanhSachChuyenGia } from "../../api/chuyenGiaApi"

const ChuyenGiaPage = () => {
  const [listChuyenGia, setListChuyenGia] = useState<any[]>([])
  useEffect(() => {
    const fetchChuyenKhoa = async () => {
      try {
        const res = await getDanhSachChuyenGia()
        setListChuyenGia(res.data || [])
      } catch (error) {
        console.log("Lỗi : ", error)
      }
    }
    fetchChuyenKhoa()
  }, [])
  const banLanhDao = [
    { id: 1, name: "Nguyễn Văn A", chucVu: "Giám đốc" },
    { id: 2, name: "Nguyễn Văn B", chucVu: "Phó giám đốc" },
    { id: 3, name: "Nguyễn Văn C", chucVu: "Phó giám đốc" },
    { id: 4, name: "Nguyễn Văn D", chucVu: "Phó giám đốc" },
  ]

  const giamDoc = banLanhDao.filter((item) => item.chucVu === "Giám đốc")
  const phoGiamDoc = banLanhDao.filter((item) => item.chucVu === "Phó giám đốc")

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center text-white text-3xl font-bold mb-4 mt-[-15px]">
        <p className="bg-blue-300 px-6 py-2 rounded-md dark:bg-blue-900">Ban Lãnh Đạo Nimbus</p>
      </div>

      <div className="grid place-items-center gap-6 mt-8">
        {giamDoc.map((item, index) => (
          <div
            key={item.id}
            className="bg-white dark:bg-blue-900 text-sky-500 dark:text-white text-center 
                       py-6 px-4 rounded-xl shadow-sm flex flex-col items-center w-full max-w-sm dark:bg-gray-700"
          >
            <img
              src={`https://i.pravatar.cc/150?u=${index}`}
              alt={item.name}
              className="w-24 h-24 object-cover rounded-full mb-4 border-4 border-sky-500"
            />
            <div className="text-2xl font-semibold">{item.name}</div>
            <div className="text-lg text-yellow-600 dark:text-yellow-300">{item.chucVu}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10 place-items-center">
        {phoGiamDoc.map((item, index) => (
          <div
            key={item.id}
            className="bg-white dark:bg-blue-900 text-sky-500 dark:text-white text-center 
                       py-6 px-4 rounded-xl shadow-sm flex flex-col items-center w-full max-w-sm dark:bg-gray-700"
          >
            <img
              src={`https://i.pravatar.cc/150?u=${index}`}
              alt={item.name}
              className="w-24 h-24 object-cover rounded-full mb-4 border-4 border-sky-500"
            />
            <div className="text-2xl font-semibold">{item.name}</div>
            <div className="text-lg text-yellow-600 dark:text-yellow-300">{item.chucVu}</div>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-blue-300 dark:bg-blue-900 px-6 py-4 rounded-md mt-10">
        <p className="text-white text-2xl font-bold">Đội Ngũ Chuyên Gia</p>

        <form className="flex gap-2 w-full sm:w-auto">
          <Input
            placeholder="Tìm kiếm chuyên gia theo tên..."
            className="w-full sm:w-64 dark:border-white dark:placeholder-white	placeholder-black"
          />
          <Button type="submit" className="shrink-0 ">
            Tìm
          </Button>
        </form>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10 place-items-center">
        {listChuyenGia.map((item, index) => (
          <div
            key={item.id}
            className="bg-white dark:bg-blue-900 text-sky-500 dark:text-white text-center 
                       py-6 px-4 rounded-xl shadow-sm flex flex-col items-center w-full max-w-sm dark:bg-gray-700"
          >
            <img
              src={item.img ? item.img : `https://i.pravatar.cc/150?u=${index}`}
              alt={item.hoTen}
              className="w-24 h-24 object-cover rounded-full mb-4 border-4 border-sky-500"
            />
            <div className="text-2xl font-semibold">{item.hoTen}</div>
            <div className="text-lg text-yellow-600 dark:text-yellow-300">{item.trinhDo}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ChuyenGiaPage
