"use client";

import { TrendingUp } from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface EventStatsChartProps {
  eventData?: Record<string, number>;
}

export default function EventStatsChart({ eventData = {} }: EventStatsChartProps) {
  const rawData = eventData ?? {};

  const formattedData = Object.entries(rawData).map(([month, Created]) => ({
    month: new Date(month).toLocaleString("default", {
      month: "short",
      year: "numeric",
    }),
    Created,
  }));

  return (
    <Card className="col-span-4 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <CardHeader>
        <CardTitle>Event Analytics</CardTitle>
        <CardDescription>
          Total Events Created Per Month (Jan - Present)
        </CardDescription>
      </CardHeader>

      <CardContent className="pl-2">
        <div className="h-[300px] w-full">
          {formattedData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={formattedData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorCreated" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1} />
                  </linearGradient>
                </defs>

                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" tick={{ fill: "#6B7280" }} />
                <YAxis tick={{ fill: "#6B7280" }} />
                <Tooltip
                  contentStyle={{
                    borderColor: "#000",
                    borderRadius: "12px",
                    fontSize: "14px",
                    textTransform: "capitalize",
                  }}
                />

                <Area
                  type="monotone"
                  dataKey="Created"
                  stroke="#3B82F6"
                  fill="url(#colorCreated)"
                  fillOpacity={0.4}
                />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center rounded-lg p-10 text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 text-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.75 9.75h4.5m-4.5 3h4.5m-7.5 6.75h10.5a2.25 2.25 0 002.25-2.25V5.25a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 5.25v11.25a2.25 2.25 0 002.25 2.25z"
                />
              </svg>
              <h2 className="mt-4 text-lg font-semibold text-primary">
                No Events Found
              </h2>
              <p className="mt-2 text-sm text-gray-400">
                Start by creating a new event to see data here.
              </p>
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter>
        <div className="flex flex-col gap-2 text-sm">
          <div className="flex items-center gap-2 font-medium leading-none">
            Event creation is increasing{" "}
            <TrendingUp className="h-4 w-4 text-green-500" />
          </div>
          <div className="text-muted-foreground flex items-center gap-2 leading-none">
            Data updates dynamically
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}