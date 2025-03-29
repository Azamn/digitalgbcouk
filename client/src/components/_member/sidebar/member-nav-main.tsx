"use client";
import { useState } from "react";
import { LayoutDashboard, FolderOpen } from "lucide-react";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import useAuth from "@/hooks/use-auth";
import Link from "next/link";
import useMount from "@/hooks/use-mount";

export function MemberNavMain() {
  const [activeItem, setActiveItem] = useState("Dashboard");
  const user = useAuth();
  const Mount = useMount();

  if (!Mount) return null;

  return (
    <TooltipProvider>
      <SidebarGroup>
        <SidebarGroupContent className="flex flex-col gap-2">
          <SidebarMenu>
            {/* Dashboard */}
            <SidebarMenuItem>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link href={`/member/${user?.id}/`}>
                    <SidebarMenuButton
                      className={`w-[70%] transition-all duration-300 rounded-md hover:bg-violet-200 active:bg-violet-300 ${
                        activeItem === "Dashboard" ? "bg-green-300 text-dark" : "text-dark"
                      }`}
                      onClick={() => setActiveItem("Dashboard")}
                    >
                      <LayoutDashboard size={20} />
                      <span>Dashboard</span>
                    </SidebarMenuButton>
                  </Link>
                </TooltipTrigger>
                <TooltipContent>Go to dashboard</TooltipContent>
              </Tooltip>
            </SidebarMenuItem>

            {/* Events */}
            <SidebarMenuItem>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link href={`/member/${user?.id}/events-list`}>
                    <SidebarMenuButton
                      className={`w-[70%] transition-all duration-300 rounded-md hover:bg-violet-200 active:bg-violet-300 ${
                        activeItem === "Events" ? "bg-green-300 text-dark" : "text-dark"
                      }`}
                      onClick={() => setActiveItem("Events")}
                    >
                      <FolderOpen size={20} />
                      <span>Events</span>
                    </SidebarMenuButton>
                  </Link>
                </TooltipTrigger>
                <TooltipContent>Manage your events</TooltipContent>
              </Tooltip>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </TooltipProvider>
  );
}
