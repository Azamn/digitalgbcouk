"use client";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import UserProfile from "../user-profile";
import { useGetUserInfoQuery } from "@/store/api-endpoints/user-api";

export function User() {
  const { data } = useGetUserInfoQuery();
  return (
    <div className="flex w-full min-w-0 flex-col gap-1">
      <div>
        <div className="flex items-center gap-x-2 pt-2">
          <UserProfile />
          <div className="grid grid-cols-1 gap-1 text-left font-lexend text-sm leading-tight">
            {/* Check if the first name and last name exist, and render them together */}
            <>
              {data?.result?.firstName && data?.result?.lastName && (
                <span>
                  {data.result.firstName} {data.result.lastName}
                </span>
              )}
            </>

            {/* Check if the email exists */}
            <>
              {data?.result?.email ? (
                <span>{data.result.email}</span>
              ) : (
                <span className="text-gray-500">Email not available</span>
              )}
            </>
          </div>
        </div>
      </div>
    </div>
  );
}
