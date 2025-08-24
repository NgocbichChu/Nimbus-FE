import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "../ui/button"
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"

export function DateInput({
  date,
  setDate,
  disableFuture = false,
  disablePast = false,
}: {
  date: Date | undefined
  setDate: (d: Date) => void
  disableFuture?: boolean
  disablePast?: boolean
}) {
  const today = new Date()
  today.setHours(0, 0, 0, 0) // Set to start of day for accurate comparison

  const getDisabledDates = () => {
    if (disableFuture && disablePast) {
      // Chỉ cho phép chọn hôm nay
      return (date: Date) => {
        const dateToCheck = new Date(date)
        dateToCheck.setHours(0, 0, 0, 0)
        return dateToCheck.getTime() !== today.getTime()
      }
    } else if (disableFuture) {
      // Không cho phép chọn ngày tương lai
      return (date: Date) => date > today
    } else if (disablePast) {
      // Không cho phép chọn ngày quá khứ
      return (date: Date) => date < today
    }
    return undefined
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "dd/MM/yyyy") : <span>Chọn ngày</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(d) => d && setDate(d)}
          disabled={getDisabledDates()}
          fromDate={disablePast ? today : undefined}
          toDate={disableFuture ? today : undefined}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}
