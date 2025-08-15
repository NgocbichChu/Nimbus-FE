import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { getDanhSachChuyenGia } from "../../api/chuyenGiaApi";
import BackToTopButton from "@/components/back-to-top/back-to-top";

const ChuyenGiaPage = () => {
  const [listChuyenGia, setListChuyenGia] = useState<any[]>([]);

  useEffect(() => {
    const fetchChuyenGia = async () => {
      try {
        const res = await getDanhSachChuyenGia();
        setListChuyenGia(res.data || []);
      } catch (error) {
        console.log("Lỗi : ", error);
      }
    };
    fetchChuyenGia();
  }, []);

  const chuyenGiaImg = [
    { bacsi_id: 1, img: "https://bvtn.org.vn/wp-content/uploads/2024/05/Le-Van-Quang.jpg.webp" },
    { bacsi_id: 2, img: "https://bvtn.org.vn/wp-content/uploads/2024/05/Bui-Thi-Huong-Quynh-1.jpg.webp" },
    { bacsi_id: 3, img: "https://bvtn.org.vn/wp-content/uploads/2023/12/nguyen-van-tan.jpg.webp" },
    { bacsi_id: 4, img: "https://bvtn.org.vn/wp-content/uploads/2024/05/Tran-Thi-huong-Mai-Duoc.jpg.webp" },
    { bacsi_id: 5, img: "https://bvtn.org.vn/wp-content/uploads/2024/05/Pham-Thi-My-Dung.jpg.webp" },
    { bacsi_id: 6, img: "https://bvtn.org.vn/wp-content/uploads/2024/05/Nguyen-Thi-Mai-Huong.jpg.webp" },
    { bacsi_id: 7, img: "https://bvtn.org.vn/wp-content/uploads/2024/05/Pham-Cong-Nhan.jpg.webp" },
    { bacsi_id: 8, img: "https://bvtn.org.vn/wp-content/uploads/2024/06/Nguyen-Pham-Bao-Ngoc.jpg.webp" },
    { bacsi_id: 9, img: "https://bvtn.org.vn/wp-content/uploads/2024/05/bs-do-duy-dat.jpg.webp" },
  ];

  return (
    <div className="container mx-auto px-4 py-10">
      {/* Header */}
      <div className="relative bg-gradient-to-r from-sky-700 via-sky-600 to-sky-500 dark:from-blue-900 dark:via-blue-800 dark:to-blue-700 rounded-xl shadow-lg overflow-hidden p-6 sm:p-8">
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/20"></div>

        {/* Content */}
        <div className="relative flex flex-col sm:flex-row items-center sm:justify-between gap-6">
          {/* Left text */}
          <div className="text-center sm:text-left">
            <h2 className="text-3xl font-extrabold text-white flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-yellow-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
              </svg>
              Đội Ngũ Chuyên Gia
            </h2>
            <p className="mt-2 text-blue-100 text-sm sm:text-base">
              Chúng tôi quy tụ những chuyên gia hàng đầu trong lĩnh vực y tế
            </p>
          </div>

          {/* Search form */}
          <form className="bg-white dark:bg-gray-800 rounded-full shadow-md flex items-center px-4 py-2 w-full sm:w-auto">
            <Input
              placeholder="Tìm kiếm chuyên gia..."
              className="border-none focus:ring-0 bg-transparent text-gray-700 dark:text-white placeholder-gray-400 dark:placeholder-gray-300 flex-1"
            />
            <Button
              type="submit"
              className="ml-2 rounded-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold shadow-sm px-5 py-2"
            >
              Tìm
            </Button>
          </form>
        </div>
      </div>


      {/* Danh sách chuyên gia */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-10">
        {listChuyenGia.slice(0, 9).map((item, index) => {
          const imgData = chuyenGiaImg.find(
            (i) => i.bacsi_id.toString() === item.bacsi_id.toString()
          );
          const imgSrc = imgData?.img;

          return (
            <div
              key={item.bacsi_id}
              className="bg-white dark:bg-blue-600 text-gray-800 dark:text-white text-center py-6 px-4 rounded-2xl shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl animate-fadeIn"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative w-28 h-28 mx-auto mb-4">
                <img
                  src={imgSrc}
                  alt={item.hoTen}
                  className="w-28 h-28 object-cover rounded-full border-4 border-yellow-400 shadow-md"
                />
              </div>
              <div className="text-xl font-semibold">{item.hoTen}</div>
              <div className="text-sm text-yellow-600 dark:text-yellow-300 mt-1">{item.trinhDo}</div>
            </div>
          );
        })}
      </div>
      <BackToTopButton/>

      {/* CSS animation */}
      <style  >{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default ChuyenGiaPage;
