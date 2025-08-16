// ReceptionActionsCell.tsx
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useState } from "react"
 import { Pencil } from "lucide-react"
import { ManagerForm } from "./manager-form"
import type { Manager } from "@/components/data-table/type-table"
interface ManagerActionsCellProps {
    manager: Manager;
}
export function ManagerActionsCell({ manager }: ManagerActionsCellProps) {
    const [open, setOpen] = useState(false)

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="destructive" size="icon" className="h-8 w-8">
                    <Pencil className="h-4 w-4" />
                </Button>      
            </DialogTrigger>

            <DialogContent  className="max-w-[35vw]">
                <DialogHeader>
                    <DialogTitle>Chỉnh sửa Quản lý</DialogTitle>
                </DialogHeader>
                <ManagerForm manager={manager} onClose={() => setOpen(false)} />
            </DialogContent>
        </Dialog>
    )
}
