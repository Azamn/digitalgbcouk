"use client";

import * as React from "react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  event: {
    label: "Event Attendees",
    color: "#27548A",
  },
} satisfies ChartConfig;

export function EventChart({
  dailyDataLoading,
}: {
  dailyDataLoading: Record<string, number>[];
}) {
  const hasData = dailyDataLoading.length > 0;

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Event Attendance</CardTitle>
          <CardDescription>
            Tracking attendance for recent events
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        {hasData ? (
          <ChartContainer
            config={chartConfig}
            className="aspect-auto h-[250px] w-full"
          >
            <LineChart data={dailyDataLoading} margin={{ left: 12, right: 12 }}>
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
                tickFormatter={(value) =>
                  new Date(value).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })
                }
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    className="w-[150px]"
                    labelFormatter={(value) =>
                      new Date(value).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })
                    }
                  />
                }
              />
              <Line
                dataKey="event"
                type="monotone"
                stroke={`var(--color-event)`}
                strokeWidth={3}
                dot={{ r: 5, fill: "var(--color-event)" }}
              />
            </LineChart>
          </ChartContainer>
        ) : (
          <div className="flex h-[250px] flex-col items-center justify-center text-center text-muted-foreground">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-primary"
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
              No Attendance Data
            </h2>
            <p className="mt-2 text-sm text-gray-400">
              Start tracking events to see data here.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
