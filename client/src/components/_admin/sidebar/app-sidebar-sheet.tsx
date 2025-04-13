"use client";

import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { NavUser } from "@/components/ui/nav-user";
import { NavMain } from "./nav-main";

export function AppSidebarSheet() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>

      <SheetContent
        side="left"
        className="ml-4 w-[260px] rounded-xl bg-white p-0 sm:w-[300px]"
      >
        <div className="flex h-full flex-col justify-between">
          {/* Header with SheetTitle and Logo */}
          <SheetHeader className="border-b px-4 py-4">
            <div className="flex items-center gap-2">
              <img src="/logo.png" alt="Logo" className="h-8 w-8" />
              <SheetTitle className="text-xl font-bold">DigitalGB</SheetTitle>
            </div>
          </SheetHeader>

          {/* Main Navigation */}
          <div className="flex-1 overflow-y-auto px-2 py-1">
            <NavMain />
          </div>

          {/* User Info */}
          <div className="border-t px-2 py-4">
            <NavUser />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
