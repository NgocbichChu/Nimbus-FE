import { useState, useMemo } from "react"
import { ChartBarMultiple } from "@/components/chart/chart-dashboard"
import { SectionCards } from "@/components/section-card/section-card"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import BackToTopButton from "@/components/back-to-top/back-to-top"

// ======================= COMPONENT SELECT =======================
const SearchableSelect = ({
  items,
  value,
  placeholder,
  onChange,
}: {
  items: string[]
  value: string
  placeholder: string
  onChange: (v: string) => void
}) => {
  const [open, setOpen] = useState(false)
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" className="w-[220px] justify-between">
          {value || placeholder}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Command>
          <CommandInput placeholder={`Tìm ${placeholder.toLowerCase()}...`} />
          <CommandList>
            <CommandEmpty>Không tìm thấy.</CommandEmpty>
            <CommandGroup>
              {items.map((item) => (
                <CommandItem
                  key={item}
                  value={item}
                  onSelect={(currentValue) => {
                    onChange(currentValue)
                    setOpen(false)
                  }}
                >
                  {item}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

// ======================= DỮ LIỆU GIẢ =======================
const months = [
  "Tất cả các tháng",
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

const currentYear = new Date().getFullYear()
const currentMonthIndex = new Date().getMonth() // 0 = Jan

const generateYearData = (
  baseNoi: number,
  baseNgoai: number,
  baseSan: number,
  baseNhi: number,
  year: number
) => {
  return months
    .filter((m) => m !== "Tất cả các tháng")
    .filter((_, i) => year < currentYear || i <= currentMonthIndex) // Chỉ lấy tới tháng hiện tại nếu là năm hiện tại
    .map((month, i) => ({
      month,
      noi: baseNoi + i * 5,
      ngoai: baseNgoai + i * 5,
      san: baseSan + i * 4,
      nhi: baseNhi + i * 3,
    }))
}

const allData: Record<
  string,
  { month: string; noi: number; ngoai: number; san: number; nhi: number }[]
> = {
  "2024": generateYearData(120, 90, 80, 60, 2024),
  "2025": generateYearData(140, 110, 90, 70, 2025),
}

// ======================= MAIN PAGE =======================
const DashboardPage = () => {
  const [selectedYear, setSelectedYear] = useState<string>("2025")
  const [selectedMonth, setSelectedMonth] = useState<string>("Tất cả các tháng")

  const filteredData = useMemo(() => {
    const yearData = allData[selectedYear] || []
    if (selectedMonth === "Tất cả các tháng") return yearData
    return yearData.filter((item) => item.month === selectedMonth)
  }, [selectedYear, selectedMonth])

  const cardsData = useMemo(() => {
    const data = filteredData

    const totalVisits = data.reduce(
      (sum, item) => sum + item.noi + item.ngoai + item.san + item.nhi,
      0
    )

    const totalOnlineReg = data.reduce((sum, item) => {
      const percent = Math.random() * 0.2 + 0.3
      return sum + Math.round((item.noi + item.ngoai + item.san + item.nhi) * percent)
    }, 0)

    const newPatients = Math.round(totalVisits * 0.18)

    const revisitRate = Math.floor(Math.random() * 20) + 60

    return [
      {
        title: "Tổng lượt đăng ký khám online",
        value: totalOnlineReg.toLocaleString("vi-VN") + " lượt",
        trend: "up" as const,
        trendValue: "+12.5%",
        footerTitle: "Tăng so với kỳ trước",
        footerDesc: "Xu hướng bệnh nhân đặt lịch trước qua hệ thống",
      },
      {
        title: "Tổng lượt khám",
        value: totalVisits.toLocaleString("vi-VN") + " lượt",
        trend: "up" as const,
        trendValue: "+8.4%",
        footerTitle: "Tăng đều trong các khoa",
        footerDesc: "Nội, Ngoại, Sản và Nhi đều tăng",
      },
      {
        title: "Bệnh nhân mới",
        value: newPatients.toLocaleString("vi-VN"),
        trend: "up" as const,
        trendValue: "+6.1%",
        footerTitle: "Tăng so với kỳ trước",
        footerDesc: "Hiệu quả từ chiến dịch truyền thông",
      },
      {
        title: "Tỷ lệ tái khám",
        value: revisitRate + "%",
        trend: revisitRate >= 70 ? ("up" as const) : ("down" as const),
        trendValue: revisitRate >= 70 ? "+4%" : "-3%",
        footerTitle: revisitRate >= 70 ? "Giữ chân bệnh nhân tốt" : "Cần cải thiện dịch vụ",
        footerDesc: "Dựa trên dữ liệu bệnh nhân quay lại",
      },
    ]
  }, [filteredData])

  return (
    <div className="pt-4 space-y-4">
      {/* Bộ lọc Năm / Tháng */}
      <div className="flex gap-4">
        <SearchableSelect
          items={Object.keys(allData)}
          value={selectedYear}
          placeholder="Chọn năm"
          onChange={(v) => setSelectedYear(v)}
        />
        <SearchableSelect
          items={[
            "Tất cả các tháng",
            ...months.filter(
              (m, i) =>
                m !== "Tất cả các tháng" &&
                (parseInt(selectedYear) < currentYear || i <= currentMonthIndex + 1)
            ),
          ]}
          value={selectedMonth}
          placeholder="Chọn tháng"
          onChange={(v) => setSelectedMonth(v)}
        />
      </div>

      {/* Cards */}
      <SectionCards cards={cardsData} />

      {/* Chart */}
      <ChartBarMultiple
        data={filteredData}
        selectedYear={selectedYear}
        selectedMonth={selectedMonth}
      />
      <BackToTopButton />
    </div>
  )
}

export default DashboardPage
