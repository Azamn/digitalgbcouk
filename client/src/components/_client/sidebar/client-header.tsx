import UserProfile from "@/components/shared/user-profile";
import Image from "next/image";
import { ClinetAppSidebarSheet } from "./app-sidebar-sheet";
import SetView from "@/components/common/set-view";

const ClientAppHeader = () => {
  return (
    <header className="sticky top-0 z-30 w-full border-b bg-white font-lexend shadow-sm">
      <div className="mx-auto flex max-w-screen-2xl items-center justify-between px-4 py-3 md:px-6">
        {/* Left Side: Logo and View Toggle */}
        <div className="flex items-center gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="DigitalLab Logo"
              width={32}
              height={32}
              className="h-9 w-9 object-contain"
            />
            <span className="text-xl font-bold text-gray-900">Digital GB</span>
          </div>

          {/* View Toggle or Custom Component */}
          <div className="hidden sm:block">
            <SetView />
          </div>
        </div>

        {/* Right Side: Profile and More */}
        <div className="flex items-center gap-4">
          {/* User Profile */}
          <UserProfile />
        </div>
      </div>
    </header>
  );
};

export default ClientAppHeader;
