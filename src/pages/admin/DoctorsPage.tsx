import { fetchDoctors } from "@/api/apiDoctor"
import { doctorColumns } from "@/pages/admin/doctor/doctor-column"
import { DataTable } from "@/pages/admin/doctor/table"
import { useAppDispatch, useAppSelector } from "@/helper"
import { useEffect } from "react"

export default function DoctorPage() {
  const dispatch = useAppDispatch()
  const doctor = useAppSelector((state) => state.doctors.doctors)

  useEffect(() => {
    dispatch(fetchDoctors())
  }, [dispatch])

  return (
    <div>
      <DataTable columns={doctorColumns} data={doctor} filterColumn="hoTen" />
    </div>
  )
}
