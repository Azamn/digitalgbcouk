import React, { FC } from "react";
import UserProfile from "@/components/shared/user-profile";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Target } from "lucide-react";
import EventSearchbar from "./event-search-bar";
import Image from "next/image";

const AppHeader = () => {
  return (
    <header className="sticky left-0 top-0 z-[30] w-full bg-secondary font-lexend">
      <div className="flex items-center justify-between rounded-lg p-4 px-5">
        <div className="flex items-center gap-4">
          <SidebarTrigger className="-ml-1" />
          <div className="inline-flex items-center">
            <Image
              src="/logo.png"
              alt="DigitalLab Logo"
              width={32}
              height={32}
              className="h-8 w-8"
            />
            <span className="ml-2 text-2xl font-bold text-dark">Digital GB</span>
          </div>
        </div>
        <EventSearchbar />
        <div className="flex items-center gap-6">
          <div className="flex gap-4"></div>
          <div className="flex items-center gap-4">
            <UserProfile />
          </div>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
