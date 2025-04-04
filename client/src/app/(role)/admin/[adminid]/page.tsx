"use client";

import ClientStatsChart from "@/components/_admin/dashboard/chart";
import StatsCards from "@/components/_admin/dashboard/stat-cards";
import DataLoader from "@/components/shared/loader/data-laoder";
import {
  useGetEventsStatsForAdminQuery,
  useGetMonthlyEventForAdminQuery,
} from "@/backend/events-api";
import React from "react";

const Page = () => {
  const { data: statsData, isLoading: statsLoading } =
    useGetEventsStatsForAdminQuery();
  const { data: eventsData, isLoading: eventsLoading } =
    useGetMonthlyEventForAdminQuery();
  if (statsLoading || eventsLoading) return <DataLoader />;

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        {/* Stats Cards */}
        <StatsCards
          totalClients={Number(statsData?.result.totalClients || 0)}
          totalEvents={Number(statsData?.result.totalEvents || 0)}
          totalMembers={Number(statsData?.result.totalMembers || 0)}
          totalPosts={Number(statsData?.result.totalPosts || 0)}
        />

        {/* Chart with event data */}
        <ClientStatsChart eventData={eventsData?.result} />
      </div>
    </div>
  );
};

export default Page;
