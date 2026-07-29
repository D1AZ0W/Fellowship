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
  const username = user.user?.username
  return (
    <Sidebar>
      <SidebarHeader className="border-b p-4 bg-linear-to-r from-primary  to-amber-950">
        <div className="flex items-center gap-3">
          <img src="/logo512.png" alt="BillDiv" className="h-8 w-16 " />

          <div>
            <h1 className="font-bold text-3xl font-sans text-primary-foreground scale-x-140">
              BillDiv
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
                  <SidebarMenuButton className="text-xl p-7">
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
                  <SidebarMenuButton className="text-xl p-7">
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
                  <SidebarMenuButton className="text-xl p-7">
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
                  <SidebarMenuButton className="text-xl p-7">
                    <User />
                    <span>Profile</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarGroup>{username}</SidebarGroup>
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
