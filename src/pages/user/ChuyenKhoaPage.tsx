import { Icon } from "@iconify/react"
import banner from "../../assets/banner.png"
const ChuyenKhoaPage = () => {
  const chuyenKhoa = [
    {
      id: 1,
      name: "Khoa cấp cứu",
      icon: <Icon icon="icon-park-outline:heart" width="48" height="48" />,
    },
    {
      id: 2,
      name: "Khoa nội",
      icon: <Icon icon="icon-park-outline:heart" width="48" height="48" />,
    },
    {
      id: 3,
      name: "Khoa khoa ngoại",
      icon: <Icon icon="icon-park-outline:heart" width="48" height="48" />,
    },
    {
      id: 4,
      name: "Khoa khoa tim mạch",
      icon: <Icon icon="icon-park-outline:heart" width="48" height="48" />,
    },
    {
      id: 5,
      name: "Khoa khoa thần kinh",
      icon: <Icon icon="icon-park-outline:heart" width="48" height="48" />,
    },
    {
      id: 6,
      name: "Khoa khoa hô hấp",
      icon: <Icon icon="icon-park-outline:heart" width="48" height="48" />,
    },
  ]
  return (
    <div className="container mx-auto px-4 py-8">
      <img src={banner} alt="" />
      <div>
        <p className="text-4xl text-center text-red-500 dark:text-blue-300 mt-4">
          Danh sách các chuyên khoa
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4">
        {chuyenKhoa.map((item) => (
          <div
            key={item.id}
            className="bg-white h-[80px] font-bold text-center rounded-xl shadow-sm hover:bg-sky-50 transition-colors dark:bg-blue-900 dark:hover:bg-gray-800 dark:text-white"
          >
            <div className="grid grid-cols-3 items-stretch h-full">
              <div className="col-span-1 flex items-center justify-center bg-blue-400 h-full text-white rounded-l-xl dark:bg-blue-900">
                {item.icon}
              </div>

              <div className="col-span-2 flex items-center text-left px-4 h-full dark:bg-black dark:hover:bg-gray-600">
                {item.name}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ChuyenKhoaPage
