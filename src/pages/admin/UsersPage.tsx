import { patientColumns } from "@/pages/admin/patient/user-column"
import { DataTableUser } from "./patient/table-user"
import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "@/helper"
import { fetchPatient } from "@/api/petientApi"

export default function PatientPage() {
  const dispatch = useAppDispatch()
  const patients = useAppSelector((state) => state.patient.patients)

  useEffect(() => {
    dispatch(fetchPatient())
  }, [dispatch])

  return (
    <div>
      <DataTableUser columns={patientColumns} data={patients} filterColumn="hoTen" />
    </div>
  )
}
