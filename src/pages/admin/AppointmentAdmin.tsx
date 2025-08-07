import { useState } from "react"
import { format, addDays, startOfWeek } from "date-fns"
import { vi } from "date-fns/locale"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"

interface WorkingShift {
  doctorId: string
  doctorName: string
  department: string
  date: string // ISO: yyyy-MM-dd
  shift: "Sáng" | "Chiều"
}

const shifts = ["Sáng", "Chiều"] as const

// mock dữ liệu bác sĩ làm việc
const mockData: WorkingShift[] = [
  {
    doctorId: "1",
    doctorName: "BS. Nguyễn Văn A",
    department: "Nội tổng quát",
    date: "2025-08-04",
    shift: "Sáng",
  },
  {
    doctorId: "1",
    doctorName: "BS. Nguyễn Văn A",
    department: "Nội tổng quát",
    date: "2025-08-05",
    shift: "Chiều",
  },
  {
    doctorId: "2",
    doctorName: "BS. Trần Thị B",
    department: "Nội tổng quát",
    date: "2025-08-04",
    shift: "Sáng",
  },
  {
    doctorId: "3",
    doctorName: "BS. Lê Văn C",
    department: "Nhi",
    date: "2025-08-05",
    shift: "Sáng",
  },
  {
    doctorId: "2",
    doctorName: "BS. Trần Thị B",
    department: "Nội tổng quát",
    date: "2025-07-31",
    shift: "Chiều",
  },
]

export default function DoctorSchedule() {
  const [selectedDepartment, setSelectedDepartment] = useState<string | undefined>("Nội tổng quát")
  const [selectedDate, setSelectedDate] = useState<string>(format(new Date(), "yyyy-MM-dd"))

  // Lấy danh sách ngày từ thứ 2 đến CN dựa trên ngày được chọn
  const weekDates = Array.from({ length: 7 }, (_, i) =>
    format(addDays(startOfWeek(new Date(selectedDate), { weekStartsOn: 1 }), i), "yyyy-MM-dd")
  )

  const weekdays = weekDates.map((date) =>
    format(new Date(date), "EEEE", { locale: vi }) // ví dụ: Thứ hai, Thứ ba
  )

  const filteredShifts = mockData.filter(
    (shift) =>
      shift.department === selectedDepartment &&
      weekDates.includes(shift.date)
  )

  return (
    <Card className="p-4">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-primary">📅 Lịch làm việc bác sĩ</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Bộ lọc */}
        <div className="flex flex-wrap gap-4 items-center mb-6">
          <Select defaultValue={selectedDepartment} onValueChange={setSelectedDepartment}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Chọn khoa" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Nội tổng quát">Nội tổng quát</SelectItem>
              <SelectItem value="Nhi">Nhi</SelectItem>
              <SelectItem value="Ngoại">Ngoại</SelectItem>
            </SelectContent>
          </Select>

          <Input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-[200px]"
          />
        </div>

        {/* Bảng lịch */}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Ca</TableHead>
              {weekDates.map((date, i) => (
                <TableHead key={date}>
                  {weekdays[i]} <br />
                  <span className="text-xs text-muted-foreground">{format(new Date(date), "dd/MM/yyyy")}</span>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {shifts.map((shift) => (
              <TableRow key={shift}>
                <TableCell className="font-semibold">{shift}</TableCell>
                {weekDates.map((date) => {
                  const doctors = filteredShifts.filter((s) => s.shift === shift && s.date === date)
                  return (
                    <TableCell key={date}>
                      {doctors.length > 0 ? (
                        <ul className="space-y-1">
                          {doctors.map((doc) => (
                            <li key={doc.doctorId} className="text-sm text-primary">{doc.doctorName}</li>
                          ))}
                        </ul>
                      ) : (
                        <span className="text-muted-foreground text-xs">-</span>
                      )}
                    </TableCell>
                  )
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
