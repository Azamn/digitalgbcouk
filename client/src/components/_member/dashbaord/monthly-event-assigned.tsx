"use client";

import { TrendingUp } from "lucide-react";
import { PolarAngleAxis, PolarGrid, Radar, RadarChart, Legend } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
  eventAssigned: {
    label: "Event Assigned",
    color: "#E9A5F1",
  },
} satisfies ChartConfig;

export function MonthlyEventAssigned({
  monthlyData,
}: {
  monthlyData: Record<string, number>;
}) {
  const monthlyArray = Object.entries(monthlyData).map(([month, count]) => ({
    month,
    EventAssigned: count,
  }));
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-center space-y-0 pb-4">
        <CardDescription>
          Showing events assigned for the Monthly
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-0">
        <ChartContainer config={chartConfig} className="mx-auto my-auto mt-7">
          <RadarChart data={monthlyArray}>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent className="bg-white" />}
            />
            <PolarAngleAxis dataKey="month" />
            <PolarGrid />
            <Radar
              dataKey="EventAssigned"
              fill="#B7B1F2"
              fillOpacity={0.7}
              dot={{ r: 4, fillOpacity: 1 }}
            />
          </RadarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
