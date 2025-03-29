"use client";
import { useState } from "react";
import {
  LayoutDashboard,
  FolderOpen,
  ListChecks,
  ListTodo,
  ShieldCheckIcon,
} from "lucide-react";
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

export function ClientNavMain() {
  const [activeItem, setActiveItem] = useState("Dashboard");
  const [activeSubItem, setActiveSubItem] = useState("");
  const user = useAuth();
  const Mount = useMount();

  if (!Mount || !user) return null;

  const basePath = `/client/${user?.id}`;

  return (
    <TooltipProvider>
      <SidebarGroup>
        <SidebarGroupContent className="flex flex-col gap-2">
          <SidebarMenu>
            {/* Dashboard */}
            <SidebarMenuItem>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link href={`${basePath}/`}>
                    <SidebarMenuButton
                      className={`w-[70%] rounded-md transition-all duration-300 hover:bg-violet-200 active:bg-violet-300 ${
                        activeItem === "Dashboard"
                          ? "bg-green-300 text-dark"
                          : "text-dark"
                      }`}
                      onClick={() => {
                        setActiveItem("Dashboard");
                        setActiveSubItem("");
                      }}
                    >
                      <LayoutDashboard size={20} />
                      <span>Dashboard</span>
                    </SidebarMenuButton>
                  </Link>
                </TooltipTrigger>
                <TooltipContent>Go to dashboard</TooltipContent>
              </Tooltip>
            </SidebarMenuItem>
            {/* Events Section */}
            <SidebarMenuItem>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link href={`${basePath}/events-list`}>
                    <SidebarMenuButton
                      className={`w-[70%] rounded-md transition-all duration-300 hover:bg-violet-200 active:bg-violet-300 ${
                        activeItem === "Events"
                          ? "bg-green-300 text-dark"
                          : "text-dark"
                      }`}
                      onClick={() => {
                        setActiveItem("Events");
                        setActiveSubItem("");
                      }}
                    >
                      <FolderOpen size={20} />
                      <span>Events</span>
                    </SidebarMenuButton>
                  </Link>
                </TooltipTrigger>
                <TooltipContent>View your events</TooltipContent>
              </Tooltip>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </TooltipProvider>
  );
}
