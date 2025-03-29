"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { NavUser } from "@/components/ui/nav-user";

export default function AppSidebar({
  navmain,
  ...props
}: React.ComponentProps<typeof Sidebar> & { navmain: React.ReactNode }) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarContent>{navmain}</SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
