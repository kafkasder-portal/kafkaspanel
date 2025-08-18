import React from 'react'
import { SidebarTrigger } from './ui/sidebar'
import { Button } from './ui/button'
import { Moon, Sun, Bell } from 'lucide-react'
import { useTheme } from '../hooks/useTheme'

const MinimalHeader: React.FC = () => {
  const { isDarkMode, toggleDarkMode } = useTheme()

  return (
    <header className="flex h-12 shrink-0 items-center gap-2 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex items-center gap-2 px-3 flex-1">
        <SidebarTrigger className="-ml-1 h-7 w-7" />
      </div>
      
      <div className="flex items-center gap-1 px-3">
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-7 w-7 p-0"
          onClick={toggleDarkMode}
        >
          {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Button>
        
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-7 w-7 p-0 relative"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full"></span>
        </Button>
      </div>
    </header>
  )
}

export { MinimalHeader }
