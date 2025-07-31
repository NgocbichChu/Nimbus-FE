import { Card, CardContent } from "@/components/ui/card"
import { Icon } from "@iconify/react"
import { Link } from "react-router-dom"
import CountUp from "react-countup"

const HomePage = () => {
  const itemsBanner = [
    {
      title: "Chuyên gia",
      icon: <Icon icon="mdi:doctor" width="32" height="32" />,
      link: "/chuyen-gia",
    },
    {
      title: "Chuyên khoa",
      icon: <Icon icon="mdi:hospital" width="32" height="32" />,
      link: "/chuyen-khoa",
    },
    {
      title: "Đặt lịch khám",
      icon: <Icon icon="uil:calender" width="32" height="32" />,
      link: "/dat-lich",
    },
    {
      title: "Bảng giá khám bệnh",
      icon: <Icon icon="tabler:zoom-money" width="32" height="32" />,
      link: "/bang-gia",
    },
  ]

  const stats = [
    {
      title: "Chuyên gia",
      icon: <Icon icon="mdi:doctor" width="28" height="28" />,
      quantity: 5,
    },
    {
      title: "Chuyên khoa",
      icon: <Icon icon="mdi:hospital-building" width="28" height="28" />,
      quantity: 10,
    },
    {
      title: "Năm kinh nghiệm",
      icon: <Icon icon="uil:calender" width="28" height="28" />,
      quantity: 15,
    },
    {
      title: "Khoa - phòng",
      icon: <Icon icon="carbon:building" width="28" height="28" />,
      quantity: 50,
    },
    {
      title: "Giường bệnh",
      icon: <Icon icon="material-symbols:bed" width="28" height="28" />,
      quantity: 120,
    },
  ]
  const services = [
    {
      title: "Khám tổng quát",
      description: "Dịch vụ khám sức khỏe tổng quát định kỳ, phù hợp mọi lứa tuổi.",
      icon: <Icon icon="healthicons:health-worker" width="28" height="28" />,
    },
    {
      title: "Gọi điện tư vấn trực tuyến",
      description: "Tư vấn sức khỏe với bác sĩ qua video call mọi lúc mọi nơi.",
      icon: <Icon icon="mdi:chat-outline" width="28" height="28" />,
    },
    {
      title: "Cấp cứu 24/7",
      description: "Hệ thống hỗ trợ cấp cứu và chăm sóc khẩn cấp luôn sẵn sàng.",
      icon: <Icon icon="mdi:ambulance" width="28" height="28" />,
    },
    {
      title: "Xét nghiệm & chẩn đoán",
      description: "Dịch vụ xét nghiệm và chẩn đoán hình ảnh hiện đại, nhanh chóng.",
      icon: <Icon icon="mdi:microscope" width="28" height="28" />,
    },
  ]
  return (
    <div className="container mx-auto px-6 py-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-sky-500 to-blue-700 text-white rounded-2xl p-8 shadow-md text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">Phòng Khám Đa Khoa Nimbus</h1>
        <p className="text-lg font-light">Chăm sóc sức khỏe toàn diện - Nơi gửi trọn niềm tin</p>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {itemsBanner.map((item, idx) => (
          <Link to={item.link} key={idx} className="hover:scale-105 transition-transform">
            <Card className="bg-white dark:bg-blue-900 shadow-sm hover:shadow-lg">
              <CardContent className="flex flex-col items-center justify-center py-6">
                <div className="text-blue-600 mb-2">{item.icon}</div>
                <div className="font-semibold text-lg text-center text-gray-800 dark:text-white">
                  {item.title}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Statistics */}
      <div className="bg-blue-100 dark:bg-blue-900 rounded-xl py-10 px-6">
        <h2 className="text-2xl font-bold text-center text-blue-800 dark:text-white mb-6">
          Thông tin tổng quan
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {stats.map((item, idx) => (
            <Card key={idx} className="bg-white dark:bg-blue-800 text-center shadow-sm">
              <CardContent className="flex flex-col items-center py-6">
                <div className="text-blue-600 dark:text-white mb-2">{item.icon}</div>
                <div className="text-3xl font-bold text-black dark:text-white">
                  <CountUp end={item.quantity} duration={2} suffix="+" />
                </div>
                <div className="text-md text-gray-600 dark:text-gray-200">{item.title}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="grid grid-flow-col grid-cols-3 grid-rows-2 text-center mt-5 dark:text-white ">
        <div className="row-span-2 bg-blue-100 ">
          <img
            src={"https://ui.shadcn.com/placeholder.svg"}
            alt="Ảnh bệnh nhân"
            className="w-full h-[400px] object-cover border"
          />
        </div>
        <div className="bg-blue-100 dark:bg-blue-900">
          <p className="m-5">
            Chúng tôi cung cấp dịch vụ chăm sóc chất lượng cao, phối hợp cho bệnh nhân và gia đình
            thông qua các ứng dụng đi động, video, email,...
          </p>
        </div>
        <div className="col-span-2 bg-gray-100 dark:bg-gray-800">
          <p className="m-5">
            Chúng tôi cam kết cung cấp dịch vụ chất lượng cao nhất và chăm sóc an toàn nhất có thể
            cho mọi bệnh nhân.
          </p>
        </div>
        <div className="col-span-2  bg-white dark:bg-black">
          <p className="m-5">
            Là bệnh viện giảng dạy ban đầu cho các trường y khoa tại TP Hồ Chí Minh, Đào tạo thế hệ
            lãnh đạo tiếp theo trong nghiên cứu khoa học và y học.
          </p>
        </div>
      </div>

      <section className="bg-white dark:bg-gray-900 py-12">
        <h3 className="text-3xl font-bold text-center mb-8 dark:text-white">Dịch vụ nổi bật</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-5">
          {services.map((item, idx) => (
            <Card
              key={idx}
              className={`shadow-md dark:bg-blue-900 h-full transition-transform duration-300 ${
                idx % 2 === 1 ? "translate-y-10" : ""
              }`}
            >
              <CardContent className="h-full flex flex-col justify-between p-6">
                <div className="flex flex-col flex-grow">
                  <div className="flex items-start gap-3 text-blue-600 dark:text-white mb-2 min-h-[52px]">
                    {item.icon}
                    <h4 className="text-base font-semibold leading-snug">{item.title}</h4>
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-auto">
                  {item.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-900 rounded-xl p-10">
        <h3 className="text-2xl font-bold text-center mb-6 dark:text-white">
          Hướng dẫn đặt lịch khám
        </h3>
        <ol className="list-decimal list-inside space-y-4 text-gray-700 dark:text-gray-300">
          <li>Chọn mục “Đặt lịch” từ trang chủ hoặc thanh điều hướng</li>
          <li>Chọn loại dịch vụ, chuyên khoa, chuyên gia và thời gian khám phù hợp</li>
          <li>Nhập thông tin bệnh nhân và xác nhận đặt lịch</li>
          <li>Nhận email xác nhận và có thể kiểm tra lại trong mục “Lịch khám”</li>
        </ol>
      </section>
    </div>
  )
}

export default HomePage
