"use client";
import { useGetUserInfoQuery } from "@/server-api/auth-api";
import React from "react";

const UserProfile = () => {
  const {data} = useGetUserInfoQuery()
  const firstName = data?.result?.firstName || "User";
  const lastName = data?.result?.lastName || "";
  const initials = `${firstName[0] || ""}${lastName[0] || ""}`.toUpperCase();
  return (
    <div className="flex size-10 bg-black rounded-full text-secondary center items-center gap-4">
      {initials}
    </div>
  );
};

export default UserProfile;
