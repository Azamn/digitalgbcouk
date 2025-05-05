"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { LayoutDashboard, Users, FolderOpen, Instagram, UserPlus } from "lucide-react";
import useAuth from "@/hooks/use-auth";
import Link from "next/link";
import useMount from "@/hooks/use-mount";
import { useGetallClientsQuery } from "@/backend/participant.api";

export function NavMain() {
  const [activeItem, setActiveItem] = useState("Dashboard");
  const [activeSubItem, setActiveSubItem] = useState("");
  const [isMemberExpanded, setIsMemberExpanded] = useState(false);
  const user = useAuth();
  const Mount = useMount();
  const { data } = useGetallClientsQuery();

  const menuItems = [
    {
      name: "Dashboard",
      icon: <LayoutDashboard size={20} />,
      path: `/admin/${user?.id}/`,
    },
    {
      name: "Participants",
      icon: <UserPlus size={20} />,
      path: `/admin/${user?.id}/participants`,
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
                setActiveSubItem("");
              }}
              className={`flex  w-[200px] text-sm items-center gap-3 rounded-lg px-4 py-2 text-left transition-all duration-300 ${
                activeItem === name
                  ? "bg-primary text-white"
                  : "text-primary hover:bg-violet-200"
              }`}
            >
              {icon}
              <span>{name}</span>
            </button>
          </Link>
        ))}

        {/* Workspace Toggle */}
        <button
          onClick={() => {
            setActiveItem("Member");
            setIsMemberExpanded((prev) => !prev);
          }}
          className={`flex items-center w-[200px] text-sm gap-3 rounded-lg px-4 py-2 text-left transition-all duration-300 ${
            activeItem === "Member"
              ? "bg-primary text-secondary"
              : "text-primary hover:bg-violet-200"
          }`}
        >
          <FolderOpen size={20} />
          <span>Workspace</span>
        </button>

        {/* Expandable Submenu */}
        <motion.div
          initial={false}
          animate={{
            height: isMemberExpanded ? "auto" : 0,
            opacity: isMemberExpanded ? 1 : 0,
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="overflow-hidden pl-3"
        >
          <div className="mt-2 flex flex-col gap-1">
            {data?.result?.map((client) => (
              <Link
                key={client.id}
                href={`/admin/${user?.id}/workspace?clientId=${client.id}`}
              >
                <button
                  onClick={() => setActiveSubItem(client.user.userName)}
                  className={`flex  w-[200px] text-sm items-center gap-3 rounded-lg px-4 py-1 text-left transition-all duration-300`}
                >
                  <Instagram size={20} className="text-pink-500" />
                  <span
                    className={`${
                      activeSubItem === client.user.userName
                        ? "text-blue-700"
                        : "text-primary hover:bg-violet-200"
                    }`}
                  >
                    {client.user.userName}
                  </span>
                </button>
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </aside>
  );
}
