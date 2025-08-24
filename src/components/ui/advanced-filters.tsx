import { useMemo } from "react"
import { Combobox } from "@/components/ui/combobox"

interface AdvancedFiltersProps {
  data: any[]
  onKhoaChange: (value: string) => void
  onTrangThaiChange: (value: string) => void
  khoaValue?: string
  trangThaiValue?: string
}

export const AdvancedFilters = ({
  data,
  onKhoaChange,
  onTrangThaiChange,
  khoaValue,
  trangThaiValue,
}: AdvancedFiltersProps) => {
  // Tạo danh sách khoa từ data
  const khoaOptions = useMemo(() => {
    const khoaSet = new Set(data.filter((item) => item && item.tenKhoa).map((item) => item.tenKhoa))

    return [
      { value: "", label: "Tất cả khoa" },
      ...Array.from(khoaSet).map((khoa) => ({
        value: khoa,
        label: khoa,
      })),
    ]
  }, [data])

  // Tạo danh sách trạng thái
  const trangThaiOptions = [
    { value: "", label: "Tất cả trạng thái" },
    { value: "true", label: "Hoạt động" },
    { value: "false", label: "Nghỉ" },
  ]

  return (
    <div className="flex items-center gap-4">
      <div className="space-y-1">
        <Combobox
          options={khoaOptions}
          value={khoaValue || ""}
          onValueChange={onKhoaChange}
          placeholder="Chọn khoa..."
          searchPlaceholder="Tìm kiếm khoa..."
          emptyText="Không tìm thấy khoa."
          className="w-48"
        />
      </div>

      <div className="space-y-1">
        <Combobox
          options={trangThaiOptions}
          value={trangThaiValue || ""}
          onValueChange={onTrangThaiChange}
          placeholder="Chọn trạng thái..."
          searchPlaceholder="Tìm kiếm trạng thái..."
          emptyText="Không tìm thấy trạng thái."
          className="w-40"
        />
      </div>
    </div>
  )
}
