import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Clock, MapPin, Phone, Mail, Calendar, Users, Award, Stethoscope } from "lucide-react"
import { Link } from "react-router-dom"
import BackToTopButton from "@/components/back-to-top/back-to-top"

export default function InternalMedicinePage() {
  const services = [
    "Khám và điều trị các bệnh lý nội khoa tổng quát",
    "Điều trị bệnh tiểu đường và các biến chứng",
    "Quản lý bệnh cao huyết áp và tim mạch",
    "Điều trị các bệnh lý về gan, thận",
    "Khám sức khỏe định kỳ và tầm soát bệnh",
    "Tư vấn dinh dưỡng và lối sống lành mạnh",
  ]

  const doctors = [
    {
      name: "BS.CKI Nguyễn Văn An",
      title: "Trưởng khoa Nội tổng quát",
      specialization: "Chuyên khoa I - Nội tổng quát",
      experience: "15 năm kinh nghiệm",
      avatar: "https://bvtn.org.vn/wp-content/uploads/2024/05/Le-Van-Quang.jpg.webp",
    },
    {
      name: "BS.CKII Trần Thị Bình",
      title: "Phó trưởng khoa",
      specialization: "Chuyên khoa II - Tim mạch",
      experience: "12 năm kinh nghiệm",
      avatar: "https://bvtn.org.vn/wp-content/uploads/2024/05/Bui-Thi-Huong-Quynh-1.jpg.webp",
    },
    {
      name: "BS Lê Minh Cường",
      title: "Bác sĩ điều trị",
      specialization: "Nội tiết - Đái tháo đường",
      experience: "8 năm kinh nghiệm",
      avatar: "https://bvtn.org.vn/wp-content/uploads/2023/12/nguyen-van-tan.jpg.webp",
    },
  ]

  const schedule = [
    { day: "Thứ 2 - Thứ 6", time: "7:00 - 17:00", type: "Khám thường" },
    { day: "Thứ 7", time: "7:00 - 12:00", type: "Khám thường" },
    { day: "Chủ nhật", time: "8:00 - 12:00", type: "Khám cấp cứu" },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-primary-foreground/10 rounded-lg">
              <Stethoscope className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Khoa Nội Tổng Quát</h1>
              <p className="text-primary-foreground/80 text-lg">
                Chăm sóc sức khỏe toàn diện cho mọi lứa tuổi
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge
              variant="secondary"
              className="bg-primary-foreground/20 text-primary-foreground border-0"
            >
              <Users className="h-4 w-4 mr-1" />
              50+ bệnh nhân/ngày
            </Badge>
            <Badge
              variant="secondary"
              className="bg-primary-foreground/20 text-primary-foreground border-0"
            >
              <Award className="h-4 w-4 mr-1" />
              Đội ngũ chuyên môn cao
            </Badge>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Giới thiệu */}
            <Card>
              <CardHeader>
                <CardTitle>Giới thiệu về khoa</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  Khoa Nội tổng quát là một trong những khoa lâm sàng quan trọng nhất của bệnh viện,
                  chuyên điều trị các bệnh lý nội khoa phổ biến như tiểu đường, cao huyết áp, bệnh
                  lý tim mạch, gan, thận và các rối loạn chuyển hóa.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Với đội ngũ bác sĩ giàu kinh nghiệm và trang thiết bị hiện đại, chúng tôi cam kết
                  mang đến dịch vụ chăm sóc sức khỏe chất lượng cao, tận tâm với từng bệnh nhân.
                </p>
              </CardContent>
            </Card>

            {/* Dịch vụ */}
            <Card>
              <CardHeader>
                <CardTitle>Dịch vụ chính</CardTitle>
                <CardDescription>
                  Các dịch vụ y tế chuyên nghiệp được cung cấp tại khoa
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3">
                  {services.map((service, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <span className="text-sm">{service}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Đội ngũ bác sĩ */}
            <Card>
              <CardHeader>
                <CardTitle>Đội ngũ bác sĩ</CardTitle>
                <CardDescription>Các bác sĩ giàu kinh nghiệm và chuyên môn cao</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  {doctors.map((doctor, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 rounded-lg border">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={doctor.avatar || "/placeholder.svg"} alt={doctor.name} />
                        <AvatarFallback>{doctor.name.split(" ").pop()?.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h4 className="font-semibold">{doctor.name}</h4>
                        <p className="text-sm text-muted-foreground">{doctor.title}</p>
                        <p className="text-sm text-primary font-medium">{doctor.specialization}</p>
                        <p className="text-xs text-muted-foreground mt-1">{doctor.experience}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Thông tin liên hệ */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Thông tin liên hệ</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Địa chỉ</p>
                    <p className="text-sm text-muted-foreground">Công Viên Phần Mềm Quang Trung, Quận 12, TPHCM</p>
                  </div>
                </div>
                <Separator />
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Điện thoại</p>
                    <p className="text-sm text-muted-foreground">0388 245 296</p>
                  </div>
                </div>
                <Separator />
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Email</p>
                    <p className="text-sm text-muted-foreground">Nimbus@gmail.com</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Lịch khám */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Lịch khám bệnh</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {schedule.map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">{item.day}</span>
                    </div>
                    <div className="ml-6">
                      <p className="text-sm text-muted-foreground">{item.time}</p>
                      <Badge variant="outline" className="text-xs mt-1">
                        {item.type}
                      </Badge>
                    </div>
                    {index < schedule.length - 1 && <Separator className="mt-3" />}
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Đặt lịch khám */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Đặt lịch khám</CardTitle>
                <CardDescription>Đặt lịch hẹn trước để được phục vụ tốt nhất</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Link to={"/dat-lich"} className="block">
                    <Button className="w-full py-2" size="lg">
                      <Calendar className="h-4 w-4 mr-2" />
                      Đặt lịch khám
                    </Button>
                  </Link>

                  <Button variant="outline" className="w-full bg-transparent">
                    <Phone className="h-4 w-4 mr-2" />
                    Gọi tư vấn
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <BackToTopButton/>
    </div>
  )
}
