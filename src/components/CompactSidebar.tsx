import React, { memo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from './ui/sidebar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from './ui/popover'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip'
import { Button } from './ui/button'
import { Building2, ChevronRight } from 'lucide-react'
import { navigationItems, supportItems } from '../constants/navigation'

const CompactSidebar = memo(function CompactSidebar() {
  const location = useLocation()
  const navigate = useNavigate()
  const { state } = useSidebar()
  const isCollapsed = state === 'collapsed'

  // Check if current route matches any navigation item
  const isActiveItem = (item: any) => {
    return item.subPages.some((page: any) => page.href === location.pathname)
  }

  // Get the currently active main navigation item
  const getActiveMainItem = () => {
    return [...navigationItems, ...supportItems].find(item => 
      item.subPages.some(page => page.href === location.pathname)
    )
  }

  const activeMainItem = getActiveMainItem()

  return (
    <TooltipProvider>
      <Sidebar variant="inset" collapsible="icon" className="border-r-0">
        {/* Minimal Header */}
        <SidebarHeader className="h-12 border-b border-sidebar-border">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton className="h-8 px-2">
                <div className="flex aspect-square size-5 items-center justify-center rounded bg-sidebar-primary text-sidebar-primary-foreground">
                  <Building2 className="size-3" />
                </div>
                {!isCollapsed && (
                  <span className="text-xs font-medium">Panel</span>
                )}
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>

        <SidebarContent className="py-2">
          {/* Compact Navigation */}
          <SidebarMenu className="space-y-0.5 px-2">
            {navigationItems.map((item) => {
              const Icon = item.icon
              const isActive = isActiveItem(item)

              return (
                <SidebarMenuItem key={item.title}>
                  <Popover>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <PopoverTrigger asChild>
                          <SidebarMenuButton
                            isActive={isActive}
                            className="h-7 text-xs justify-start px-2 gap-2 hover:bg-sidebar-accent"
                          >
                            <Icon className="size-3.5 shrink-0" />
                            {!isCollapsed && (
                              <>
                                <span className="truncate font-medium">{item.title}</span>
                                <ChevronRight className="size-3 ml-auto opacity-50" />
                              </>
                            )}
                          </SidebarMenuButton>
                        </PopoverTrigger>
                      </TooltipTrigger>
                      {isCollapsed && (
                        <TooltipContent side="right" className="text-xs">
                          {item.title}
                        </TooltipContent>
                      )}
                    </Tooltip>

                    <PopoverContent
                      side="right"
                      align="start"
                      className="w-44 p-1 bg-sidebar-background border-sidebar-border"
                      sideOffset={2}
                    >
                      <div className="space-y-0.5">
                        <div className="text-xs font-medium text-sidebar-foreground/70 px-2 py-1">
                          {item.title}
                        </div>
                        {item.subPages.map((subPage) => (
                          <Button
                            key={subPage.href}
                            variant={location.pathname === subPage.href ? "secondary" : "ghost"}
                            size="sm"
                            className="w-full justify-start h-6 text-xs px-2 font-normal"
                            onClick={() => navigate(subPage.href)}
                          >
                            {subPage.title}
                          </Button>
                        ))}
                      </div>
                    </PopoverContent>
                  </Popover>
                </SidebarMenuItem>
              )
            })}
          </SidebarMenu>

          {/* Support Section */}
          <div className="mt-4 pt-2 border-t border-sidebar-border">
            <SidebarMenu className="space-y-0.5 px-2">
              {supportItems.map((item) => {
                const Icon = item.icon
                const isActive = isActiveItem(item)

                return (
                  <SidebarMenuItem key={item.title}>
                    <Popover>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <PopoverTrigger asChild>
                            <SidebarMenuButton
                              isActive={isActive}
                              className="h-6 text-xs justify-start px-2 gap-2 hover:bg-sidebar-accent"
                            >
                              <Icon className="size-3 shrink-0 opacity-70" />
                              {!isCollapsed && (
                                <>
                                  <span className="truncate text-xs opacity-80">{item.title}</span>
                                  <ChevronRight className="size-2.5 ml-auto opacity-40" />
                                </>
                              )}
                            </SidebarMenuButton>
                          </PopoverTrigger>
                        </TooltipTrigger>
                        {isCollapsed && (
                          <TooltipContent side="right" className="text-xs">
                            {item.title}
                          </TooltipContent>
                        )}
                      </Tooltip>

                      <PopoverContent
                        side="right"
                        align="start"
                        className="w-44 p-1 bg-sidebar-background border-sidebar-border"
                        sideOffset={2}
                      >
                        <div className="space-y-0.5">
                          <div className="text-xs font-medium text-sidebar-foreground/70 px-2 py-1">
                            {item.title}
                          </div>
                          {item.subPages.map((subPage) => (
                            <Button
                              key={subPage.href}
                              variant={location.pathname === subPage.href ? "secondary" : "ghost"}
                              size="sm"
                              className="w-full justify-start h-6 text-xs px-2 font-normal"
                              onClick={() => navigate(subPage.href)}
                            >
                              {subPage.title}
                            </Button>
                          ))}
                        </div>
                      </PopoverContent>
                    </Popover>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </div>
        </SidebarContent>
      </Sidebar>
    </TooltipProvider>
  )
})

export { CompactSidebar }
