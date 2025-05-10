"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { LayoutDashboard, Users, FolderOpen, Instagram } from "lucide-react";
import useAuth from "@/hooks/use-auth";
import { Link } from 'next-view-transitions'
import useMount from "@/hooks/use-mount";
import { useGetallClientsQuery } from "@/backend/participant.api";

export function NavMain() {
  const [activeItem, setActiveItem] = useState("Dashboard");
  const user = useAuth();
  const Mount = useMount();

  const menuItems = [
    {
      name: "Dashboard",
      icon: <LayoutDashboard size={20} />,
      path: `/client/${user?.id}/`,
    },
    {
      name: "Posts",
      icon: <Users size={20} />,
      path: `/client/${user?.id}/post`,
    },
  ];

  if (!Mount) return null;

  return (
    <aside className="w-full pt-2 text-sm">
      <div className="flex flex-col gap-2">
        {/* Static Menu Items */}
        {menuItems.map(({ name, icon, path }) => (
          <Link key={name} href={path}>
            <button
              onClick={() => {
                setActiveItem(name);
              }}
              className={`flex w-full items-center gap-3 rounded-lg px-4 py-2 text-left transition-all duration-300 ${
                activeItem === name
                  ? "bg-green-300 text-black"
                  : "text-black hover:bg-violet-200"
              }`}
            >
              {icon}
              <span>{name}</span>
            </button>
          </Link>
        ))}
      </div>
    </aside>
  );
}
