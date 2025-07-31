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
import DoctorForm from "../access/DoctorForm"

const handleAddDoctor = () => {
  toastSuccess("Thêm thành công!")
}

const DialogDemo = () => {
  return (
    <Dialog>
      <form className="ms-2">
        <DialogTrigger asChild>
          <Button>Thêm bác sĩ</Button>
        </DialogTrigger>
        <DialogContent className="w-[800px] max-w-lg max-h-[90vh] p-6 overflow-auto">
          <DialogHeader>
            <DialogTitle>Thêm bác sĩ</DialogTitle>
          </DialogHeader>
          <DoctorForm />
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Huỷ </Button>
            </DialogClose>
            <Button type="submit" onClick={handleAddDoctor}>
              Thêm bác sĩ
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}

export default DialogDemo
