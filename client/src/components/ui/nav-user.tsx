"use client";

import { LogOutIcon, MoreVerticalIcon } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  useGetUserInfoQuery,
  useUserLogoutMutation,
} from "@/backend/auth-api";
import { useAppToasts } from "@/hooks/use-app-toast";
import { useRouter } from "next/navigation";

export function NavUser() {
  const { isMobile } = useSidebar();
  const { data } = useGetUserInfoQuery();
  const { ErrorToast, SuccessToast } = useAppToasts();
  const [Logout] = useUserLogoutMutation();
  const router = useRouter();
  const handleLogout = async () => {
    try {
      const resp = await Logout().unwrap();

      if (resp?.status === "success") {
        SuccessToast({
          title: "Logged out successfully",
        });
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
  const initials = `${userName[0]}`.toUpperCase();

  return (
    <>
      {data?.result && (
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <Avatar className="h-8 w-8 rounded-lg grayscale">
                    <AvatarFallback className="rounded-lg">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">{userName}</span>
                    <span className="text-muted-foreground truncate text-xs">
                      {email}
                    </span>
                  </div>
                  <MoreVerticalIcon className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg bg-white"
                side={isMobile ? "bottom" : "right"}
                align="end"
                sideOffset={4}
              >
                <DropdownMenuLabel className="p-0 font-normal">
                  <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarFallback className="rounded-lg">
                        {initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-medium">{userName}</span>
                      <span className="text-muted-foreground truncate text-xs">
                        {email}
                      </span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="bg-red-200">
                  <LogOutIcon />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      )}
    </>
  );
}
