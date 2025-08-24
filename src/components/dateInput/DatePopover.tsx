"use client"

import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import type { Locale } from "date-fns"

interface DatePopoverProps {
  date?: Date
  setDate: (date: Date | undefined) => void
  locale: Locale
  disablePast?: boolean
  disableFuture?: boolean
}

export function DatePopover({
  date,
  setDate,
  locale,
  disablePast = false,
  disableFuture = false,
}: DatePopoverProps) {
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
          data-empty={!date}
          className="data-[empty=true]:text-muted-foreground w-[280px] justify-start text-left font-normal"
        >
          <CalendarIcon />
          {date ? format(date, "dd/MM/yyyy") : <span>Chọn ngày</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          locale={locale}
          disabled={getDisabledDates()}
          fromDate={disablePast ? today : undefined}
          toDate={disableFuture ? today : undefined}
        />
      </PopoverContent>
    </Popover>
  )
}
