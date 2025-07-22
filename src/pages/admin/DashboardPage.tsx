import { ChartBarMultiple } from "@/components/chart/chart-dashboard"
import { SectionCards } from "@/components/section-card/section-card"

const DashboardPage = () => {
  return (
    <div className="p-4">
      <SectionCards />
      <ChartBarMultiple />
    </div>
  )
}

export default DashboardPage
