// import { toastSuccess } from "@/helper/toast"
// import { Button } from "../../../components/ui/button"
// import {
//   Dialog,
//   DialogTrigger,
//   DialogClose,
//   DialogContent,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from "../../../components/ui/dialog"
// import DoctorForm from "./DoctorForm"

// const handleAddDoctor = () => {
//   toastSuccess("Thêm thành công!")
// }

// const DialogDemo = () => {
//   return (
//     <Dialog>
//       <form className="ms-2">
//         <DialogTrigger asChild>
//           <Button>Thêm bác sĩ</Button>
//         </DialogTrigger>
//         <DialogContent className="w-[800px] max-w-lg max-h-[90vh] p-6 overflow-auto">
//           <DialogHeader>
//             <DialogTitle>Thêm bác sĩ</DialogTitle>
//           </DialogHeader>
//           <DoctorForm />
//           <DialogFooter>
//             <DialogClose asChild>
//               <Button variant="outline">Huỷ </Button>
//             </DialogClose>
//             <Button type="submit" onClick={handleAddDoctor}>
//               Thêm bác sĩ
//             </Button>
//           </DialogFooter>
//         </DialogContent>
//       </form>
//     </Dialog>
//   )
// }

// export default DialogDemo
import { useState } from "react"
import { toastSuccess } from "@/helper/toast"
import { Button } from "../../../components/ui/button"
import {
  Dialog,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogFooter,
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

const DoctorDialog = ({  mode, doctor }: DoctorDialogProps) => {
  const [open, setOpen] = useState(false)

  const handleSubmit = () => {
    if (mode === "add") {
      toastSuccess("Thêm thành công!")
    } else {
      toastSuccess("Cập nhật thành công!")
    }
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {mode === "add" ?<Button>Thêm bác sĩ</Button> : <Button variant="destructive" size="icon" className="h-8 w-8">
          <Pencil className="h-4 w-4" />
        </Button> }
      </DialogTrigger>
      <DialogContent className="w-[800px] max-w-lg max-h-[90vh] p-6 overflow-auto">
        <DialogHeader>
          <DialogTitle>
            {mode === "add" ? "Thêm bác sĩ" : "Chỉnh sửa bác sĩ"}
          </DialogTitle>
        </DialogHeader>
        <DoctorForm doctor={doctor} mode={mode} />
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Huỷ</Button>
          </DialogClose>
          <Button
            type="button"
            className="bg-yellow-400 hover:bg-yellow-500 text-black"
            onClick={handleSubmit}
          >
            {mode === "add" ? "Thêm bác sĩ" : "Lưu thay đổi"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default DoctorDialog
