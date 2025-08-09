import { useState } from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { Doctor } from "@/components/data-table/type-table"
// import { fetchDoctors, updateDoctor } from "@/api/apiDoctor"
import { useAppDispatch } from "@/helper" 
import { updateDoctor } from "@/api/apiDoctor"

type Props = {
  value: Doctor
}

export function DoctorStatusCell({ value }: Props) {
  const dispatch = useAppDispatch()
  const [status, setStatus] = useState(value.trangThaiHoatDong)

  const handleChange = async (val: string) => {
    const newVal = val === "true"
    setStatus(newVal)
    const dataWithId = { ...value, trangThaiHoatDong: newVal, id: value.bacsi_id } // ✅ thêm id ở đây
    try {
      await dispatch(
        updateDoctor(dataWithId)
      ).unwrap()
      // dispatch(fetchDoctors()) // reload lại danh sách
    } catch (error) {
      console.error("Update thất bại:", error)
    }
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
