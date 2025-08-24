import { useState, useEffect, useCallback } from "react"
import type { ChangeEvent } from "react"
import { Combobox } from "@/components/ui/combobox"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { format } from "date-fns"
import { vi } from "date-fns/locale"
import BackToTopButton from "@/components/back-to-top/back-to-top"
import { DatePopover } from "@/components/dateInput/DatePopover"
import { getLichLamViecHomNay, getLichLamViecByNgay, createLichLamViec } from "@/api/appointmentApi"
import { fetchDoctors } from "@/api/apiDoctor"
import { toastSuccess, toastError } from "@/helper/toast"
import { useAppDispatch, useAppSelector } from "@/helper"
import { Loader2 } from "lucide-react"
import { Input } from "@/components/ui/input"

interface WorkSchedule {
  lichlvId: number
  ngay: string
  caTruc: string
  lyDoNghi?: string
  tenBacSi: string
  bacSiId: number
}

const AppointmentAdmin = () => {
  const dispatch = useAppDispatch()
  const doctors = useAppSelector((state) => state.doctors.doctors)
  const doctorsLoading = useAppSelector((state) => state.doctors.loading)

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [selectedDoctor, setSelectedDoctor] = useState<string>("")
  const [selectedShift, setSelectedShift] = useState<"Sáng" | "Chiều">("Sáng")
  const [reason, setReason] = useState<string>("")
  const [todaySchedules, setTodaySchedules] = useState<WorkSchedule[]>([])
  const [historySchedules, setHistorySchedules] = useState<WorkSchedule[]>([])
  const [loadingHistory, setLoadingHistory] = useState(false)
  const [loadingToday, setLoadingToday] = useState(false)
  const [creating, setCreating] = useState(false)

  // Bộ lọc khoa & ngày xem lịch
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>("") // lọc cho hôm nay
  const [historySpecialty, setHistorySpecialty] = useState<string>("") // lọc cho lịch sử
  const [historyDate, setHistoryDate] = useState<Date | undefined>(undefined)
  const [todayShift, setTodayShift] = useState<string>("all")
  const [historyShift, setHistoryShift] = useState<string>("all")
  const [todaySearch, setTodaySearch] = useState<string>("")
  const [historySearch, setHistorySearch] = useState<string>("")

  const handleTodaySearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTodaySearch(e.target.value)
  }

  const handleHistorySearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setHistorySearch(e.target.value)
  }

  const specialties = Array.from(new Set(doctors.map((doc) => doc.tenKhoa)))

  // Chuẩn hóa dữ liệu lịch làm việc từ API về một định dạng thống nhất
  const normalizeSchedules = (raw: any): WorkSchedule[] => {
    if (!raw) return []
    const rawArray = Array.isArray(raw) ? raw : [raw]
    return rawArray.map((item: any) => {
      const id = Number(item?.lichlvId ?? item?.lichLamViecId ?? item?.id ?? 0)
      const bacSiId = Number(item?.bacSiId ?? item?.bacsi_id ?? item?.doctorId ?? 0)
      const ngayRaw = item?.ngay
      const ngay =
        typeof ngayRaw === "string"
          ? ngayRaw.slice(0, 10)
          : ngayRaw
            ? format(new Date(ngayRaw), "yyyy-MM-dd")
            : ""
      const caTruc = String(item?.caTruc ?? item?.shift ?? "").trim()
      const lyDoNghi = item?.lyDoNghi ?? item?.lydoNghi ?? item?.reason ?? ""
      const tenBacSi = item?.tenBacSi ?? item?.hoTen ?? item?.doctorName ?? ""
      return { lichlvId: id, bacSiId, ngay, caTruc, lyDoNghi, tenBacSi }
    })
  }

  // Load lịch làm việc hôm nay
  const loadTodaySchedule = useCallback(async () => {
    try {
      setLoadingToday(true)
      const response = await getLichLamViecHomNay()
      const payload = (response as any)?.data ?? response
      setTodaySchedules(normalizeSchedules(payload))
    } catch (error) {
      toastError("Không thể tải lịch làm việc hôm nay")
      console.error("Error loading today schedule:", error)
    } finally {
      setLoadingToday(false)
    }
  }, [])

  // Load lịch làm việc theo ngày
  const loadScheduleByDate = async (date: Date) => {
    try {
      setLoadingHistory(true)
      const formattedDate = format(date, "yyyy-MM-dd")
      const response = await getLichLamViecByNgay(formattedDate)
      const payload = (response as any)?.data ?? response
      setHistorySchedules(normalizeSchedules(payload))
    } catch (error) {
      toastError("Không thể tải lịch làm việc theo ngày")
      console.error("Error loading schedule by date:", error)
    } finally {
      setLoadingHistory(false)
    }
  }

  // Load doctors và lịch làm việc hôm nay khi component mount
  useEffect(() => {
    dispatch(fetchDoctors())
    loadTodaySchedule()
  }, [dispatch, loadTodaySchedule])

  const handleAssignSchedule = async () => {
    if (!selectedDate || !selectedDoctor) return

    try {
      setCreating(true)

      const shiftMapping = {
        Sáng: "sáng",
        Chiều: "chiều",
      }

      const data = {
        bacSiId: parseInt(selectedDoctor),
        ngay: format(selectedDate, "yyyy-MM-dd"),
        caTruc: shiftMapping[selectedShift] || "sáng",
        lyDoNghi: reason || "",
      }

      const response = await createLichLamViec(data)

      // response đã là data từ axios helpers
      if (response && (response as any).success) {
        toastSuccess((response as any).message ?? "Tạo lịch làm việc cho bác sĩ thành công")

        // Reload schedule
        await loadTodaySchedule()

        // Reset form
        setReason("")
        setSelectedDoctor("")
      } else {
        toastError((response as any)?.message ?? "Không thể tạo lịch làm việc")
      }
    } catch (error) {
      const anyError: any = error
      const serverMessage = anyError?.response?.data?.message
      toastError(serverMessage ?? "Không thể tạo lịch làm việc")
      console.error("Error creating schedule:", error)
    } finally {
      setCreating(false)
    }
  }

  const getShiftColor = (shift: string) => {
    const normalized = (shift || "").trim().toLowerCase()
    return normalized === "sáng" || normalized === "sang"
      ? "bg-blue-100 text-blue-800"
      : "bg-orange-100 text-orange-800"
  }

  const getStatusColor = (reason?: string) => {
    return reason ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"
  }

  const getFilteredTodaySchedules = (
    schedules: WorkSchedule[],
    doctors: any[],
    specialty: string,
    shift: string,
    search: string
  ) => {
    return schedules.filter((schedule) => {
      const doctor = doctors.find((d) => Number(d.bacsi_id) === schedule.bacSiId)
      const specialtyMatch = !specialty || specialty === "all" || doctor?.tenKhoa === specialty
      const shiftMatch = !shift || shift === "all" || schedule.caTruc === shift
      const searchMatch =
        !search.trim() || schedule.tenBacSi.toLowerCase().includes(search.trim().toLowerCase())
      return specialtyMatch && shiftMatch && searchMatch
    })
  }

  const getDoctorSpecialty = (doctors: any[], bacSiId: number) => {
    const doctor = doctors.find((d) => Number(d.bacsi_id) === bacSiId)
    return doctor?.tenKhoa || "Không xác định"
  }

  const generateScheduleKey = (schedule: WorkSchedule) => {
    return `${schedule.lichlvId || "noid"}-${schedule.bacSiId}-${schedule.ngay}-${schedule.caTruc}`
  }
  return (
    <div className="py-3 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Quản lý lịch làm việc bác sĩ</h1>
        <p className="text-muted-foreground">
          Phân chia lịch làm việc và xem lịch sử ca trực của bác sĩ
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Form phân ca */}
        <Card>
          <CardHeader>
            <CardTitle>Phân ca làm việc</CardTitle>
            <CardDescription>Chọn ngày, bác sĩ và ca trực để phân lịch</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-4 items-center">
              <div className="space-y-2">
                <Label className="font-bold">Chọn ngày</Label>
                <DatePopover
                  date={selectedDate}
                  setDate={setSelectedDate}
                  locale={vi}
                  disablePast={true}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="doctor" className="font-bold">
                  Chọn bác sĩ
                </Label>
                <Combobox
                  value={selectedDoctor}
                  onValueChange={setSelectedDoctor}
                  placeholder="Chọn bác sĩ"
                  searchPlaceholder="Tìm kiếm bác sĩ..."
                  options={
                    doctorsLoading
                      ? [{ value: "loading", label: "Đang tải...", disabled: true }]
                      : doctors.length === 0
                        ? [{ value: "no-data", label: "Không có bác sĩ nào", disabled: true }]
                        : doctors.map((doctor) => ({
                            value: doctor.bacsi_id.toString(),
                            label: `${doctor.hoTen} - ${doctor.tenKhoa}`,
                          }))
                  }
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="font-bold">Chọn ca trực</Label>
              <RadioGroup
                value={selectedShift}
                onValueChange={(value) => setSelectedShift(value as "Sáng" | "Chiều")}
                className="flex space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Sáng" id="morning" />
                  <Label htmlFor="morning" className="cursor-pointer">
                    Ca sáng
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Chiều" id="afternoon" />
                  <Label htmlFor="afternoon" className="cursor-pointer">
                    Ca chiều
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="reason" className="font-bold">
                Lý do nghỉ (nếu có)
              </Label>
              <Textarea
                id="reason"
                placeholder="Nhập lý do nghỉ..."
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                rows={3}
                className="h-[100px]"
              />
            </div>

            <Button
              onClick={handleAssignSchedule}
              className="w-full"
              disabled={!selectedDate || !selectedDoctor || creating}
            >
              {creating ? "Đang tạo..." : "Phân lịch làm việc"}
            </Button>
          </CardContent>
        </Card>

        {/* Lịch làm việc hôm nay */}
        <Card>
          <CardHeader>
            <CardTitle>Lịch làm việc hôm nay</CardTitle>
            <CardDescription>
              {format(new Date(), "EEEE, dd/MM/yyyy", { locale: vi })}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Bộ lọc nâng cao: khoa, ca trực, tìm tên */}
            <div className="flex gap-3 items-center">
              <Input
                type="text"
                value={todaySearch}
                onChange={handleTodaySearchChange}
                placeholder="Tìm theo tên bác sĩ"
              />
              <Combobox
                value={selectedSpecialty}
                onValueChange={setSelectedSpecialty}
                placeholder="Lọc theo khoa"
                searchPlaceholder="Tìm kiếm khoa..."
                className="w-[200px]"
                options={[
                  { value: "all", label: "Tất cả" },
                  ...specialties.map((spec) => ({
                    value: spec,
                    label: spec,
                  })),
                ]}
              />
              <Combobox
                value={todayShift}
                onValueChange={setTodayShift}
                placeholder="Lọc theo ca"
                searchPlaceholder="Tìm kiếm ca..."
                className="w-[160px]"
                options={[
                  { value: "all", label: "Tất cả ca" },
                  { value: "sáng", label: "Ca sáng" },
                  { value: "chiều", label: "Ca chiều" },
                ]}
              />
            </div>

            <div className="space-y-3 max-h-[300px] overflow-y-auto">
              {loadingToday ? (
                <div className="text-center py-4">Đang tải...</div>
              ) : todaySchedules.length === 0 ? (
                <div className="text-center py-4 text-muted-foreground">
                  Không có lịch làm việc nào
                </div>
              ) : (
                getFilteredTodaySchedules(
                  todaySchedules,
                  doctors,
                  selectedSpecialty,
                  todayShift,
                  todaySearch
                ).map((schedule) => {
                  const specialty = getDoctorSpecialty(doctors, schedule.bacSiId)

                  return (
                    <div
                      key={generateScheduleKey(schedule)}
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <div>
                        <p className="font-medium">
                          {schedule.tenBacSi} - {specialty}
                        </p>
                        <Badge className={getShiftColor(schedule.caTruc)}>
                          Ca {schedule.caTruc.toLowerCase()}
                        </Badge>
                      </div>
                      <Badge variant={schedule.lyDoNghi ? "destructive" : "default"}>
                        {schedule.lyDoNghi ? "Nghỉ" : "Làm việc"}
                      </Badge>
                    </div>
                  )
                })
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Lịch sử ca trực */}
      <Card>
        <CardHeader>
          <CardTitle>Lịch sử ca trực</CardTitle>
          <CardDescription>Tất cả các ca làm việc đã được phân chia</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Bộ lọc khoa + ngày + ca trực + tìm tên */}
          <div className="flex gap-4">
            <Input
              type="text"
              value={historySearch}
              onChange={handleHistorySearchChange}
              placeholder="Tìm theo tên bác sĩ"
            />
            <Combobox
              value={historySpecialty}
              onValueChange={setHistorySpecialty}
              placeholder="Lọc theo khoa"
              searchPlaceholder="Tìm kiếm khoa..."
              className="w-[200px]"
              options={[
                { value: "all", label: "Tất cả" },
                ...specialties.map((spec) => ({
                  value: spec,
                  label: spec,
                })),
              ]}
            />

            <DatePopover date={historyDate} setDate={setHistoryDate} locale={vi} />
            <Combobox
              value={historyShift}
              onValueChange={setHistoryShift}
              placeholder="Lọc theo ca"
              searchPlaceholder="Tìm kiếm ca..."
              className="w-[160px]"
              options={[
                { value: "all", label: "Tất cả ca" },
                { value: "sáng", label: "Ca sáng" },
                { value: "chiều", label: "Ca chiều" },
              ]}
            />

            <Button
              variant="outline"
              onClick={() => {
                const today = new Date()
                setHistoryDate(today)
                loadScheduleByDate(today)
                setHistorySpecialty("all")
                setHistoryShift("all")
                setHistorySearch("")
              }}
            >
              Xoá lọc
            </Button>
            {historyDate && (
              <Button variant="outline" onClick={() => loadScheduleByDate(historyDate)}>
                Xem lịch ngày này
              </Button>
            )}
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ngày</TableHead>
                <TableHead>Bác sĩ</TableHead>
                <TableHead>Ca trực</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Lý do nghỉ</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loadingHistory ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center justify-center py-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                  </TableCell>
                </TableRow>
              ) : historySchedules.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center justify-center py-2">
                    Không có lịch làm việc nào
                  </TableCell>
                </TableRow>
              ) : (
                historySchedules.length > 0 &&
                historySchedules
                  .filter((schedule) => {
                    if (!historySpecialty || historySpecialty === "all") return true
                    const doctor = doctors.find((d) => Number(d.bacsi_id) === schedule.bacSiId)
                    return doctor?.tenKhoa === historySpecialty
                  })
                  .filter((schedule) => {
                    if (!historyShift || historyShift === "all") return true
                    const normalized = (schedule.caTruc || "").trim().toLowerCase()
                    return (
                      normalized === historyShift || normalized === "sang" || normalized === "chiều"
                    )
                  })
                  .filter((schedule) => {
                    if (!historySearch.trim()) return true
                    const name = (schedule.tenBacSi || "").toLowerCase()
                    return name.includes(historySearch.trim().toLowerCase())
                  })
                  .map((schedule) => {
                    const specialty =
                      doctors.find((d) => Number(d.bacsi_id) === schedule.bacSiId)?.tenKhoa ||
                      "Không xác định"
                    return (
                      <TableRow
                        key={`${schedule.lichlvId || "noid"}-${schedule.bacSiId}-${schedule.ngay}-${schedule.caTruc}`}
                      >
                        <TableCell>
                          {format(new Date(schedule.ngay), "dd/MM/yyyy", { locale: vi })}
                        </TableCell>
                        <TableCell className="font-medium">
                          {schedule.tenBacSi} - {specialty}
                        </TableCell>
                        <TableCell>
                          <Badge className={getShiftColor(schedule.caTruc)}>
                            {schedule.caTruc === "sáng" || schedule.caTruc === "sang"
                              ? "Ca sáng"
                              : "Ca chiều"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(schedule.lyDoNghi)}>
                            {schedule.lyDoNghi ? "Nghỉ" : "Làm việc"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {schedule.lyDoNghi || "-"}
                        </TableCell>
                      </TableRow>
                    )
                  })
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <BackToTopButton />
    </div>
  )
}

export default AppointmentAdmin
