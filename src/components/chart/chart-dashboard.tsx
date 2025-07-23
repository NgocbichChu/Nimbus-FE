"use client"

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

export const description = "A multiple bar chart"

const chartData = [
  { month: "January", noi: 120, ngoai: 90, san: 75, nhi: 60 },
  { month: "February", noi: 135, ngoai: 100, san: 85, nhi: 70 },
  { month: "March", noi: 150, ngoai: 110, san: 90, nhi: 65 },
  { month: "April", noi: 140, ngoai: 95, san: 88, nhi: 75 },
  { month: "May", noi: 130, ngoai: 155, san: 95, nhi: 80 },
  { month: "June", noi: 100, ngoai: 105, san: 150, nhi: 85 },
  { month: "July", noi: 100, ngoai: 105, san: 150, nhi: 85 },
  { month: "August", noi: 0, ngoai: 0, san: 0, nhi: 0 },
  { month: "Septemper", noi: 0, ngoai: 0, san: 0, nhi: 0 },
  { month: "Octoper", noi: 0, ngoai: 0, san: 0, nhi: 0 },
  { month: "November", noi: 0, ngoai: 0, san: 0, nhi: 0 },
  { month: "December", noi: 0, ngoai: 0, san: 0, nhi: 0 },

]

const chartConfig = {
  noi: {
    label: "Khoa Nội",
    color: "var(--chart-1)",
  },
  ngoai: {
    label: "Khoa Ngoại",
    color: "var(--chart-2)",
  },
  san: {
    label: "Sản phụ khoa",
    color: "var(--chart-3)",
  },
  nhi: {
    label: "Nhi khoa",
    color: "var(--chart-4)",
  },
} satisfies ChartConfig

export function ChartBarMultiple() {
  return (
    <div className="pt-4">
      <Card className="h-fit w-full gap-0">
        <CardHeader>
          <CardTitle>Bar Chart - Multiple</CardTitle>
          <CardDescription>January - June 2024</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px] w-full">
            <BarChart accessibilityLayer data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dashed" />} />
              <Bar dataKey="noi" fill="var(--color-noi)" radius={4} />
              <Bar dataKey="ngoai" fill="var(--color-ngoai)" radius={4} />
              <Bar dataKey="san" fill="#ec4899" radius={4} />
              <Bar dataKey="nhi" fill="#10b981" radius={4} />
            </BarChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col items-start gap-2 text-sm">
          <div className="flex gap-2 leading-none font-medium">
            Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
          </div>
          <div className="text-muted-foreground leading-none">
            Showing total visitors for the last 6 months
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
