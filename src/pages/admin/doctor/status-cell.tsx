// DoctorStatusCell.tsx
import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toastSuccess } from "@/helper/toast"

type Props = {
  value: boolean
}

export function DoctorStatusCell({ value }: Props) {
  const [status, setStatus] = useState(value)
  const handleChange = (val: string) => {
    const newVal = val === "true"
    setStatus(newVal)
    toastSuccess(`Trạng thái đã được cập nhật`)

  }

  return (
    <Select value={status ? "true" : "false"} onValueChange={handleChange}>
      <SelectTrigger className="w-[100px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="true">Hoạt động</SelectItem>
        <SelectItem value="false">Nghỉ</SelectItem>
      </SelectContent>
    </Select>
  )
}
