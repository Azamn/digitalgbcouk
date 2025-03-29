"use client";

import {
  Users,
  Calendar,
  FileText,
  UserPlus,
  Clock,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { NumberTicker } from "@/components/ui/magicui/number-ticker";

interface StatsProps {
  totalPostsDone?: number;
  totalPendingPosts?: number;
  totalUpcomingPosts?: number;
  totalThisWeekPosts?: number;
}

export default function ClientStatsCards({
  totalPostsDone = 0,
  totalPendingPosts = 0,
  totalUpcomingPosts = 0,
  totalThisWeekPosts = 0,
}: StatsProps) {
  const stats = [
    {
      title: "Posts Done",
      value: totalPostsDone,
      icon: CheckCircle,
      color: "bg-green-500",
    },
    {
      title: "Pending  Posts",
      value: totalPendingPosts,
      icon: AlertCircle,
      color: "bg-orange-500",
    },
    {
      title: "Upcoming Posts",
      value: totalUpcomingPosts,
      icon: Clock,
      color: "bg-purple-500",
    },
    {
      title: "This Week's Posts",
      value: totalThisWeekPosts,
      icon: FileText,
      color: "bg-teal-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map(({ title, value, icon: Icon, color }) => (
        <Card
          key={title}
          className="border-2 border-slate-200 text-primary shadow-lg"
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
