import { toast } from "sonner"

interface ToastOptions {
  description?: string
  duration?: number
}

export function toastSuccess(message: string, options?: ToastOptions) {
  toast.success(message, {
    description: options?.description,
    duration: options?.duration ?? 3000,
  })
}

export function toastError(message: string, options?: ToastOptions) {
  toast.error(message, {
    description: options?.description,
    duration: options?.duration ?? 3000,
  })
}

export function toastWarning(message: string, options?: ToastOptions) {
  toast.warning(message, {
    description: options?.description,
    duration: options?.duration ?? 3000,
  })
}

export function toastInfo(message: string, options?: ToastOptions) {
  toast.info(message, {
    description: options?.description,
    duration: options?.duration ?? 3000,
  })
}

export function toastConfirm(
  message: string,
  confirmLabel = "Hủy lịch",
  cancelLabel = "Giữ lại",
  duration = Infinity
): Promise<boolean> {
  return new Promise((resolve) => {
    const id = toast(message, {
      duration,
      action: {
        label: confirmLabel,
        onClick: () => {
          resolve(true)
          toast.dismiss(id)
        },
      },
      cancel: {
        label: cancelLabel,
        onClick: () => {
          resolve(false)
          toast.dismiss(id)
        },
      },
    } as any)
  })
}
