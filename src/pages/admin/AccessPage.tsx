import { useEffect, useState } from "react"
import { User, UserCheck, Users } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import AdminForm from "./access/AdminForm"
import ReceptionForm from "./access/ReceptionForm"
import { ReceptionTable } from "./reception/reception-table"
import { ReceptionColumns } from "./reception/reception-column"
import { ChevronDown, ChevronUp } from "lucide-react"
import { useAppDispatch, useAppSelector } from "@/helper"
import { fetchReceptions } from "@/api/letanApi" 
import { ManagerTable } from "./manager/manager-table"

export default function AccessPage() {
  const [activeTab, setActiveTab] = useState("quanly")

  const tabs = [
    {
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
    },
  ]

const dispatch = useAppDispatch()
const receptions = useAppSelector((state) => state.reception.Receptionist)

useEffect(() => {
  dispatch(fetchReceptions()) // Gọi API khi mount
}, [dispatch])

 
const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="min-h-screen pt-4">
      <div className="  space-y-6">
        <Card className="border-0 shadow-sm">
          <CardContent className="p-2">
            <nav className="flex flex-col space-y-1">
              {isExpanded ? (
                <>
                  {tabs.map((tab) => {
                    const Icon = tab.icon
                    return (
                      <button
                        key={tab.id}
                        onClick={() => {
                          setActiveTab(tab.id)
                          setIsExpanded(false)
                        }}
                        className={cn(
                          "flex items-center space-x-3 rounded-lg px-4 py-3 text-sm font-medium transition-all",
                          activeTab === tab.id
                            ? "bg-sky-100 text-sky-900 shadow-sm"
                            : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                        )}
                      >
                        <Icon className="h-5 w-5" />
                        <span>{tab.label}</span>
                      </button>
                    )
                  })}
                  {/* Collapse button */}
                  <button
                    onClick={() => setIsExpanded(false)}
                    className="flex items-center space-x-3 rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-all border-t mt-2 pt-3"
                  >
                    <ChevronUp className="h-4 w-4" />
                    <span>Thu gọn</span>
                  </button>
                </>
              ) : (
                // Collapsed view - show only active tab
                <>
                  {(() => {
                    const activeTabData = tabs.find((t) => t.id === activeTab)
                    const Icon = activeTabData?.icon
                    return (
                      <button
                        onClick={() => setIsExpanded(true)}
                        className="flex items-center space-x-3 rounded-lg px-4 py-3 text-sm font-medium transition-all bg-sky-100 text-sky-900 shadow-sm hover:bg-sky-200"
                      >
                        {Icon && <Icon className="h-5 w-5" />}
                        <span>{activeTabData?.label}</span>
                        <ChevronDown className="h-4 w-4 ml-auto" />
                      </button>
                    )
                  })()}
                </>
              )}
            </nav>
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
            {activeTab === "danhsachletan" && (<ReceptionTable columns={ReceptionColumns} data={receptions} filterColumn="hoTen" />  )}
            {activeTab === "danhsachquanly" && (<ManagerTable columns={ReceptionColumns} data={receptions} filterColumn="hoTen" />  )}
          </CardContent>
        </Card>
      </div>
    </div>

  )
}
