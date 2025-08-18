import { Link, NavLink, useLocation } from 'react-router-dom'
import { useState } from 'react'
import {
  Building2,
  Home,
  ChartColumn,
  FolderOpen,
  Calendar,
  Users,
  MessageSquare,
  FileText,
  Settings,
  HelpCircle,
  ChevronRight,
  ChevronUp,
  Search,
  Sun,
  Keyboard,
  PlusIcon
} from 'lucide-react'

export function Sidebar() {
  const location = useLocation()
  const [isCollapsed, setIsCollapsed] = useState(false)

  // Navigation items with badges - mapped to existing routes
  const navigationItems = [
    {
      icon: Home,
      label: 'Ana Sayfa',
      path: '/',
      badge: null
    },
    {
      icon: ChartColumn,
      label: 'Analizler',
      path: '/messages/analytics',
      badge: 3
    },
    {
      icon: FolderOpen,
      label: 'Bağışlar',
      path: '/donations',
      badge: null
    },
    {
      icon: Calendar,
      label: 'Toplantılar',
      path: '/meetings',
      badge: null
    },
    {
      icon: Users,
      label: 'Yardım Yönetimi',
      path: '/aid',
      badge: null
    },
    {
      icon: MessageSquare,
      label: 'Mesajlar',
      path: '/messages',
      badge: 12
    },
    {
      icon: FileText,
      label: 'Burs Yönetimi',
      path: '/scholarship',
      badge: null
    }
  ]

  const bottomItems = [
    {
      icon: Settings,
      label: 'Sistem',
      path: '/system/user-management'
    },
    {
      icon: HelpCircle,
      label: 'Tanımlamalar',
      path: '/definitions'
    }
  ]

  return (
    <aside
      className={`fixed top-0 left-0 z-10 h-screen bg-sidebar-bg text-sidebar-text border-r border-sidebar-border transition-all duration-200 linear ${
        isCollapsed ? 'w-14' : 'w-64'
      } flex flex-col overflow-y-auto`}
    >
      {/* Company Header */}
      <div className="flex items-center justify-center h-14 px-3 gap-2 border-b border-sidebar-border">
        <button
          className="flex items-center justify-center w-7 h-7 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          <Building2 className="w-4 h-4" />
        </button>
        {!isCollapsed && (
          <div className="flex-1 grid">
            <span className="text-sm font-medium text-sidebar-text truncate">
              Dernek Paneli
            </span>
            <span className="text-xs text-sidebar-text-muted truncate">
              Enterprise
            </span>
          </div>
        )}
      </div>

      {/* Main Navigation */}
      <div className="flex-1 flex flex-col gap-2 overflow-y-auto p-2">
        {/* Navigation Header */}
        {!isCollapsed && (
          <div className="flex items-center h-7 px-2 text-xs font-medium text-sidebar-text-muted uppercase transition-all duration-200 linear">
            Navigasyon
          </div>
        )}

        {/* Navigation Items */}
        <div className="space-y-1">
          {navigationItems.map((item, index) => {
            const Icon = item.icon
            const isActive = location.pathname === item.path
            
            return (
              <NavLink
                key={index}
                to={item.path}
                className={`flex items-center gap-2 h-7 px-2 rounded-lg text-sm transition-all duration-150 ease-out ${
                  isActive 
                    ? 'bg-white text-gray-800' 
                    : 'text-white hover:bg-gray-700'
                }`}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                {!isCollapsed && (
                  <>
                    <span className="flex-1 truncate">{item.label}</span>
                    {item.badge && (
                      <span className="flex items-center justify-center h-4 px-1.5 text-xs font-medium bg-gray-600 text-white rounded">
                        {item.badge}
                      </span>
                    )}
                    <ChevronRight className="w-4 h-4 flex-shrink-0 ml-auto" />
                  </>
                )}
              </NavLink>
            )
          })}
        </div>

        {/* Bottom Navigation */}
        <div className="mt-auto space-y-1">
          {bottomItems.map((item, index) => {
            const Icon = item.icon
            
            return (
              <NavLink
                key={index}
                to={item.path}
                className="flex items-center gap-2 h-7 px-2 rounded-lg text-sm text-white hover:bg-gray-700 transition-all duration-150 ease-out"
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                {!isCollapsed && (
                  <>
                    <span className="flex-1 truncate">{item.label}</span>
                    <ChevronRight className="w-4 h-4 flex-shrink-0 ml-auto" />
                  </>
                )}
              </NavLink>
            )
          })}
        </div>
      </div>

      {/* User Profile */}
      <div className="p-2">
        <button className="flex items-center gap-2 w-full h-7 px-2 rounded-lg text-white hover:bg-gray-700 transition-all duration-150 ease-out">
          <span className="flex items-center justify-center w-7 h-7 bg-gray-600 rounded-lg text-sm font-medium flex-shrink-0">
            AK
          </span>
          {!isCollapsed && (
            <>
              <div className="flex-1 grid text-left">
                <span className="text-sm font-medium truncate">
                  Ahmet Kaya
                </span>
                <span className="text-xs text-gray-400 truncate">
                  ahmet@sirket.com
                </span>
              </div>
              <ChevronUp className="w-4 h-4 flex-shrink-0 ml-auto" />
            </>
          )}
        </button>
      </div>
    </aside>
  )
}
