import React, { memo } from 'react'
import { SidebarInset, SidebarTrigger } from './ui/sidebar'
import { HeaderActions } from './HeaderActions'
import { Separator } from './ui/separator'
import { useLocation } from 'react-router-dom'
import { allPages } from '../constants/navigation'
import { cn } from '../lib/utils'

interface MainContentProps {
  children: React.ReactNode
  className?: string
  showBreadcrumbs?: boolean
  customBreadcrumbs?: Array<{
    title: string
    href?: string
  }>
}

const MainContent = memo(function MainContent({ 
  children, 
  className,
  showBreadcrumbs = true,
  customBreadcrumbs 
}: MainContentProps) {
  const location = useLocation()

  // Find current page info for breadcrumbs
  const currentPage = allPages.find(page => page.href === location.pathname)

  // Generate breadcrumbs - simplified to show only current page
  // const breadcrumbs = customBreadcrumbs || (currentPage ? [
  //   { title: currentPage.title }
  // ] : [])

  return (
    <SidebarInset>
      {/* Header */}
      <header className="flex h-16 shrink-0 items-center gap-2 border-b">
        <div className="flex items-center gap-2 px-4 flex-1">
          <SidebarTrigger className="-ml-1" />
          
          {showBreadcrumbs && currentPage && (
            <>
              <Separator orientation="vertical" className="mr-2 h-4" />
              <div className="flex items-center gap-2">
                <h1 className="font-semibold text-lg">{currentPage.title}</h1>
                {currentPage.description && (
                  <span className="text-sm text-muted-foreground hidden md:inline">
                    {currentPage.description}
                  </span>
                )}
              </div>
            </>
          )}
        </div>
        
        <div className="px-4">
          <HeaderActions />
        </div>
      </header>

      {/* Main Content */}
      <main className={cn("flex-1 overflow-auto", className)}>
        <div className="container mx-auto p-4 lg:p-6">
          {children}
        </div>
      </main>
    </SidebarInset>
  )
})

export { MainContent }
