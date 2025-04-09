"use client";

import { LogOutIcon, MoreVerticalIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useGetUserInfoQuery, useUserLogoutMutation } from "@/backend/auth-api";
import { useAppToasts } from "@/hooks/use-app-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export function NavUser() {
  const { data } = useGetUserInfoQuery();
  const [Logout] = useUserLogoutMutation();
  const { ErrorToast, SuccessToast } = useAppToasts();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const resp = await Logout().unwrap();
      if (resp?.status === "success") {
        SuccessToast({ title: "Logged out successfully" });
        router.push("/");
      }
    } catch (error) {
      console.error("Logout error:", error);
      ErrorToast({
        title: "Failed to log out",
        description: "Please try again later.",
      });
    }
  };

  const userName = data?.result?.userName || "User";
  const email = data?.result?.email || "unknown@example.com";
  const initials = userName[0]?.toUpperCase() || "U";

  if (!data?.result) return null;

  return (
    <div className="px-4">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="w-full justify-start rounded-lg px-3 py-2 transition"
          >
            <Avatar className="h-8 w-8 rounded-lg grayscale">
              <AvatarFallback className="rounded-lg">{initials}</AvatarFallback>
            </Avatar>
            <div className="ml-3 flex flex-col items-start">
              <span className="truncate text-sm font-medium">{userName}</span>
              <span className="text-muted-foreground truncate text-xs">
                {email}
              </span>
            </div>
            <MoreVerticalIcon className="ml-auto size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="min-w-56 bg-white" align="end" sideOffset={8}>
          <DropdownMenuLabel className="p-0 font-normal">
            <div className="flex items-center gap-2 px-2 py-2 text-left text-sm">
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarFallback className="rounded-lg">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="font-medium">{userName}</span>
                <span className="text-muted-foreground text-xs">{email}</span>
              </div>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={handleLogout}
            className="text-red-600 hover:!bg-red-100"
          >
            <LogOutIcon className="mr-2 h-4 w-4" />
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
