"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  UserPlus,
  FolderOpen,
  PlusCircle,
  List,
} from "lucide-react";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import useAuth from "@/hooks/use-auth";
import Link from "next/link";
import useMount from "@/hooks/use-mount";

export function NavMain() {
  const [activeItem, setActiveItem] = useState("Dashboard");
  const [activeSubItem, setActiveSubItem] = useState("");
  const [isMemberExpanded, setIsMemberExpanded] = useState(false);
  const user = useAuth();
  const Mount = useMount();

  const menuItems = [
    {
      name: "Dashboard",
      icon: <LayoutDashboard />,
      path: `/admin/${user?.id}/`,
    },
    { name: "Participants", icon: <Users />, path: `/admin/${user?.id}/participants` },
    { name: "Members", icon: <UserPlus />, path: `/admin/${user?.id}/members` },
  ];

  if (!Mount) return null;
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          {/* Static Menu Items */}
          {menuItems.map(({ name, icon, path }) => (
            <SidebarMenuItem key={name}>
              <Link href={path}>
                <SidebarMenuButton
                  className={`w-[70%] transition-all duration-300 hover:bg-violet-200 active:bg-violet-200 ${
                    activeItem === name ? "bg-green-300 text-dark" : "text-dark"
                  }`}
                  tooltip={name}
                  onClick={() => {
                    setActiveItem(name);
                    setActiveSubItem(""); // Reset sub-item selection when switching main menu
                  }}
                >
                  {icon}
                  <span>{name}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}

          {/* Member Toggle Menu */}
          <SidebarMenuItem>
            <SidebarMenuButton
              className={`w-[70%] transition-all duration-300 hover:bg-violet-200 active:bg-violet-200 ${
                activeItem === "Member" ? "bg-green-300 text-dark" : "text-dark"
              }`}
              tooltip="Member"
              onClick={() => {
                setActiveItem("Member");
                setIsMemberExpanded((prev) => !prev);
              }}
            >
              <FolderOpen />
              <span>Events</span>
            </SidebarMenuButton>
          </SidebarMenuItem>

          {/* Collapsible Member Submenu with Animation */}
          <motion.div
            initial={false}
            animate={{
              height: isMemberExpanded ? "auto" : 0,
              opacity: isMemberExpanded ? 1 : 0,
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="mt-2 overflow-hidden"
          >
            <div className="ml-5 flex flex-col gap-2">
              <SidebarMenuItem>
                <Link href={`/admin/${user?.id}/event-add`}>
                  <SidebarMenuButton
                    className={`w-[70%] text-dark transition-all duration-300 hover:bg-violet-200 active:bg-violet-200 ${
                      activeSubItem === "Create Event"
                       ? "bg-blue-500 text-white"
                        : ""
                    }`}
                    tooltip="Create Event"
                    onClick={() => setActiveSubItem("Create Event")}
                  >
                    <span className="flex items-center gap-x-3">
                      <PlusCircle size={17} /> Create Event
                    </span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link href={`/admin/${user?.id}/events-list`}>
                  <SidebarMenuButton
                    className={`w-[70%] text-dark transition-all duration-300 hover:bg-violet-200 active:bg-violet-200 ${
                      activeSubItem === "Event List"
                        ? "bg-blue-500 text-white"
                        : ""
                    }`}
                    tooltip="Event List"
                    onClick={() => setActiveSubItem("Event List")}
                  >
                    <span className="flex items-center gap-x-3">
                      <List size={17} /> Event List
                    </span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            </div>
          </motion.div>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
