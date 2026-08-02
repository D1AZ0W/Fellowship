import { Link } from '@tanstack/react-router'
import { Activity, Home, Receipt, User, Users } from 'lucide-react'

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
import { ModeToggle } from '@/components/shared/mode-toggle'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export function AppSidebar() {
  const user = useAuth()

  return (
    <Sidebar>
      <SidebarHeader className="border-b p-2 bg-primary ">
        <div className="flex items-center justify-center gap-3">
          <img src="/logo512.png" alt="BillDiv" className="w-40 h-12" />
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
                  to="/activity"
                  className="[&.active]:[&>button]:bg-primary [&.active]:[&>button]:text-primary-foreground"
                >
                  <SidebarMenuButton className="text-lg p-5">
                    <Activity />
                    <span>Activity</span>
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
      <SidebarFooter className="border-t p-4 flex flex-col gap-4">
        {user.user && (
          <div className="flex items-center gap-3 w-full">
            <Avatar className="w-10 h-10 shrink-0">
              {user.user.profile_picture && (
                <AvatarImage
                  src={`${import.meta.env.VITE_BASE_URL}${user.user.profile_picture}`}
                  alt={user.user.username}
                  className="object-cover"
                />
              )}
              <AvatarFallback className="bg-primary text-primary-foreground font-bold">
                {user.user.first_name[0].toUpperCase()}
                {user.user.last_name[0].toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col flex-1 overflow-hidden">
              <span className="text-sm font-medium truncate">
                {user.user.first_name} {user.user.last_name}
              </span>
              <span className="text-xs text-muted-foreground truncate">
                @{user.user.username}
              </span>
            </div>
            <div className="shrink-0">
              <ModeToggle />
            </div>
          </div>
        )}
        <SidebarMenu>
          <SidebarMenuItem>
            <Logout />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
