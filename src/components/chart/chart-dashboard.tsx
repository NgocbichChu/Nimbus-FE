import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

type ChartItem = {
  month: string
  noi: number
  ngoai: number
  san: number
  nhi: number
}

const chartConfig = {
  noi: { label: "Khoa Nội", color: "var(--chart-1)" },
  ngoai: { label: "Khoa Ngoại", color: "var(--chart-2)" },
  san: { label: "Sản phụ khoa", color: "var(--chart-3)" },
  nhi: { label: "Nhi khoa", color: "var(--chart-4)" },
} satisfies ChartConfig

type ChartBarMultipleProps = {
  data: ChartItem[]
  selectedYear: string
  selectedMonth: string // "all" hoặc tên tháng
}

export function ChartBarMultiple({ data, selectedYear, selectedMonth }: ChartBarMultipleProps) {
  // Nếu chọn "all" thì lấy tất cả tháng, còn không thì filter đúng tháng
  const filteredData =
    selectedMonth === "Tất cả các tháng"
      ? data
      : data.filter((item) => item.month.toLowerCase() === selectedMonth.toLowerCase())

  return (
    <div className="pt-4">
      <Card className="h-fit w-full gap-0">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Biểu đồ doanh thu</CardTitle>
              <CardDescription>{selectedYear}</CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px] w-full">
            <BarChart accessibilityLayer data={filteredData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value: string) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dashed" />}
              />
              <Bar dataKey="noi" fill="var(--chart-1)" radius={4} />
              <Bar dataKey="ngoai" fill="var(--chart-2)" radius={4} />
              <Bar dataKey="san" fill="var(--chart-3)" radius={4} />
              <Bar dataKey="nhi" fill="var(--chart-4)" radius={4} />
            </BarChart>
          </ChartContainer>
        </CardContent>

        <CardFooter className="flex-col items-start gap-2 text-sm">
          <div className="flex gap-2 leading-none font-medium">
            Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
          </div>
          <div className="text-muted-foreground leading-none">
            Showing total visitors for{" "}
            {selectedMonth === "all" ? "all months" : selectedMonth} of {selectedYear}
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
