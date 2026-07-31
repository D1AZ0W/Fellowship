import { Link } from '@tanstack/react-router'
import { Home, Receipt, User, Users } from 'lucide-react'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { Logout } from '../auth/Logout'
import { useAuth } from '#/hooks/auth/useAuth'

export function AppSidebar() {
  const user = useAuth()
  user.refreshUser()
  return (
    <Sidebar>
      <SidebarHeader className="border-b p-4 bg-primary ">
        <div className="flex items-center gap-3">
          {/* <img src="/logo512.png" alt="BillDiv" className="h-8 w-16 " /> */}

          <div>
            <h1 className="pl-5 font-bold text-xl font-sans text-primary-foreground scale-x-140">
              Bill/Div
            </h1>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-5 mt-3 transition-all duration-200">
              <SidebarMenuItem>
                <Link
                  to="/dashboard"
                  className="[&.active]:[&>button]:bg-primary [&.active]:[&>button]:text-primary-foreground"
                >
                  <SidebarMenuButton className="text-lg p-5">
                    <Home />
                    <span>Home</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <Link
                  to="/groups"
                  className="[&.active]:[&>button]:bg-primary [&.active]:[&>button]:text-primary-foreground"
                >
                  <SidebarMenuButton className="text-lg p-5">
                    <Users />
                    <span>Groups</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <Link
                  to="/expenses"
                  className="[&.active]:[&>button]:bg-primary [&.active]:[&>button]:text-primary-foreground"
                >
                  <SidebarMenuButton className="text-lg p-5">
                    <Receipt />
                    <span>Expenses</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <Link
                  to="/profile"
                  className="[&.active]:[&>button]:bg-primary [&.active]:[&>button]:text-primary-foreground"
                >
                  <SidebarMenuButton className="text-lg p-5">
                    <User />
                    <span>Profile</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t p-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <Logout />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
