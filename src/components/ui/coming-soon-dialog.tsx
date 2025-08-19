import { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface ComingSoonDialogProps {
  isOpen: boolean
  onClose: () => void
}

export const ComingSoonDialog = ({ isOpen, onClose }: ComingSoonDialogProps) => {
  const [timeLeft, setTimeLeft] = useState(7)

  useEffect(() => {
    if (!isOpen) return

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          onClose()
          return 7
        }
        return prev - 1
      })
    }, 1000)

    return () => {
      clearInterval(timer)
      setTimeLeft(7)
    }
  }, [isOpen, onClose])

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Coming Soon!</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col items-center justify-center py-6 text-center">
          <div className="text-6xl mb-4 animate-bounce">🚧</div>

          <h3 className="text-2xl font-bold text-foreground mb-3">Tính năng đang phát triển</h3>

          <p className="text-muted-foreground mb-6 max-w-sm">
            Tính năng "Duyệt chứng chỉ" đang được xây dựng bởi đội ngũ phát triển. Hãy quay lại sau
            để trải nghiệm những điều tuyệt vời nhé!
          </p>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Tự động đóng sau:</span>
            <span className="font-mono font-bold text-primary">{timeLeft}s</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
