"use client"

import { Button } from "@/components/ui/button"
import { Sidebar, SidebarHeader, SidebarContent, SidebarFooter, useSidebar } from "@/components/ui/sidebar"
import { HomeIcon, CreditCardIcon, BarChart3Icon, HelpCircleIcon, BuildingIcon, Globe2Icon } from "lucide-react"

export function MainNav() {
  const { state } = useSidebar()
  const isExpanded = state === "expanded"

  return (
    <Sidebar>
      <SidebarHeader className="border-b px-6 py-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
            <span className="text-white font-bold">C</span>
          </div>
          {isExpanded && <span className="font-semibold">CashFlow</span>}
        </div>
      </SidebarHeader>

      <SidebarContent className="px-4 py-6">
        <div className="space-y-2">
          <Button variant="ghost" className="w-full justify-start gap-2">
            <HomeIcon className="h-4 w-4" />
            {isExpanded && <span>Dashboard</span>}
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-2">
            <CreditCardIcon className="h-4 w-4" />
            {isExpanded && <span>Our Products</span>}
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-2">
            <HelpCircleIcon className="h-4 w-4" />
            {isExpanded && <span>FAQ</span>}
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-2">
            <BarChart3Icon className="h-4 w-4" />
            {isExpanded && <span>Help Center</span>}
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-2">
            <BuildingIcon className="h-4 w-4" />
            {isExpanded && <span>Business</span>}
          </Button>
        </div>
      </SidebarContent>

      <SidebarFooter className="border-t p-4">
        <div className="flex items-center gap-2">
          {isExpanded ? (
            <>
              <div className="flex-1">
                <p className="font-medium text-sm">Ahsan Pratama</p>
                <p className="text-sm text-muted-foreground">helloahsan@cashflow.id</p>
              </div>
              <Button variant="ghost" size="sm">
                <Globe2Icon className="h-4 w-4" />
                <span className="ml-1">EN</span>
              </Button>
            </>
          ) : (
            <Button variant="ghost" size="sm" className="w-full justify-center">
              <Globe2Icon className="h-4 w-4" />
            </Button>
          )}
          <div className="w-8 h-8 bg-neutral-100 rounded-full"></div>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
} 