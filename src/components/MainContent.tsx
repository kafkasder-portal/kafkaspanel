import React, { memo } from 'react'
import { SidebarInset, SidebarTrigger } from './ui/sidebar'
import { HeaderActions } from './HeaderActions'
import { Separator } from './ui/separator'
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from './ui/breadcrumb'
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

  // Generate breadcrumbs
  const breadcrumbs = customBreadcrumbs || (currentPage ? [
    { title: 'Ana Sayfa', href: '/' },
    { title: currentPage.category },
    { title: currentPage.title }
  ] : [])

  return (
    <SidebarInset>
      {/* Header */}
      <header className="flex h-16 shrink-0 items-center gap-2 border-b">
        <div className="flex items-center gap-2 px-4 flex-1">
          <SidebarTrigger className="-ml-1" />
          
          {showBreadcrumbs && breadcrumbs.length > 0 && (
            <>
              <Separator orientation="vertical" className="mr-2 h-4" />
              <Breadcrumb>
                <BreadcrumbList>
                  {breadcrumbs.map((crumb, index) => (
                    <BreadcrumbItem key={index}>
                      {crumb.href && index < breadcrumbs.length - 1 ? (
                        <a href={crumb.href} className="transition-colors hover:text-foreground">
                          {crumb.title}
                        </a>
                      ) : (
                        <BreadcrumbPage className={index === breadcrumbs.length - 1 ? "font-medium" : ""}>
                          {crumb.title}
                        </BreadcrumbPage>
                      )}
                    </BreadcrumbItem>
                  ))}
                </BreadcrumbList>
              </Breadcrumb>
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
