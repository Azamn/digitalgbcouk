"use client";
import CalendarView from "@/components/_client/dashboard/calendar";
import ClientStatsCards from "@/components/_client/dashboard/stats-card";
import DataLoader from "@/components/shared/loader/data-laoder";

import {
  useGetClientStatsQuery,
  useGetPostsCreatedMonthlyForClientQuery,
} from "@/backend/post-api";
import PostMonthlyStatsChart from "@/components/_client/dashboard/post-chart";

const Page = () => {
  const { data: statsData, isLoading: statsLoading } = useGetClientStatsQuery();
  console.log("🚀 ~ Page ~ statsData:", statsData)

  const { data: monthlyData, isLoading: monthlyLoading } =
    useGetPostsCreatedMonthlyForClientQuery();

  if (monthlyLoading || statsLoading) return <DataLoader />;

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        {statsData?.result && (
          <ClientStatsCards
            totalPendingPosts={Number(statsData.result.totalPendingPosts || 0)}
            totalPostsDone={Number(statsData.result.totalPostsDone || 0)}
            totalThisWeekPosts={Number(
              statsData.result.totalThisWeekPosts || 0,
            )}
            totalUpcomingPosts={Number(
              statsData.result.totalUpcomingPosts || 0,
            )}
          />
        )}

        <PostMonthlyStatsChart eventData={monthlyData?.result} />
      </div>
    </div>
  );
};

export default Page;
