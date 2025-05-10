"use client";
import React, { FC, useState } from "react";
import { usePathname } from "next/navigation";
import UserProfile from "@/components/shared/user-profile";
import { AppSidebarSheet } from "@/components/_admin/sidebar/app-sidebar-sheet";
import SetView from "@/components/common/set-view";
import ClientsList from "./cleints-list";
import PostComposeTabs from "@/components/common/post-compose/post-compose-tabs";
import { Button } from "@/components/ui/button";
import { PenSquare } from "lucide-react";

const AppHeader = () => {
  const pathname = usePathname();
  const [openCompose, setOpenCompose] = useState(false);
  const toggleCompose = () => {
    setOpenCompose(!openCompose);
  };

  // Check if current route includes workspace or admin
  const shouldShowCompose = pathname?.includes("workspace") || pathname?.includes("admin");

  return (
    <header className="sticky left-0 top-0 z-[30] w-full border-b border-dashed border-primary bg-white font-lexend">
      <div className="flex items-center justify-between rounded-lg p-3 px-5">
        <div className="flex items-center gap-4">
          <AppSidebarSheet />
          <div className="inline-flex items-center space-x-1 font-lexend font-medium">
            <BreadcrumbNav />
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-4">
            {shouldShowCompose && (
              <>
                <Button 
                  onClick={toggleCompose} 
                  className="bg-primary text-secondary" 
                  variant="outline" 
                  size="sm"
                >
                  <PenSquare className="mr-2 h-4 w-4" />
                  Compose
                </Button>
                {openCompose && (
                  <PostComposeTabs open={openCompose} setOpen={setOpenCompose} />
                )}
              </>
            )}
            <UserProfile />
          </div>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;

const BreadcrumbNav = () => {
  const [activeTab, setActiveTab] = useState("Feed");

  return (
    <div className="flex items-center text-sm font-medium text-gray-600">
      <span
        className={`cursor-pointer ${activeTab === "Content" ? "text-black" : ""}`}
        onClick={() => setActiveTab("Content")}
      >
        Content
      </span>
      <span className="mx-1">/</span>
      <SetView />
      <span className="mx-1">/</span>
      <ClientsList />
      <span className="ml-1 text-yellow-400">☆</span>
    </div>
  );
};