// ReceptionActionsCell.tsx
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { ReceptionForm } from "./reception-form"
import type { Receptionist } from "@/components/data-table/type-table"
import { Pencil } from "lucide-react"
interface ReceptionActionsCellProps {
  reception: Receptionist
}
export function ReceptionActionsCell({ reception }: ReceptionActionsCellProps) {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive" size="icon" className="h-8 w-8">
          <Pencil className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="!max-w-[50vw]">
        <DialogHeader>
          <DialogTitle>Chỉnh sửa tiếp tân</DialogTitle>
        </DialogHeader>
        <ReceptionForm reception={reception} onClose={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  )
}
