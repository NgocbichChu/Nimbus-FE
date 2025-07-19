import { DataTable } from "@/components/data-table/table"
import { toastSuccess } from "@/helper/toast"
import type { ColumnDef } from "@tanstack/react-table"

type Doctor = {
  id: string
  name: string
  email: string
  role: string
  ChuyenKhoa: string
  createdAt: string
}

const mockDoctors: Doctor[] = [
  {
    id: "1",
    name: "Phan Huy Hoàng",
    email: "hoang@gmail.com",
    role: "Bác sĩ",
    ChuyenKhoa: "Khoa Nội",
    createdAt: "2025-07-01T10:30:00Z",
  },
  {
    id: "2",
    name: "Chu Thị Ngọc Bích",
    email: "bich@gmail.com",
    role: "Bác sĩ",
    ChuyenKhoa: "Khoa Nội",
    createdAt: "2025-07-01T10:30:00Z",
  },
    {
    id: "3",
    name: "Nguyễn Văn A",
    email: "a@gmail.com",
    role: "Bác sĩ",
    ChuyenKhoa: "Khoa Ngoại",
    createdAt: "2025-07-01T10:30:00Z",
  },
  {
    id: "4",
    name: "Trần Thị B",
    email: "b@gmail.com",
    role: "Bác sĩ",
    ChuyenKhoa: "Khoa Nhi",
    createdAt: "2025-07-01T10:30:00Z",
  },
];


const userColumns: ColumnDef<Doctor>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <span>{row.getValue("name")}</span>,
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => <span>{row.getValue("email")}</span>,
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => <span>{row.getValue("role")}</span>,
  },
  {
    accessorKey: "ChuyenKhoa",
    header: "Chuyên Khoa",
    cell: ({ row }) => <span>{row.getValue("ChuyenKhoa")}</span>,
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"));
      return <span>{date.toLocaleDateString()}</span>;
    },
  },
];


export default function DoctorsPage() {
  const handleEdit = (doctor: Doctor) => {
    toastSuccess(`Edit doctor: ${doctor.name}`)
  }

  const handleDelete = (doctor: Doctor) => {
    toastSuccess(`Delete doctor: ${doctor.name}`)
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">Doctors</h1>
      <DataTable
        data={mockDoctors}
        columns={userColumns}
        onEdit={handleEdit}
        onDelete={handleDelete}
        filterColumn="name"
      />
    </div>
  )
}
