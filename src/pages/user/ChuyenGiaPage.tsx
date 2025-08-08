import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { getDanhSachChuyenGia } from "../../api/chuyenGiaApi"

const ChuyenGiaPage = () => {
  const [listChuyenGia, setListChuyenGia] = useState<any[]>([])
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


  const chuyenGiaImg = [
    { bacsi_id: 1, img: "https://bvtn.org.vn/wp-content/uploads/2024/05/Le-Van-Quang.jpg.webp" },
    {
      bacsi_id: 2,
      img: "https://bvtn.org.vn/wp-content/uploads/2024/05/Bui-Thi-Huong-Quynh-1.jpg.webp",
    },
    { bacsi_id: 3, img: "https://bvtn.org.vn/wp-content/uploads/2023/12/nguyen-van-tan.jpg.webp" },
    {
      bacsi_id: 4,
      img: "	https://bvtn.org.vn/wp-content/uploads/2024/05/Tran-Thi-huong-Mai-Duoc.jpg.webp",
    },
    {
      bacsi_id: 5,
      img: "https://bvtn.org.vn/wp-content/uploads/2024/05/Pham-Thi-My-Dung.jpg.webp",
    },
    {
      bacsi_id: 6,
      img: "	https://bvtn.org.vn/wp-content/uploads/2024/05/Nguyen-Thi-Mai-Huong.jpg.webp",
    },
    { bacsi_id: 7, img: "https://bvtn.org.vn/wp-content/uploads/2024/05/Pham-Cong-Nhan.jpg.webp" },
    {
      bacsi_id: 8,
      img: "https://bvtn.org.vn/wp-content/uploads/2024/06/Nguyen-Pham-Bao-Ngoc.jpg.webp",
    },
    { bacsi_id: 9, img: "https://bvtn.org.vn/wp-content/uploads/2024/05/bs-do-duy-dat.jpg.webp" },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
     

      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-blue-300 dark:bg-blue-900 px-6 py-4 rounded-md mt-[-10px]">
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
        {listChuyenGia.slice(0, 9).map((item) => {
          const imgData = chuyenGiaImg.find(
            (i) => i.bacsi_id.toString() === item.bacsi_id.toString()
          )
          const imgSrc = imgData?.img
          console.log("item.id:", item.id, "→ img:", imgSrc)
          return (
            <div
              key={item.bacsi_id}
              className="bg-white dark:bg-blue-500 text-sky-500 dark:text-white text-center 
                  py-6 px-4 rounded-xl shadow-sm flex flex-col items-center w-full max-w-sm "
            >
              <img
                src={imgSrc}
                alt={item.hoTen}
                className="w-24 h-24 object-cover rounded-full mb-4 border-4 border-sky-500"
              />
              <div className="text-2xl font-semibold">{item.hoTen}</div>
              <div className="text-lg text-yellow-600 dark:text-yellow-300">{item.trinhDo}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ChuyenGiaPage
