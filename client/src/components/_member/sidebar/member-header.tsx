"use client";
import React, { FC, useState } from "react";
import UserProfile from "@/components/shared/user-profile";
import Image from "next/image";
import { AppSidebarSheet } from "./app-sidebar-sheet";
import Compose from "@/components/common/compose";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";

const MemberHeader = () => {
  const [openCompose, setOpenCompose] = useState(false);
  return (
    <header className="sticky left-0 top-0 z-[30] w-full border-b bg-white font-lexend">
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
            <Button
              size="sm"
              onClick={() => setOpenCompose(true)}
              className="flex items-center rounded bg-[#1A73E8] px-4 py-2 font-medium text-white hover:bg-[#1669C1]"
            >
              <Pencil className="mr-2 h-4 w-4" />
              Compose
            </Button>
            <Compose open={openCompose} setOpen={setOpenCompose} />
            <UserProfile />
          </div>
        </div>
      </div>
    </header>
  );
};

export default MemberHeader;
