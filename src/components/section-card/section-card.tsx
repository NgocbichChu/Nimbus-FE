import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { TrendingUp, TrendingDown } from "lucide-react"

type CardItem = {
  title: string
  value: string
  trend: string
  trendValue: string
  footerTitle: string
  footerDesc: string
}

type SectionCardsProps = {
  cards: CardItem[]
}

export function SectionCards({ cards }: SectionCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {cards.map((card, idx) => (
        <Card key={idx} className="@container/card gap-2">
          <CardHeader>
            <CardDescription>{card.title}</CardDescription>
            <CardAction>
              <div className="flex items-center gap-1 text-green-500">
                {card.trend === "up" ? <TrendingUp /> : <TrendingDown />}
                {card.trendValue}
              </div>
            </CardAction>
            <CardTitle className="text-2xl text-primary font-semibold tabular-nums @[250px]/card:text-3xl">
              {card.value}
            </CardTitle>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium">
              {card.footerTitle}{" "}
              {card.trend === "up" ? (
                <TrendingUp className="size-4" />
              ) : (
                <TrendingDown className="size-4" />
              )}
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
