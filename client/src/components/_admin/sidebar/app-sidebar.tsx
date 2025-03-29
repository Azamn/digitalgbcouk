"use client";

import * as React from "react";
import {
  LayoutDashboard,
  Users,
  UserPlus,
  FolderOpen,
  Settings,
  HelpCircle,
  Search,
  Database,
  FileText,
  ClipboardList,
  ArrowUpCircleIcon,
  Target,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavMain } from "./nav-main";
import { NavUser } from "../../ui/nav-user";
import { NavSecondary } from "./nav-seconadry";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <div className="inline-flex items-center">
                <img src="/logo.png" alt="DigiLab Logo" className="h-8 w-8" />
                <span className="ml-2 text-2xl font-bold text-dark">
                  DigiLab
                </span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavMain />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
