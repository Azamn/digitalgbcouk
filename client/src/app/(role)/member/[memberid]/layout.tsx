"use client"
import { MemberNavMain } from "@/components/_member/sidebar/member-nav-main";
import AppSidebar from "@/components/app-sidebar";
import AppHeader from "@/components/shared/header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function Page({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar navmain={MemberNavMain()} />
      <SidebarInset>
        <AppHeader />
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
