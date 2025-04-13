import React, { FC } from "react";
import UserProfile from "@/components/shared/user-profile";
import Image from "next/image";
import { AppSidebarSheet } from "./app-sidebar-sheet";
import Compose from "@/components/common/compose";

const MemberHeader = () => {
  return (
    <header className="sticky left-0 top-0 z-[30] w-full bg-white border-b font-lexend">
      <div className="flex items-center justify-between rounded-lg p-3 px-5">
        <div className="flex items-center gap-4">
          <AppSidebarSheet />
          <div className="inline-flex items-center">
            <Image
              src="/logo.png"
              alt="DigitalLab Logo"
              width={32}
              height={32}
              className="h-8 w-8"
            />
            <span className="ml-2 text-2xl font-bold text-dark">
              Digital GB
            </span>
          </div>
        </div>
        {/* <EventSearchbar /> */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-4">
            <Compose />
            <UserProfile />
          </div>
        </div>
      </div>
    </header>
  );
};

export default MemberHeader;
