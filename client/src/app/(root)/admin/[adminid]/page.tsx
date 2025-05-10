"use client";

import ClientStatsChart from "@/components/_admin/dashboard/admin-stats-chart";
import StatsCards from "@/components/_admin/dashboard/stat-cards";
import DataLoader from "@/components/shared/loader/data-laoder";
import React from "react";
import {
  useGetAdminStatsQuery,
  useGetPostsCreatedMonthlyQuery,
} from "@/backend/post-api";
import ClientCards from "@/components/_admin/dashboard/clients-cards";

const Page = () => {
  const { data: statsData, isLoading: statsLoading } = useGetAdminStatsQuery();
  const { data: postsData, isLoading: eventsLoading } =
    useGetPostsCreatedMonthlyQuery();
  if (statsLoading || eventsLoading) return <DataLoader />;

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <StatsCards
          totalClients={Number(statsData?.result.totalClients || 0)}
          totalCoreMembers={Number(statsData?.result.totalCoreMembers || 0)}
          totalMembers={Number(statsData?.result.totalMembers || 0)}
        />
        <ClientCards />
        <ClientStatsChart eventData={postsData?.result} />
      </div>
    </div>
  );
};

export default Page;
