"use client";
import { useGetUserInfoQuery } from "@/backend/auth-api";
import React from "react";

const UserProfile = () => {
  const { data } = useGetUserInfoQuery();
  const firstName = data?.result?.userName || "User";
  const initials = `${firstName[0] || ""}`.toUpperCase();
  return (
    <div className="center flex size-10 items-center gap-4 rounded-full bg-black text-secondary">
      {initials}
    </div>
  );
};

export default UserProfile;
