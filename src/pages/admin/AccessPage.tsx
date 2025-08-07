import { useState } from "react"
import { User, UserCheck } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import AdminForm from "./access/AdminForm"
import ReceptionForm from "./access/ReceptionForm"

export default function AccessPage() {
  const [activeTab, setActiveTab] = useState("quanly")
  const tabs = [
    {
      id: "quanly",
      label: "Quản lý",
      icon: User,
      description: "Thêm tài khoản quản lý mới vào hệ thống",
    },
    {
      id: "letan",
      label: "Lễ tân",
      icon: UserCheck,
      description: "Thêm lễ tân mới vào hệ thống",
    },
  ]

  return (
    <div className="min-h-screen pt-4">
      <div className="mx-auto">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Tabs Sidebar */}
          <div className="lg:w-64">
            <Card className="border-0 shadow-sm">
              <CardContent className="p-2">
                <nav className="flex flex-col space-y-1">
                  {tabs.map((tab) => {
                    const Icon = tab.icon
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
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
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Content Area */}
          <div className="flex-1">
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
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
