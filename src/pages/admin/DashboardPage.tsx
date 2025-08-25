import { useState, useMemo, useEffect } from "react"
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
import { getStatistics, type StatisticsData } from "@/api/statisticsApi"

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
    .filter((_, i) => year < currentYear || i <= currentMonthIndex)
    .map((month, i) => {
      const wave = (i: number, amplitude: number) =>
        Math.sin(i * 1.2) * amplitude + (Math.random() * amplitude - amplitude / 2);

      const clamp = (num: number) => Math.max(0, Math.round(num)); // không âm và làm tròn

      return {
        month,
        noi: clamp(baseNoi + wave(i, 50)),
        ngoai: clamp(baseNgoai + wave(i, 40)),
        san: clamp(baseSan + wave(i, 35)),
        nhi: clamp(baseNhi + wave(i, 25)),
      };
    });
};

const allData: Record<
  string,
  { month: string; noi: number; ngoai: number; san: number; nhi: number }[]
> = {
  "2024": generateYearData(120, 90, 80, 60, 2024),
  "2025": generateYearData(100, 180, 160, 150, 2025),
};



// ======================= MAIN PAGE =======================
const DashboardPage = () => {
  const [selectedYear, setSelectedYear] = useState<string>("2025")
  const [selectedMonth, setSelectedMonth] = useState<string>("Tất cả các tháng")
  const [statisticsData, setStatisticsData] = useState<StatisticsData | null>(null)
  const [allMonthsData, setAllMonthsData] = useState<StatisticsData | null>(null)
  const [loading, setLoading] = useState(false)

  // Hàm helper để chuyển đổi tên tháng thành số
  const getMonthNumber = (monthName: string): number => {
    const monthMap: Record<string, number> = {
      January: 1,
      February: 2,
      March: 3,
      April: 4,
      May: 5,
      June: 6,
      July: 7,
      August: 8,
      September: 9,
      October: 10,
      November: 11,
      December: 12,
    }
    const result = monthMap[monthName] || new Date().getMonth() + 1
    return result
  }

  // Call API khi filter thay đổi
  useEffect(() => {
    const fetchStatistics = async () => {
      setLoading(true)

      try {
        const year = parseInt(selectedYear)

        if (selectedMonth === "Tất cả các tháng") {
          // Gọi API cho tất cả các tháng và tính tổng
          const monthPromises = []
          const currentMonth = new Date().getMonth() + 1 // 1-12
          const maxMonth = year < new Date().getFullYear() ? 12 : currentMonth

          for (let month = 1; month <= maxMonth; month++) {
            monthPromises.push(getStatistics(month, year))
          }

          const allMonthsResults = await Promise.all(monthPromises)

          // Tính tổng tất cả các tháng
          const totalData: StatisticsData = {
            benhNhanMoi: allMonthsResults.reduce((sum, data) => sum + data.benhNhanMoi, 0),
            tongLuotKham: allMonthsResults.reduce((sum, data) => sum + data.tongLuotKham, 0),
            dangKiKham: allMonthsResults.reduce((sum, data) => sum + data.dangKiKham, 0),
            tongLuotHuyKham: allMonthsResults.reduce((sum, data) => sum + data.tongLuotHuyKham, 0),
          }

          console.log("✅ Total data calculated:", totalData)
          setAllMonthsData(totalData)
          setStatisticsData(null) // Clear single month data
        } else {
          // Gọi API cho tháng cụ thể
          const month = getMonthNumber(selectedMonth)
          console.log("📡 Calling API for specific month:", { month, year })

          const data = await getStatistics(month, year)
          console.log("✅ Single month API response:", data)
          setStatisticsData(data)
          setAllMonthsData(null) // Clear all months data
        }
      } catch (error) {
        console.error("❌ Error fetching statistics:", error)
        setStatisticsData(null)
        setAllMonthsData(null)
      } finally {
        setLoading(false)
      }
    }

    fetchStatistics()
  }, [selectedMonth, selectedYear])

  const filteredData = useMemo(() => {
    const yearData = allData[selectedYear] || []
    if (selectedMonth === "Tất cả các tháng") return yearData
    return yearData.filter((item) => item.month === selectedMonth)
  }, [selectedYear, selectedMonth])

  const cardsData = useMemo(() => {
    console.log("🔄 cardsData recalculating:", {
      statisticsData,
      allMonthsData,
      selectedMonth,
      hasStatisticsData: !!statisticsData,
      hasAllMonthsData: !!allMonthsData,
    })

    // Nếu có dữ liệu từ API cho tháng cụ thể
    if (statisticsData) {
      return [
        {
          title: "Tổng lượt đăng ký khám online",
          value: statisticsData.dangKiKham.toLocaleString("vi-VN") + " lượt",
          trend: "up" as const,
          trendValue: "+12.5%",
          footerTitle: "Dữ liệu thực từ hệ thống",
          footerDesc: "Số lượt đăng ký khám qua online",
        },
        {
          title: "Tổng lượt khám",
          value: statisticsData.tongLuotKham.toLocaleString("vi-VN") + " lượt",
          trend: "up" as const,
          trendValue: "+8.4%",
          footerTitle: "Tổng số lượt khám thực tế",
          footerDesc: "Bao gồm cả khám online và offline",
        },
        {
          title: "Bệnh nhân mới",
          value: statisticsData.benhNhanMoi.toLocaleString("vi-VN"),
          trend: "up" as const,
          trendValue: "+6.1%",
          footerTitle: "Bệnh nhân lần đầu khám",
          footerDesc: "Số lượng bệnh nhân mới trong kỳ",
        },
        {
          title: "Tổng lượt hủy khám",
          value: statisticsData.tongLuotHuyKham.toLocaleString("vi-VN") + " lượt",
          trend: statisticsData.tongLuotHuyKham <= 5 ? ("up" as const) : ("down" as const),
          trendValue: statisticsData.tongLuotHuyKham <= 5 ? "Thấp" : "Cao",
          footerTitle:
            statisticsData.tongLuotHuyKham <= 5 ? "Tỷ lệ hủy thấp" : "Cần cải thiện dịch vụ",
          footerDesc: "Số lượt hủy lịch khám trong kỳ",
        },
      ]
    }

    // Nếu có dữ liệu từ API cho tất cả các tháng
    if (allMonthsData) {
      return [
        {
          title: "Tổng lượt đăng ký khám",
          value: allMonthsData.dangKiKham.toLocaleString("vi-VN") + " lượt",
          trend: "up" as const,
          trendValue: "+12.5%",
          footerTitle: "Tổng cả năm",
          footerDesc: "Tổng số lượt đăng ký khám online trong năm",
        },
        {
          title: "Tổng lượt khám",
          value: allMonthsData.tongLuotKham.toLocaleString("vi-VN") + " lượt",
          trend: "up" as const,
          trendValue: "+8.4%",
          footerTitle: "Tổng số lượt khám trong năm",
          footerDesc: "Tổng lượt khám thực tế từ API",
        },
        {
          title: "Bệnh nhân mới",
          value: allMonthsData.benhNhanMoi.toLocaleString("vi-VN"),
          trend: "up" as const,
          trendValue: "+6.1%",
          footerTitle: "Tổng bệnh nhân mới trong năm",
          footerDesc: "Tổng số bệnh nhân mới từ API",
        },
        {
          title: "Tổng lượt hủy khám",
          value: allMonthsData.tongLuotHuyKham.toLocaleString("vi-VN") + " lượt",
          trend: allMonthsData.tongLuotHuyKham <= 50 ? ("up" as const) : ("down" as const),
          trendValue: allMonthsData.tongLuotHuyKham <= 50 ? "Thấp" : "Cao",
          footerTitle:
            allMonthsData.tongLuotHuyKham <= 50 ? "Tỷ lệ hủy thấp" : "Cần cải thiện dịch vụ",
          footerDesc: "Tổng số lượt hủy khám trong năm",
        },
      ]
    }

    // Fallback: sử dụng dữ liệu giả (chỉ khi không có API data)
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
  }, [filteredData, statisticsData, allMonthsData, selectedMonth])

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
          onChange={(v) => {
            setSelectedMonth(v)
          }}
        />
      </div>

      {/* Cards */}
      {loading ? (
        <div className="text-center py-8">
          <p>Đang tải dữ liệu thống kê...</p>
        </div>
      ) : (
        <SectionCards cards={cardsData} />
      )}

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
