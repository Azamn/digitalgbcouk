import { AppSidebar } from "@/components/_admin/sidebar/app-sidebar-sheet";
import { ClientAppSidebar } from "@/components/_client/sidebar/client-app-sidebar";
import AppHeader from "@/components/shared/header";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export default function Page({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <ClientAppSidebar />
      <SidebarInset>
        <AppHeader />
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
