import { Icon } from "@iconify/react"
import { Link } from "react-router-dom"

const HomePage = () => {
  const itemsBanner = [
    {
      title: "Chuyên gia",
      icon: <Icon icon="mdi:doctor" width="25" height="25" />,
      link: "/chuyen-gia",
    },
    {
      title: " Chuyên khoa",
      icon: <Icon icon="mdi:hospital" width="25" height="25" />,
      link: "/chuyen-khoa",
    },
    {
      title: "Đặt lịch khám",
      icon: <Icon icon="uil:calender" width="25" height="25" />,
      link: "/dat-lich",
    },
    {
      title: " Bảng giá khám bệnh",
      icon: <Icon icon="tabler:zoom-money" width="25" height="25" />,
      link: "/bang-gia",
    },
  ]
  const items = [
    {
      title: "Chuyên gia",
      icon: <Icon icon="mdi:doctor" width="25" height="25" />,

      quantity: "5+",
    },
    {
      title: " Chuyên khoa",
      icon: <Icon icon="mdi:hospital" width="25" height="25" />,

      quantity: "5+",
    },
    {
      title: "Năm kinh nghiệm",
      icon: <Icon icon="uil:calender" width="25" height="25" />,
      quantity: "1-",
    },
    {
      title: " Viện-khoa-phòng",
      icon: <Icon icon="tabler:zoom-money" width="25" height="25" />,
      quantity: "50+",
    },
    {
      title: " Giường bệnh",
      icon: <Icon icon="tabler:zoom-money" width="25" height="25" />,
      quantity: "5",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-2 ">
      <div className="w-full h-[100px] bg-gradient-to-r from-sky-400 to-blue-600 text-white flex items-center justify-center text-2xl font-bold">
        Banner quảng cáo
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-[-20px]">
        {itemsBanner.map((item, idx) => (
          <Link to={item.link} key={idx}>
            <div className="bg-white text-black font-bold text-center py-6 rounded-xl shadow-sm hover:bg-sky-50 transition-colors dark:bg-blue-900 dark:text-white">
              <div className="flex justify-center mr-auto">
                <div className="mr-2">{item.title}</div>
                <div className="text-blue-500">{item.icon}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="w-full bg-blue-300 justify-center text-center text-white items-center text-2xl  mt-5">
        <p className="font-bold pt-3 pb-1">Phòng Khám Nimbus</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 ">
          {items.map((item, idx) => (
            <div
              key={idx}
              className=" text-black text-center py-6 dark:bg-blue-900 dark:text-white flex flex-col items-center   "
            >
              <div className=" mb-2">{item.icon}</div>
              <div className="text-4xl font-medium">{item.quantity}</div>
              <div className="text-xl font-medium">{item.title}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-flow-col grid-cols-3 grid-rows-2 text-center mt-5 ">
        <div className="row-span-2 bg-blue-100 ">
          <img
            src={"https://ui.shadcn.com/placeholder.svg"}
            alt="Ảnh bệnh nhân"
            className="w-full h-[400px] object-cover border"
          />
        </div>
        <div className="bg-blue-100">
          <p className="m-5">
            Chúng tôi cung cấp dịch vụ chăm sóc chất lượng cao, phối hợp cho bệnh nhân và gia đình
            thông qua các ứng dụng đi động, video, email,...
          </p>
        </div>
        <div className="col-span-2 bg-gray-100">
          <p className="m-5">
            Chúng tôi cam kết cung cấp dịch vụ chất lượng cao nhất và chăm sóc an toàn nhất có thể
            cho mọi bệnh nhân.
          </p>
        </div>
        <div className="col-span-2  bg-white">
          <p className="m-5">
            Là bệnh viện giảng dạy ban đầu cho các trường y khoa tại TP Hồ Chí Minh, Đào tạo thế hệ
            lãnh đạo tiếp theo trong nghiên cứu khoa học và y học.
          </p>
        </div>
      </div>
    </div>
  )
}
export default HomePage
