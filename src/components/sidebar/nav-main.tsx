import { useState } from "react"
import { type LucideIcon } from "lucide-react"
import { Link, useLocation } from "react-router-dom"

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { ComingSoonDialog } from "@/components/ui/coming-soon-dialog"

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: LucideIcon
    isActive?: boolean
  }[]
}) {
  const location = useLocation()
  const [isComingSoonOpen, setIsComingSoonOpen] = useState(false)

  const handleItemClick = (e: React.MouseEvent, item: { title: string; url: string }) => {
    if (item.title === "Duyệt chứng chỉ") {
      e.preventDefault()
      e.stopPropagation()
      setIsComingSoonOpen(true)
    }
  }

  return (
    <>
      <SidebarGroup>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                isActive={location.pathname === item.url}
                className="min-h-10 min-w-10"
              >
                <Link to={item.url} onClick={(e) => handleItemClick(e, item)}>
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroup>

      <ComingSoonDialog isOpen={isComingSoonOpen} onClose={() => setIsComingSoonOpen(false)} />
    </>
  )
}
