import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { TrendingUp, TrendingDown } from "lucide-react"

export function SectionCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Tổng doanh thu</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            2,325,000,000 đồng
          </CardTitle>
          <CardAction>
            <div>
              <TrendingUp />
              +12.5%
            </div>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Đang có xu hướng tăng <TrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">Số lượt khám trong 6 tháng gần nhất</div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Tổng số đặt lịch khám</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            1,234
          </CardTitle>
          <CardAction>
            <div>
              <TrendingDown />
              -20%
            </div>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Giảm 20% so với kỳ trước <TrendingDown className="size-4" />
          </div>
          <div className="text-muted-foreground">	Hoạt động tiếp cận bệnh nhân chưa hiệu quả</div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Số bệnh nhân tái khám</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            45,678
          </CardTitle>
          <CardAction>
            <div>
              <TrendingUp />
              +12.5%
            </div>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Tăng tỷ lệ bệnh nhân quay lại <TrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">Chăm sóc sau điều trị đạt hiệu quả</div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Tỷ lệ tăng trưởng</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            4.5%
          </CardTitle>
          <CardAction>
            <div>
              <TrendingUp />
              +4.5%
            </div>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Hiệu suất tăng đều <TrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">Đáp ứng dự báo tăng trưởng</div>
        </CardFooter>
      </Card>
    </div>
  )
}
