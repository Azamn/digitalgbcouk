"use client";

import * as React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetMonthlyEventsQuery } from "@/store/api-endpoints/user-api";
import { HashLoader } from "react-spinners";

interface EventDataType {
  week: string;
  events: number;
}

export function EventWeeklyChart() {
  const { data, isLoading } = useGetMonthlyEventsQuery();

  if (isLoading) {
    return (
      <Card className="border-primary col-span-full flex h-96 items-center justify-center">
        <HashLoader color="#FF0080" size={60} />
      </Card>
    );
  }

  if (!data || !data.result || data.result.length === 0) {
    return (
      <Card className="col-span-full flex h-96 items-center justify-center bg-green-500 text-gray-400">
        No event data found.
      </Card>
    );
  }

  // Convert the result into the required format
  const eventData: EventDataType[] = data.result.map((item: any) => ({
    week: `${item.week}`,
    events: item.events,
  }));

  return (
    <Card className="border-primary/10 bg-secondary col-span-full rounded-3xl p-[1px] font-lexend shadow-xl">
      <div className="rounded-3xl p-6 dark:bg-zinc-900">
        <CardHeader className="flex flex-col items-center gap-2">
          <CardTitle className="text-primary bg-clip-text text-2xl font-normal uppercase">
            Events Joined
          </CardTitle>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Weekly Participation (Last 8 Weeks)
          </p>
        </CardHeader>

        <CardContent className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={eventData}
              margin={{ top: 20, right: 20, bottom: 0, left: 0 }}
            >
              <defs>
                {/* Gradient for the events line */}
                <linearGradient id="eventsGradient" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#feda75" />
                  <stop offset="50%" stopColor="#fa7e1e" />
                  <stop offset="100%" stopColor="#d62976" />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="week" tick={{ fill: "#9ca3af", fontSize: 12 }} />
              <YAxis tick={{ fill: "#9ca3af", fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#ffffff",
                  borderRadius: "12px",
                  border: "2px",
                  boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
                  padding: "12px",
                  fontFamily: "Poppins",
                  fontWeight: 500,
                  fontSize: "16px",
                }}
                itemStyle={{ color: "#000000", fontSize: "14px" }}
                labelStyle={{ color: "#000000" }}
              />

              <Line
                type="monotone"
                dataKey="events"
                stroke="url(#eventsGradient)"
                strokeWidth={4}
                dot={{ r: 5, fill: "#f59e0b" }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </div>
    </Card>
  );
}

export default EventWeeklyChart;
