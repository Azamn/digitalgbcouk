"use client";

import { MmeberAssignedChart } from "@/components/_member/dashbaord/member-assigned-chart";
import MemberStatsCards from "@/components/_member/dashbaord/member-stats";
import { MonthlyEventAssigned } from "@/components/_member/dashbaord/monthly-event-assigned";
import NotificationCard from "@/components/_member/dashbaord/notification-card";
import DataLoader from "@/components/shared/loader/data-laoder";

import React from "react";
import { useGetMembersStatsQuery } from "@/backend/post-api";

const Page = () => {
  const { data: statsData, isLoading } = useGetMembersStatsQuery();
  // const { data: monthlyData, isLoading: MonthlyLoading } =
  //   useGetEventsAssignedToMemberMonthlyQuery();

  // if (isLoading || MonthlyLoading ) return <DataLoader />;
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <MemberStatsCards
          totalPostsAssigned={Number(statsData?.result.totalPostsAssigned || 0)}
          totalPostsCompleted={Number(
            statsData?.result.totalPostsCompleted || 0,
          )}
          totalPostsUpcoming={Number(statsData?.result.totalPostsUpcoming || 0)}
        />
        <div className="grid gap-x-6 lg:grid-cols-3">
          <div className="col-span-full">
            <NotificationCard />
          </div>
          {/* <MonthlyEventAssigned monthlyData={monthlyData?.result || {}} /> */}
        </div>
      </div>
    </div>
  );
};

export default Page;
