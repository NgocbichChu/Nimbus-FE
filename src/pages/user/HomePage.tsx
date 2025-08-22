import { Card, CardContent } from "@/components/ui/card"
import { Icon } from "@iconify/react"
import { Link } from "react-router-dom"
import CountUp from "react-countup"
import { useEffect, useRef, useState } from "react"
import BackToTopButton from "@/components/back-to-top/back-to-top"

const HomePage = () => {
  const [statsVisible, setStatsVisible] = useState(false)
  const statsRef = useRef(null)

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
      title: "Liên hệ",
      icon: <Icon icon="mdi:phone-plus-outline" width="32" height="32" />,
      link: "/lien-he",
    },
  ]

  const stats = [
    {
      title: "Chuyên gia",
      icon: <Icon icon="mdi:doctor" width="28" height="28" />,
      quantity: 30,
    },
    {
      title: "Chuyên khoa",
      icon: <Icon icon="mdi:hospital-building" width="28" height="28" />,
      quantity: 15,
    },
    {
      title: "Năm kinh nghiệm",
      icon: <Icon icon="uil:calender" width="28" height="28" />,
      quantity: 10,
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

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setStatsVisible(true)
          observer.disconnect() // Chạy 1 lần rồi ngắt
        }
      },
      { threshold: 0.3 }
    )
    if (statsRef.current) {
      observer.observe(statsRef.current)
    }
    return () => observer.disconnect()
  }, [])

  return (
    <div className="container mx-auto px-6 py-6">
      {/* Banner */}
      <div className="relative rounded-2xl overflow-hidden shadow-md mb-8 h-64 sm:h-80 lg:h-96">
        {/* Background Image + zoom animation */}
        <div
          className="absolute inset-0 bg-cover bg-center animate-zoomSlow"
          style={{
            backgroundImage:
              "url('https://hinhdep.khangviet.net/wp-content/uploads/2020/02/Banner-website-ph%C3%B2ng-kh%C3%A1m-website-b%E1%BB%87nh-vi%E1%BB%87n-ng%C3%A0nh-y-t%E1%BA%BF-1-300x130.jpg')",
          }}
        ></div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-sky-600/80 to-blue-800/80"></div>

        {/* Content */}
        <div className="relative flex flex-col items-center justify-center h-full text-center text-white px-4 max-w-2xl mx-auto">
          <h1 className="text-3xl lg:text-4xl font-bold mb-4 animate-fadeSlideUp">
            Phòng Khám Đa Khoa Nimbus
          </h1>
          <p className="text-md font-light mb-6 animate-fadeSlideUp delay-200">
            Nơi hội tụ đội ngũ y bác sĩ giàu kinh nghiệm, trang thiết bị hiện đại và dịch vụ chăm
            sóc tận tâm. Chúng tôi cam kết mang đến giải pháp sức khỏe toàn diện cho bạn và gia
            đình.
          </p>
          <Link
            to="/dat-lich"
            className="relative overflow-hidden bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-2 rounded-full font-semibold shadow-md transition hover:shadow-lg hover:scale-105 animate-fadeSlideUp delay-500"
          >
            <span className="relative z-10">Đặt lịch ngay</span>
            {/* Lớp ánh sáng quét */}
            <span
              className="absolute top-0 left-[-75%] w-[50%] h-full bg-white/40 transform skew-x-[-20deg] 
               animate-shine"
            />
          </Link>
        </div>
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
      <div ref={statsRef} className="bg-blue-100 dark:bg-blue-900 rounded-xl py-10 px-6">
        <h2 className="text-2xl font-bold text-center text-blue-800 dark:text-white mb-6">
          Thông tin tổng quan
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {stats.map((item, idx) => (
            <Card key={idx} className="bg-white dark:bg-blue-800 text-center shadow-sm">
              <CardContent className="flex flex-col items-center py-6">
                <div className="text-blue-600 dark:text-white mb-2">{item.icon}</div>
                <div className="text-3xl font-bold text-black dark:text-white">
                  {statsVisible ? <CountUp end={item.quantity} duration={5} suffix="+" /> : "0+"}
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
            src="https://i.pinimg.com/736x/2c/8a/90/2c8a9004feae986bbc7282ba4aa8cda2.jpg"
            alt="Ảnh bệnh nhân"
            className="w-full h-[400px] object-cover border"
          />
        </div>
        <div className="bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
          <p className="m-5">
            Chúng tôi cung cấp dịch vụ chăm sóc chất lượng cao, phối hợp cho bệnh nhân và gia đình
            thông qua các ứng dụng đi động, video, email,...
          </p>
        </div>
        <div className="col-span-2 bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
          <p className="m-5">
            Chúng tôi cam kết cung cấp dịch vụ chất lượng cao nhất và chăm sóc an toàn nhất có thể
            cho mọi bệnh nhân.
          </p>
        </div>
        <div className="col-span-2  bg-white dark:bg-black flex items-center justify-center">
          <p className="m-5">
            Là bệnh viện giảng dạy ban đầu cho các trường y khoa tại TP Hồ Chí Minh, Đào tạo thế hệ
            lãnh đạo tiếp theo trong nghiên cứu khoa học và y học.
          </p>
        </div>
      </div>

      <section className="bg-white dark:bg-gray-900 py-12">
        <h3 className="text-3xl font-bold text-center mb-8 dark:text-white">Dịch vụ nổi bật</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-5 items-stretch">
          {services.map((item, idx) => (
            <Card
              key={idx}
              className={`
          shadow-md 
          dark:bg-blue-900 
          h-full 
          transition-transform 
          duration-300 
          transform 
          hover:-translate-y-5
          hover:shadow-xl
          }
        `}
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

      <section>
        {/* Trên 1024px */}
        <div className="hidden lg:block h-[350px] bg-gradient-to-r from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-900 rounded-xl p-10 select-none">
          <h3 className="text-2xl font-bold text-center mb-12 dark:text-white">
            Hướng dẫn đặt lịch khám
          </h3>

          <div className="relative">
            {/* SVG đường cong */}
            <svg
              className="w-full h-36"
              viewBox="0 0 1000 200"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
            >
              <path
                d="M 100 15 C 200 75, 300 185, 450 80 S 700 -25, 900 70"
                stroke="#60A5FA"
                strokeWidth="4"
                strokeDasharray="10 10"
                fill="transparent"
              />
            </svg>

            {/* Các bước */}
            <div className="absolute top-0 left-0 w-full h-full flex justify-between items-start px-6 sm:px-12">
              {[
                "Chọn mục “Đặt lịch” từ trang chủ hoặc thanh điều hướng",
                "Chọn loại dịch vụ, chuyên khoa, chuyên gia và thời gian khám phù hợp",
                "Nhập thông tin bệnh nhân và xác nhận đặt lịch",
                "Nhận email xác nhận và có thể kiểm tra lại trong mục “Lịch khám”",
              ].map((text, i) => (
                <div
                  key={i}
                  className="relative flex flex-col items-center text-center flex-1"
                  style={{
                    transform:
                      i === 0
                        ? "translateY(15%)"
                        : i === 1
                          ? "translateY(45%)"
                          : i === 2
                            ? "translateY(-15%)"
                            : "translateY(10%)",
                  }}
                >
                  {/* Nút tròn */}
                  <div className="w-10 h-10 flex items-center justify-center bg-blue-500 dark:bg-blue-600 rounded-full ring-4 ring-white dark:ring-gray-800 shadow-md transition-transform duration-300 hover:scale-110">
                    <span className="text-white font-bold">{i + 1}</span>
                  </div>

                  {/* Nội dung */}
                  <div className="mt-3 p-3 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg max-w-[220px] transition-all duration-300 cursor-default">
                    <p className="text-sm text-gray-700 dark:text-gray-300">{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Dưới 1024px */}
        <div className="block lg:hidden bg-gradient-to-r from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-900 rounded-xl p-10">
          <h3 className="text-2xl font-bold text-center mb-6 dark:text-white">
            Hướng dẫn đặt lịch khám
          </h3>
          <ol className="list-decimal list-inside space-y-4 text-gray-700 dark:text-gray-300">
            <li>Chọn mục “Đặt lịch” từ trang chủ hoặc thanh điều hướng</li>
            <li>Chọn loại dịch vụ, chuyên khoa, chuyên gia và thời gian khám phù hợp</li>
            <li>Nhập thông tin bệnh nhân và xác nhận đặt lịch</li>
            <li>Nhận email xác nhận và có thể kiểm tra lại trong mục “Lịch khám”</li>
          </ol>
        </div>
      </section>
      <BackToTopButton />

      <style>
        {`
@keyframes zoomSlow {
  0% { transform: scale(1.1); }
  100% { transform: scale(1); }
}

@keyframes fadeSlideUp {
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
}

.animate-zoomSlow {
  animation: zoomSlow 8s ease-out forwards;
}

.animate-fadeSlideUp {
  animation: fadeSlideUp 0.8s ease-out forwards;
}

.delay-200 {
  animation-delay: 0.2s;
}

.delay-500 {
  animation-delay: 0.5s;
}

@keyframes shine {
  0% { left: -75%; }
  100% { left: 125%; }
}

.animate-shine {
  animation: shine 1.5s ease-in-out infinite;
}

`}
      </style>
    </div>
  )
}

export default HomePage
