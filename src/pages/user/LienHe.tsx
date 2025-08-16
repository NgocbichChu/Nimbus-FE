import React, { useState } from "react"
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react"
import { Loader2 } from "lucide-react"
import { sendMail } from "@/api/gmail"
import { toastError, toastSuccess } from "@/helper/toast"
import BackToTopButton from "@/components/back-to-top/back-to-top"

const LienHePage = () => {
  // const [submissionMessage, setSubmissionMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })

  // Handle form input changes
  const handleChange = (e: any) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await sendMail(formData) // Gửi qua server
      toastSuccess("Gửi thành công!")
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      })
    } catch (e) {
      toastError("Gửi thất bại. Vui lòng thử lại!")
      console.log(e)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-gray-50 min-h-screen font-sans text-gray-800 p-4 sm:p-8">
      {/* Container with max width and padding for better layout */}
      <div className="container mx-auto max-w-6xl">
        {/* Title section with fade-in animation */}
        <div className="text-center mb-12 animate-fadeIn">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-blue-600 mb-2">
            Liên Hệ Với Chúng Tôi
          </h1>
          <p className="text-lg sm:text-xl text-gray-600">
            Chúng tôi luôn sẵn lòng lắng nghe và hỗ trợ bạn.
          </p>
        </div>

        {/* Main content grid for contact info and form */}
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Information Section */}
          <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6 animate-slideInLeft">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <MapPin className="text-blue-500" />
              Thông Tin Trực Tiếp
            </h2>

            {/* Address */}
            <div className="flex items-start space-x-4">
              <MapPin className="text-blue-500 flex-shrink-0 mt-1" size={24} />
              <div>
                <p className="font-semibold">Địa chỉ:</p>
                <p className="text-gray-600">Công Viên Phần Mềm Quang Trung, Quận 12, TPHCM</p>
              </div>
            </div>

            {/* Phone Number */}
            <div className="flex items-start space-x-4">
              <Phone className="text-blue-500 flex-shrink-0 mt-1" size={24} />
              <div>
                <p className="font-semibold">Số điện thoại:</p>
                <a
                  href="tel:0123456789"
                  className="text-blue-500 hover:text-blue-700 transition-colors"
                >
                  0388 245 296 - 0325 300 118
                </a>
              </div>
            </div>

            {/* Email Address */}
            <div className="flex items-start space-x-4">
              <Mail className="text-blue-500 flex-shrink-0 mt-1" size={24} />
              <div>
                <p className="font-semibold">Email:</p>
                <a
                  href="mailto: Nimbus@gmail.com"
                  className="text-blue-500 hover:text-blue-700 transition-colors"
                >
                  Nimbus@gmail.com
                </a>
              </div>
            </div>

            {/* Working Hours */}
            <div className="flex items-start space-x-4">
              <Clock className="text-blue-500 flex-shrink-0 mt-1" size={24} />
              <div>
                <p className="font-semibold">Giờ làm việc:</p>
                <p className="text-gray-600">Thứ 2 - Thứ 7, 8:00 - 18:00</p>
              </div>
            </div>

            {/* Google Maps Embed */}
            <div className="rounded-2xl overflow-hidden shadow-md mt-8">
              <iframe
                title="Vị trí văn phòng trên Google Maps"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.499824677761!2d106.6993215147489!3d10.77584149232338!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f4477317e33%3A0xc3f6d735d4757c2a!2zMTIzIMSQxrDhu51uZyDEkMOwbiBWxrDGoW5n!5e0!3m2!1svi!2s!4v1625078400000!5m2!1svi!2s"
                width="100%"
                height="300"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
              ></iframe>
            </div>
          </div>

          {/* Contact Form Section */}
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl shadow-xl p-8 space-y-6 animate-slideInRight relative"
          >
            <h2 className="text-2xl font-bold text-gray-800">Gửi Tin Nhắn Cho Chúng Tôi</h2>

            {/* Form inputs */}
            <input
              type="text"
              name="name"
              placeholder="Họ và tên"
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-shadow"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-shadow"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder="Số điện thoại"
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-shadow"
              value={formData.phone}
              onChange={handleChange}
            />
            <input
              type="text"
              name="subject"
              placeholder="Tiêu đề"
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-shadow"
              value={formData.subject}
              onChange={handleChange}
            />
            <textarea
              name="message"
              placeholder="Nội dung tin nhắn"
              rows={5}
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-shadow"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>

            {/* Submit button with loading state */}
            <button
              type="submit"
              className={`w-full py-3 px-6 rounded-lg font-bold text-white transition-all duration-300 flex items-center justify-center gap-2
                ${isLoading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600 hover:shadow-lg"}`}
              disabled={isLoading}
            >
              {isLoading && <Loader2 className="animate-spin" size={20} />}
              {!isLoading ? (
                <>
                  <Send size={20} />
                  Gửi tin nhắn
                </>
              ) : (
                "Đang gửi..."
              )}
            </button>
          </form>
        </div>
      </div>
      <BackToTopButton/>

      {/* CSS Animations (retained from original code) */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.8s ease-out; }
        .animate-slideInLeft { animation: slideInLeft 0.8s ease-out; }
        .animate-slideInRight { animation: slideInRight 0.8s ease-out; }
      `}</style>
    </div>
  )
}

export default LienHePage
