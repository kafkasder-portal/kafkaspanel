import { memo, useState, useEffect, startTransition, Suspense } from 'react'
import { Toaster } from 'sonner'
import ErrorBoundary from './components/ErrorBoundary'
import PWAPrompt from './components/PWAPrompt'
import { SocketProvider } from './contexts/SocketContext'
import { OfflineProvider } from './contexts/OfflineContext'
import { ThemeProvider } from './contexts/ThemeContext'
import { LanguageProvider } from './contexts/LanguageContext'
import ChatContainer from './components/Chat/ChatContainer'
import CommandPalette from './components/CommandPalette'
import AICommandCenter from './components/AICommandCenter'
import { useAICommandCenter } from './hooks/useAICommandCenter'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { queryClient, cacheUtils } from './lib/queryClient'
import OfflineIndicator from './components/OfflineIndicator'
import { useAuthStore } from './store/auth'
import { OnboardingModal } from './components/onboarding/OnboardingModal'
import { OnboardingTestButton } from './components/onboarding/OnboardingTestButton'
import { useOnboarding } from './hooks/useOnboarding'
import { onboardingSteps } from './constants/onboardingSteps.tsx'

// New Sidebar Components
import { SidebarProvider } from './components/ui/sidebar'
import { AppSidebar } from './components/AppSidebar'
import { MainContent } from './components/MainContent'
import AppRoutes from './routes'
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts'

// Modern Layout with new sidebar
const AppLayout = memo(function AppLayout() {
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [isCmdOpen, setIsCmdOpen] = useState(false)
  const { user } = useAuthStore()
  
  const {
    isOpen: isAIOpen,
    openCommandCenter,
    closeCommandCenter,
    actionContext,
    userId
  } = useAICommandCenter()

  // Setup keyboard shortcuts
  useKeyboardShortcuts({
    onSearch: () => {
      // Search is handled in HeaderActions
    },
    onCloseModal: () => {
      if (isAIOpen) closeCommandCenter()
      if (isCmdOpen) setIsCmdOpen(false)
    }
  })

  useEffect(() => {
    const open = () => {
      startTransition(() => {
        setIsCmdOpen(true)
      })
    }
    window.addEventListener('open-command-palette', open as any)
    return () => window.removeEventListener('open-command-palette', open as any)
  }, [])

  const toggleChat = () => {
    startTransition(() => {
      setIsChatOpen(!isChatOpen)
    })
  }

  return (
    <>
      <AppSidebar />
      <MainContent>
        <ErrorBoundary level="page">
          <Suspense fallback={
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          }>
            <AppRoutes />
          </Suspense>
        </ErrorBoundary>
      </MainContent>

      {/* Global UI Components */}
      <Toaster
        position="top-right"
        expand={true}
        richColors
        closeButton
      />
      <PWAPrompt />
      <OfflineIndicator />
      
      {/* Chat System */}
      {user && (
        <ChatContainer
          currentUserId={user.id}
          isOpen={isChatOpen}
          onToggle={toggleChat}
        />
      )}

      {/* Command Palette */}
      <CommandPalette
        isOpen={isCmdOpen}
        onClose={() => setIsCmdOpen(false)}
        toggleChat={toggleChat}
        onOpenAICenter={openCommandCenter}
      />

      {/* AI Command Center */}
      <AICommandCenter
        isOpen={isAIOpen}
        onClose={closeCommandCenter}
        context={actionContext}
        userId={userId}
      />
    </>
  )
})

// Inner component that uses theme-dependent hooks
function AppContent({
  user,
  resetOnboarding,
  setShowOnboarding
}: {
  user: any
  resetOnboarding: () => void
  setShowOnboarding: (show: boolean) => void
}) {
  return (
    <>
      <ErrorBoundary level="page">
        <Suspense fallback={
          <div className="flex items-center justify-center min-h-screen">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        }>
          <AppRoutes />
        </Suspense>
      </ErrorBoundary>

      {/* Global UI Components - sadece authenticated kullanıcılar için */}
      <Toaster
        position="top-right"
        expand={true}
        richColors
        closeButton
      />
      <PWAPrompt />
      <OfflineIndicator />

      {/* Onboarding */}
      <OnboardingModal
        isOpen={false} // Disabled for now
        onClose={() => {}}
        onComplete={() => {}}
        steps={onboardingSteps}
      />

      {/* Development Tools */}
      {process.env.NODE_ENV === 'development' && (
        <OnboardingTestButton
          onReset={resetOnboarding}
          onStart={() => setShowOnboarding(true)}
        />
      )}
    </>
  )
}

export default function App() {
  const { initializing, initialize } = useAuthStore()
  const { user } = useAuthStore()
  const { showOnboarding, completeOnboarding, resetOnboarding, setShowOnboarding, closeOnboarding } = useOnboarding()

  // Initialize auth on app start
  useEffect(() => {
    initialize()
  }, [initialize])

  // Cache persistence için offline support
  useEffect(() => {
    // Uygulama başlarken cache'i yükle
    cacheUtils.loadFromStorage()

    // Sayfa kapatılırken cache'i kaydet
    const handleBeforeUnload = () => {
      cacheUtils.saveToStorage()
    }

    window.addEventListener('beforeunload', handleBeforeUnload)

    // Cleanup
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [])

  // Show loading screen while initializing auth
  if (initializing) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">Uygulama yükleniyor...</p>
        </div>
      </div>
    )
  }

  return (
    <ErrorBoundary level="global" showDetails={process.env.NODE_ENV === 'development'}>
      <ThemeProvider>
        <LanguageProvider>
          <QueryClientProvider client={queryClient}>
            <OfflineProvider>
              <SocketProvider>
                <AppContent 
                  user={user}
                  resetOnboarding={resetOnboarding}
                  setShowOnboarding={setShowOnboarding}
                />
              </SocketProvider>
            </OfflineProvider>
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </LanguageProvider>
      </ThemeProvider>
    </ErrorBoundary>
  )
}
