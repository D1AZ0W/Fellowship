import type { ReactNode } from 'react'

import { AppSidebar } from './AppSidebar'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'

type AppLayoutProps = {
  children: ReactNode
}

export const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <SidebarProvider>
      <AppSidebar />

      <main className="flex min-h-screen flex-1 flex-col">
        <header className="border-b p-4">
          <SidebarTrigger />
        </header>

        <div className="flex-1 p-6">{children}</div>
      </main>
    </SidebarProvider>
  )
}
