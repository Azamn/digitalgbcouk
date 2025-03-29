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
import { ClientNavMain } from "./client-nav-main";
import { NavUser } from "@/components/ui/nav-user";

export function ClientAppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarContent>
        <ClientNavMain />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
