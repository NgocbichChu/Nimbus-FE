import { useState } from "react"
import { Button } from "../../../components/ui/button"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../../components/ui/dialog"
import DoctorForm from "./DoctorForm"
import type { Doctor } from "@/components/data-table/type-table"
import { Pencil } from "lucide-react"

interface DoctorDialogProps {
  mode: "add" | "edit"
  doctor?: Doctor
}

const DoctorDialog = ({ mode, doctor }: DoctorDialogProps) => {
  const [open, setOpen] = useState(false)
 
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {mode === "add" ? (
          <Button>Thêm bác sĩ</Button>
        ) : (
          <Button variant="destructive" size="icon" className="h-8 w-8">
            <Pencil className="h-4 w-4" />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="w-[800px] max-w-lg max-h-[90vh] p-6 overflow-auto">
        <DialogHeader>
          <DialogTitle>{mode === "add" ? "Thêm bác sĩ" : "Chỉnh sửa bác sĩ"}</DialogTitle>
        </DialogHeader>
        <DoctorForm doctor={doctor} mode={mode} onClose={() => setOpen(false)}   key={mode + (doctor?.bacsi_id ?? "")}></DoctorForm>
      </DialogContent>
    </Dialog>
  )
}

export default DoctorDialog
