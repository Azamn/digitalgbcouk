"use client";

import { Users, Calendar, FileText, UserPlus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { NumberTicker } from "@/components/ui/magicui/number-ticker";

interface StatsProps {
  totalEvents?: number;
  totalClients?: number;
  totalMembers?: number;
  totalPosts?: number;
}

export default function StatsCards({
  totalEvents = 0,
  totalClients = 0,
  totalMembers = 0,
  totalPosts = 0,
}: StatsProps) {
  const stats = [
    {
      title: "Total Events",
      value: totalEvents,
      icon: Calendar,
      color: "bg-red-500",
    },
    {
      title: "Total Clients",
      value: totalClients,
      icon: Users,
      color: "bg-yellow-500",
    },
    {
      title: "Total Members",
      value: totalMembers,
      icon: UserPlus,
      color: "bg-blue-500",
    },
    {
      title: "Total Posts",
      value: totalPosts,
      icon: FileText,
      color: "bg-orange-500",
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
