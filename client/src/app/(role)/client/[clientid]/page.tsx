"use client";
import CalendarView from "@/components/_client/dashboard/calendar";
import { EventChart } from "@/components/_client/dashboard/event-chart";
import ClientStatsCards from "@/components/_client/dashboard/stats-card";
import DataLoader from "@/components/shared/loader/data-laoder";
import {
  useGetMonthlyEventForAdminQuery,
  useGetEventsStatsForClientQuery,
  useGetEventsByDateQuery,
} from "@/server-api/events-api";

const Page = () => {
  const { data: monthlyData, isLoading: monthlyLoading } =
    useGetMonthlyEventForAdminQuery();

  const { data: statsData, isLoading: statsLoading } =
    useGetEventsStatsForClientQuery();

  const { data: dailyData, isLoading: dailyDataLoading } =
    useGetEventsByDateQuery();

  if (monthlyLoading || statsLoading || dailyDataLoading) return <DataLoader />;

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

        <div className="min-h-[700px] rounded-lg border border-slate-200 bg-white p-3 shadow-lg">
          <CalendarView />
        </div>

        <EventChart
          dailyDataLoading={
            Array.isArray(dailyData?.result) ? dailyData.result : []
          }
        />
      </div>
    </div>
  );
};

export default Page;
