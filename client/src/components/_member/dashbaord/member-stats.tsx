"use client";

import { CheckCircle, AlertCircle, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { NumberTicker } from "@/components/ui/magicui/number-ticker";

interface StatsProps {
  totalPostsAssigned?: number;
  totalPostsCompleted?: number;
  totalPostsUpcoming?: number;
}

export default function MemberStatsCards({
  totalPostsAssigned = 0,
  totalPostsCompleted = 0,
  totalPostsUpcoming = 0,
}: StatsProps) {
  const stats = [
    {
      title: "Post Assigned",
      value: totalPostsAssigned,
      icon: AlertCircle,
      color: "bg-orange-500",
    },
    {
      title: "Post Completed",
      value: totalPostsCompleted,
      icon: CheckCircle,
      color: "bg-green-500",
    },
    {
      title: "Post Upcoming",
      value: totalPostsUpcoming,
      icon: Clock,
      color: "bg-purple-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {stats.map(({ title, value, icon: Icon, color }) => (
        <Card
          key={title}
          className="border-2 border-slate-200 text-primary"
        >
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">{title}</CardTitle>
            <span className={`rounded-full p-3 text-white ${color}`}>
              <Icon className="h-6 w-6" />
            </span>
          </CardHeader>
          <CardContent>
            <NumberTicker
              value={value}
              className="whitespace-pre-wrap text-4xl font-medium tracking-tighter text-black"
            />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
