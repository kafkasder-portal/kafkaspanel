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

  // Navigation items with badges
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
      path: '/analytics',
      badge: 3
    },
    {
      icon: FolderOpen,
      label: 'Projeler',
      path: '/projects',
      badge: null
    },
    {
      icon: Calendar,
      label: 'Takvim',
      path: '/calendar',
      badge: null
    },
    {
      icon: Users,
      label: 'Ekip',
      path: '/team',
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
      label: 'Raporlar',
      path: '/reports',
      badge: null
    }
  ]

  const bottomItems = [
    {
      icon: Settings,
      label: 'Ayarlar',
      path: '/settings'
    },
    {
      icon: HelpCircle,
      label: 'Yardım',
      path: '/help'
    }
  ]

  return (
    <aside 
      className={`fixed top-0 left-0 z-10 h-screen bg-gray-800 text-white transition-all duration-200 linear ${
        isCollapsed ? 'w-14' : 'w-64'
      } flex flex-col`}
    >
      {/* Company Header */}
      <div className="flex items-center justify-center h-14 px-3 gap-2">
        <button 
          className="flex items-center justify-center w-7 h-7 bg-white rounded-lg"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          <Building2 className="w-4 h-4 text-gray-800" />
        </button>
        {!isCollapsed && (
          <div className="flex-1 grid">
            <span className="text-sm font-medium text-white truncate">
              Şirket Adı
            </span>
            <span className="text-xs text-gray-400 truncate">
              Enterprise
            </span>
          </div>
        )}
      </div>

      {/* Main Navigation */}
      <div className="flex-1 flex flex-col gap-2 overflow-y-auto p-2">
        {/* Navigation Header */}
        {!isCollapsed && (
          <div className="flex items-center h-7 px-2 text-xs font-medium text-gray-300 uppercase opacity-0 -mt-7 transition-all duration-200 linear">
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
