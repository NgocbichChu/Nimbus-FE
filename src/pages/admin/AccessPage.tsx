import { useEffect, useState } from "react"
import { User, UserCheck, Users } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import AdminForm from "./access/AdminForm"
import ReceptionForm from "./access/ReceptionForm"
import { ReceptionTable } from "./reception/reception-table"
import { ReceptionColumns } from "./reception/reception-column"
import { useAppDispatch, useAppSelector } from "@/helper"
import { fetchReceptions } from "@/api/letanApi"
import { ManagerTable } from "./manager/manager-table"
import { fetchManager } from "@/api/manager"
import { ManagerColumns } from "./manager/manager-column"

export default function AccessPage() {
  const [activeTab, setActiveTab] = useState("quanly")

  const tabs = [

    {
      id: "quanly",
      label: "Tạo Tài Khoản Quản lý",
      icon: User,
      description: "Thêm tài khoản quản lý mới vào hệ thống",
    },
    {
      id: "letan",
      label: "Tạo Tài Khoản Lễ tân",
      icon: UserCheck,
      description: "Thêm lễ tân mới vào hệ thống",
    }, {
      id: "danhsachquanly",
      label: "Danh Sách Quản lý",
      icon: Users,
      description: "Dang sách quản lý hệ thống",
    },
    {
      id: "danhsachletan",
      label: "Danh Sách Lễ Tân",
      icon: Users,
      description: "Danh Sách lễ tân hệ thống",
    },
  ]

  const dispatch = useAppDispatch()
  const receptions = useAppSelector((state) => state.reception.Receptionist)
  const manager = useAppSelector((state) => state.manager.manager)


  useEffect(() => {
    dispatch(fetchReceptions()) // Gọi API khi mount
  }, [dispatch])

  useEffect(() => {
    dispatch(fetchManager()) // Gọi API khi mount
  }, [dispatch])


  return (
    <div className="min-h-screen pt-4 ">
      <div className="  mx-auto space-y-6">

        {/* Tabs Menu */}
        <Card className="border-0 shadow-sm" style={{ width: "850px" }}>
          <CardContent className="p-2 flex flex-wrap gap-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all",
                    isActive
                      ? "bg-sky-100 text-sky-900 shadow-sm"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  )}
                >
                  <Icon className="h-5 w-5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </CardContent>
        </Card>

        {/* Content Area */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl">
              {tabs.find((t) => t.id === activeTab)?.label}
            </CardTitle>
            <CardDescription>
              {tabs.find((t) => t.id === activeTab)?.description}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {activeTab === "quanly" && <AdminForm />}
            {activeTab === "letan" && <ReceptionForm />}
            {activeTab === "danhsachletan" && (
              <ReceptionTable columns={ReceptionColumns} data={receptions} filterColumn="hoTen" />
            )}
            {activeTab === "danhsachquanly" && (
              <ManagerTable columns={ManagerColumns} data={manager} filterColumn="hoTen" />
            )}
          </CardContent>
        </Card>

      </div>
    </div>

  )
}
