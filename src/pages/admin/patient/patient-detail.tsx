import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2 } from "lucide-react"
import { CalendarDays, ClipboardList } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"

interface Patient {
  benhnhan_id: string
  hoTen: string
  gioiTinh: string
  email: string
  soDienThoai: string
  cccd: string
  diaChi: string
}

interface Appointment {
  appointment_id: string
  date: string
  doctor: string
  status: string
  note: string
}

interface MedicalRecord {
  record_id: string
  date: string
  diagnosis: string
  treatment: string
  notes: string
}

interface PatientData {
  patient: Patient
  appointments: Appointment[]
  medicalRecords: MedicalRecord[]
}

function PatientDetail() {
  const { benhnhan_id } = useParams()
  const [data, setData] = useState<PatientData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPatientData = async () => {
      setLoading(true)
      try {
        // ✅ DATA CỨNG
        const mockData: PatientData = {
          patient: {
            benhnhan_id: "1",
            hoTen: "Nguyễn Văn A",
            gioiTinh: "Nam",
            email: "a@gmail.com",
            soDienThoai: "0123456789",
            cccd: "123456789012",
            diaChi: "123 Lý Thường Kiệt, Hà Nội",
          },
          appointments: [
            {
              appointment_id: "appt1",
              date: "2025-08-01",
              doctor: "BS. Trần Văn B",
              status: "Hoàn thành",
              note: "Tái khám sau 2 tuần",
            },
            {
              appointment_id: "appt2",
              date: "2025-07-10",
              doctor: "BS. Lê Thị C",
              status: "Đã hủy",
              note: "Bệnh nhân báo bận",
            },
          ],
          medicalRecords: [
            {
              record_id: "rec1",
              date: "2025-07-20",
              diagnosis: "Viêm họng cấp",
              treatment: "Uống thuốc kháng sinh 7 ngày",
              notes: "Cần theo dõi thêm",
            },
            {
              record_id: "rec2",
              date: "2025-06-15",
              diagnosis: "Cảm cúm",
              treatment: "Nghỉ ngơi và uống nhiều nước",
              notes: "Không có biến chứng",
            },
          ],
        }

        setData(mockData)
      } catch (error: any) {
        setError("Đã xảy ra lỗi khi tải dữ liệu")
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchPatientData()
  }, [benhnhan_id])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">{error || "Không tìm thấy dữ liệu"}</p>
      </div>
    )
  }

  const { patient, appointments, medicalRecords } = data

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-primary"> Chi tiết bệnh nhân: {patient.hoTen}</h1>

      <Tabs defaultValue="appointments" className="space-y-4">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="appointments" className="flex items-center gap-2 justify-center ">
            <CalendarDays className="w-4 h-4" />
            Đặt lịch
          </TabsTrigger>
          <TabsTrigger value="medicalRecords" className="flex items-center gap-2 justify-center">
            <ClipboardList className="w-4 h-4" />
            Bệnh án
          </TabsTrigger>
        </TabsList>

        {/* Lịch sử đặt lịch */}
        <TabsContent value="appointments">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg text-muted-foreground">Lịch sử đặt lịch</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Ngày</TableHead>
                    <TableHead>Bác sĩ</TableHead>
                    <TableHead>Trạng thái</TableHead>
                    <TableHead>Ghi chú</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {appointments.length > 0 ? (
                    appointments.map((appt) => (
                      <TableRow
                        key={appt.appointment_id}
                        className="hover:bg-muted/50 transition-colors"
                      >
                        <TableCell>{format(new Date(appt.date), "dd/MM/yyyy")}</TableCell>
                        <TableCell>{appt.doctor}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              appt.status === "Hoàn thành"
                                ? "default"
                                : appt.status === "Đã hủy"
                                  ? "destructive"
                                  : "secondary"
                            }
                          >
                            {appt.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{appt.note}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center italic">
                        Không có lịch sử đặt lịch
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Bệnh án */}
        <TabsContent value="medicalRecords">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg text-muted-foreground">Bệnh án</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Ngày</TableHead>
                    <TableHead>Chẩn đoán</TableHead>
                    <TableHead>Điều trị</TableHead>
                    <TableHead>Ghi chú</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {medicalRecords.length > 0 ? (
                    medicalRecords.map((record) => (
                      <TableRow
                        key={record.record_id}
                        className="hover:bg-muted/50 transition-colors"
                      >
                        <TableCell>{format(new Date(record.date), "dd/MM/yyyy")}</TableCell>
                        <TableCell>{record.diagnosis}</TableCell>
                        <TableCell>{record.treatment}</TableCell>
                        <TableCell>{record.notes}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center italic">
                        Không có bệnh án
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
export default PatientDetail
